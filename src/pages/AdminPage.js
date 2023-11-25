import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Barra from '../components/navbar';
import Footer from '../components/footer';
import { TokenFetcher } from '../components/TokenFetcher';

const API_URL = 'https://api.stockpedia.me/';

function AdminDashboard() {
    const [tableData, setTableData] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [webpayToken, setWebpayToken] = useState(null);
    const [webpayURL, setWebpayURL] = useState(null);
    const { getAccessTokenSilently } = useAuth0();

    // Fetch stock data from API
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get(`${API_URL}stocks`);
                const formattedData = response.data.map(item => ({
                    symbol: item.symbol,
                    companyName: item.shortname,
                    currentPrice: item.price,
                    currency: item.currency,
                    source: item.source,
                    datetime: item.datetime,
                    quantity: 0, // Initialize quantity for each stock
                }));
                setTableData(formattedData);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchStockData();
    }, []);

    // Handle buy button click
    const handleBuyClick = async (stock) => {
        setSelectedStock(stock);
        // You can add additional logic here if needed
    };

    // Handle buy stock with WebPay
    const handleBuyStock = async () => {
        if (!selectedStock) {
            alert('Please select a stock to buy.');
            return;
        }

        console.log('Buying stock:', selectedStock.symbol, 'Quantity:', selectedStock.quantity);
        const apiUrl = `${API_URL}stocks/requests`;

        try {
            const token = await TokenFetcher(getAccessTokenSilently);
            const response = await axios.post(apiUrl, {
                stockSymbol: selectedStock.symbol,
                quantity: selectedStock.quantity,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            setWebpayToken(response.data.token);
            setWebpayURL(response.data.url);

            console.log("Response from the server with WebPay data:", response.data);
        } catch (error) {
            console.error("Error buying stocks:", error);
            alert('Ocurrio un error al comprar Stocks, por favor revisa la cantidad ingresada.');
        }
    };

    return (
        <div className="min-h-screen bg-white-100">
            <Barra />
            <main className="col-span-12 md:col-span-7">
                <div className="m-5 bg-white border-gray-200 rounded-md shadow-md p-4 ">
                    <h1 className="text-2xl font-bold mb-4">Bienvenido Administrador</h1>
                    <p className="text-gray-600">A continuación estan las funciones disponibles</p>

                    <div className='flex my-5'>
                        <div className='flex-col w-1/2 h-1/2 px-4 mr-2 border-gray-200 rounded-lg shadow-md'>
                            <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
                            {/* User management functionality can be added here */}
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
                                                    value={stock.quantity}
                                                    onChange={(event) => {
                                                        const updatedTableData = tableData.map(item =>
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
            <Footer />
        </div>
    );
}

export default AdminDashboard;
