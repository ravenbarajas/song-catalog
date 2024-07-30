import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ADM-Navbar.css'; // Make sure to import your stylesheet

const AdminNavbar = () => {
    return (
        <div className='admin-navbar'>
            <div className='admin-navbar-container'>
                <div className='admin-navbar-btn'>
                    <Link to="/adminhomepage/dashboard">
                        <i class="fa fa-pie-chart" aria-hidden="true"></i>
                    </Link>
                </div>
                <div className='admin-navbar-btn'>
                    <Link to="/adminhomepage/users">
                        <i class="fa fa-users" aria-hidden="true"></i>
                    </Link>
                </div>
                <div className='admin-navbar-btn'>
                    <Link to="/adminhomepage/media">
                        <i class="fa fa-music" aria-hidden="true"></i>
                    </Link>
                </div>
                <div className='admin-navbar-btn'>
                    <Link to="/adminhomepage/reports">
                        <i class="fa fa-file-text" aria-hidden="true"></i>
                    </Link>
                </div>
                <div className='admin-navbar-btn'>
                    <Link to="/adminhomepage/settings">
                        <i class="fa fa-cog" aria-hidden="true"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
