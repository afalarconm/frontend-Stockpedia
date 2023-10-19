import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { TokenFetcher } from './TokenFetcher';

const API_URL = 'http://localhost:3000';

const StocksDiv = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [userStocks, setUserStocks] = useState([]);

  useEffect(() => {
    const fetchUserStocks = async () => {
      try {
        const token = await TokenFetcher(getAccessTokenSilently);
        const apiUrl = `${API_URL}/my-stocks`;

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('User stocks:', response.data);
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
          {/* Set up user stocks with symbol and quantity */}
          {userStocks.map((stock) => (
            <li key={stock.symbol}>
              <p className="text-lg font-semibold">
                {stock.symbol} - {stock.quantity}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StocksDiv;
