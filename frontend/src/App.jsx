import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import NotFound from './pages/NotFound';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import axios from 'axios';
import EditProfile from './pages/EditProfile';
import API_BASE_URL from './Config';
import Footer from './components/Footer';
axios.defaults.withCredentials = true;

const App = () => {
  const [serverStatus, setServerStatus] = useState("loading");
  const [data, setData] = useState(null);

  const getLoggedInUser = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/get-data/`,
        { withCredentials: true }
      );
      console.log("User Data:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error Fetching User Data:", error);
    }
  };

  // Check backend connection


  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/health-check`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setServerStatus("connected");
        } else {
          setServerStatus("error");
        }
      })
      .catch((error) => {
        console.error("Error connecting to the backend:", error);
        setServerStatus("error");
      });

    getLoggedInUser();
  }, []);


  if (serverStatus === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-grow text-primary" role="status">
        </div>
      </div>
    );
  }

  if (serverStatus == "error") {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <h1 className="display-4 text-danger">Internal Server Not Connected</h1>
        <p className="lead">We are unable to connect to the backend server. Please try again later.</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />

        <>
          <Route path="/portfolio" element={
            <>
              <Navbar />
              {data &&
                <>
                  <Portfolio />
                  <Footer />
                </>
              }
              {!data &&
                <Login />}
            </>
          } />
        </>

        <Route path="/edit-profile" element={
          <>
            <Navbar />
            {data &&
              <>
                <EditProfile />
                <Footer />
              </>
            }
            {!data &&
              <Login />}
          </>
        } />

        <Route path="/login" element={
          <>
            <Navbar />
            {data ? (
              <Home />
            ) : (
              <Login />
            )}
          </>
        } />
        <Route path="/signup" element={
          <>
            <Navbar />
            {data ? (
              <Home />
            ) : (
              <Signup />
            )}
          </>
        } />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}
export default App;
