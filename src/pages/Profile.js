// Import statements
import React, { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import axios from 'axios';

import Barra from '../components/navbar';
import WalletInput from '../components/WalletInput';
import StocksDiv from '../components/StocksDiv';
import { TokenFetcher } from '../components/TokenFetcher';


const Profile = () => {
  // Auth0 and state variables
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMoney, setUserMoney] = useState(0);
  const [addedMoney, setUserAddedMoney] = useState('');

  // On window load, fetch user money
  useEffect(() => {
    getUserMoney(getAccessTokenSilently);
  }
    , [getAccessTokenSilently]);

  // Function to fetch user money
  const getUserMoney = async (getAccessTokenSilently) => {
    try {
      const token = await TokenFetcher(getAccessTokenSilently);

      const apiUrl = 'https://api.stockpedia.me/my-wallet';

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(apiUrl, { headers });

      console.log('Response from the server:', response.data);

      setUserMoney(response.data[0].wallet);

    } catch (error) {
      console.error('Error fetching user money:', error);
    }
  }

  // Function to update user money on the server
  const updateUserMoneyOnServer = async (aumento) => {
    try {
      const token = await TokenFetcher(getAccessTokenSilently);

      const apiUrl = 'https://api.stockpedia.me/my-wallet/deposit';

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(apiUrl, { amount: aumento }, { headers });

      console.log('Response from the server:', response.data);

      // fetch user money
      getUserMoney();

    } catch (error) {
      console.error('Error updating money on the server:', error);
    }
  };


  // Function to handle input change
  const handleNumberChange = (event) => {
    setUserAddedMoney(parseInt(event.target.value, 10));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    console.log('Added money:', addedMoney);
    updateUserMoneyOnServer(addedMoney);
    alert('Dinero agregado a tu billetera!');
    window.location.href = '/profile';
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <Barra />
      <div className="flex-1 flex justify-center">
        <div className="flex flex-col items-center w-1/2 p-2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3 w-3/4">
            <h2 className="text-xl font-semibold mb-6">Informacion Perfil</h2>

            <div className="flex justify-center mb-6">
              <img src={user.picture} alt={user.name} className="rounded-full" />
            </div>

            <div className="p-2 items-center">
              {user.name === user.email ? (
                <>
                  <p className="text-gray-500">Correo: {user.email}</p>
                  <p className="text-lg font-semibold">Dinero: ${userMoney}</p>
                  {/* Display the logged users money */}
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold">Nombre: {user.name}</p>
                  <p className="text-gray-500">Correo: {user.email}</p>
                </>
              )}
            </div>
            <div className='mx-auto items-center'>
              <button className="text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <a href="/transactions">Mis transaciones</a>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full">
            <div className="md:w-1/2 ml-9"> {/* Adjusted margin bottom */}
              <WalletInput
                numberValue={addedMoney}
                handleNumberChange={handleNumberChange}
                handleSubmit={handleSubmit}
              />
            </div>

            <div className="md:w-1/2"> {/* Adjusted margin bottom */}
              <StocksDiv />
            </div>
          </div>
        </div>

      </div>
      <div className="flex justify-center mb-8">
        <button
          onClick={() => window.history.back()}
          className="text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Volver
        </button>
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
