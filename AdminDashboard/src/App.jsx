import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, FileText, BookOpen, Clock, Brain, ChevronDown, Bell, Search } from 'lucide-react';

// Mock components for demonstration
const AdminPannel = ({ user, onLogout }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Total Notes</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">24</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Blog Posts</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">12</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Quiz Results</h3>
        <p className="text-3xl font-bold text-purple-600 mt-2">156</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Page Views</h3>
        <p className="text-3xl font-bold text-orange-600 mt-2">2.4k</p>
      </div>
    </div>
  </div>
);

const AdminNotes = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Notes Management</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">Notes management interface</p>
    </div>
  </div>
);

const AdminBlog = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Blog Management</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">Blog management interface</p>
    </div>
  </div>
);

const PageHistory = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Page History</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">Page history interface</p>
    </div>
  </div>
);

const AdminQuiz = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Quiz Management</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">Quiz management interface</p>
    </div>
  </div>
);

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await onLogin(credentials);
      if (!result.success) {
        setError(result.message);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
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
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

// Layout Component
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

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated, user, onLogout }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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

  const checkAuthStatus = () => {
    try {
      // For demo purposes, we'll simulate auth check
      // In production, you'd verify with your backend
      const userData = { username: 'admin', email: 'admin@example.com' };
      setUser(userData);
      setIsAuthenticated(false); // Set to false initially for demo
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      // Simulate login - in production, call your API
      if (credentials.username === 'admin' && credentials.password === 'password') {
        const userData = { username: 'admin', email: 'admin@example.com' };
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  };

  const handleLogout = () => {
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
              {/* Login Route */}
              <Route 
                path="/login" 
                element={
                  isAuthenticated ? 
                    <Navigate to="/admin" replace /> : 
                    <AdminLogin onLogin={handleLogin} />
                } 
              />

              {/* Admin Routes */}
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

              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Catch all other routes and redirect to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          );
        }}
      </AuthProvider>
    </Router>
  );
}

export default App;