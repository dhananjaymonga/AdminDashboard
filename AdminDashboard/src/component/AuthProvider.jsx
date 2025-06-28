import React, { useState, useEffect } from 'react';

// Auth Context Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check if user is already logged in on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        // Verify token with backend
        const response = await fetch('https://admin-pannel-7lg4.onrender.com/api/admin/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Token is invalid, remove it
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('https://admin-pannel-7lg4.onrender.com/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data
        localStorage.setItem('adminToken', data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return children({ 
    isAuthenticated, 
    isLoading, 
    user, 
    handleLogin, 
    handleLogout 
  });
};