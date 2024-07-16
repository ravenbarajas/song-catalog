import React, { useState } from 'react';
import axios from 'axios';

const AdminLoginPage  = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost/api/login', { username, password });
            console.log(response.data);
            // Handle successful login (e.g., store token in localStorage)
        } catch (error) {
            console.error('Login failed:', error.response.data.message);
        }
    };

    return (
        <div>
          <h3>Admin Login Page</h3>
          <form onSubmit={handleLogin}>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      );
    };

export default AdminLoginPage ;
