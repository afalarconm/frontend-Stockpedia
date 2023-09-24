// Import statements
import React, { useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import axios from 'axios';

import Barra from '../components/navbar';
import WalletInput from '../components/WalletInput';
import StocksDiv from '../components/StocksDiv';
import { TokenFetcher } from '../components/TokenFetcher';


const Profile = () => {
  // Auth0 and state variables
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMoney, setUserMoney] = useState(100); // Set initial value to 100

  // Fetch user money from the server
  const getUserMoney = async () => {
    try {

      const apiUrl = 'https://api.stockpedia.me/my-wallet';

      const token = await TokenFetcher(getAccessTokenSilently);

      console.log('token', token)

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(apiUrl, { headers });
      // Set user money to the value returned by the server
      setUserMoney(response.data.money);
    } catch (error) {
      console.error(error);
    }
  };



  // Function to update user money on the server
  const updateUserMoneyOnServer = async (aumento) => {
    try {
      const token = await TokenFetcher(getAccessTokenSilently);

      const apiUrl = 'https://api.stockpedia.me/my-wallet/deposit';

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(apiUrl, { aumento }, { headers });

      console.log('Response from the server:', response.data);

      // fetch user money
      getUserMoney();

    } catch (error) {
      console.error('Error updating money on the server:', error);
    }
  };


  // Function to handle input change
  const handleNumberChange = (event) => {
    setUserMoney(parseInt(event.target.value, 10));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    console.log('Added money:', userMoney);
    updateUserMoneyOnServer(userMoney);
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <Barra />
      <div className="flex-1 flex justify-center p-2">
        <div className="flex flex-col items-center w-1/2 p-7">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 w-3/4">
            <h2 className="text-xl font-semibold mb-6">Informacion Perfil</h2>

            <div className="flex justify-center mb-6">
              <img src={user.picture} alt={user.name} className="rounded-full" />
            </div>

            <div className="mb-6">
              {user.name === user.email ? (
                <>
                  <p className="text-gray-500">Correo: {user.email}</p>
                  <p className="text-gray-500">Dinero: ${userMoney}</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold">Nombre: {user.name}</p>
                  <p className="text-gray-500">Correo: {user.email}</p>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full">
            <div className="md:w-1/2 ml-6"> {/* Adjusted margin bottom */}
              <WalletInput
                numberValue={userMoney}
                handleNumberChange={handleNumberChange}
                handleSubmit={handleSubmit}
              />
            </div>

            <div className="md:w-1/2 mr-5 mb-2"> {/* Adjusted margin bottom */}
              <StocksDiv />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export Profile component with authentication
export default withAuthenticationRequired(Profile, {
  onRedirecting: () => (
    <h2 className="text-xl font-semibold mb-6 flex justify-center items-center h-screen">
      Cargando...
    </h2>
  ),
});
