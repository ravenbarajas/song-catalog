import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AdminLoginPage from './components/pages/AdminLoginPage';
import AdminHomePage from './components/pages/AdminHomePage';
import axios from 'axios'; // Import axios for making HTTP requests

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost/api/login', { username, password });
      console.log(response.data); // Log the response for debugging
      setIsAuthenticated(true); // Set authenticated state to true upon successful login
      setError(''); // Clear any previous errors
    } catch (error) {
      setError(error.response.data.message); // Set error message received from server
      setIsAuthenticated(false); // Ensure authenticated state is false on login failure
    }
  };

  return (
    <div className="App">
      <main className="App-main">
        {isAuthenticated ? <AdminHomePage /> : <AdminLoginPage handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} error={error} />}
      </main>
    </div>
  );
}

export default App;
