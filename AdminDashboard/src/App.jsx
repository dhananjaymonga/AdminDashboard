import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, FileText, BookOpen, Clock, Brain, ChevronDown, Bell, Search } from 'lucide-react';

import AdminPannel from "./Admin/Admin";
import AdminNotes from "./Admin/AdminNotes";
import AdminBlog from "./Admin/AdminBlog";
import PageHistory from "./Admin/History";
import AdminQuiz from "./Admin/AdminQuiz";
import AdminLogin from './Admin/AdLogin';

// Header Component
const Header = ({ user, onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side - Notifications and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm text-gray-800">New blog post published</p>
                      <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm text-gray-800">Quiz submission received</p>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50">
                      <p className="text-sm text-gray-800">New user registered</p>
                      <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name || user?.username || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || user?.username || 'Admin'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
                    </div>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="w-4 h-4 mr-3" />
                      Profile Settings
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Navbar Component
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Notes', href: '/admin/notes', icon: FileText },
    { name: 'Blog', href: '/admin/blog', icon: BookOpen },
    { name: 'History', href: '/admin/history', icon: Clock },
    { name: 'Quiz', href: '/admin/quiz', icon: Brain },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <nav className="bg-gray-900 text-white">
      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center justify-between p-4">
        <span className="text-lg font-semibold">Navigation</span>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-gray-900">
          <div className="px-2 py-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

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

// Auth Context Component
const AuthProvider = ({ children }) => {
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

// Main App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        {({ isAuthenticated, isLoading, user, handleLogin, handleLogout }) => {
          // Show loading spinner while checking authentication
          if (isLoading) {
            return (
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-lg">Loading...</p>
                </div>
              </div>
            );
          }

          return (
            <Routes>
              {/* Redirect root to admin */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Admin Routes - All wrapped with ProtectedRoute that includes Layout */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout}>
                    <AdminPannel user={user} onLogout={handleLogout} />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/admin/notes" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout}>
                    <AdminNotes user={user} onLogout={handleLogout} />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/admin/blog" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout}>
                    <AdminBlog user={user} onLogout={handleLogout} />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/admin/history" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout}>
                    <PageHistory user={user} onLogout={handleLogout} />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/admin/quiz" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout}>
                    <AdminQuiz user={user} onLogout={handleLogout} />
                  </ProtectedRoute>
                } 
              />

              {/* Login Route - No Layout wrapper */}
              <Route 
                path="/login" 
                element={
                  isAuthenticated ? 
                    <Navigate to="/admin" replace /> : 
                    <AdminLogin onLogin={handleLogin} />
                } 
              />

              {/* Catch all other routes and redirect to admin */}
              <Route path="/" element={<Navigate to="/admin" replace />} />
            </Routes>
          );
        }}
      </AuthProvider>
    </Router>
  );
}

export default App;