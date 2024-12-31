import React, { useState } from 'react';
import StockForm from '../components/StockForm';
import StockList from '../components/StockList';
import Dashboard from '../components/Dashboard';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Portfolio = () => {
    const [stocks, setStocks] = useState([]);
    const [metrics, setMetrics] = useState({ totalValue: 0, topStock: '' });

    const addStock = (newStock) => {
        const updatedStocks = [...stocks, { ...newStock, id: Date.now() }];
        setStocks(updatedStocks);
        updateMetrics(updatedStocks);
    };

    const editStock = (updatedStock) => {
        const updatedStocks = stocks.map((stock) =>
            stock.id === updatedStock.id ? updatedStock : stock
        );
        setStocks(updatedStocks);
        updateMetrics(updatedStocks);
    };

    const deleteStock = (id) => {
        const updatedStocks = stocks.filter((stock) => stock.id !== id);
        setStocks(updatedStocks);
        updateMetrics(updatedStocks);
    };

    const updateMetrics = (stocks) => {
        const totalValue = stocks.reduce((acc, stock) => acc + stock.quantity * stock.buyPrice, 0);
        const topStock =
            stocks.length > 0
                ? stocks.reduce((max, stock) =>
                    stock.quantity * stock.buyPrice > max.quantity * max.buyPrice ? stock : max
                ).name
                : 'N/A';

        setMetrics({ totalValue, topStock });
    };

    return (
        <div className="container mt-4"> {/* Bootstrap container */}
            <h1 className="text-center mb-4">Portfolio</h1> {/* Bootstrap heading styles */}
            <Dashboard metrics={metrics} />
            <StockForm onSubmit={addStock} />
            <StockList
                stocks={stocks}
                onEdit={editStock}
                onDelete={deleteStock}
            />
        </div>
    );
};


export default Portfolio;
