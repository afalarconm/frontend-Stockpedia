import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import axios from 'axios';

const StockDetailsPage = ({ selectedStock, router }) => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`/api/stock/${selectedStock}`);
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

export default withRouter(StockDetailsPage);