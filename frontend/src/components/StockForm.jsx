import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../Config';
axios.defaults.withCredentials = true;

const StockForm = () => {
    const [error, setError] = useState('');
    const [data, setData] = useState({})
    const [id, setId] = useState(null)

    const getLoggedInUser = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/get-data/`,
                { withCredentials: true }
            );
            console.log("User Data:", response.data);
            setId(response.data.id)
            setData(response.data);
        } catch (error) {
            console.error("Error Fetching User Data:", error);
        }
    };

    useEffect(() => {
        getLoggedInUser();
    }, [])

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            user: id,
        }));
    }, [id]);

    const [formData, setFormData] = useState({
        name: '',
        ticker: '',
        quantity: 0,
        buy_price: 0,
        user: id,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/manage-stock/`,
                formData,
                { withCredentials: true }
            );
            console.log("Response Data:", response.data);
            setData(response.data);
            window.location.reload()
        } catch (error) {
            setError("Error Submitting Stock Data...")
            console.error("Error Submitting Stock Data:", error.response?.data || error);
        }
    };

    return (
        <>
            <div className="container my-4">
                <h2 className="text-center mb-4">Add Stock</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Stock Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Stock Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="ticker" className="form-label">Ticker</label>
                        <input
                            type="text"
                            id="ticker"
                            name="ticker"
                            placeholder="Ticker"
                            value={formData.ticker}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="Quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="form-control"
                            min={0}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="buy_price" className="form-label">Buy Price</label>
                        <input
                            type="number"
                            id="buy_price"
                            name="buy_price"
                            placeholder="Buy Price"
                            value={formData.buy_price}
                            onChange={handleChange}
                            className="form-control"
                            min={0}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Submit
                    </button>
                </form>
            </div>

            {error && (
                <div className="alert alert-danger alert-dismissible fade show mt-4" role="alert">
                    {error}
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setError('')}
                    ></button>
                </div>
            )}

        </>
    );
};

export default StockForm;
