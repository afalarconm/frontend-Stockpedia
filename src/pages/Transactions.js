import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { TokenFetcher } from '../components/TokenFetcher';
import Barra from '../components/navbar';

const API_URL = 'https://api.stockpedia.me';

const TransactionTable = () => {
    const [transactions, setTransactions] = useState(null);
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = await TokenFetcher(getAccessTokenSilently);

                const apiUrl = `${API_URL}/my-transactions`;

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(apiUrl, { headers });

                setTransactions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (typeof window !== 'undefined') {
            fetchTransactions();
        }
    }, [getAccessTokenSilently]);

    if (!isAuthenticated) {
        return <div>Log in to see your transactions</div>;
    }

    // Ensure transactions is not null before mapping
    const transactionRows = transactions ? transactions.map((transaction, index) => (
        //console.log(transaction.symbol, transaction.links),
        <tr key={index} className="border-t">
            <td className="flex justify-center px-4 py-2">{transaction.datetime}</td>
            <td className="px-4 py-2">{transaction.symbol}</td>
            <td className="px-4 py-2">{transaction.quantity}</td>
            <td className="px-4 py-2">{transaction.state}</td>
            <td className="px-4 py-2">{transaction.ip}</td>
            <td className="px-4 py-2">{transaction.country_name}</td>
            <td className="flex justify-center px-4 py-2">
            {
                transaction.state === "completed" ? (
                    <button
                        onClick={() => window.open(transaction.links)} // Opens the link in a new tab when clicking the button
                        className="text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        <i className="fas fa-download pr-1"></i> Descargar Boleta
                    </button>
                ) : (
                    <span>No hay boleta</span>
                )
                
            }
            </td>
            
        </tr>
    )) : null;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Fecha</th>
                        <th className="px-4 py-2">Symbol</th>
                        <th className="px-4 py-2">Cantidad</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">IP</th>
                        <th className="px-4 py-2">País</th>
                        <th className="px-4 py-2">Boleta</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionRows}
                </tbody>
            </table>
        </div>
    );
};

const Transactions = () => {
    return (
        <div className="min-h-screen bg-blue-100">
            <Barra />
            <div className="flex justify-center">
                <div className="w-full p-8">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-4">Mis Transacciones</h2>
                        <TransactionTable />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mb-8">
                <button
                    onClick={() => window.history.back()}
                    className="text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Volver
                </button>
            </div>
        </div>
    );
}

export default Transactions;
