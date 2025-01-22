import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../Config';
axios.defaults.withCredentials = true;

export default function BuyStock() {
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState("");

    const [stockName, setStockName] = useState(null);
    const [ticker, setTicker] = useState(null);

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

    const fetchStockDataNow = async () => {
        let response;
        let response2;
        try {
            response = await axios.get(`${API_BASE_URL}/fetch-data/`, {
                params: { type: "current" },
                withCredentials: true
            });
            console.log(response.data);
            const apiData = response.data["Global Quote"];
            console.log(apiData);
            setTicker(response.data["Global Quote"]["01. symbol"])
            // setStockName(response.data["Global Quote"]["01. symbol"])
            setStockData(apiData);
            try {
                response2 = await axios.get(`${API_BASE_URL}/fetch-data/`, {
                    params: { type: "get_name" },
                    withCredentials: true
                });
                console.log(response2.data);
                setStockName(response2.data.bestMatches[0]["2. name"] || []);  // Assuming the response has a "bestMatches" array
            } catch (err) {
                setStockName(response.data["Global Quote"]["01. symbol"]);
                console.error(err);
            }
        } catch (err) {
            // setError("Error fetching data. Please try again.");
            console.error(err);
        }


    };

    useEffect(() => {
        getLoggedInUser()
        fetchStockDataNow();
        // fetchStcokName(ticker);
    }, []);

    // Modal state and form data
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(null);

    const toggleModal = () => setShowModal(!showModal);

    const handleFormSubmit = async (e) => {
        const formData = {
            "buy_price": price,
            "name": stockName,
            "quantity": quantity,
            "ticker": ticker,
            "user": id
        }
        e.preventDefault();
        setShowModal(false);
        console.log('====================================');
        console.log(formData);
        console.log('====================================');
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
        <div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {/* Current stock data */}
            {stockData && (
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card shadow-lg border-primary">
                                <div className="card-header bg-primary text-white">
                                    <h4 className="card-title">{stockData["01. symbol"]} Stock Detail</h4>
                                </div>
                                <div className="card-body">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Attribute</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><strong>Open Price</strong></td>
                                                <td>${stockData["02. open"]}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>High Price</strong></td>
                                                <td>${stockData["03. high"]}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Low Price</strong></td>
                                                <td>${stockData["04. low"]}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Current Price</strong></td>
                                                <td>${stockData["05. price"]}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Volume</strong></td>
                                                <td>{stockData["06. volume"]}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Latest Trading Day</strong></td>
                                                <td>{stockData["07. latest trading day"]}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Previous Close</strong></td>
                                                <td>${stockData["08. previous close"]}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Change</strong></td>
                                                <td>${stockData["09. change"]}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Change Percent</strong></td>
                                                <td>{stockData["10. change percent"]}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className="btn btn-warning mt-3 w-100" onClick={toggleModal}>
                                        Buy Stock
                                    </button>
                                </div>
                                <div className="card-footer text-muted">
                                    <small>Data as of {stockData["07. latest trading day"]}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Stock Purchase */}
            <div
                className={`modal fade ${showModal ? "show d-block" : ""}`}
                tabIndex="-1"
                aria-labelledby="buyModalLabel"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="buyModalLabel">
                                Buy {stockName}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={toggleModal}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="stockName" className="form-label">
                                        Stock Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="stockName"
                                        value={stockName}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ticker" className="form-label">
                                        Ticker
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ticker"
                                        value={ticker}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="quantity" className="form-label">
                                        Quantity
                                    </label>
                                    <input
                                        type='number'
                                        className="form-control"
                                        id="quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        required
                                        min={1}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">
                                        Price
                                    </label>
                                    <input
                                        className="form-control"
                                        id="price"
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                        min={0}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Submit Purchase
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
