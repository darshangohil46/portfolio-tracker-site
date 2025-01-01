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
axios.defaults.withCredentials = true;

const App = () => {
  const [data, setData] = useState(null);

  const getLoggedInUser = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/get-data/',
        { withCredentials: true }
      );
      console.log("User Data:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error Fetching User Data:", error);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
          </>
        } />


        <>
          <Route path="/portfolio" element={
            <>
              <Navbar />
              {data &&
                <Portfolio />
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
              <EditProfile />
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
