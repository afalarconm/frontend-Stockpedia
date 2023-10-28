/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Barra from '../components/navbar';
import StockChart from '../components/StockChart';
import { TokenFetcher } from '../components/TokenFetcher';

// Import PNG assets from components folder
import WebpayLogo from '../components/2.WebpayPlus_FN_80px.png';

const API_URL = 'http://localhost:3000';

const StockDetailsPage = () => {
    const [stockData, setStockData] = useState(null);
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const location = useLocation();
    const { state: { selectedStock } } = location;
    const [selectedStockPrices, setSelectedStockPrices] = useState([]);
    const [ip, setIp] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [time, setTime] = useState('');
    const [walletBalance, setWalletBalance] = useState(null);
    const [webpay_token, setWebpayToken] = useState(null);
    const [webpay_url, setWebpayURL] = useState(null);
    const [isJobmasterRunning, setIsJobmasterRunning] = useState(false);

    useEffect(() => {

        // Fetch user money
        const getCurrentUserMoney = async (getAccessTokenSilently) => {
            try {
                const token = await TokenFetcher(getAccessTokenSilently);

                const apiUrl = `${API_URL}/my-wallet`;

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

    // Handle buy stock with Webpay
    const handleBuyStock = async (event) => {
        event.preventDefault();
        console.log('Quantity to buy:', quantity);
        const apiUrl = `${API_URL}/stocks/requests`;

        // Le pedimos al api el token y la url para redirigir a webpay
        try {
            const token = await TokenFetcher(getAccessTokenSilently);
            const response = await axios.post(apiUrl, { symbol: stockData?.symbol, quantity: quantity, ip: ip }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            // The server response includes a token and a redirect URL to Webpay
            // set the webpay_token state to the token received from the server
            setWebpayToken(response.data.token);
            setWebpayURL(response.data.url);

            console.log("Response from the server with WebPay data:", response.data);

            // displayAlert(response);
        } catch (error) {
            console.error("Error buying stocks:", error);
            alert('Ocurrio un error al comprar Stocks, por favor revisa la cantidad ingresada.');
        }
    };

    // Handle predict stock
    const handlePredictStock = async (event) => {
        event.preventDefault();
        console.log('Quantity to predict:', quantity);
        console.log('Stock symbol:', stockData?.symbol);
        console.log("Time: ", time);
        const apiUrl = `${API_URL}/predict`;

        // Le pedimos al api el token
        try {
            const token = await TokenFetcher(getAccessTokenSilently);
            const response = await axios.post(apiUrl, { symbol: stockData?.symbol, quantity: quantity, time: time }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log("Response from the server with data:", response.data);
            alert("La consulta de predicción está siendo calculada. Para ver el estado y futuro resultado, revisa tu perfil!");

        } catch (error) {
            console.error("Error predicting stocks:", error);
            alert('Ocurrio un error al predecir Stocks, por favor revisa la cantidad ingresada.');
        }
    };

    const submitForm = () => {
        const form = document.getElementById('autoSubmitForm');
        if (form) {
            form.submit();
        }
    };
    
    useEffect(() => {
        if (webpay_token && webpay_url) {
            submitForm();
        }
    }, [webpay_token, webpay_url]);

    useEffect(() => {
        axios.get(`${API_URL}/heartbeat`)
          .then(() => setIsJobmasterRunning(true))
          .catch(() => setIsJobmasterRunning(false));
      }, []);

    return (
        <div className="min-h-screen bg-blue-100 ">
            <Barra />
            <div className="flex justify-center">
                <div className="w-1/4 m-3 mt-7 space-y-3">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-2">📈 Stock Information</h2>
                        {stockData && (
                            <div>
                                <p className="font-semibold">Nombre de la empresa: <span className="font-normal">{stockData.companyName}</span></p>
                                <p className="font-semibold">Precio: <span className="font-normal">{stockData.currentPrice}</span></p>
                                <p className="font-semibold">Mercado: <span className="font-normal">{stockData.market}</span></p>
                                <p className="font-semibold">Ultimo cambio: <span className="font-normal">{stockData.change}%</span></p>
                            </div>
                        )}
                    </div>
                    {isAuthenticated && (
                        <>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                            <form onSubmit={handleBuyStock}>
                                <div className="mb-3">
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
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="0"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />                                    </div>
                                </div>
                                <div className="mb-2">
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center w-full px-4 py-3 rounded-md bg-green-500 text-white font-semibold text-sm hover:bg-green-600 focus:outline-none focus:bg-green-600"
                                    >
                                        Pagar con
                                        <img src={WebpayLogo} alt="Webpay" className="w-auto mr-2 ml-1" />
                                    </button>
                                </div>
                            </form>

                        </div>

                        {/* Sección predecir precio */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                            {/*Heartbeat jobmaster service*/}
                        <form onSubmit={handlePredictStock}>
                                <div className="mb-3">
                                    <label htmlFor="quantity" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Predice el precio de stocks</label>
                                    

                                    {isJobmasterRunning ? (
                                    <div className="flex justify-center">
                                        <div className="flex justify-between items-center space-x-2">
                                        <svg className="animate-pulse w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path d="M12 8v4l4 2"></path> </svg>
                                        <p className="text-sm text-gray-500">Jobmaster service is working</p>
                                        </div>
                                    </div>
                                    ) : (
                                    <div className="flex justify-center">
                                        <div className="flex justify-between items-center space-x-2">
                                        <svg className="animate-pulse w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path d="M12 8v4l4 2"></path> </svg>
                                        <p className="text-sm text-gray-500">Jobmaster service is not working</p>
                                        </div>
                                    </div>
                                    )}

                                    <label htmlFor="quantity" className="block mb-2 text-base font-semibold text-gray-500 dark:text-white">1. Ingresa cantidad de stocks a predecir</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center p-2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M1 12c1.5 1.5 5.25 3 9 3s7.5-1.5 9-3m-9-1h.01M2 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1ZM14 5V3a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2h8Z"></path>
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="quantity"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="0"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />                                    </div>
                                    
                                    <label htmlFor="quantity" className="block mb-2 text-base font-semibold text-gray-500 dark:text-white">2. Ingresa cantidad de días a futuro a predecir</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center p-2 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16"> <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/> <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/> </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="quantity"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="0"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                        />                                    </div>
                                </div>
                                <div className="mb-2">
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center w-full px-4 py-3 rounded-md bg-green-500 text-white font-semibold text-sm hover:bg-green-600 focus:outline-none focus:bg-green-600"
                                    >
                                        Predecir precio
                                    </button>
                                </div>
                            </form>
                        </div>

                        </>


                    )}
                </div>
                <div className="w-1/2 m-3">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
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

            {/* Auto-submit form for Webpay redirection */}
            {webpay_token && webpay_url && (
                <div>
                    <form id="autoSubmitForm" action={webpay_url} method="POST" target="_self">
                        <input type="hidden" name="token_ws" value={webpay_token} />
                        <input type="submit" style={{ display: 'none' }} />
                    </form>

                </div>
            )}


        </div>
    );
};

export default StockDetailsPage;


