import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Mail, FileText, CheckSquare, Settings } from "lucide-react";

export default function Sidebar({ isSidebarOpen, isDarkMode }) {
  const location = useLocation();

  return (
    <>
      <aside
        className={`sidebar ${isSidebarOpen ? "open" : "closed"} ${
          isDarkMode ? "dark" : "light"
        }`}
      >
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <Link
              to="/"
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/email"
              className={`nav-item ${
                location.pathname === "/email" ? "active" : ""
              }`}
            >
              <Mail size={20} />
              <span>Email Assistant</span>
            </Link>

            <Link
              to="/meetings"
              className={`nav-item ${
                location.pathname === "/meetings" ? "active" : ""
              }`}
            >
              <FileText size={20} />
              <span>Meeting Summaries</span>
            </Link>

            <Link
              to="/tasks"
              className={`nav-item ${
                location.pathname === "/tasks" ? "active" : ""
              }`}
            >
              <CheckSquare size={20} />
              <span>Task Manager</span>
            </Link>

            <Link
              to="/settings"
              className={`nav-item ${
                location.pathname === "/settings" ? "active" : ""
              }`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
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
