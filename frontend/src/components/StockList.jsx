import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;


const StockList = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [editedStock, setEditedStock] = useState({});

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/stocks/", {
                    withCredentials: true,
                });
                console.log(response.data);
                setStocks(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch stock data.");
                setLoading(false);
            }
        };
        fetchStocks();
    }, []);

    const handleEdit = (stock) => {
        setSelectedStock(stock);
        setEditedStock(stock); // Initialize with the current stock details
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedStock({ ...editedStock, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/stocks/${selectedStock.id}/`,
                editedStock,
                { withCredentials: true }
            );
            setStocks((prevStocks) =>
                prevStocks.map((stock) =>
                    stock.id === selectedStock.id ? response.data : stock
                )
            );
            setIsModalOpen(false);
            window.location.reload()
        } catch (err) {
            console.error("Failed to update stock:", err);
        }
    };

    const handleDeleteClick = async (stockId) => {
        const reply = window.confirm("Are you sure to delete Stock?")
        if (reply) {
            try {
                await axios.delete(`http://localhost:8000/api/stocks/${stockId}/`, {
                    withCredentials: true,
                });
                setStocks(stocks.filter((stock) => stock.id !== stockId));
                window.location.reload()
            } catch (error) {
                console.error("Error deleting stock:", error);
            }
        }
    };


    if (loading) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center my-4" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Stock Holdings</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Ticker</th>
                            <th>Quantity</th>
                            <th>Buy Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.length > 0 ? (
                            stocks.map((stock) => (
                                <tr key={stock.id}>
                                    <td>{stock.name}</td>
                                    <td>{stock.ticker}</td>
                                    <td>{stock.quantity}</td>
                                    <td>$ {stock.buy_price}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                            onClick={() => handleEdit(stock)}
                                        >
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteClick(stock.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">
                                    No stocks available. Add some to start tracking!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Stock</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsModalOpen(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={editedStock.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Ticker</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ticker"
                                        value={editedStock.ticker}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="quantity"
                                        value={editedStock.quantity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Buy Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="buy_price"
                                        value={editedStock.buy_price}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSave}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockList;

