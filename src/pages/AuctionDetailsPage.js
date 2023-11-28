import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Barra from '../components/navbar';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000'; //https://api.stockpedia.me';

const AuctionDetailsPage = () => {
    const location = useLocation();
    const { selectedOferta } = location.state || {};
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [permissions, setPermissions] = useState([]);
    const [auctionDetails, setAuctionDetails] = useState(null);
    const [stockSymbol, setStockSymbol] = useState('');
    const [quantity, setQuantity] = useState('');
    const [proposalStatuses, setProposalStatuses] = useState([]);
    const [isAnyProposalAccepted, setIsAnyProposalAccepted] = useState(false);
    const navigate = useNavigate();

    

    const handleCreateProposal = async (e) => {
        e.preventDefault();
        console.log("Creating proposal with stock:", stockSymbol, "and quantity:", quantity);

        try {
            const response = await axios.post(`${API_URL}/auctions/create-proposal`, {
                auction_id: selectedOferta.auction_id, // Assuming selectedOferta contains auction_id
                stock_id: stockSymbol,
                quantity: quantity
            });
            console.log('Response from server:', response.data);
            // Additional logic after creating the proposal
            navigate('/subastas');
        } catch (error) {
            console.error('Error creating proposal:', error);
        }
    };


    useEffect(() => {
        const fetchProposalStatuses = async () => {
            if (isAuthenticated && selectedOferta) {
                try {
                    const token = await getAccessTokenSilently();
                    const headers = { Authorization: `Bearer ${token}` };
                    const response = await axios.get(`${API_URL}/auctions/${selectedOferta.auction_id}/proposals`, { headers });
                    
                    setProposalStatuses(response.data);
                    const acceptedProposal = response.data.find(proposal => proposal.status === 'acceptance');
                    setIsAnyProposalAccepted(!!acceptedProposal);
                    console.log("Proposal statuses:", response.data);
                } catch (error) {
                    console.error('Error fetching proposal statuses:', error);
                }
            }
        };

        fetchProposalStatuses();
    }, [isAuthenticated, selectedOferta, getAccessTokenSilently]);

    useEffect(() => {
        const fetchPermissions = async () => {
            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently();
                    const decoded = jwtDecode(token);
                    setPermissions(decoded.permissions || []);
                } catch (error) {
                    console.error('Error fetching permissions:', error);
                }
            }
        };

        fetchPermissions();
    }, [isAuthenticated, getAccessTokenSilently]);

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            if (isAuthenticated && selectedOferta) {
                try {
                    const token = await getAccessTokenSilently();
                    const headers = { Authorization: `Bearer ${token}` };
                    const response = await axios.get(`${API_URL}/auctions/all-proposals`, {
                        headers,
                        params: { auction_id: selectedOferta.auction_id } // Assuming selectedOferta contains auction_id
                    });
                    
                    setAuctionDetails(response.data);
                    console.log("/auctions/all-proposals", response.data);
                } catch (error) {
                    console.error('Error fetching auction details:', error);
                }
            }
        };
    
        fetchAuctionDetails();
    }, [isAuthenticated, selectedOferta, getAccessTokenSilently]);
    

    const handleAccept = async (proposalId) => {
        console.log("Accepted proposal:", proposalId);
        try {
            const response = await axios.post(`${API_URL}/auctions/create-response`, {
                proposal_id: proposalId,
                type: 'acceptance'
            });
            console.log('Response from server:', response.data);
            navigate('/subastas');
        } catch (error) {
            console.error('Error accepting proposal:', error);
        }
    };

    const handleReject = async (proposalId) => {
        console.log("Rejected proposal:", proposalId);
        try {
            const response = await axios.post(`${API_URL}/auctions/create-response`, {
                proposal_id: proposalId,
                type: 'rejection'
            });
            console.log('Response from server:', response.data);
            navigate('/subastas');
        } catch (error) {
            console.error('Error rejecting proposal:', error);
        }
    };

    const canViewAuctionDetails = permissions.includes("buy:stocks");

    return (
        <div>
            <Barra />
            {canViewAuctionDetails ? (
                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-2">🔨 Auction Information</h2>
                    <div>
                            <p className="font-semibold">Auction ID: <span className="font-normal">{selectedOferta.auction_id}</span></p>
                            <p className="font-semibold">Group ID: <span className="font-normal">{selectedOferta.group_id}</span></p>
                            <p className="font-semibold">Stock Symbol: <span className="font-normal">{selectedOferta.stock_id}</span></p>
                            <p className="font-semibold">Cantidad: <span className="font-normal">{selectedOferta.quantity}</span></p>
                    </div>
                    {selectedOferta.group_id !== 127 && (
                        <form onSubmit={handleCreateProposal}>
                            <div className="mb-3">
                                <label htmlFor="stockSymbol" className="block mb-2 text-base font-semibold text-gray-900">Stock Symbol</label>
                                <input
                                    type="text"
                                    id="stockSymbol"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                    placeholder="Enter stock symbol"
                                    value={stockSymbol}
                                    onChange={(e) => setStockSymbol(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantity" className="block mb-2 text-base font-semibold text-gray-900">Quantity</label>
                                <input
                                    type="text"
                                    id="quantity"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                    placeholder="0"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <button
                                    type="submit"
                                    className="flex items-center justify-center w-full px-4 py-3 rounded-md bg-green-500 text-white font-semibold text-sm hover:bg-green-600 focus:outline-none focus:bg-green-600"
                                >
                                    Create Offer
                                </button>
                            </div>
                        </form>
                    )}
                    {auctionDetails && auctionDetails.length > 0 ? (
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Proposal ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Stock ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Group ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {auctionDetails.map((offer, index) => {
                                    const proposalStatus = proposalStatuses.find(status => status.proposal_id === offer.proposal_id);
                                    return (
                                        <tr
                                            key={index}
                                            className={`${index % 2 === 0 ? 'bg-blue-100' : 'bg-white'
                                                } hover:bg-blue-400 ${selectedOferta === offer.auction_id ? 'bg-blue-300' : ''
                                                }`}
                                        >
                                            <td className="py-2 px-4 border">{offer.proposal_id}</td>
                                            <td className="py-2 px-4 border">{offer.stock_id}</td>
                                            <td className="py-2 px-4 border">{offer.quantity}</td>
                                            <td className="py-2 px-4 border">{offer.group_id}</td>
                                            <td className="py-2 px-4 border">
                                                {proposalStatus ? proposalStatus.status : 'Pending'}
                                            </td>
                                            <td className="py-2 px-4 border">
                                            {!isAnyProposalAccepted && selectedOferta.group_id === 27 && (
                                                <>
                                                    <button onClick={() => handleAccept(offer.proposal_id)} className="text-green-600 hover:text-green-900">
                                                        Accept
                                                    </button>
                                                    <button onClick={() => handleReject(offer.proposal_id)} className="text-red-600 hover:text-red-900 ml-4">
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-600">No proposals available for this auction.</p>
                    )}
                </div>
            ) : (
                <p>You do not have permission to view auction details.</p>
            )}
        </div>
    );
};

export default AuctionDetailsPage;
