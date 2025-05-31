import React from 'react';
import { 
  Home, 
  Mail, 
  FileText, 
  CheckSquare, 
  Settings
} from 'lucide-react';

export default function Sidebar({ isSidebarOpen, isDarkMode }) {
  return (
    <>
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'} ${isDarkMode ? 'dark' : 'light'}`}>
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

        <style jsx>{`
          .sidebar {
            position: fixed;
            left: 0;
            top: 64px;
            bottom: 0;
            width: 256px;
            background-color: var(--sidebar-bg);
            border-right: 1px solid var(--border-color);
            z-index: 40;
            transition: transform 0.3s ease;
          }

          .sidebar.closed {
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .sidebar-content {
            height: 100%;
            padding: 16px;
            overflow-y: auto;
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
            color: var(--text-color);
            transition: all 0.2s ease;
          }

          .nav-item:hover {
            background-color: var(--hover-bg);
          }

          .nav-item.active {
            background-color: var(--active-bg);
            color: var(--active-color);
            font-weight: 600;
          }

          @media (max-width: 768px) {
            .sidebar {
              width: 100%;
              height: calc(100vh - 64px);
            }

            .sidebar.closed {
              display: none;
            }

            .nav-item:hover {
              background-color: var(--hover-bg);
            }
          }
        `}</style>
      </aside>
    </>
  );
}