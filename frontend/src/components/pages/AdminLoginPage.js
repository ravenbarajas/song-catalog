import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import UserSignupModal from '../modals/UserSignupModal'; // Adjust the path as needed

const AdminLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:8000/api/login', { username, password });
          console.log('Login successful:', response.data);
          // Handle successful login (e.g., store token in localStorage)
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

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    return (
      <div className="admin-login-page">
          <h3>Admin Login Page</h3>
          <Form onSubmit={handleLogin}>
              <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                  />
              </Form.Group>
              <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
              </Form.Group>
              <Button variant="primary" type="submit">
                  Login
              </Button>
              <Button variant="secondary" onClick={handleShowModal}>
                  Create User
              </Button>
          </Form>

          {/* Error handling display */}
          {error && <p className="error-message">Error: {error}</p>}

          <UserSignupModal show={showModal} onHide={handleHideModal} />
      </div>
  );
};

export default AdminLoginPage ;
