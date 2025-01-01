import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
axios.defaults.withCredentials = true;

const Home = () => {
    const [data, setData] = useState({})

    const getLoggedInUser = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8000/api/get-data/',
                { withCredentials: true }
            );
            setData(response.data);
        } catch (error) {
            console.error("Error Fetching User Data:", error);
        }
    };

    useEffect(() => {
        getLoggedInUser();
    }, [])

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-80 text-center py-5">
            <h1 className="display-4">Welcome to Portfolio Tracker</h1>
            <p className="lead mb-4 w-75">
                Easily manage your stock portfolio and track performance in real-time.
            </p>

            <Link to="/portfolio" className="btn btn-primary btn-lg m-2">
                Get Started
            </Link>
        </div>
    );
};

export default Home;
