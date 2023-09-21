import React from 'react';
import Barra from '../components/navbar';
import 'tailwindcss/tailwind.css';
import { useAuth0 } from '@auth0/auth0-react';

export const Profile = () => {
  const { user, isAuthenticated, isLoading} = useAuth0();
  if (isLoading) {
    return (<nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Emoji_u1f310.svg/192px-Emoji_u1f310.svg.png" className="h-8 mr-3" alt="Stockpedia Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Stockpedia</span>
        </a>
        <a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Loading ...</a>;
      </div>
    </nav>);
  }
  return (
    <div className="min-h-screen bg-blue-100">
      <Barra />
      <div className="flex-1 flex justify-center">
        <div className="w-1/2 p-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Informacion Perfil</h2>
            { isAuthenticated ? (
              <>
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
              </>
            ) : (
              <p>Please log in to view your profile.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;