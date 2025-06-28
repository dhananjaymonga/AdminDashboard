import React, { useState } from 'react';
import { User, LogOut, Bell, Search, ChevronDown } from 'lucide-react';

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

export default Header;