import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import UserSignupModal from '../modals/UserSignupModal'; // Adjust the path as needed

const AdminLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost/api/login', { username, password });
            console.log(response.data);
            // Handle successful login (e.g., store token in localStorage)
        } catch (error) {
            setError(error.response.data.message);
            console.error('Login failed:', error.response.data.message);
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

            <UserSignupModal show={showModal} onHide={handleHideModal} />
        </div>
    );
};

export default AdminLoginPage ;
