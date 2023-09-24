import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { TokenFetcher } from './TokenFetcher';

const StocksDiv = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [userStocks, setUserStocks] = useState([]);



  useEffect(() => {
    const fetchUserStocks = async () => {
      try {
        const token = await TokenFetcher(getAccessTokenSilently);
        const apiUrl = 'http://api.stockpedia.me/my-stocks';

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserStocks(response.data);
      } catch (error) {
        console.error('Error fetching user stocks:', error);
      }
    };

    fetchUserStocks();
  }, [getAccessTokenSilently]);


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

export default StocksDiv;
