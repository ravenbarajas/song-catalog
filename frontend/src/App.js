import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; // Import Button from React Bootstrap
import UserSignupModal from './components/modals/UserSignupModal';
import AdminLoginPage from './components/pages/AdminLoginPage';
import AdminHomePage from './components/pages/AdminHomePage';

import './App.css';

function App() {
  return (
    <div className="App">
      <AdminLoginPage/>
    </div>
  );
}

export default App;
