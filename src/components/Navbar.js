import React from 'react';
import { 
  Settings, 
  User, 
  Sun, 
  Moon,
  Menu,
  X,
  FileText
} from 'lucide-react';

export default function Navbar({ isDarkMode, isSidebarOpen, toggleDarkMode, toggleSidebar }) {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <button onClick={toggleSidebar} className="menu-button">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="brand">
              <div className="brand-logo">
                <span>T</span>
              </div>
              <span className="brand-name">Techers</span>
            </div>
          </div>
          
          <div className="navbar-right">
            <button className="nav-button" title="Settings">
              <Settings size={20} />
            </button>
            <button className="nav-button" title="Documents">
              <FileText size={20} />
            </button>
            <button onClick={toggleDarkMode} className="nav-button" title="Toggle theme">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="nav-button" title="Profile">
              <User size={20} />
            </button>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border-color, #e5e7eb);
          background-color: var(--navbar-bg, #ffffff);
          backdrop-filter: blur(8px);
        }

        .navbar-content {
          max-width: 1280px;
          margin: 0 auto;
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
          gap: 8px;
        }

        .menu-button, .nav-button {
          padding: 8px;
          border: none;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--text-color, #374151);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-button:hover, .nav-button:hover {
          background-color: var(--hover-bg, #f3f4f6);
          transform: translateY(-1px);
        }

        .menu-button:active, .nav-button:active {
          transform: translateY(0);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: inherit;
        }

        .brand-logo {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 16px;
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }

        .brand-name {
          font-weight: 600;
          font-size: 18px;
          background: linear-gradient(to right, #3b82f6, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 8px 12px;
          }

          .navbar-left {
            gap: 8px;
          }

          .navbar-right {
            gap: 4px;
          }

          .brand-name {
            display: none;
          }
        }

        @media (hover: none) {
          .menu-button:hover, .nav-button:hover {
            background-color: transparent;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}