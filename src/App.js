import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import 'tailwindcss/tailwind.css';
import StockDetailsPage from './pages/StockDetailsPage';
import Profile from './pages/Profile';
import Transactions from './pages/Transactions';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        < Route path = '/profile' element={<Profile />} />
        <Route path='/stock-details' element={<StockDetailsPage />} />
        <Route path='/transactions' element={<Transactions />} />

        
      </Routes>
    </Router>
  );
};

export default App;