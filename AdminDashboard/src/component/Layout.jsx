import React from 'react';
import Header from './Header';
import Navbar from './Navbar';

// Layout Component - wraps all authenticated pages
const Layout = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      <Navbar />
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;