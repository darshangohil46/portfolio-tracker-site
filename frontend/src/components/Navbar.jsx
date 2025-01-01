import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
axios.defaults.withCredentials = true;

const Navbar = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout/', {}, { withCredentials: true });
            navigate("/");
            window.location.reload();
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

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
    }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Portfolio Tracker</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        {data && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/portfolio">
                                    Portfolio
                                </Link>
                            </li>
                        )}
                    </ul>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {data ? (
                            <li className="nav-item">
                                <Link onClick={handleLogout} className="nav-link">
                                    Logout
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
