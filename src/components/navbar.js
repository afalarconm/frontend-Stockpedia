import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useAuth0 } from "@auth0/auth0-react";
import { TokenFetcher } from './TokenFetcher';
import { jwtDecode } from 'jwt-decode';


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect()} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Empezar a tradear
    </button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Log Out
    </button>
  );
};




const Barra = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [permissions, setPermissions] = useState([]); // State to store permissions

  useEffect(() => {
    const getPermission = async () => {
      try {
        const token = await TokenFetcher(getAccessTokenSilently);
        console.log('Token:', token);

        const jwtToken = token.replace('Bearer ', '');
        const jwtDecoded = jwtDecode(jwtToken); // Corrected decoding
        console.log('jwtDecoded:', jwtDecoded);
        setPermissions(jwtDecoded.permissions || []); // Set permissions

      } catch (error) {
        console.error('Error fetching:', error);
      }
    };

    if (typeof window !== 'undefined' && isAuthenticated) {
      getPermission();
    }
  }, [isAuthenticated, getAccessTokenSilently]);


  if (isLoading) {
    return (
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://stockpedia.me" className="flex items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Emoji_u1f310.svg/192px-Emoji_u1f310.svg.png" className="h-8 mr-3" alt="Stockpedia Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Stockpedia</span>
          </a>
          <a href="https://stockpedia.me" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Loading ...</a>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://stockpedia.me" className="flex items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Emoji_u1f310.svg/192px-Emoji_u1f310.svg.png" className="h-8 mr-3" alt="Stockpedia Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Stockpedia</span>
        </a>

        <div className="flex md:order-2">
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          <button type="button" onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded={isOpen}>
            <span className="sr-only">Abrir el menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* {isAuthenticated && (
          <div className=" text-white rounded-lg px-4 py-2 flex justify-between items-center">
            <p className="font-bold text-green-500">Mi Billetera: ${Math.round(walletBalance)}</p>
          </div>
        )} */}

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <div className={`items-center justify-between ${isOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="https://stockpedia.me" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
              </li>
              {isAuthenticated && (
                <li>
                  <a href="/profile" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Mi perfil</a>
                </li>
              )}
              <li>
                <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sobre Nosotros</a>
              </li>
              <li>
                <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contáctanos</a>
              </li>
              {permissions.includes("buy:stocks") &&
                <li>
                  <a href="/subastas" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Subastas</a>
                </li>
              }
              
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Barra;
