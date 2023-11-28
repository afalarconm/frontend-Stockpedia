import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

const API_URL = 'http://localhost:3000'; //https://api.stockpedia.me';

const OffersPage = () => {
    const [offers, setOffers] = useState([]);
    const [selectedOferta, setSelectedOferta] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedOferta) {
            navigate('/offer-details', { state: { selectedOferta } });
        }
    }, [selectedOferta, navigate]);

    // Handle stock selection
    const handleRowClick = (offer) => {
        setSelectedOferta(offer);
    };
    
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const api_url = `${API_URL}/auctions/all-offers`;
                const response = await axios.get(api_url);
                setOffers(response.data);
            } catch (error) {
                console.error('Error fetching offers:', error);
            }
        };

        fetchOffers();
    }, []);

    return (
        <div className="min-h-screen bg-blue-100">
            {/* Navbar */}
            <Navbar />

            {/* Content */}
            <div className="flex justify-center p-8">
                {/* Offers Table */}
                <div className="w-full">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-200">
                                    <th className="py-2 px-4 border">N</th>
                                    <th className="py-2 px-4 border">Auction ID</th>
                                    <th className="py-2 px-4 border">Stock ID</th>
                                    <th className="py-2 px-4 border">Quantity</th>
                                    <th className="py-2 px-4 border">Group ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {offers.map((offer, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? 'bg-blue-100' : 'bg-white'
                                            } hover:bg-blue-400 ${selectedOferta === offer.auction_id ? 'bg-blue-300' : ''
                                            }`}
                                        onClick={() => handleRowClick(offer)}
                                    >
                                        <td className="py-2 px-4 border">{offer.id}</td>
                                        <td className="py-2 px-4 border">{offer.auction_id}</td>
                                        <td className="py-2 px-4 border">{offer.stock_id}</td>
                                        <td className="py-2 px-4 border">{offer.quantity}</td>
                                        <td className="py-2 px-4 border">{offer.group_id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default OffersPage;
