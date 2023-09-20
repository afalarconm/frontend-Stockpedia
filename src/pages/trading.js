import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import ApexChart from 'react-apexcharts';

import Barra from '../components/navbar';


const Trading = () => {
    const [stocksData, setStocksData] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [stockData, setStockData] = useState(null);
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
            symbol: 'Logged out',
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
            {/* Navbar */}
            <Barra />

            {/* Content */}
            <div className="flex-1 flex justify-center ">
                {/* Stocks Table */}
                <div className="w-1/2 p-8">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
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
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-blue-100' : 'bg-white'
                                        } hover:bg-blue-400 ${selectedStock === stock.symbol ? 'bg-blue-300' : ''
                                        }`} onClick={() => handleRowClick(stock.symbol)}>
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
                <div className="w-1/2 p-8">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-4">Stock Price</h2>
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
        </div>
    );
};

export default Trading