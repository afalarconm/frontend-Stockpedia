import React, { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import 'tailwindcss/tailwind.css';
import Barra from '../components/navbar';

const WalletInput = ({ numberValue, handleNumberChange, handleSubmit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg py-5 m-6 w-3/4">
      <div className="flex flex-col items-center">
        <label htmlFor="numberInput" className="mb-4 text-l font-semibold">
          Agregar dinero a mi billetera:
        </label>
        <input
          type="number"
          id="numberInput"
          placeholder="$asdasd"
          value={numberValue}
          onChange={handleNumberChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg text-lg px-4 py-2 focus:ring-4 focus:outline-none focus:ring-green-300 mt-1 mb-2"
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

const StocksDiv = () => {
  // Assume the user's stocks are stored in userStocks array
  const userStocks = ['AAPL', 'GOOGL', 'AMZN']; // Replace with actual user's stocks

  return (
    <div className="bg-white shadow-md rounded-lg py-5 m-6 w-3/4">
      <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Tus Acciones</h2>
      <ul>
        {userStocks.map((stock, index) => (
          <li key={index}>{stock}</li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export const Profile = () => {
  const { user } = useAuth0();
  const [userMoney, setUserMoney] = useState(100); // Set initial value to 100

  const updateUserMoneyOnServer = (money) => {
    // Simulated server update
    console.log('Sending request to update money on server:', money);
  };

  const handleNumberChange = (event) => {
    setUserMoney(parseInt(event.target.value, 10));
  };

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

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <h2 className="text-xl font-semibold mb-6 flex justify-center items-center h-screen">
  Cargando...
</h2>,
});