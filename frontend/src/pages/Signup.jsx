import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../Config";
axios.defaults.withCredentials = true;

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,12}$/;

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (passwordRegex.test(formData.password)) {
            console.log("Password is valid.");
            e.preventDefault();

            console.log("Signup Data:", formData);
            try {
                const response = await axios.post(
                    `${API_BASE_URL}/signup/`, 
                    formData,
                    { withCredentials: true }
                );
                console.log("Signup Response:", response.data);
                alert("Signup successful!");
                window.location.reload()
            } catch (error) {
                console.error("Signup Error:", error.response);
                alert("Username already exists.");
            }
        } else {
            alert("Password must contain at least 1 uppercase letter,\n1 lowercase letter,\n1 special character,\n1 Digit,\nLength be between 8 and 12 characters long.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Sign Up</h2>
            <form onSubmit={handleSubmit} className="w-50 mx-auto mt-3">
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="form-control"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="form-control"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-4">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
