import React from 'react';
import Barra from '../components/navbar';
import 'tailwindcss/tailwind.css';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

export const Profile = () => {
  const { user } = useAuth0();

  return (
    <div className="min-h-screen bg-blue-100">
      <Barra />
      <div className="flex-1 flex justify-center">
        <div className="w-1/2 p-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Informacion Perfil</h2>
            <img src={user.picture} alt={user.name} />
            <div className="mb-4">
              {user.name === user.email ? (
                <p className="text-gray-500">Correo: {user.email}</p>
              ) : (
                <>
                  <p className="text-lg font-semibold">Nombre: {user.name}</p>
                  <p className="text-gray-500">Correo: {user.email}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Profile);
