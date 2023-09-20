import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockDetailsPage = ({ selectedStock }) => {
    const [stockData, setStockData] = useState(null);

    console.log(selectedStock);
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get(`https://stockpedia.me/stocks/${selectedStock}`);
                setStockData(response.data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        if (typeof window !== 'undefined') {
            fetchStockData();
        }
    }, [selectedStock]);

    return (
        <div>
            <h1>{selectedStock} Details</h1>
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
    );
};

export default StockDetailsPage;