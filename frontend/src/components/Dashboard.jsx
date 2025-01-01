import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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


    const handleEditProfile = () => {
        navigate('/edit-profile'); // Replace with your route for editing profile
    };


    return (
        <div className="container my-4">
            <div className="row align-items-start">
                <div className="col-12 m-2">
                    <div className="display-4">Portfolio</div>
                </div>
                <div className="col-12 m-2">
                    <div className="text-info">
                        <span className="h5">Welcome, </span>
                        <span className="h5 me-2">{data.first_name}</span>
                        <span className="h5 me-2">{data.last_name}</span>
                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditProfile()}
                        >
                            <i className="bi bi-pencil-square"></i>
                        </button>
                    </div>
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
