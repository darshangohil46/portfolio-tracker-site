import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import API_BASE_URL from '../Config';
import Dashboard from '../components/Dashboard';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

const STOCK_SYMBOLS = [
    "AAPL",
    "MSFT",
    "GOOG",
    "AMZN",
    "TSLA",
    "NFLX",
    "META",
    "NVDA",
    "ORCL",
    "IBM",
];

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [metrics, setMetrics] = useState({
        totalValue: 0,
        topStock: '',
    });

    const handleEditProfile = () => {
        navigate('/edit-profile'); // Replace with your route for editing profile
    };

    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStockData = async () => {
        let response;
        try {
            const promises = STOCK_SYMBOLS.map(async (symbol) => {
                response = await axios.get(`${API_BASE_URL}/fetch-data/`, {
                    params: { type: "current", symbol: symbol },
                    withCredentials: true,
                });

                if (response.data["Information"] || response.data["Note"]) {
                    setError(response.data["Information"] || response.data["Note"])
                    throw new Error(response.data["Information"] || response.data["Note"]);
                }

                const apiData = response.data["Global Quote"];
                return {
                    symbol: apiData["01. symbol"],
                    price: parseFloat(apiData["05. price"]).toFixed(2),
                    change: parseFloat(apiData["09. change"]).toFixed(2),
                    percentChange: parseFloat(apiData["10. change percent"]).toFixed(2),
                };
            });

            const results = await Promise.all(promises);
            setStocks(results);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching stock data:", response.data["Information"]);
            setError(response.data["Information"]);
            setLoading(false);
        }
    };

    const getLoggedInUser = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/get-data/`,
                { withCredentials: true }
            );
            setData(response.data);
        } catch (error) {
            console.error("Error Fetching User Data:", error);
        }
    };


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

        getLoggedInUser();
        fetchStockData();

        // Refresh data every 30 seconds
        const interval = setInterval(fetchStockData, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center py-5">

            {/* User Information Section */}
            {data && (
                <section className="mb-5 text-start">
                    <h2 className="mb-3">Hello, {data.first_name} {data.last_name}! <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditProfile()}
                    >
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    </h2>
                    <p className="mb-1"><strong>Email:</strong> {data.email}</p>

                </section>
            )}

            {/* Hero Section */}
            <section className="text-center">
                <h1 className="display-4 text-primary mb-3">Welcome to Portfolio Tracker</h1>
                <p className="lead mb-4 w-75 mx-auto">
                    Track and manage your investments with ease. Monitor real-time performance, gain insights, and make informed decisions.
                </p>
                {/* Dashboard Section */}
                {data && (
                    <section className="mt-5 w-100">

                        {/* user dashboard */}
                        <div className="container my-4">
                            <h3 className="text-center mb-4 text-primary">{data.first_name}'s Portfolio Metrics</h3>
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

                    </section>
                )}
                <Link to="/portfolio" className="btn btn-primary btn-lg m-2">
                    Get Started
                </Link>
            </section>

            <div className="container">
                <h3 className="text-center m-4 text-info">Market Today</h3>

                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                ) : (
                    <div className="row g-4">
                        {stocks.map((stock) => (
                            <div className="col-md-6 col-lg-3" key={stock.symbol}>
                                <div
                                    className={`card shadow-sm ${stock.change >= 0 ? "border-success" : "border-danger"
                                        }`}
                                >
                                    <div
                                        className={`card-header text-white ${stock.change >= 0 ? "bg-success" : "bg-danger"
                                            }`}
                                    >
                                        <h5 className="card-title m-0">{stock.symbol}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">
                                            <strong>Price:</strong> ${stock.price}
                                        </p>
                                        <p className="card-text">
                                            <strong>Change:</strong> {stock.change} (
                                            <span>{stock.percentChange}%</span>)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Benefits Section */}
            <section className="mt-5 w-75">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Real-Time Insights</h5>
                                <p className="card-text text-secondary">
                                    Stay updated with live performance tracking of your portfolio.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Custom Analytics</h5>
                                <p className="card-text text-secondary">
                                    Leverage powerful analytics to make better investment decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Secure & Reliable</h5>
                                <p className="card-text text-secondary">
                                    Your data is safe with industry-standard security protocols.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
