// Import statements

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import axios from 'axios';

import Barra from '../components/navbar';
import StocksDiv from '../components/StocksDiv';
import { TokenFetcher } from '../components/TokenFetcher';
import Footer from '../components/footer';

const API_URL = 'http://localhost:3000';

const Profile = () => {
  // Auth0 and state variables
  const { user, getAccessTokenSilently } = useAuth0();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const userEmail = user?.email;

  // Function to fetch user settings
  const fetchUserSettings = async () => {
    try {
      const token = await getAccessTokenSilently();
      const apiUrl = `${API_URL}/user-settings`;
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(apiUrl, { headers });
      const settings = response.data;
      setNotificationsEnabled(settings.notificationsEnabled);
    } catch (error) {
      console.error('Error fetching user settings:', error);
    }
  };

  // Function to handle the change in notifications preference
  const handleNotificationsChange = (event) => {
    setNotificationsEnabled(event.target.checked);
  };

  // Function to submit the updated notification settings to the server
  const submitNotificationSettings = async () => {
    try {
      const token = await getAccessTokenSilently();
      const apiUrl = `${API_URL}/update-user-settings`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };

      // Alert the user
      alert('Cambiando tus preferencias de notificaciones...');

      const body = {
        notificationsEnabled, // this should be a boolean value
        email: userEmail,
      };

      // Make a POST request to update the notification settings
      const response = await axios.post(apiUrl, body, { headers });

      if (response.status !== 200) {
        // If the server responded with a status other than 200, handle it here
        console.error('Server responded with status:', response.status);
      }
    } catch (error) {
      console.error('Error updating notification settings:', error);
      // Here, you should have a better error handling mechanism, showing the error message in UI
    }
  };

  // Effect hook for fetching user settings and performing operations that require the user's email
  useEffect(() => {

    if (userEmail) {
      console.log("User's email is:", userEmail);
      // Any additional operations that require the user's email can go here
    }

    fetchUserSettings(); // Fetch user settings from the server
  // eslint-disable-next-line
  }, [getAccessTokenSilently, user]);
  return (

    <div className="min-h-screen bg-blue-100">
  <Barra />
  <div className="flex justify-center pt-3 space-x-5 mb-5">
    {/* Profile Information Box */}
    <div className="flex flex-col items-center">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-5">
        <h2 className="flex text-xl font-semibold mb-6 justify-center">Información Perfil</h2>
        
        <div className="flex justify-center mb-4">
          <img src={user.picture} alt={user.name} className="rounded-full" />
        </div>
        
        <div className="p-2 items-center mb-4">
          <p className="text-lg">{user.name}</p>
        </div>
        
        <div className="flex justify-center">
          <button
            className="text-white bg-blue-500 hover-bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => window.location.href = '/transactions'}
          >
            Mis transacciones 🤑
          </button>
        </div>
        
        <div className='flex justify-center' style={{ marginBottom: '10px' }}>
          <button className="text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <a href="/predictions">Mis predicciones 📈</a>
          </button>
        </div>
        
        <div className="py-3">
          <label className="flex justify-center text-sm font-medium text-gray-700">
            Activar notificaciones:
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={handleNotificationsChange}
              className="ml-2 form-checkbox"
            />
          </label>
          
          <button onClick={submitNotificationSettings} className="flex justify-center text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800">
            Guardar
          </button>
        </div>
      </div>
    </div>
    
    {/* Stocks Div */}
    <div className="flex flex-col items-center">
      <StocksDiv />
    </div>
  </div>
  
  <div className="flex justify-center mb-8">
    <button
      onClick={() => window.location.href = '/'}
      className="text-white bg-blue-500 hover-bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
    >
      Volver al inicio
    </button>
  </div>
  
  <Footer />
</div>
  );
};

// Export Profile component with authentication
export default withAuthenticationRequired(Profile, {
  onRedirecting: () => (
    <div className="min-h-screen bg-blue-100">
      <Barra />
      <div className="flex min-h-screen justify-center">
        <div className="flex justify-center items-center my-3"> {/* Flexbox container */}
          <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  ),
});
