import React from "react";
import { Mail, FileText, CheckSquare, User } from "lucide-react";

export default function DashboardContent({ isSidebarOpen }) {
  return (
    <>
      <main
        className={`main-content ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="content-wrapper">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome back, Techers</h1>
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
              <p className="card-description">3 require immediate attention</p>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Meeting Summaries</h3>
                <FileText className="card-icon meeting-icon" size={24} />
              </div>
              <div className="card-number">2</div>
              <p className="card-description">Ready for review</p>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Pending Tasks</h3>
                <CheckSquare className="card-icon task-icon" size={24} />
              </div>
              <div className="card-number">3</div>
              <p className="card-description">Due this week</p>
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
                Start by checking your emails, reviewing meeting summaries, or
                managing your tasks. Your productivity companion is here to help
                streamline your workflow.
              </p>
              <button className="get-started-button">Get Started</button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .main-content {
          flex: 1;
          transition: margin-left 0.3s ease;
          margin-top: 64px;
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

        .welcome-subtitle {
          font-size: 14px;
        }

        /* Cards Grid */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .card {
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
          background-color: var(--sidebar-bg);
          color: var(--text-color);
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
          color: var(--text-color);
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
          color: var(--text-color);
        }

        /* Illustration Area */
        .illustration-area {
          border: 1px solid var(--border-color);
          background-color: var(--sidebar-bg);
          border: 1px solid;
          border-radius: 12px;
          padding: 32px;
          text-align: center;
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

        .illustration-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 16px;
        }

        .illustration-description {
          margin-bottom: 24px;
          line-height: 1.6;
          color: var(--text-color);
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

        @media (max-width: 768px) {
          .main-content.sidebar-open {
            margin-left: 0;
          }

          .content-wrapper {
            padding: 16px;
          }

          .cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
