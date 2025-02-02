import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../Config';
axios.defaults.withCredentials = true;

const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});

    const [metrics, setMetrics] = useState({
        totalValue: 0,
        topStock: '',
    });


    const getLoggedInUser = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/get-data/`,
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
                const response = await axios.get(`${API_BASE_URL}/metrics/`);
                setMetrics(response.data); // Update state with the fetched data
            } catch (error) {
                console.error('Error fetching metrics:', error);
            }
        };

        fetchMetrics();
    }, []);


    const handleEditProfile = () => {
        navigate('/edit-profile'); // Replace with your route for editing profile
    };


    return (
        <div className="container my-4">
            <h3 className="text-center mb-4 text-primary">Portfolio Metrics</h3>
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
