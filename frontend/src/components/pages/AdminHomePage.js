import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/adminhomepage.css'; // Import the stylesheet

const AdminHomePage = ({ user, setLoggedInUser  }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout');
            // Clear any user-related state or tokens (if using localStorage)
            console.log('Logged out successfully');
            // Redirect to login page
            setLoggedInUser(null); // Clear user state
            navigate('/adminloginpage');
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    return (
        <div className="adminhomepage-container">
            <div className='adminhomepage-header'>
                <h3>Welcome, {user.username}!</h3>
            </div>
            <div className='adminhomepage-body'>
                <p>You are logged in as an admin.</p>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className='adminhomepage-footer'>
            </div>
        </div>
    );
};

export default AdminHomePage;
