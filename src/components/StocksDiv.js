import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { TokenFetcher } from './TokenFetcher';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000';

const StocksDiv = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [userStocks, setUserStocks] = useState([]);
  const navigate = useNavigate();

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

  const handleRowClick = (symbol) => {
    navigate('/stock-details', { state: { selectedStock: symbol } });
  }


  return (
    <div className="bg-white shadow-md rounded-lg p-3 px-8 max-h-1/2 pb-5">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Tus Acciones</h2>
        <div className="w-full overflow-y-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="text-sm text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope='col'
              >
                Stock
              </th>
              <th scope='col'>
                Cantidad
              </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {/* Iterating over user stocks to create rows for the table */}
            {userStocks.map((stock) => (
              <tr
                key={stock.symbol}
                onClick={() => handleRowClick(stock.symbol)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="px-6 py-4">
                  <div className="text-lg font-semibold text-gray-900">
                    {stock.symbol}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-lg text-gray-900">
                    {stock.quantity}
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default StocksDiv;