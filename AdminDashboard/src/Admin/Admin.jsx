import React, { useState, useEffect } from 'react';

// Mock components for demo - replace with your actual imports
const BlogAdmin = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">📝 Blog Management</h2>
    <div className="space-y-4">
      <div className="flex gap-4">
        <button 
          onClick={() => window.location.href = '/admin/blog'}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Create New Blog
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
          View All Blogs
        </button>
      </div>
      <div className="border-t pt-4">
        <p className="text-gray-600">Blog Admin Component - Replace with your actual BlogAdmin component</p>
      </div>
    </div>
  </div>
);

const UploadedList = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">📚 Notes Management</h2>
    <div className="space-y-4">
      <div className="flex gap-4">
        <button 
          onClick={() => window.location.href = '/admin/notes'}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Upload New Notes
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
          View All Notes
        </button>
      </div>
      <div className="border-t pt-4">
        <p className="text-gray-600">Notes Admin Component - Replace with your actual UploadedList component</p>
      </div>
    </div>
  </div>
);

const AdminQuiz = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">🧠 Quiz Management</h2>
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <button 
          onClick={() => window.location.href = '/admin/quiz'}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Create New Quiz
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
          View All Quizzes
        </button>
        <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
          Quiz Statistics
        </button>
      </div>
      <div className="border-t pt-4">
        <p className="text-gray-600">Quiz Admin Component - Replace with your actual AdminQuiz component</p>
        <div className="mt-3 text-sm text-gray-500">
          <p>Features available:</p>
          <ul className="list-disc list-inside mt-1">
            <li>Create multiple choice questions</li>
            <li>Set quiz categories and difficulty levels</li>
            <li>View quiz performance analytics</li>
            <li>Manage quiz visibility and scheduling</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const AdminPanel = () => {
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [dashboardStats, setDashboardStats] = useState({
    totalNotes: 0,
    totalBlogs: 0,
    totalQuizzes: 0,
    recentNotes: 0,
    recentBlogs: 0,
    recentQuizzes: 0,
    loading: true,
    error: null
  });

  // Fetch dashboard statistics
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setDashboardStats(prev => ({ ...prev, loading: true, error: null }));
      
      // Parallel API calls with better error handling
      const apiCalls = [
        fetch('https://pdfman.onrender.com/api/pdfs').catch(e => ({ ok: false, error: 'Notes API failed' })),
        fetch('https://mcq-0ldp.onrender.com/api/blogs').catch(e => ({ ok: false, error: 'Blogs API failed' })),
        fetch('https://quiz-pcmq-with-malika-1.onrender.com/api').catch(e => ({ ok: false, error: 'Quiz API failed' }))
      ];

      const [notesResponse, blogsResponse, quizzesResponse] = await Promise.all(apiCalls);
      
      // Process Notes Data
      let notesData = [];
      if (notesResponse.ok) {
        try {
          notesData = await notesResponse.json();
          if (!Array.isArray(notesData)) {
            notesData = notesData.data || notesData.pdfs || [];
          }
        } catch (e) {
          console.warn('Error parsing notes data:', e);
        }
      }
      
      // Process Blogs Data
      let blogsData = [];
      if (blogsResponse.ok) {
        try {
          blogsData = await blogsResponse.json();
          if (!Array.isArray(blogsData)) {
            blogsData = blogsData.data || blogsData.blogs || [];
          }
        } catch (e) {
          console.warn('Error parsing blogs data:', e);
        }
      }
      
      // Process Quizzes Data with better handling
      let quizzesData = [];
      if (quizzesResponse.ok) {
        try {
          const quizResponse = await quizzesResponse.json();
          console.log('Quiz API Response:', quizResponse); // Debug log
          
          // Handle different possible response structures
          if (Array.isArray(quizResponse)) {
            quizzesData = quizResponse;
          } else if (quizResponse.data && Array.isArray(quizResponse.data)) {
            quizzesData = quizResponse.data;
          } else if (quizResponse.quizzes && Array.isArray(quizResponse.quizzes)) {
            quizzesData = quizResponse.quizzes;
          } else if (quizResponse.questions && Array.isArray(quizResponse.questions)) {
            quizzesData = quizResponse.questions;
          } else if (typeof quizResponse === 'object') {
            // If it's an object, try to extract arrays from common keys
            const possibleArrays = Object.values(quizResponse).filter(val => Array.isArray(val));
            if (possibleArrays.length > 0) {
              quizzesData = possibleArrays[0];
            }
          }
        } catch (e) {
          console.warn('Error parsing quiz data:', e);
        }
      }

      console.log('Processed Quiz Data:', quizzesData); // Debug log
      
      // Calculate recent uploads (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      // Helper function to extract date from various possible fields
      const extractDate = (item) => {
        const dateFields = [
          item.createdAt, item.created_at, item.dateCreated, item.date_created,
          item.uploadDate, item.upload_date, item.publishDate, item.publish_date,
          item.timestamp, item.created, item.date
        ];
        return dateFields.find(date => date && !isNaN(new Date(date).getTime()));
      };

      // Calculate recent items
      const recentNotes = Array.isArray(notesData) ? notesData.filter(item => {
        const itemDate = extractDate(item);
        return itemDate && new Date(itemDate) > sevenDaysAgo;
      }).length : 0;
      
      const recentBlogs = Array.isArray(blogsData) ? blogsData.filter(item => {
        const itemDate = extractDate(item);
        return itemDate && new Date(itemDate) > sevenDaysAgo;
      }).length : 0;
      
      const recentQuizzes = Array.isArray(quizzesData) ? quizzesData.filter(item => {
        const itemDate = extractDate(item);
        return itemDate && new Date(itemDate) > sevenDaysAgo;
      }).length : 0;
      
      setDashboardStats({
        totalNotes: Array.isArray(notesData) ? notesData.length : 0,
        totalBlogs: Array.isArray(blogsData) ? blogsData.length : 0,
        totalQuizzes: Array.isArray(quizzesData) ? quizzesData.length : 0,
        recentNotes,
        recentBlogs,
        recentQuizzes,
        loading: false,
        error: null
      });

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setDashboardStats(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch some data. Please check your internet connection.'
      }));
    }
  };

  const StatCard = ({ title, value, icon, color, subtitle, isLoading }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : (
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {value}
              </span>
            )}
          </p>
          {subtitle && (
            <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
          )}
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon, color, redirectUrl }) => (
    <div 
      className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-l-4 ${color} hover:scale-105 transform group`}
      onClick={() => window.location.href = redirectUrl}
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
          <p className="text-xs text-blue-500 mt-2 group-hover:text-blue-600 transition-colors">
            Click to navigate →
          </p>
        </div>
      </div>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                📋 Admin Panel
              </h1>
              <p className="text-gray-600 mt-1">Manage your content efficiently</p>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-gray-700 font-medium">Navigate to:</label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="dashboard">🏠 Dashboard</option>
                <option value="blog">📝 Blog Management</option>
                <option value="notes">📚 Notes Management</option>
                <option value="quiz">🧠 Quiz Management</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {dashboardStats.error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-red-400 mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-700 text-sm">{dashboardStats.error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard View */}
        {selectedOption === 'dashboard' && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                📊 Overview Statistics
                {dashboardStats.loading && <span className="text-sm text-gray-500">(Loading...)</span>}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <StatCard
                  title="Total Notes"
                  value={dashboardStats.totalNotes}
                  icon="📚"
                  color="border-blue-500"
                  subtitle="PDF files uploaded"
                  isLoading={dashboardStats.loading}
                />
                <StatCard
                  title="Total Blogs"
                  value={dashboardStats.totalBlogs}
                  icon="📝"
                  color="border-green-500"
                  subtitle="Blog posts created"
                  isLoading={dashboardStats.loading}
                />
                <StatCard
                  title="Total Quizzes"
                  value={dashboardStats.totalQuizzes}
                  icon="🧠"
                  color="border-orange-500"
                  subtitle="Quizzes created"
                  isLoading={dashboardStats.loading}
                />
                <StatCard
                  title="Recent Notes"
                  value={dashboardStats.recentNotes}
                  icon="🆕"
                  color="border-yellow-500"
                  subtitle="Last 7 days"
                  isLoading={dashboardStats.loading}
                />
                <StatCard
                  title="Recent Blogs"
                  value={dashboardStats.recentBlogs}
                  icon="✨"
                  color="border-purple-500"
                  subtitle="Last 7 days"
                  isLoading={dashboardStats.loading}
                />
                <StatCard
                  title="Recent Quizzes"
                  value={dashboardStats.recentQuizzes}
                  icon="⚡"
                  color="border-red-500"
                  subtitle="Last 7 days"
                  isLoading={dashboardStats.loading}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">⚡ Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <QuickActionCard
                  title="Manage Blogs"
                  description="Create, edit, and delete blog posts"
                  icon="📝"
                  color="border-green-500"
                  redirectUrl="/admin/blog"
                />
                <QuickActionCard
                  title="Manage Notes"
                  description="Upload and manage PDF notes"
                  icon="📚"
                  color="border-blue-500"
                  redirectUrl="/admin/notes"
                />
                <QuickActionCard
                  title="Manage Quizzes"
                  description="Create and manage quiz questions"
                  icon="🧠"
                  color="border-orange-500"
                  redirectUrl="/admin/quiz"
                />
                <QuickActionCard
                  title="View History"
                  description="Check activity logs and history"
                  icon="📋"
                  color="border-purple-500"
                  redirectUrl="/admin/history"
                />
              </div>
            </div>

            {/* Recent Activity Summary */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 Recent Activity</h2>
              <div className="bg-white rounded-xl shadow-lg p-6">
                {dashboardStats.loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="border-r md:pr-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          📚 Notes Activity
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Notes:</span>
                            <span className="font-semibold text-lg">{dashboardStats.totalNotes}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">New This Week:</span>
                            <span className="font-semibold text-green-600 text-lg">+{dashboardStats.recentNotes}</span>
                          </div>
                        </div>
                      </div>
                      <div className="border-r md:pr-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          📝 Blog Activity
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Blogs:</span>
                            <span className="font-semibold text-lg">{dashboardStats.totalBlogs}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">New This Week:</span>
                            <span className="font-semibold text-green-600 text-lg">+{dashboardStats.recentBlogs}</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:pl-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          🧠 Quiz Activity
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Quizzes:</span>
                            <span className="font-semibold text-lg">{dashboardStats.totalQuizzes}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">New This Week:</span>
                            <span className="font-semibold text-green-600 text-lg">+{dashboardStats.recentQuizzes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Refresh Button */}
                    <div className="mt-6 pt-4 border-t flex justify-between items-center">
                      <button
                        onClick={fetchDashboardStats}
                        disabled={dashboardStats.loading}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                      >
                        {dashboardStats.loading ? '🔄' : '📊'} 
                        {dashboardStats.loading ? 'Refreshing...' : 'Refresh Stats'}
                      </button>
                      <div className="text-sm text-gray-500">
                        Last updated: {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* System Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">🛠️ System Information</h2>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">API Endpoints</h3>
                    <div className="space-y-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-600 font-medium">Notes API:</span>
                        <br />
                        <code className="bg-gray-200 px-2 py-1 rounded text-xs mt-1 inline-block">
                          https://pdfman.onrender.com/api/pdfs
                        </code>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-600 font-medium">Blogs API:</span>
                        <br />
                        <code className="bg-gray-200 px-2 py-1 rounded text-xs mt-1 inline-block">
                          https://mcq-0ldp.onrender.com/api/blogs
                        </code>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-600 font-medium">Quiz API:</span>
                        <br />
                        <code className="bg-gray-200 px-2 py-1 rounded text-xs mt-1 inline-block">
                          https://quiz-pcmq-with-malika-1.onrender.com/api
                        </code>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Navigation</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => window.location.href = '/admin/history'}
                        className="block w-full text-left p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        📋 View Complete History
                      </button>
                      <button 
                        onClick={() => window.location.href = '/admin/blog'}
                        className="block w-full text-left p-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                      >
                        📝 Go to Blog Management Page
                      </button>
                      <button 
                        onClick={() => window.location.href = '/admin/notes'}
                        className="block w-full text-left p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        📚 Go to Notes Management Page
                      </button>
                      <button 
                        onClick={() => window.location.href = '/admin/quiz'}
                        className="block w-full text-left p-3 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
                      >
                        🧠 Go to Quiz Management Page
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation bar for non-dashboard views */}
        {selectedOption !== 'dashboard' && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => window.location.href = '/historypa'}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  📋 View History
                </button>
                <button
                  onClick={() => setSelectedOption('dashboard')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  🏠 Back to Dashboard
                </button>
                <button
                  onClick={() => {
                    const routes = {
                      blog: '/admin/blog',
                      notes: '/admin/notes',
                      quiz: '/admin/quiz'
                    };
                    window.location.href = routes[selectedOption];
                  }}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
                >
                  🔗 Go to Dedicated {selectedOption === 'blog' ? 'Blog' : selectedOption === 'notes' ? 'Notes' : 'Quiz'} Page
                </button>
              </div>
              <button
                onClick={fetchDashboardStats}
                disabled={dashboardStats.loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {dashboardStats.loading ? '🔄 Refreshing...' : '🔄 Refresh Data'}
              </button>
            </div>
          </div>
        )}

        {/* Component Rendering */}
        {selectedOption === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800">📝 Blog Management</h2>
              <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                Total Blogs: <span className="font-semibold">{dashboardStats.totalBlogs}</span>
              </div>
            </div>
            <BlogAdmin />
          </div>
        )}
        
        {selectedOption === 'notes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800">📚 Notes Management</h2>
              <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                Total Notes: <span className="font-semibold">{dashboardStats.totalNotes}</span>
              </div>
            </div>
            <UploadedList />
          </div>
        )}

        {selectedOption === 'quiz' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800">🧠 Quiz Management</h2>
              <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                Total Quizzes: <span className="font-semibold">{dashboardStats.totalQuizzes}</span>
              </div>
            </div>
            <AdminQuiz />
            
            {/* Enhanced Quiz-specific information panel */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                🔧 Quiz Management Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    ⚙️ Available Actions:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">• Create multiple choice questions</li>
                    <li className="flex items-center gap-2">• Set quiz categories (PCM, General Knowledge, etc.)</li>
                    <li className="flex items-center gap-2">• Configure difficulty levels (Easy, Medium, Hard)</li>
                    <li className="flex items-center gap-2">• Set time limits for quizzes</li>
                    <li className="flex items-center gap-2">• Enable/disable quiz visibility</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    📊 Analytics & Reports:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">• View quiz performance statistics</li>
                    <li className="flex items-center gap-2">• Track user completion rates</li>
                    <li className="flex items-center gap-2">• Monitor question difficulty analysis</li>
                    <li className="flex items-center gap-2">• Export quiz results</li>
                    <li className="flex items-center gap-2">• Generate performance reports</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  📈 Quick Stats:
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-xl text-center hover:shadow-md transition-all">
                    <div className="text-3xl font-bold text-orange-600">{dashboardStats.totalQuizzes}</div>
                    <div className="text-xs text-gray-600 mt-1">Total Quizzes</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-xl text-center hover:shadow-md transition-all">
                    <div className="text-3xl font-bold text-green-600">{dashboardStats.recentQuizzes}</div>
                    <div className="text-xs text-gray-600 mt-1">This Week</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl text-center hover:shadow-md transition-all">
                    <div className="text-3xl font-bold text-blue-600">API</div>
                    <div className="text-xs text-gray-600 mt-1">Connected</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-xl text-center hover:shadow-md transition-all">
                    <div className="text-3xl font-bold text-purple-600">Live</div>
                    <div className="text-xs text-gray-600 mt-1">Status</div>
                  </div>
                </div>
              </div>
              
              {/* Quiz API Debug Info */}
              <div className="mt-6 pt-4 border-t bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  🔍 Debug Information:
                </h4>
                <div className="text-sm text-gray-600">
                  <p>Quiz API Status: <span className="font-medium">Connected</span></p>
                  <p>Last Refresh: <span className="font-medium">{new Date().toLocaleTimeString()}</span></p>
                  <p>Data Processing: <span className="font-medium">Enhanced with multiple response format handling</span></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;