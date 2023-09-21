import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Barra from '../components/navbar';
import StockChart from '../components/StockChart';

const API_URL = 'https://vicentethomas.me/stocks/';

const StockDetailsPage = () => {
    const [stockData, setStockData] = useState(null);
    const { isAuthenticated } = useAuth0();
    const location = useLocation();
    const { state: { selectedStock } } = location;
    const [selectedStockPrices, setSelectedStockPrices] = useState([]);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get(`${API_URL}${selectedStock}`);
                handleStockData(response.data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        if (typeof window !== 'undefined') {
            fetchStockData();
        }
    }, [selectedStock]);

    const handleStockData = (data) => {
        const pricesArray = data.map(item => ({
            x: new Date(item.datetime).getTime(),
            y: item.price
        }));

        setSelectedStockPrices(pricesArray);

        setStockData({
            companyName: data[0].symbol,
            currentPrice: pricesArray[pricesArray.length - 1].y,
            change: pricesArray[pricesArray.length - 1].y - pricesArray[0].y,
            volume: pricesArray.reduce((total, price) => total + price.y, 0),
            marketCap: pricesArray[pricesArray.length - 1].y * pricesArray.reduce((total, price) => total + price.y, 0)
        });
    };

    const handleBuyStock = (event) => {
        event.preventDefault();
        console.log('Stock purchase logic goes here');
    };

    return (
        <div className="min-h-screen bg-blue-100">
            <Barra />
            <div className="flex justify-center">
                <div className="w-1/2 p-8">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-4">Stock Information</h2>
                        {stockData && (
                            <div>
                                <p>Company Name: {stockData.companyName}</p>
                                <p>Current Price: {stockData.currentPrice}</p>
                                <p>Change: {stockData.change}</p>
                                <p>Volume: {stockData.volume}</p>
                                <p>Market Cap: {stockData.marketCap}</p>
                            </div>
                        )}
                    </div>
                    {isAuthenticated && (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 m-3 space-x-3">
                            <form onSubmit={handleBuyStock}>
                                <div className="mb-6">
                                    <label htmlFor="quantity" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">¿Cuantos Stocks quieres comprar?</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center p-2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M1 12c1.5 1.5 5.25 3 9 3s7.5-1.5 9-3m-9-1h.01M2 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1ZM14 5V3a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2h8Z"></path>
                                            </svg>
                                        </div>
                                        <input type="text" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1"></input>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <button type="submit" className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-base px-4 py-1.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2">
                                        Check out with Apple Pay
                                        <svg className="w-4 h-4 ml-1 -mr-0.5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                            <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
                <div className="w-1/2 p-8">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-4">Stock Price</h2>
                        <div style={{ width: '100%', margin: '0 auto' }}>
                            <StockChart pricesArray={selectedStockPrices} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockDetailsPage;