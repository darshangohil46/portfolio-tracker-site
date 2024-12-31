import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Dashboard = () => {
    const [data, setData] = useState({});

    const [metrics, setMetrics] = useState({
        totalValue: 0,
        topStock: '',
    });


    const getLoggedInUser = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8000/api/get-data/',
                { withCredentials: true }
            );
            console.log("User Data:", response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error Fetching User Data:", error);
        }
    };


    useEffect(() => {
        getLoggedInUser();
    }, []);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/metrics/');
                setMetrics(response.data); // Update state with the fetched data
            } catch (error) {
                console.error('Error fetching metrics:', error);
            }
        };

        fetchMetrics();
    }, []);

    return (
        <div className="container my-4">
            <div class="d-flex justify-content-between align-items-center">
                <div class="display-4">Portfolio</div>
                <div>
                    <span class="h5 text-info me-3">Welcome,</span>
                    <span class="h5 text-info me-3">{data.first_name}</span>
                    <span class="h5 text-info">{data.last_name}</span>
                </div>
            </div>
            <h2 className="text-center mb-4">Portfolio Metrics</h2>
            <div className="row">
                {/* Total Value */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body text-center">
                            <h3 className="card-title">Total Value</h3>
                            <p className="card-text display-6 text-success">
                                ${metrics.totalValue.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
                {/* Top Performing Stock */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body text-center">
                            <h3 className="card-title">Top Performing Stock</h3>
                            <p className="card-text display-6 text-primary">
                                {metrics.topStock || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
