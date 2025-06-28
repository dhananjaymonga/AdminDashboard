import React from 'react';
import AdminLogin from '../Admin/AdLogin';
import Layout from './Layout';

// Protected Route Component - Updated to include Layout
const ProtectedRoute = ({ children, isAuthenticated, user, onLogout }) => {
  if (!isAuthenticated) {
    return <AdminLogin />;
  }
  
  return (
    <Layout user={user} onLogout={onLogout}>
      {children}
    </Layout>
  );
};

export default ProtectedRoute;