/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { TokenFetcher } from '../components/TokenFetcher';
import Barra from '../components/navbar';
import PredictionChart from '../components/PredictionChart';

const API_URL = 'http://localhost:3000';

const PredictionTable = ({onOpenChart, prediction}) => {
    const [predictions, setPredictions] = useState(null);
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [selectedStock] = useState(null);


    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const token = await TokenFetcher(getAccessTokenSilently);

                const apiUrl = `${API_URL}/my-predictions`;

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(apiUrl, { headers });

                setPredictions(response.data);
            } catch (error) {
                console.error(error);
            }
        };



        if (typeof window !== 'undefined') {
            fetchPredictions();
        }
    }, [selectedStock, getAccessTokenSilently]);

    if (!isAuthenticated) {
        return <div>Log in to see your predictions</div>;
    }

    // Ensure transactions is not null before mapping
    const transactionRows = predictions ? predictions.map((prediction, index) => (
        <tr key={index} className="border-t">
            <td className="px-4 py-2">{prediction.job_id}</td>
            <td className="px-4 py-2">{prediction.symbol}</td>
            <td className="px-4 py-2">{prediction.quantity}</td>
            <td className="px-4 py-2">{prediction.datetime}</td>
            <td className="px-4 py-2">{prediction.prediction_time}</td>
            <td className="px-4 py-2">{prediction.original_price}</td>
            <td className="px-4 py-2">{prediction.prediction}</td>
            <td className="px-4 py-2">{prediction.original_price * prediction.quantity}</td>
            <td className="px-4 py-2">{prediction.expected_gain}</td>
            <td className="px-4 py-2">{prediction.state}</td>
            <td className="px-4 py-2"><button className="text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  
            onClick={() => onOpenChart(prediction)}
            >
                Ver Gráfico
                </button>
            </td>
        </tr>
    )) : null;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Id</th>
                        <th className="px-4 py-2">Symbol</th>
                        <th className="px-4 py-2">Cantidad prevista</th>
                        <th className="px-4 py-2">Fecha de predicción</th>
                        <th className="px-4 py-2">Tiempo futuro</th>
                        <th className="px-4 py-2">Precio Unitario Original</th>
                        <th className="px-4 py-2">Precio Unitario Esperado</th>
                        <th className="px-4 py-2">Costo Total de Transacción</th>
                        <th className="px-4 py-2">Ganancia Total Esperada</th>
                        <th className="px-4 py-2">Estado</th>
                        <th className="px-4 py-2">Gráfico</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionRows}
                </tbody>
            </table>
        </div>
    );
};

const Predictions = () => {
    const [selectedStockPrices, setSelectedStockPrices] = useState(null);
    const [selectedPrediction, setSelectedPrediction] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);

    const handleOpenChart = (prediction) => {
        setSelectedPrediction(prediction);
        setSelectedStock(prediction.symbol);
      };

    const handleStockData = async (stockData) => {
        const pricesArray = stockData.map(item => ({
            x: new Date(item.datetime).getTime(),
            y: item.price
        }));

        setSelectedStockPrices(pricesArray);
    };

    

    useEffect(() => {
        // Fetch stock data
        const fetchStockData = async () => {
        try {
            const response = await axios.get(`${API_URL}/stocks/${selectedStock}`);
            handleStockData(response.data);
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    };

        if (selectedStock) {
            fetchStockData();
        }
    }
        , [selectedStock]);

    

    return (
        <div className="min-h-screen bg-blue-100">
            <Barra />
            <div className="flex justify-center">
                <div className="w-full p-8">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-4">Mis Predicciones</h2>
                        <PredictionTable onOpenChart={handleOpenChart}/>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
            <div className="w-full m-4">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <div style={{ width: '100%', margin: '0 auto' }}>
                            <h2 className="text-xl font-semibold mb-4">Gráfico de predicción</h2>
                            {selectedStockPrices && selectedPrediction ? (
                            <PredictionChart  pricesArray={selectedStockPrices} prediction={selectedPrediction} />
                                ) : (
                            <p>Selecciona una predicción para ver el gráfico.</p>
                                )}
                        </div>
                    </div>
                </div>
                </div>
        </div>
    );
}

export default Predictions;
