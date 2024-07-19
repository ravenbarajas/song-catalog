import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ADM-HomePage.css'; // Import the stylesheet
import AdminNavbar from './ADM-Navbar'; // Import the AdminNavbar component

import Dashboard from './ADM-Dashboard.js';
import Users from './ADM-UserManagement.js';
import Media from './ADM-MediaManagement.js';
import Reports from './ADM-Reports.js';
import Settings from './ADM-Settings.js';

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
                <p>You are logged in as an admin.</p>
                <div className='adminhomepage-header-btn'>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            <AdminNavbar />
            <div className='adminhomepage-body'>
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="media" element={<Media />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="settings" element={<Settings />} />
                </Routes>
            </div>
            <div className='adminhomepage-footer'>
            </div>
        </div>
    );
};

export default AdminHomePage;
