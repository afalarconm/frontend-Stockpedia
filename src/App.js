import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import 'tailwindcss/tailwind.css';
import StockDetailsPage from './pages/StockDetailsPage';
import Trading from './pages/trading';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        < Route path = '/tradiando' element={<Trading />} />
        <Route path='/stock-details' element={<StockDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;