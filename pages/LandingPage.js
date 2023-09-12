import React, { useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from 'next/dynamic'
import 'tailwindcss/tailwind.css';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false }); // Use dynamic import

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stocksData, setStocksData] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use Flowbyte or your preferred method to handle user signup and authentication
    // You may also fetch stock data here and update the stocksData state
    // Example API call: fetchStockData(username, password).then(data => setStocksData(data));
  };

  // Sample data for ApexCharts
  const chartData = {
    options: {
      chart: {
        type: 'area',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      },
    },
    series: [
      {
        name: 'Stock Price',
        data: [30, 40, 35, 50, 49, 60],
      },
    ],
  };

  // Mockup data for the table
  const tableData = [
    {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      currentPrice: 150.25,
      change: '+2.50 (1.68%)',
    },
    {
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      currentPrice: 2700.75,
      change: '-5.25 (-0.19%)',
    },
    {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      currentPrice: 280.50,
      change: '+1.25 (0.45%)',
    },
    {
      symbol: 'AMZN',
      companyName: 'Amazon.com, Inc.',
      currentPrice: 3200.00,
      change: '-2.50 (-0.08%)',
    },
    {
      symbol: 'TSLA',
      companyName: 'Tesla, Inc.',
      currentPrice: 750.00,
      change: '+10.00 (1.33%)',
    },
  ];

  return (
    <div className="min-h-screen bg-blue-100">
      {/* Login Form */}
      <div className="w-1/2 p-8 m-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-4 text-center">Bienvenido a Stockpedia 🌐</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">Username:</label>
              <input
                type="text"
                id="username"
                className="w-full p-2 border rounded"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full">
              Sign Up and Start Trading
            </button>
          </form>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-center">
        {/* Stocks Table */}
        <div className="w-1/2 p-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Stock Information</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-200">
                  <th className="py-2 px-4 border">Symbol</th>
                  <th className="py-2 px-4 border">Company Name</th>
                  <th className="py-2 px-4 border">Current Price</th>
                  <th className="py-2 px-4 border">Change</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((stock, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}>
                    <td className="py-2 px-4 border">{stock.symbol}</td>
                    <td className="py-2 px-4 border">{stock.companyName}</td>
                    <td className="py-2 px-4 border">{stock.currentPrice}</td>
                    <td className="py-2 px-4 border">{stock.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Graph */}
        <div className="w-2/5 p-9">
          <ApexChart
            options={chartData.options}
            series={chartData.series}
            type="area"
            width="100%"
            style={{
              float: "none",
              width: "100%",
              margin: "0 auto",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;