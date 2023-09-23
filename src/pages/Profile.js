import React, { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import 'tailwindcss/tailwind.css';
import Barra from '../components/navbar';

const WalletInput = ({ numberValue, handleNumberChange, handleSubmit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg px-5 pt-6 pb-5 m-4 flex flex-col">
      <div className="flex flex-col items-center">
        <label htmlFor="numberInput" className="mb-2">
          Agregar dinero a mi billetera:
        </label>
        <input
          type="number"
          id="numberInput"
          placeholder="$asdasd"
          value={numberValue}
          onChange={handleNumberChange}
          className="border border-gray-300 rounded-lg px-3 py-2 mb-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg text-sm px-4 py-2 focus:ring-4 focus:outline-none focus:ring-green-300 mt-2"
        >
          Agregar
        </button>
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
      <div className="flex-1 flex justify-center p-6">
        <div className="flex flex-col items-center w-1/2 p-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Informacion Perfil</h2>

            <div className="flex justify-center mb-4">
              <img src={user.picture} alt={user.name} className="rounded-full" />
            </div>

            <div className="mb-4">
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

          <div>
            <WalletInput
              numberValue={userMoney}
              handleNumberChange={handleNumberChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Profile);
