import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import '../css/ADM-LoginPage.css'; // Import the stylesheet

const AdminLoginPage = ({ setLoggedInUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://127.0.0.1:8000/api/login', { username, password });
          console.log('Login successful:', response.data);
          // Save user data in local storage
          localStorage.setItem('loggedInUser', JSON.stringify(response.data.user));
          // Handle successful login (e.g., store token in localStorage)
          setLoggedInUser(response.data.user); // Assuming response.data contains user details
          navigate('/adminhomepage');
        } catch (error) {
          if (error.response) {
              // Server responded with a status code outside the range of 2xx
              setError(error.response.data.message);
              console.error('Login failed:', error.response.data.message);
          } else if (error.request) {
              // Request was made but no response was received
              setError('No response from server');
              console.error('No response from server');
          } else {
              // Something else happened in making the request
              setError('Error logging in');
              console.error('Error logging in:', error.message);
          }
      }
  };

    return (
      <div className="adminloginpage-container">
        <div className='adminloginpage-header'>
          <h3>Admin Login Page</h3>
        </div>
        <div className='adminloginpage-body'>
          <div className='adminloginpage-form-section'>
            <Form className="adminloginpage-form" onSubmit={handleLogin}>
                <Form.Group className="adminloginpage-form-group"  controlId="formUsername">
                    <Form.Label className="adminloginpage-form-label">Username:</Form.Label>
                    <Form.Control
                        className="adminloginpage-form-control"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="adminloginpage-form-group" controlId="formPassword">
                    <Form.Label className="adminloginpage-form-label">Password:</Form.Label>
                    <Form.Control
                        className="adminloginpage-form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className='adminloginpage-form-btn'>
                  <Button className="adminloginpage-btn" variant="primary" type="submit">
                      Login
                  </Button>
                </Form.Group>
            </Form>
          </div>
          <div className='adminloginpage-footer'>
            <h3></h3>
          </div>
        </div>
          {/* Error handling display */}
          {error && <p className="error-message">Error: {error}</p>}
      </div>
  );
};

export default AdminLoginPage ;
