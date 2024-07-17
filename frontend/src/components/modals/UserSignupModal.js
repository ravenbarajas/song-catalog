import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../css/UserSignupModal.css'; // Import your custom stylesheet for modal styling

const UserSignupModal = ({ show, onHide }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/api/create-user', {
                username,
                password,
                role,
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
        <Modal show={show} onHide={onHide} centered>
            <div className="usersignup-modal">
                <div className="usersignup-header">
                    <div className='usersignup-header-title'>
                        <h2>Create User</h2>
                    </div>
                    <div className='usersignup-header-close'>
                        <Button variant="link" onClick={onHide}>
                            <i className="fa-regular fa-circle-xmark"></i>
                        </Button>
                    </div>
                </div>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
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
                        <Form.Group controlId="formRole">
                            <Form.Label>Role:</Form.Label>
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
                        <div className='usersignup-form-action'>
                            <Button variant="primary" type="submit">
                                Create User
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default UserSignupModal;
