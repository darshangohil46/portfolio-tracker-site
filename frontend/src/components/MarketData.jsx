import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import API_BASE_URL from '../Config';
import BuyStock from './BuyStock';
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
  "IBM"
];

function MarketData() {
  const [selectedTicker, setSelectedTicker] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const [todayData, setTodayData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [weekData, setWeekData] = useState(null);
  const [monthData, setMonthData] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleTickerChange = (event) => {
    setTodayData(null);
    setDailyData(null);
    setWeekData(null);
    setMonthData(null);
    setLoading(true)
    const selectedValue = event.target.value;
    setSelectedTicker(selectedValue);
    fetchStockData(selectedValue); // Pass the selected ticker directly
  };

  const fetchStockData = async (ticker) => {
    if (!ticker) {
      setError("Please select a stock.");
      return;
    }

    setError("");
    try {
      const response = await axios.get(`${API_BASE_URL}/send-ticker/`, {
        params: { ticker },
        withCredentials: true,
      });
      console.log(response.data);
      setData(response.data);

      fetchStockDataToday();
      fetchStockDataDaily();
      fetchStockDataWeek();
      fetchStockDataMonth();
    } catch (err) {
      setError("Error fetching data. Please try again.");
      setLoading(false)
      console.error(err);
    }
  };

  const fetchStockDataToday = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetch-data/`, {
        params: { type: "today" },
        withCredentials: true
      });
      console.log(response.data);
      const apiData = response.data["Time Series (1min)"];
      const formattedData = Object.keys(apiData).map((date) => ({
        date,
        open: parseFloat(apiData[date]["1. open"]),
        high: parseFloat(apiData[date]["2. high"]),
        low: parseFloat(apiData[date]["3. low"]),
        close: parseFloat(apiData[date]["4. close"]),
      }));
      setTodayData(formattedData);
    } catch (err) {
      setError("Error fetching data. Please try again.");
      setLoading(false)
      console.error(err);
    }
  };

  const fetchStockDataDaily = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetch-data/`, {
        params: { type: "daily" },
        withCredentials: true
      });
      console.log(response.data);
      const apiData = response.data["Time Series (Daily)"];
      const formattedData = Object.keys(apiData).map((date) => ({
        date,
        open: parseFloat(apiData[date]["1. open"]),
        high: parseFloat(apiData[date]["2. high"]),
        low: parseFloat(apiData[date]["3. low"]),
        close: parseFloat(apiData[date]["4. close"]),
      }));
      setDailyData(formattedData);
    } catch (err) {
      setError("Error fetching data. Please try again.");
      setLoading(false)
      console.error(err);
    }
  };

  const fetchStockDataWeek = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetch-data/`, {
        params: { type: "weekly" },
        withCredentials: true
      });
      console.log(response.data);
      const apiData = response.data["Weekly Time Series"];
      const formattedData = Object.keys(apiData).map((date) => ({
        date,
        open: parseFloat(apiData[date]["1. open"]),
        high: parseFloat(apiData[date]["2. high"]),
        low: parseFloat(apiData[date]["3. low"]),
        close: parseFloat(apiData[date]["4. close"]),
      }));
      setWeekData(formattedData);
    } catch (err) {
      setError("Error fetching data. Please try again.");
      setLoading(false)
      console.error(err);
    }
  };

  const fetchStockDataMonth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetch-data/`, {
        params: { type: "monthly" },
        withCredentials: true
      });
      console.log(response.data);
      const apiData = response.data["Monthly Time Series"];
      const formattedData = Object.keys(apiData).map((date) => ({
        date,
        open: parseFloat(apiData[date]["1. open"]),
        high: parseFloat(apiData[date]["2. high"]),
        low: parseFloat(apiData[date]["3. low"]),
        close: parseFloat(apiData[date]["4. close"]),
      }));
      setMonthData(formattedData);
    } catch (err) {
      setError("Error fetching data. Please try again.");
      setLoading(false)
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      {/* radio btn */}
      <div className="container">
        <h2 className="mb-4 text-center">Select a Stock</h2>
        <div className="form-group d-flex flex-wrap justify-content-center gap-4 m-3 p-3 border rounded">
          {STOCK_SYMBOLS.map((symbol) => (
            <div key={symbol} className="form-check d-flex align-items-center">
              <input
                type="radio"
                className="form-check-input me-2"
                id={`radio-${symbol}`}
                name="stockTicker"
                value={symbol}
                checked={selectedTicker === symbol}
                onChange={handleTickerChange}
              />
              <label
                className="form-check-label px-2 position-relative"
                htmlFor={`radio-${symbol}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                {symbol}
              </label>
            </div>
          ))}
        </div>
      </div>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {monthData ? (
        <>
          {todayData &&
            <BuyStock />
          }


          <>
            {data && (
              <div className="mt-5">

                <div class="container">
                  <div class="row">
                    <div class="col-md-6">
                      {/* <Today /> */}
                      {todayData &&
                        <div className="container mt-5">
                          <h3 className="text-center text-primary mb-4">Intraday Stock Performance</h3>
                          {todayData && (
                            <div className="mt-5">
                              {/* normal chart */}
                              {/* intraday */}
                              <ResponsiveContainer width="100%" height={500}>
                                <LineChart data={todayData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="date" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Line type="monotone" dataKey="open" stroke="#8884d8" name="Open Price" />
                                  <Line type="monotone" dataKey="high" stroke="#34c759" name="High Price" />
                                  <Line type="monotone" dataKey="low" stroke="#ff3b30" name="Low Price" />
                                  <Line type="monotone" dataKey="close" stroke="#387908" name="Close Price" />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          )}
                        </div>
                      }
                    </div>
                    <div class="col-md-6">
                      {/* <Daily /> */}
                      {dailyData &&
                        <div className="container mt-5">
                          <h3 className="text-center text-primary mb-4">Daily Stock Performance</h3>
                          {todayData && (
                            <div className="mt-5">
                              {/* normal chart */}
                              {/* intraday */}
                              <ResponsiveContainer width="100%" height={500}>
                                <LineChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="date" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Line type="monotone" dataKey="open" stroke="#8884d8" name="Open Price" />
                                  <Line type="monotone" dataKey="high" stroke="#34c759" name="High Price" />
                                  <Line type="monotone" dataKey="low" stroke="#ff3b30" name="Low Price" />
                                  <Line type="monotone" dataKey="close" stroke="#387908" name="Close Price" />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          )}
                        </div>
                      }
                    </div>
                  </div>
                </div>


                <div class="container">
                  <div class="row">
                    <div class="col-md-6">
                      {/* <Weekly /> */}
                      {weekData &&
                        <div className="container mt-5">
                          <h3 className="text-center text-primary mb-4">Weekly Stock Performance</h3>
                          {todayData && (
                            <div className="mt-5">
                              {/* normal chart */}
                              {/* intraday */}
                              <ResponsiveContainer width="100%" height={500}>
                                <LineChart data={weekData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="date" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Line type="monotone" dataKey="open" stroke="#8884d8" name="Open Price" />
                                  <Line type="monotone" dataKey="high" stroke="#34c759" name="High Price" />
                                  <Line type="monotone" dataKey="low" stroke="#ff3b30" name="Low Price" />
                                  <Line type="monotone" dataKey="close" stroke="#387908" name="Close Price" />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          )}
                        </div>
                      }
                    </div>
                    <div class="col-md-6">
                      {/* <Monthly /> */}
                      {monthData &&
                        <div className="container mt-5">
                          <h3 className="text-center text-primary mb-4">Monthly Stock Performance</h3>
                          {todayData && (
                            <div className="mt-5">
                              {/* normal chart */}
                              {/* intraday */}
                              <ResponsiveContainer width="100%" height={500}>
                                <LineChart data={monthData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="date" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Line type="monotone" dataKey="open" stroke="#8884d8" name="Open Price" />
                                  <Line type="monotone" dataKey="high" stroke="#34c759" name="High Price" />
                                  <Line type="monotone" dataKey="low" stroke="#ff3b30" name="Low Price" />
                                  <Line type="monotone" dataKey="close" stroke="#387908" name="Close Price" />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          )}
                        </div>
                      }
                    </div>
                  </div>
                </div>

              </div>
            )}
          </>
        </>

      ) : (
        <>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <span className="text-muted">Please! Select any Stock.</span>
            </div>
          )}

        </>
      )}


    </div>
  );
}

export default MarketData;
