import React from 'react';
import Barra from '../components/navbar';
import Footer from '../components/footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { TokenFetcher } from '../components/TokenFetcher';


const API_URL = 'https://api.stockpedia.me/';

function AdminDashboard() {
    const [selectedStock, setSelectedStock] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [webpayToken, setWebpayToken] = useState(null);
    const [getAccessTokenSilently] = useAuth0();
    const [webpayURL, setWebpayURL] = useState(null);

    // Fetch stock data from API
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get(`${API_URL}/stocks`);
                const data = response.data;
                console.log('Stock data:', data);

                // setTableData(formattedData);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        if (typeof window !== 'undefined') {
            fetchStockData();
        }
    }, []);

    // Handle buy button click
    const handleBuyClick = (symbol) => {
        setSelectedStock(symbol);
    };

    // Handle buy stock with WebPay
    const handleBuyStock = async (event) => {

        const symbol = selectedStock;

        console.log('Quantity to buy:', quantity);
        const apiUrl = `${API_URL}/stocks/requests`;

        // Le pedimos al api el token y la url para redirigir a webpay
        try {

            const token = await TokenFetcher(getAccessTokenSilently);
            const response = await axios.post(apiUrl, { }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            // The server response includes a token and a redirect URL to Webpay
            // set the webpay_token state to the token received from the server
            setWebpayToken(response.data.token);
            setWebpayURL(response.data.url);

            console.log("Response from the server with WebPay data:", response.data);

            // displayAlert(response);
        } catch (error) {
            console.error("Error buying stocks:", error);
            alert('Ocurrio un error al comprar Stocks, por favor revisa la cantidad ingresada.');
        }
    };


    return (
        <div className="min-h-screen bg-white-100">
            {/* Navigation bar */}
            <Barra />


            {/* Main content */}
            <main className="col-span-12 md:col-span-7">
                <div className="m-5 bg-white border-gray-200 rounded-md shadow-md p-4 ">
                    <h1 className="text-2xl font-bold mb-4">Bienvenido Administrador</h1>
                    <p className="text-gray-600">A continuación estan las funciones disponibles</p>

                    <div className='flex my-5'>
                        <div className='flex-col w-1/2 h-1/2 px-4 mr-2 border-gray-200 rounded-lg shadow-md'>
                            <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
                        </div>
                        <div className='flex-col w-1/2 h-1/2 px-4 ml-2 border-gray-200 rounded-lg shadow-md'>
                            <h2 className="text-2xl font-bold mb-4">Acciones</h2>
                            <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white-200">
                                    <th className="py-2 px-4 border">📈 Stock</th>
                                    <th className="py-2 px-4 border">💲Precio actual</th>
                                    <th className="py-2 px-4 border">💱 Moneda</th>
                                    <th className="py-2 px-4 border">Cantidad a Comprar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((stock, index) => (
                                    <tr key={index} className="bg-white-100">
                                        <td className="flex justify-center py-2 px-4 border">{stock.symbol}</td>
                                        <td className="flex justify-center py-2 px-4 border">$ {stock.currentPrice}</td>
                                        <td className="py-2 px-4 border">{stock.currency}</td>
                                        <td className="flex justify-center py-2 px-4 border">
                                            <input
                                                className="border border-gray-400 w-24 px-2 py-1"
                                                type="number"
                                                value={stock.quantity} // Adjusted to use a unique state for each stock
                                                onChange={(event) => {
                                                    // Handle quantity change for each stock
                                                    const updatedTableData = tableData.map((item) =>
                                                        item.symbol === stock.symbol
                                                            ? { ...item, quantity: event.target.value }
                                                            : item
                                                    );
                                                    setTableData(updatedTableData);
                                                }}
                                            />
                                            <button
                                                className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
                                                onClick={() => handleBuyClick(stock)}
                                            >
                                                Comprar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default AdminDashboard;
