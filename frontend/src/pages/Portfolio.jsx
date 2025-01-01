import React, { useState } from 'react';
import StockForm from '../components/StockForm';
import StockList from '../components/StockList';
import Dashboard from '../components/Dashboard';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Portfolio = () => {
    const [metrics, setMetrics] = useState({ totalValue: 0, topStock: '' });

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
        <div className="container mt-4">
            <Dashboard />
            <StockForm />
            <StockList />
        </div>
    );
};


export default Portfolio;
