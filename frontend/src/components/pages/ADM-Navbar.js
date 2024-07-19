import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ADM-Navbar.css'; // Make sure to import your stylesheet

const AdminNavbar = () => {
    return (
        <div className='admin-navbar'>
            <div className='admin-navbar-container'>
                <div className='admin-navbar-btn'>
                    <Link to="/adminhomepage/dashboard"><p>Dashboard</p></Link>
                </div>
                <div className='admin-navbar-btn'>
                    <Link to="/adminhomepage/users"><p>Users</p></Link>
                </div>
                <div className='admin-navbar-btn'>
                    <Link to="/adminhomepage/media"><p>Media</p></Link>
                </div>
                <div className='admin-navbar-btn'>
                    <Link to="/adminhomepage/reports"><p>Reports</p></Link>
                </div>
                <div className='admin-navbar-btn btn-5'>
                    <Link to="/adminhomepage/settings"><p>Settings</p></Link>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
