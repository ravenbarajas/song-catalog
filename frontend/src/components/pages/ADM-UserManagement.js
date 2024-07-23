import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ADM-UserManagement.css'; // Import the stylesheet

const AdminUserManagement = () => {

    return (
        <div className="adm-usermgmt-container">
            <div className='adm-usermgmt-header'>
                <h3>User Management</h3>
            </div>
            <div className='adm-usermgmt-navbar'>
                
            </div>
            <div className='adm-usermgmt-body'>
                <div className='adm-usermgmt-tbl-section'>

                </div>
                <div className='adm-usermgmt-ctrl-section'>
                    
                </div>
            </div>
            <div className='adm-usermgmt-footer'>
            </div>
        </div>
    );
};

export default AdminUserManagement;
