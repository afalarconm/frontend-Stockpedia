import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Barra from '../components/navbar';
import StockChart from '../components/StockChart';
import { TokenFetcher } from '../components/TokenFetcher';

const API_URL = 'https://api.stockpedia.me';

const StockDetailsPage = () => {
    const [stockData, setStockData] = useState(null);
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const location = useLocation();
    const { state: { selectedStock } } = location;
    const [selectedStockPrices, setSelectedStockPrices] = useState([]);
    const [ip, setIp] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [walletBalance, setWalletBalance] = useState(null);

    useEffect(() => {

        // Fetch user money
        const getCurrentUserMoney = async (getAccessTokenSilently) => {
            try {
                const token = await TokenFetcher(getAccessTokenSilently);

                const apiUrl = 'https://api.stockpedia.me/my-wallet';

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(apiUrl, { headers });

                console.log('Response from the server:', response.data);

                setWalletBalance(response.data[0].wallet);

            } catch (error) {
                console.error('Error fetching user money:', error);
            }
        }

        // Fetch IP address
        const fetchIp = async () => {
            try {
                const response = await fetch('https://api.ipify.org/?format=json');
                const data = await response.json();
                setIp(data.ip);
            } catch (error) {
                console.error('Error fetching IP:', error);
            }
        };

        // Fetch stock data
        const fetchStockData = async () => {
            try {
                const response = await axios.get(`${API_URL}/stocks/${selectedStock}`);
                handleStockData(response.data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        if (typeof window !== 'undefined') {
            fetchStockData();
            fetchIp();
            getCurrentUserMoney(getAccessTokenSilently);
        }
    }, [selectedStock, getAccessTokenSilently]);

    // Set stock data
    const handleStockData = (data) => {
        const pricesArray = data.map(item => ({
            x: new Date(item.datetime).getTime(),
            y: item.price
        }));

        setSelectedStockPrices(pricesArray);

        setStockData({
            companyName: data[0].shortname,
            currentPrice: pricesArray[pricesArray.length - 1].y,
            market: data[0].source,
            change: pricesArray[pricesArray.length - 1].y - pricesArray[0].y,
            symbol: data[0].symbol
        });
    };

    // Display alert to user
    const displayAlert = (response) => {
        console.log('Response from the server:', response);
        if (response.data === "OK") {
            alert('Compraste Stocks!');
            window.location.href = '/profile';

        } else {
            alert('Error buying stocks. Please try again later.');
            window.location.href = '/';
        }
    };

    // Handle buy stock
    const handleBuyStock = async (event) => {
        event.preventDefault();
        console.log('Quantity to buy:', quantity);
        const apiUrl = "https://api.stockpedia.me/stocks/requests";

        try {
            const token = await TokenFetcher(getAccessTokenSilently);
            const response = await axios.post(apiUrl, { symbol: stockData?.symbol, quantity: quantity, ip: ip }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log("Response from the server:", response.data);
            displayAlert(response);
        } catch (error) {
            console.error("Error buying stocks:", error);
            alert('Error buying stocks. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-blue-100 ">
            <Barra />
            <div className="flex justify-center">
                <div className="w-1/4 p-8">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-4">Stock Information</h2>
                        {stockData && (
                            <div>
                                <p>Company Name: {stockData.companyName}</p>
                                <p>Precio: {stockData.currentPrice}</p>
                                <p>Market: {stockData.market} </p>
                                <p>Change: {stockData.change}%</p>
                            </div>
                        )}
                    </div>
                    {isAuthenticated && (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 m-2 space-x-3">
                            <form onSubmit={handleBuyStock}>
                                <div className="mb-3">
                                    <div className="mb-2">
                                        <p className="block mb-2 text-m font-semibold text-gray-900 dark:text-white">Dinero en tu billetera: ${walletBalance}</p>
                                    </div>
                                    <label htmlFor="quantity" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">¿Cuantos Stocks quieres comprar?</label>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center p-2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M1 12c1.5 1.5 5.25 3 9 3s7.5-1.5 9-3m-9-1h.01M2 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1ZM14 5V3a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2h8Z"></path>
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="quantity"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="0"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />                                    </div>
                                </div>
                                <div className="mb-2">
                                    <button
                                        type="submit"
                                        className="text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                    >
                                        Comprar
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
            <div className="flex justify-center mb-8">
                <button
                    onClick={() => window.history.back()}
                    className="text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Volver
                </button>
            </div>

        </div>
    );
};

export default StockDetailsPage;
