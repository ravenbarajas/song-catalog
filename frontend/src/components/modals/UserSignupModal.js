// UserCreationModal.js

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Importing modal components from React Bootstrap
import axios from 'axios';

const UserSignupModal = ({ show, onHide }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/api/create-user', {
                username,
                password,
                role: 'admin', // Assuming default role for user creation
            });
            console.log(response.data);
            alert('User created successfully!');
            onHide(); // Close modal after successful submission
        } catch (error) {
            console.error('Error creating user:', error.response.data.message);
            alert('Failed to create user. Please try again.');
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            as="select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Super Admin</option>
                            {/* Add other roles as needed */}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create User
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UserSignupModal;
