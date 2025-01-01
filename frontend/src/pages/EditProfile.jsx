import { useState, useEffect } from 'react';
import axios from 'axios';
import "./../App.css";

const EditProfile = () => {
    const [data, setData] = useState({});
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
    });

    // Fetch user data
    const getLoggedInUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/get-data/', {
                withCredentials: true,
            });
            console.log("User Data:", response.data);
            setData(response.data);

            setFormData({
                first_name: response.data.first_name || '',
                last_name: response.data.last_name || '',
                email: response.data.email || '',
                username: response.data.username || '',
                password: '',
            });
        } catch (error) {
            console.error("Error Fetching User Data:", error);
        }
    };

    useEffect(() => {
        getLoggedInUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8000/api/update-profile/',
                formData,
                { withCredentials: true }
            );
            console.log('Profile Updated:', response.data);
            alert("Password Change Sucessfully. Now, Login with new Password.")
            window.location.reload()
        } catch (error) {
            alert("This Username already Exists. Please! select another username")
            console.error('Error Updating Profile:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded bg-light">
            <h2 className="text-center mb-4 text-info">Edit Profile</h2>

            <div className="form-group mb-3">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input
                    type="text"
                    id="first_name"
                    className="form-control"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your first name"
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input
                    type="text"
                    id="last_name"
                    className="form-control"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your last name"
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                    type="text"
                    id="username"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    placeholder="Choose a username"
                />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                />
            </div>

            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
        </form>
    );
};

export default EditProfile;
