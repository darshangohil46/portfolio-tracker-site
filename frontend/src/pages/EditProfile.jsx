import { useState, useEffect } from 'react';
import axios from 'axios';
import "./../App.css";
import API_BASE_URL from '../Config';

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
            const response = await axios.get(`${API_BASE_URL}/get-data/`, {
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
        const updatedData = {};

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,12}$/;

        if ((formData.password) || (formData.first_name) || (formData.last_name) || (formData.email) || (formData.username)) {
            if (formData.first_name !== data.first_name) updatedData.first_name = formData.first_name;
            if (formData.last_name !== data.last_name) updatedData.last_name = formData.last_name;
            if (formData.email !== data.email) updatedData.email = formData.email;
            if (formData.username !== data.username) updatedData.username = formData.username;
            if (formData.password && (passwordRegex.test(formData.password))) {
                updatedData.password = formData.password;
            }
            // else if (!passwordRegex.test(formData.password)) {
            //     alert("Password must contain\nat least 1 uppercase letter,\n1 lowercase letter,\n1 special character,\nLength be between 8 and 12 characters long.");
            //     return;
            // }

            try {
                const response = await axios.post(
                    `${API_BASE_URL}/update-profile/`,
                    updatedData,
                    { withCredentials: true }
                );
                console.log('Profile Updated:', response.data);
                if (formData.password) {
                    alert("Password change successfully. Please! Login Again...")
                }
                else if (Object.keys(updatedData).length === 0) {
                    alert("First chanage data")
                }
                else {
                    console.log('====================================');
                    console.log(formData);
                    console.log(updatedData);
                    console.log('====================================');
                    alert("Change Successfully.");
                }
                console.log(updatedData);
                window.location.reload();
            } catch (error) {
                alert("This Username already Exists. Please select another username");
                console.error('Error Updating Profile:', error);
            }
        } else {
            alert("Password must contain at least 1 uppercase letter,\n1 lowercase letter,\n1 special character,\nLength be between 8 and 12 characters long.");
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
                />
            </div>

            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
        </form>
    );
};

export default EditProfile;
