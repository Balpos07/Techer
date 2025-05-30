import React, { useState } from 'react';
import { 
  Home, 
  Mail, 
  FileText, 
  CheckSquare, 
  Settings, 
  User, 
  Sun, 
  Moon,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`dashboard ${isDarkMode ? 'dark' : 'light'}`}>
        {/* Top Navigation Bar */}
        <nav className="navbar">
          <div className="navbar-content">
            <div className="navbar-left">
              <button onClick={toggleSidebar} className="menu-button">
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="brand">
                <div className="brand-logo">
                  <span>C</span>
                </div>
                <span className="brand-name">Copilot</span>
              </div>
            </div>
            
            <div className="navbar-right">
              <button className="nav-button">
                <Settings size={20} />
              </button>
              <button className="nav-button">
                <FileText size={20} />
              </button>
              <button onClick={toggleDarkMode} className="nav-button">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="nav-button">
                <User size={20} />
              </button>
            </div>
          </div>
        </nav>

        <div className="main-layout">
          {/* Sidebar */}
          <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-content">
              <nav className="sidebar-nav">
                <a href="#" className="nav-item active">
                  <Home size={20} />
                  <span>Dashboard</span>
                </a>
                
                <a href="#" className="nav-item">
                  <Mail size={20} />
                  <span>Email Assistant</span>
                </a>
                
                <a href="#" className="nav-item">
                  <FileText size={20} />
                  <span>Meeting Summaries</span>
                </a>
                
                <a href="#" className="nav-item">
                  <CheckSquare size={20} />
                  <span>Task Manager</span>
                </a>
                
                <a href="#" className="nav-item">
                  <Settings size={20} />
                  <span>Settings</span>
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <div className="content-wrapper">
              {/* Welcome Section */}
              <div className="welcome-section">
                <h1 className="welcome-title">Welcome back, Alex</h1>
                <p className="welcome-summary">
                  Today: 5 new emails | 2 meeting summaries | 3 pending tasks
                </p>
                <p className="welcome-subtitle">
                  Quick overview of your daily activities
                </p>
              </div>

              {/* Dashboard Cards */}
              <div className="cards-grid">
                <div className="card">
                  <div className="card-header">
                    <h3>New Emails</h3>
                    <Mail className="card-icon email-icon" size={24} />
                  </div>
                  <div className="card-number">5</div>
                  <p className="card-description">
                    3 require immediate attention
                  </p>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3>Meeting Summaries</h3>
                    <FileText className="card-icon meeting-icon" size={24} />
                  </div>
                  <div className="card-number">2</div>
                  <p className="card-description">
                    Ready for review
                  </p>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3>Pending Tasks</h3>
                    <CheckSquare className="card-icon task-icon" size={24} />
                  </div>
                  <div className="card-number">3</div>
                  <p className="card-description">
                    Due this week
                  </p>
                </div>
              </div>

              {/* Illustration Area */}
              <div className="illustration-area">
                <div className="illustration-content">
                  <div className="avatar-container">
                    <User size={48} />
                  </div>
                  <h2 className="illustration-title">Your AI Assistant is Ready</h2>
                  <p className="illustration-description">
                    Start by checking your emails, reviewing meeting summaries, or managing your tasks. 
                    Your productivity companion is here to help streamline your workflow.
                  </p>
                  <button className="get-started-button">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transition: all 0.3s ease;
        }

        .dashboard.light {
          background-color: #f9fafb;
          color: #111827;
        }

        .dashboard.dark {
          background-color: #111827;
          color: #ffffff;
        }

        /* Navbar Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 12px 16px;
          border-bottom: 1px solid;
          transition: all 0.3s ease;
        }

        .light .navbar {
          background-color: #ffffff;
          border-color: #e5e7eb;
        }

        .dark .navbar {
          background-color: #1f2937;
          border-color: #374151;
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .menu-button, .nav-button {
          padding: 8px;
          border: none;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          transition: background-color 0.2s ease;
          color: inherit;
        }

        .light .menu-button:hover,
        .light .nav-button:hover {
          background-color: #f3f4f6;
        }

        .dark .menu-button:hover,
        .dark .nav-button:hover {
          background-color: #374151;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .brand-logo {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
        }

        .brand-name {
          font-weight: 600;
          font-size: 18px;
        }

        /* Layout */
        .main-layout {
          display: flex;
          padding-top: 64px;
        }

        /* Sidebar Styles */
        .sidebar {
          position: fixed;
          left: 0;
          top: 64px;
          bottom: 0;
          width: 256px;
          border-right: 1px solid;
          transition: transform 0.3s ease;
          z-index: 40;
        }

        .light .sidebar {
          background-color: #ffffff;
          border-color: #e5e7eb;
        }

        .dark .sidebar {
          background-color: #1f2937;
          border-color: #374151;
        }

        .sidebar.open {
          transform: translateX(0);
        }

        .sidebar.closed {
          transform: translateX(-100%);
        }

        .sidebar-content {
          padding: 16px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
          color: inherit;
        }

        .light .nav-item {
          color: #374151;
        }

        .dark .nav-item {
          color: #d1d5db;
        }

        .light .nav-item:hover {
          background-color: #f3f4f6;
        }

        .dark .nav-item:hover {
          background-color: #374151;
        }

        .nav-item.active {
          font-weight: 600;
        }

        .light .nav-item.active {
          background-color: #dbeafe;
          color: #1d4ed8;
        }

        .dark .nav-item.active {
          background-color: #2563eb;
          color: #ffffff;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          transition: margin-left 0.3s ease;
        }

        .main-content.sidebar-open {
          margin-left: 256px;
        }

        .main-content.sidebar-closed {
          margin-left: 0;
        }

        .content-wrapper {
          padding: 32px;
        }

        /* Welcome Section */
        .welcome-section {
          margin-bottom: 32px;
        }

        .welcome-title {
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .welcome-summary {
          margin-bottom: 16px;
        }

        .light .welcome-summary {
          color: #6b7280;
        }

        .dark .welcome-summary {
          color: #9ca3af;
        }

        .welcome-subtitle {
          font-size: 14px;
        }

        .light .welcome-subtitle {
          color: #6b7280;
        }

        .dark .welcome-subtitle {
          color: #6b7280;
        }

        /* Cards Grid */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .card {
          border: 1px solid;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }

        .light .card {
          background-color: #ffffff;
          border-color: #e5e7eb;
        }

        .dark .card {
          background-color: #1f2937;
          border-color: #374151;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .card-header h3 {
          font-weight: 600;
          font-size: 18px;
          margin: 0;
        }

        .email-icon {
          color: #3b82f6;
        }

        .meeting-icon {
          color: #10b981;
        }

        .task-icon {
          color: #f59e0b;
        }

        .card-number {
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .card-description {
          font-size: 14px;
          margin: 0;
        }

        .light .card-description {
          color: #6b7280;
        }

        .dark .card-description {
          color: #9ca3af;
        }

        /* Illustration Area */
        .illustration-area {
          border: 1px solid;
          border-radius: 12px;
          padding: 32px;
          text-align: center;
        }

        .light .illustration-area {
          background: linear-gradient(to bottom right, #dbeafe, #e0e7ff);
          border-color: #e5e7eb;
        }

        .dark .illustration-area {
          background-color: #1f2937;
          border-color: #374151;
        }

        .illustration-content {
          max-width: 448px;
          margin: 0 auto;
        }

        .avatar-container {
          width: 128px;
          height: 128px;
          margin: 0 auto 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .light .avatar-container {
          background-color: #ffffff;
          color: #6b7280;
        }

        .dark .avatar-container {
          background-color: #374151;
          color: #9ca3af;
        }

        .illustration-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 16px;
        }

        .illustration-description {
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .light .illustration-description {
          color: #6b7280;
        }

        .dark .illustration-description {
          color: #9ca3af;
        }

        .get-started-button {
          background-color: #3b82f6;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .get-started-button:hover {
          background-color: #2563eb;
        }

        .dark .get-started-button {
          background-color: #2563eb;
        }

        .dark .get-started-button:hover {
          background-color: #1d4ed8;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
          }

          .main-content.sidebar-open {
            margin-left: 0;
          }

          .content-wrapper {
            padding: 16px;
          }

          .cards-grid {
            grid-template-columns: 1fr;
          }

          .navbar-left {
            gap: 8px;
          }

          .navbar-right {
            gap: 8px;
          }
        }
      `}</style>
    </>
  );
}