import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginPage from './components/pages/ADM-LoginPage';
import AdminHomePage from './components/pages/ADM-HomePage';
import AdminMediaManagement from './components/pages/ADM-MediaManagement';

import General from './components/pages/subpages/ADM-MediaManagement/ADM-MM-General';
import Categories from './components/pages/subpages/ADM-MediaManagement/ADM-MM-Categories';
import Analytics from './components/pages/subpages/ADM-MediaManagement/ADM-MM-Analytics';
import Moderation from './components/pages/subpages/ADM-MediaManagement/ADM-MM-Moderation';
import Settings from './components/pages/subpages/ADM-MediaManagement/ADM-MM-Settings';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
      // Check local storage for logged-in user data
      const user = localStorage.getItem('loggedInUser');
      if (user) {
          setLoggedInUser(JSON.parse(user));
      }
  }, []);

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
                    >
                        <Route path="media-management" element={<AdminMediaManagement />}>
                            <Route index element={<General />} />
                            <Route path="General" element={<General />} />
                            <Route path="Categories" element={<Categories />} />
                            <Route path="Analytics" element={<Analytics />} />
                            <Route path="Moderation" element={<Moderation />} />
                            <Route path="Settings" element={<Settings />} />
                        </Route>
                    </Route>
                    <Route path="/" element={<Navigate to="/adminloginpage" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
