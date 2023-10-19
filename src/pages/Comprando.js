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
                const response = await axios.post(`${API_URL}/stocks/requests/validar/webpay`, { token_ws });

                // Check if the request was successful based on the response data, not just the status
                if (response.data.success) { // assuming 'success' is a boolean field in your response
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
            <div>
                <Barra />
                <div className="container">
                    <h1>Procesando pago...</h1>
                    <p>Estamos procesando tu pago. Por favor, espera un momento.</p>
                </div>
                <div className="text-center"> {/* 'class' should be 'className' */}
                    <div role="status">
                        {/*... svg component ...*/}
                        {/* The 'svg' component remains unchanged */}
                        <span className="sr-only">Loading...</span> {/* 'class' should be 'className' */}
                    </div>
                </div>
            </div>
        );
    } else if (error) { // Syntax correction: 'elif' should be 'else if' in JavaScript
        return (
            <div>
                <Barra />
                <div className="container">
                    <h1>Error</h1>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    // If there's no loading and no error, you can redirect or handle the UI as needed
    return null; // Or some other component or redirection as required
};

export default BuyingProcess;
