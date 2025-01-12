import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, Legend, ResponsiveContainer, ComposedChart, Bar } from "recharts";
import API_BASE_URL from '../Config';
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
  "IBM",
  "ORCL",
];


export default function Monthly() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchStockData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetch-data/`, {
        params: { type: "monthly" },
        withCredentials: true
      }, { timeout: 10000 });
      console.log(response.data);
      const apiData = response.data["Monthly Time Series"];
      const formattedData = Object.keys(apiData).map((date) => ({
        date,
        open: parseFloat(apiData[date]["1. open"]),
        high: parseFloat(apiData[date]["2. high"]),
        low: parseFloat(apiData[date]["3. low"]),
        close: parseFloat(apiData[date]["4. close"]),
      }));
      setData(formattedData);
    } catch (err) {
      setError("Error fetching data. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStockData()
  }, [])



  return (
    <div>
      <div className="container mt-5">
        {data && (
          <div className="mt-5">

            {/* normal chart */}
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="open" stroke="#8884d8" name="Open Price" />
                <Line type="monotone" dataKey="high" stroke="#82ca9d" name="High Price" />
                <Line type="monotone" dataKey="low" stroke="#ff7300" name="Low Price" />
                <Line type="monotone" dataKey="close" stroke="#387908" name="Close Price" />
              </LineChart>
            </ResponsiveContainer>



            {/* candle chart */}
            {/* <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart
                          data={data}
                          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
            
                          <Line
                            dataKey="high"
                            stroke="black"
                            strokeWidth={1}
                            dot={false}
                            legendType="none"
                          />
                          <Line
                            dataKey="low"
                            stroke="black"
                            strokeWidth={1}
                            dot={false}
                            legendType="none"
                          />
            
                          <Bar
                            dataKey="open"
                            fill="red"
                            barSize={10}
                            shape={(props) => {
                              const { x, y, width, height, payload } = props;
                              const isBullish = payload.close > payload.open; // Green for bullish, Red for bearish
                              return (
                                <rect
                                  x={x}
                                  y={isBullish ? y - height : y}
                                  width={width}
                                  height={Math.abs(height)}
                                  fill={isBullish ? "green" : "red"}
                                />
                              );
                            }}
                          />
                          
                        </ComposedChart>
                      </ResponsiveContainer> */}

          </div>
        )}

      </div>

    </div>
  )
}
