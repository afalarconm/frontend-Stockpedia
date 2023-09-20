import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import StockDetailsPage from './StockDetailsPage';

const App = () => {
  // Check if the code is running in a browser environment
  const isBrowser = typeof window !== 'undefined';

  // Use BrowserRouter only in the browser environment
  const Router = isBrowser ? require('react-router-dom').BrowserRouter : require('react-router-dom').HashRouter;

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/stock-details' element={<StockDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;