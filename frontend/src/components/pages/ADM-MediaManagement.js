import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FaHome, FaTags, FaChartBar, FaEdit, FaCog } from 'react-icons/fa'; // Import icons
import '../css/ADM-MediaManagement.css'; // Import the stylesheet

const AdminMediaManagement = () => {
    const location = useLocation();

    return (
        <div className="adm-mediamgmt-container">
            <div className='adm-mediamgmt-header'>
                <h3>Media Management</h3>
            </div>
            <div className='adm-mediamgmt-navbar'>
                <div className='adm-mediamgmt-navbar-btn'>
                    <Link to="General">
                        <p>General</p>
                    </Link>
                </div>
                <div className='adm-mediamgmt-navbar-btn'>
                    <Link to="Categories">
                        <p>Categories</p>
                    </Link>
                </div>
                <div className='adm-mediamgmt-navbar-btn'>
                    <Link to="Analytics">
                        <p>Analytics</p>
                    </Link>
                </div>
                <div className='adm-mediamgmt-navbar-btn'>
                    <Link to="Moderation">
                        <p>Moderation</p>
                    </Link>
                </div>
                <div className='adm-mediamgmt-navbar-btn'>
                    <Link to="Settings">
                        <p>Settings</p>
                    </Link>
                </div>
            </div>
            <div className='adm-mediamgmt-body'>
                <Outlet />
            </div>
            <div className='adm-mediamgmt-footer'>
            </div>
        </div>
    );
};

export default AdminMediaManagement;
