import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTags, FaChartBar, FaEdit, FaCog } from 'react-icons/fa'; // Import icons
import '../css/ADM-MediaManagement.css'; // Import the stylesheet

const AdminMediaManagement = () => {

    return (
        <div className="adm-mediamgmt-container">
            <div className='adm-mediamgmt-header'>
                <h3>Media Management</h3>
            </div>
            <div className='adm-mediamgmt-navbar'>
                <div className='adm-mediamgmt-navbar-btn'>
                    <Link to='/subpages/ADM-MediaManagement/General'>
                        <FaHome /> General
                    </Link>
                </div>
                <div className='adm-mediamgmt-navbar-btn'>
                    <Link to='/subpages/ADM-MediaManagement/Categories'>
                        <FaTags /> Categories & Tags
                    </Link>
                </div>
                <div className='adm-mediamgmt-navbar-btn'>
                    <Link to='/subpages/ADM-MediaManagement/Analytics'>
                        <FaChartBar /> Analytics & Insights
                    </Link>
                </div>
                <div className='adm-mediamgmt-navbar-btn'>
                    <Link to='/subpages/ADM-MediaManagement/Moderation'>
                        <FaEdit /> Content Moderation
                    </Link>
                </div>
                <div className='adm-mediamgmt-navbar-btn'>
                    <Link to='/subpages/ADM-MediaManagement/Settings'>
                        <FaCog /> Settings & Backup
                    </Link>
                </div>
            </div>
            <div className='adm-mediamgmt-body'>

            </div>
            <div className='adm-mediamgmt-footer'>
            </div>
        </div>
    );
};

export default AdminMediaManagement;
