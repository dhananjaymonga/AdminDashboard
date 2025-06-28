import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, Home, FileText, BookOpen, Clock, Brain } from 'lucide-react';

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

export default Navbar;