import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ADM-MediaManagement.css'; // Import the stylesheet

const AdminMediaManagement = () => {

    return (
        <div className="adm-mediamngmt-container">
            <div className='adm-mediamngmt-header'>
                <h3>Media Management</h3>
            </div>
            <div className='adm-mediamngmt-navbar'>
                <div className='adm-mediamngmt-tbl-section'>

                </div>
                <div className='adm-mediamngmt-cntrl-section'>
                    
                </div>
            </div>
            <div className='adm-mediamngmt-body'>

            </div>
            <div className='adm-mediamngmt-footer'>
            </div>
        </div>
    );
};

export default AdminMediaManagement;
