import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Barra from '../components/navbar';

const API_URL = 'http://localhost:3000';

const BuyingProcess = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const validatePayment = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const token_ws = urlParams.get('token_ws');
                const response = await axios.post(`${API_URL}/stocks/requests/validar/webpay`, { token_ws: token_ws });

                // Check if the request was successful based on the response data, not just the status
                if (response.data.success) { 
                    alert('El pago se ha realizado con éxito.');
                    window.location.href = '/profile';
                } else {
                    // Assume the server's response message is informative
                    throw new Error(response.data.message || 'Error al procesar el pago. Inténtalo de nuevo.');
                }
            } catch (error) {
                setError(error.toString()); // Error messages are often objects, convert to string for safety
            } finally {
                setLoading(false);
            }
        };

        validatePayment();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <Barra />
                <div className="relative py-3 sm:max-w-xl mx-auto text-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Procesando pago...</h1>
                    <p className="text-gray-500">Estamos procesando tu pago. Por favor, espera un momento.</p>
                    <div className="absolute inset-0 flex items-center justify-center" role="status">
                        <svg aria-hidden="true" className="w-16 h-16 text-blue-600 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* your SVG paths */}
                        </svg>
                    </div>
                </div>
            </div>
        );
        } else if (error) {
            return (
                <div className="min-h-screen bg-blue-100">
                <Barra />
                <div className="min-h-screen bg-blue-100 py-6 flex flex-col justify-center sm:py-12">
                    <div className="px-4 py-8 sm:max-w-md mx-auto bg-white rounded-lg shadow-lg">
                        <h1 className="text-2xl font-semibold text-gray-900">Error</h1>
                        <p className="mt-2 text-gray-600">{error}</p>
                    </div>
                </div>
            </div>
            );
        }


        // If there's no loading and no error, you can redirect or handle the UI as needed
        return null; // Or some other component or redirection as required
    };

export default BuyingProcess;
