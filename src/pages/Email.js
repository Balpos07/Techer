import React, { useState, useEffect } from "react";
import {
  Mail,
  Bot,
  Check,
  Filter,
  Reply,
  Edit3,
  Copy,
  Send
} from "lucide-react";
import { emailService } from '../services/emailService';

export default function Email({ isSidebarOpen, isDarkMode }) {
  const [emails, setEmails] = useState([]);
  const [filter, setFilter] = useState("Today");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [generatedReply, setGeneratedReply] = useState("");
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);
  const [editingReply, setEditingReply] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterOptions = ["Today", "Yesterday", "This Week"];

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const data = await emailService.getEmails();
      setEmails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateReply = async (email, suggestion) => {
    try {
      setIsGeneratingReply(true);
      setSelectedEmail(email);
      
      const response = await emailService.generateResponse(email.id, suggestion);
      setGeneratedReply(response.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGeneratingReply(false);
    }
  };

  const markAsHandled = async (emailId) => {
    try {
      await emailService.updateEmailStatus(emailId, 'handled');
      setEmails(emails.map(email => 
        email.id === emailId ? { ...email, handled: true } : email
      ));
      if (selectedEmail?.id === emailId) {
        setSelectedEmail(null);
        setGeneratedReply("");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReply);
  };

  const filteredEmails = emails.filter(email => !email.handled);

  return (
    <>
      <main
        className={`main-content ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="content-wrapper">
          <div className="page-header">
            <h1 className="page-title">Email Assistant</h1>
            <p className="page-description">
              AI-powered email management and smart replies
            </p>
          </div>

          <div className="email-stats">
            <div className="stat-card">
              <Mail size={24} />
              <div className="stat-info">
                <span className="stat-number">{filteredEmails.length}</span>
                <span className="stat-label">Pending</span>
              </div>
            </div>
            <div className="stat-card">
              <Bot size={24} />
              <div className="stat-info">
                <span className="stat-number">15</span>
                <span className="stat-label">AI Replies</span>
              </div>
            </div>
            <div className="stat-card">
              <Check size={24} />
              <div className="stat-info">
                <span className="stat-number">
                  {emails.filter((e) => e.handled).length}
                </span>
                <span className="stat-label">Handled</span>
              </div>
            </div>
          </div>

          <div className="email-section">
            <div className="email-header">
              <h2>Recent Emails</h2>
              <div className="filter-dropdown">
                <Filter size={16} />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="filter-select"
                >
                  {filterOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="email-list">
              {filteredEmails.map((email) => (
                <div key={email.id} className="email-item">
                  <div className="email-main">
                    <div className="email-info">
                      <h3 className="email-subject">{email.subject}</h3>
                      <p className="email-sender">
                        {email.sender} • {email.time}
                      </p>
                    </div>
                    <div className="email-summary">
                      <div className="summary-badge">
                        <Bot size={14} />
                        AI Summary
                      </div>
                      <p className="summary-text">{email.summary}</p>
                    </div>
                  </div>

                  <div className="email-actions">
                    <div className="smart-replies">
                      <span className="replies-label">Smart replies:</span>
                      <div className="reply-suggestions">
                        {email.suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => generateReply(email, suggestion)}
                            className="suggestion-btn"
                            disabled={isGeneratingReply}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="action-buttons">
                      <button
                        onClick={() => generateReply(email, "General")}
                        className="action-btn primary"
                        disabled={isGeneratingReply}
                      >
                        <Reply size={16} />
                        Reply with AI
                      </button>
                      <button
                        onClick={() => markAsHandled(email.id)}
                        className="action-btn secondary"
                      >
                        <Check size={16} />
                        Mark as Handled
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredEmails.length === 0 && (
              <div className="empty-state">
                <Check size={48} />
                <h3>All caught up!</h3>
                <p>No pending emails to review.</p>
              </div>
            )}
          </div>

          {(selectedEmail || isGeneratingReply) && (
            <div className="reply-modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>AI Generated Reply</h3>
                  <button
                    onClick={() => {
                      setSelectedEmail(null);
                      setGeneratedReply("");
                      setEditingReply(false);
                    }}
                    className="close-btn"
                  >
                    ×
                  </button>
                </div>

                {isGeneratingReply ? (
                  <div className="generating">
                    <Bot className="spinning" size={24} />
                    <p>Generating intelligent reply...</p>
                  </div>
                ) : (
                  <div className="reply-content">
                    <div className="reply-to">
                      <strong>To:</strong> {selectedEmail?.email}
                      <br />
                      <strong>Re:</strong> {selectedEmail?.subject}
                    </div>

                    {editingReply ? (
                      <textarea
                        value={generatedReply}
                        onChange={(e) => setGeneratedReply(e.target.value)}
                        className="reply-textarea"
                        rows={8}
                      />
                    ) : (
                      <div className="reply-preview">
                        {generatedReply.split("\n").map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>
                    )}

                    <div className="reply-actions">
                      <button
                        onClick={() => setEditingReply(!editingReply)}
                        className="reply-btn secondary"
                      >
                        <Edit3 size={16} />
                        {editingReply ? "Preview" : "Edit"}
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className="reply-btn secondary"
                      >
                        <Copy size={16} />
                        Copy
                      </button>
                      <button
                        onClick={() => {
                          markAsHandled(selectedEmail.id);
                          alert("Reply sent!");
                        }}
                        className="reply-btn primary"
                      >
                        <Send size={16} />
                        Send Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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
          padding: 32px 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 32px;
        }

         .page-title {
         color: #1f2937;
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .page-description {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .email-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          border-radius: 12px;
          background-color: var(--sidebar-bg);
          border: 1px solid var(--border-color);
          color: var(--text-color);
        }

        .stat-card svg {
          color: var(--icon-color);
        }

         .stat-number {
          color: var(--text-color);
        }

        .stat-label {
          color: var(--text-secondary);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 24px;
          font-weight: bold;
        }

        .stat-label {
          font-size: 14px;
          opacity: 0.8;
        }

        .email-section {
          background-color: var(--sidebar-bg);
          border-radius: 12px;
          border: 1px solid var(--border-color);
          overflow: hidden;
        }

        .email-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .email-header h2 {
          margin: 0;
          color: var(--text-color);
          font-size: 20px;
          font-weight: 600;
        }

        .filter-dropdown {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-color);
        }

        .filter-select {
          background-color: var(--input-bg);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 8px 12px;
          color: var(--text-color);
          font-size: 14px;
        }

        .email-list {
          display: flex;
          flex-direction: column;
        }

        .email-item {
          padding: 24px;
          border-bottom: 1px solid var(--border-color);
          transition: background-color 0.2s;
        }

        .email-item:hover {
          background-color: var(--hover-bg);
        }

        .email-item:last-child {
          border-bottom: none;
        }

        .email-main {
          margin-bottom: 16px;
        }

        .email-info {
          margin-bottom: 12px;
        }

        .email-subject {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: var(--text-color);
        }

        .email-sender {
          margin: 0;
          font-size: 14px;
          color: var(--text-color);
          opacity: 0.7;
        }

        .email-summary {
          background-color: var(--input-bg);
          border-radius: 8px;
          padding: 12px;
        }

        .summary-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background-color: #3b82f6;
          color: white;
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .summary-text {
          margin: 0;
          font-size: 14px;
          color: var(--text-color);
          line-height: 1.4;
        }

        .email-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .smart-replies {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .replies-label {
          font-size: 14px;
          color: var(--text-color);
          opacity: 0.8;
          font-weight: 500;
        }

        .reply-suggestions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .suggestion-btn {
          background-color: transparent;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 6px 12px;
          font-size: 12px;
          color: var(--text-color);
          cursor: pointer;
          transition: all 0.2s;
        }

        .suggestion-btn:hover:not(:disabled) {
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .suggestion-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .action-btn svg,
        .reply-btn svg {
          color: currentColor;
        }
        .action-btn.primary {
          background-color: #3b82f6;
          color: white;
        }

        .action-btn.primary:hover:not(:disabled) {
          background-color: #2563eb;
        }

        .action-btn.secondary {
          background-color: transparent;
          color: var(--text-color);
          border: 1px solid var(--border-color);
        }

        .action-btn.secondary:hover {
          background-color: var(--hover-bg);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .empty-state {
          text-align: center;
          padding: 48px 24px;
          color: var(--text-color);
        }

        .empty-state h3 {
          margin: 16px 0 8px;
          font-size: 18px;
        }

        .empty-state p {
          margin: 0;
          opacity: 0.7;
        }

        .reply-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: var(--sidebar-bg);
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          border: 1px solid var(--border-color);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-header h3 {
          margin: 0;
          color: var(--text-color);
          font-size: 18px;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          color: var(--text-color);
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }

        .close-btn:hover {
          background-color: var(--hover-bg);
        }

        .generating {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px 24px;
          color: var(--text-color);
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .reply-content {
          padding: 24px;
        }

        .reply-to {
          background-color: var(--input-bg);
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 16px;
          font-size: 14px;
          color: var(--text-color);
          line-height: 1.5;
        }

        .reply-preview {
          background-color: var(--input-bg);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 16px;
          min-height: 200px;
          white-space: pre-wrap;
          color: var(--text-color);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .reply-preview p {
          margin: 0 0 12px 0;
        }

        .reply-preview p:last-child {
          margin-bottom: 0;
        }

        .reply-textarea {
          width: 100%;
          background-color: var(--input-bg);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 16px;
          color: var(--text-color);
          font-family: inherit;
          font-size: 14px;
          line-height: 1.6;
          resize: vertical;
          margin-bottom: 16px;
        }

        .reply-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .reply-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .reply-btn.primary {
          background-color: #3b82f6;
          color: white;
        }

        .reply-btn.primary:hover {
          background-color: #2563eb;
        }

        .reply-btn.secondary {
          background-color: transparent;
          color: var(--text-color);
          border: 1px solid var(--border-color);
        }

        .reply-btn.secondary:hover {
          background-color: var(--hover-bg);
        }

        @media (max-width: 768px) {
          .main-content.sidebar-open {
            margin-left: 0;
          }

          .content-wrapper {
            padding: 16px;
          }

          .email-stats {
            grid-template-columns: 1fr;
          }

          .email-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .reply-suggestions {
            flex-direction: column;
          }

          .action-buttons {
            flex-direction: column;
          }

          .modal-content {
            width: 95%;
            margin: 20px;
          }

          .reply-actions {
            flex-direction: column;
          }
        }
        }
      `}</style>
    </>
  );
}
