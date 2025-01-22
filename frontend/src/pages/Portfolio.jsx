import React, { useState } from 'react';
import StockList from '../components/StockList';
import axios from 'axios';
import MarketData from '../components/MarketData';
axios.defaults.withCredentials = true;

const Portfolio = () => {
    return (
        <div className="container mt-4 mb-4">
            {/* <Dashboard /> */}
            {/* <StockForm /> */}
            <StockList />
            <MarketData />
        </div>
    );
};


export default Portfolio;
