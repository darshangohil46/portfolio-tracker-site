import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import API_BASE_URL from '../Config';
axios.defaults.withCredentials = true;


const Navbar = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/logout/`, {}, { withCredentials: true });
            navigate("/");
            window.location.reload();
        } catch (err) {
            console.error('Error logging out:', err);
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
        getLoggedInUser();
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container"> {/* Use a regular container for better responsiveness */}
                    <Link className="navbar-brand" to="/">Portfolio Tracker</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" // Make sure this ID matches the div below
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav"> {/* Consistent ID */}
                        <ul className="navbar-nav ms-auto"> {/* Use ms-auto to push items to the right */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            {data && (
                                <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/portfolio">Portfolio</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/edit-profile">EditProfile</Link>
                                </li>
                                </>
                            )}
                            {data ? (
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={handleLogout} to="/">Logout</Link>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">Sign Up</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="bg-primary p-1"></div>
        </>
    );
};

export default Navbar;
