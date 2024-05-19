// App.jsx
import './App.css';
import { Link, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { HomePage } from './components/HomePage.jsx';
import { AnimalComponent } from './components/AnimalComponent.jsx';
import LoginPage from './components/LoginPage.jsx';
import React, { useState, useEffect } from 'react';
import Sun from './components/sun.jsx';
import Moon from './components/moon.jsx';

function App() {
    const [userTheme, setUserTheme] = useState(localStorage.getItem('user-theme') || 'dark');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
        if (token) {
            navigate('/encyclopedia/');
        } else {
            navigate('/encyclopedia/login');
        }
    }, [navigate]);

    document.documentElement.className = userTheme;

    const setTheme = (theme) => {
        localStorage.setItem('user-theme', theme);
        setUserTheme(theme);
        document.documentElement.className = theme;
    };

    const toggleTheme = () => {
        const activeTheme = localStorage.getItem('user-theme');
        if (activeTheme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        navigate('/encyclopedia/login'); // Redirect to login page
    };

    return (
        <div>
            <header className="header-container">
                <div className="theme" onClick={toggleTheme}>
                    {userTheme === 'light' ? <Sun /> : <Moon />}
                </div>
                {isAuthenticated && (
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </header>
            <main>
                <Link to="/encyclopedia/">
                    <h1>Encyclopedia</h1>
                </Link>
                <Routes>
                    <Route path="/encyclopedia/login" element={<LoginPage />} />
                    <Route
                        path="/encyclopedia/*"
                        element={isAuthenticated ? <HomePage /> : <Navigate to="/encyclopedia/login" />}
                    />
                    <Route
                        path="/encyclopedia/animal/:name"
                        element={isAuthenticated ? <AnimalComponent /> : <Navigate to="/encyclopedia/login" />}
                    />
                    <Route path="*" element={<Navigate to="/encyclopedia/login" />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
