import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginPage from './components/pages/ADM-LoginPage';
import AdminHomePage from './components/pages/ADM-HomePage';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/adminloginpage"
                        element={<AdminLoginPage setLoggedInUser={setLoggedInUser} />}
                    />
                    <Route
                        path="/adminhomepage/*"
                        element={
                            loggedInUser ? (
                                <AdminHomePage user={loggedInUser} setLoggedInUser={setLoggedInUser} />
                            ) : (
                                <Navigate to="/adminloginpage" />
                            )
                        }
                    />
                    <Route path="/" element={<Navigate to="/adminloginpage" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
