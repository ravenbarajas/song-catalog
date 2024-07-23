import React from 'react';
import { Link, Routes, Route, useNavigate, Navigate  } from 'react-router-dom';
import axios from 'axios';
import '../css/ADM-HomePage.css'; // Import the stylesheet
import AdminNavbar from './ADM-Navbar'; // Import the AdminNavbar component

import Dashboard from './ADM-Dashboard.js';
import Users from './ADM-UserManagement.js';
import Media from './ADM-MediaManagement.js';
import Reports from './ADM-Reports.js';
import Settings from './ADM-Settings.js';


// Import Media Management subpages
import General from './subpages/ADM-MediaManagement/ADM-MM-General';
import Categories from './subpages/ADM-MediaManagement/ADM-MM-Categories';
import Analytics from './subpages/ADM-MediaManagement/ADM-MM-Analytics';
import Moderation from './subpages/ADM-MediaManagement/ADM-MM-Moderation';
import MediaSettings from './subpages/ADM-MediaManagement/ADM-MM-Settings';

const AdminHomePage = ({ user, setLoggedInUser  }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout');
            // Clear any user-related state or tokens (if using localStorage)
            console.log('Logged out successfully');
             // Clear local storage
             localStorage.removeItem('loggedInUser');
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
                    <Route path="media" element={<Media />}>
                        <Route index element={<General />} />
                        <Route path="General" element={<General />} />
                        <Route path="Categories" element={<Categories />} />
                        <Route path="Analytics" element={<Analytics />} />
                        <Route path="Moderation" element={<Moderation />} />
                        <Route path="Settings" element={<MediaSettings />} />
                    </Route>
                    <Route path="reports" element={<Reports />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="/" element={<Navigate to="dashboard" />} />
                </Routes>
            </div>
            <div className='adminhomepage-footer'>
            </div>
        </div>
    );
};

export default AdminHomePage;
