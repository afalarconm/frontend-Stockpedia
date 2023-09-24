import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

import Barra from '../components/navbar';

const API_URL = 'https://api.stockpedia.me/stocks/';


const LandingPage = () => {
    const [selectedStock, setSelectedStock] = useState(null);
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedStock) {
            navigate('/stock-details', { state: { selectedStock: selectedStock } });
        }
    }, [selectedStock, navigate]);

    // Handle stock selection
    const handleRowClick = (symbol) => {
        setSelectedStock(symbol);
    };

    // Get the stock table data from the API
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get(API_URL);
                const formattedData = response.data.map(item => ({
                    symbol: item.symbol,
                    companyName: item.shortname,
                    currentPrice: item.price,
                    currency: item.currency,
                    source: item.source,
                    datetime: item.datetime,
                }));
                setTableData(formattedData);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        if (typeof window !== 'undefined') {
            fetchStockData();
        }
    }, []);

    
    return (
        <div className="min-h-screen bg-blue-100">
            {/* Navbar */}
            <Barra />

            {/* Content */}
            <div className="flex justify-center p-8">
                {/* Stocks Table */}
                <div className="w-full">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-4">Stock Information</h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-200">
                                    <th className="py-2 px-4 border">Symbol</th>
                                    <th className="py-2 px-4 border">Company Name</th>
                                    <th className="py-2 px-4 border">Current Price</th>
                                    <th className="py-2 px-4 border">Currency</th>
                                    <th className="py-2 px-4 border">Market</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((stock, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? 'bg-blue-100' : 'bg-white'
                                        } hover:bg-blue-400 ${selectedStock === stock.symbol ? 'bg-blue-300' : ''
                                        }`}
                                        onClick={() => handleRowClick(stock.symbol)}
                                    >
                                        <td className="py-2 px-4 border">{stock.symbol}</td>
                                        <td className="py-2 px-4 border">{stock.companyName}</td>
                                        <td className="py-2 px-4 border">{stock.currentPrice}</td>
                                        <td className="py-2 px-4 border">{stock.currency}</td>
                                        <td className="py-2 px-4 border">{stock.source}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
