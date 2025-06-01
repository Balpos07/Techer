import React, { useState } from "react";
import {
  FileText,
  Calendar,
  Users,
  Video,
  Upload,
  Copy,
  Send,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function Meeting({ isSidebarOpen, isDarkMode }) {
  const [dragOver, setDragOver] = useState(false);
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      fileName: "Q4_Planning_Meeting.mp3",
      date: "2025-06-01",
      time: "10:00 AM",
      highlights: [
        "Discussed Q4 budget allocation and resource planning",
        "New product launch timeline confirmed for October",
        "Marketing team to increase social media presence",
      ],
      actionItems: [
        "Sarah to finalize budget proposal by June 5th",
        "Mike to coordinate with design team on product mockups",
        "Lisa to schedule client feedback sessions",
      ],
    },
    {
      id: 2,
      fileName: "Team_Standup_2025-05-31.txt",
      date: "2025-05-31",
      time: "9:00 AM",
      highlights: [
        "Sprint progress review completed",
        "Technical debt prioritization discussed",
        "New team member onboarding scheduled",
      ],
      actionItems: [
        "Deploy hotfix for payment gateway issue",
        "Update project documentation by end of week",
        "Set up development environment for new hire",
      ],
    },
    {
      id: 3,
      fileName: "Client_Review_Meeting.mp4",
      date: "2025-05-30",
      time: "2:30 PM",
      highlights: [
        "Client feedback on prototype was positive",
        "Requested additional features for mobile app",
        "Timeline extension approved for quality improvements",
      ],
      actionItems: [
        "Implement mobile responsiveness improvements",
        "Schedule follow-up demo for next week",
        "Prepare detailed feature specification document",
      ],
    },
  ]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    files.forEach((file) => {
      // Simulate processing
      const newMeeting = {
        id: meetings.length + Math.random(),
        fileName: file.name,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        highlights: ["Processing meeting content..."],
        actionItems: ["AI analysis in progress..."],
      };
      setMeetings((prev) => [newMeeting, ...prev]);
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };

  const copyToClipboard = (meeting) => {
    const content = `Meeting: ${meeting.fileName}
Date: ${meeting.date} at ${meeting.time}

Key Highlights:
${meeting.highlights.map((h) => `• ${h}`).join("\n")}

Action Items:
${meeting.actionItems.map((a) => `• ${a}`).join("\n")}`;

    navigator.clipboard.writeText(content);
    alert("Meeting notes copied to clipboard!");
  };

  const sendToTeam = (meeting) => {
    // This would integrate with your team communication system
    alert(`Sending "${meeting.fileName}" summary to team...`);
  };

  return (
    <div className={`meeting-container ${isDarkMode ? "dark" : "light"}`}>
      <main
        className={`main-content ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="content-wrapper">
          <div className="page-header">
            <h1 className="page-title">Meeting Summaries</h1>
            <p className="page-description">
              AI-powered meeting notes and action items
            </p>
          </div>

          <div className="meeting-stats">
            <div className="stat-card">
              <Calendar size={24} />
              <div className="stat-info">
                <span className="stat-number">{meetings.length}</span>
                <span className="stat-label">Total Meetings</span>
              </div>
            </div>
            <div className="stat-card">
              <FileText size={24} />
              <div className="stat-info">
                <span className="stat-number">
                  {meetings.reduce((acc, m) => acc + m.actionItems.length, 0)}
                </span>
                <span className="stat-label">Action Items</span>
              </div>
            </div>
            <div className="stat-card">
              <Users size={24} />
              <div className="stat-info">
                <span className="stat-number">8</span>
                <span className="stat-label">Participants</span>
              </div>
            </div>
            <div className="stat-card">
              <Video size={24} />
              <div className="stat-info">
                <span className="stat-number">
                  {
                    meetings.filter(
                      (m) =>
                        m.fileName.includes(".mp") ||
                        m.fileName.includes(".avi")
                    ).length
                  }
                </span>
                <span className="stat-label">Recorded Sessions</span>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="upload-section">
            <div
              className={`upload-area ${dragOver ? "drag-over" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input").click()}
            >
              <Upload size={48} />
              <h3>Upload Meeting Recording or Transcript</h3>
              <p>
                Drag & drop your audio files, video recordings, or text
                transcripts here
              </p>
              <p className="upload-formats">
                Supports: MP3, MP4, WAV, TXT, DOCX
              </p>
              <button className="upload-button">Choose Files</button>
              <input
                id="file-input"
                type="file"
                multiple
                accept=".mp3,.mp4,.wav,.txt,.docx"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
            </div>
          </div>

          {/* Meeting History */}
          <div className="meeting-history">
            <h2>Meeting History</h2>
            <div className="meetings-list">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="meeting-card">
                  <div className="meeting-header">
                    <div className="meeting-info">
                      <h3>{meeting.fileName}</h3>
                      <div className="meeting-meta">
                        <span className="meeting-date">
                          <Clock size={16} />
                          {meeting.date} at {meeting.time}
                        </span>
                      </div>
                    </div>
                    <div className="meeting-actions">
                      <button
                        className="action-button copy-button"
                        onClick={() => copyToClipboard(meeting)}
                        title="Copy to Clipboard"
                      >
                        <Copy size={16} />
                        Copy Notes
                      </button>
                      <button
                        className="action-button share-button"
                        onClick={() => sendToTeam(meeting)}
                        title="Send to Team"
                      >
                        <Send size={16} />
                        Send to Team
                      </button>
                    </div>
                  </div>

                  <div className="meeting-content">
                    <div className="highlights-section">
                      <h4>Key Highlights</h4>
                      <ul className="highlights-list">
                        {meeting.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="action-items-section">
                      <h4>Action Items</h4>
                      <ul className="action-items-list">
                        {meeting.actionItems.map((item, index) => (
                          <li key={index}>
                            <CheckCircle size={16} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .meeting-container {
          min-height: 100vh;
        }

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
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .page-title {
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .page-description {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .meeting-stats {
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

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 24px;
          font-weight: bold;
          color: var(--text-color);
        }

        .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Upload Section */
        .upload-section {
          margin-bottom: 32px;
        }

        .upload-area {
          border: 2px dashed var(--border-color);
          border-radius: 12px;
          padding: 48px 24px;
          text-align: center;
          background-color: var(--sidebar-bg);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .upload-area:hover,
        .upload-area.drag-over {
          border-color: #3b82f6;
          background-color: #1f2937;
        }

        .upload-area svg {
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .upload-area h3 {
          color: var(--text-color);
          font-size: 20px;
          margin-bottom: 8px;
        }

        .upload-area p {
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .upload-formats {
          font-size: 12px;
          color: var(--text-secondary);
          opacity: 0.7;
        }

        .upload-button {
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          margin-top: 16px;
          transition: background-color 0.3s ease;
        }

        .upload-button:hover {
          background-color: #2563eb;
        }

        /* Meeting History */
        .meeting-history h2 {
          color: var(--page-title);
          font-size: 24px;
          margin-bottom: 24px;
        }

        .meetings-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .meeting-card {
          background-color: var(--sidebar-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 24px;
        }

        .meeting-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          gap: 16px;
        }

        .meeting-info h3 {
          color: var(--text-color);
          font-size: 18px;
          margin-bottom: 8px;
        }

        .meeting-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
        }

        .meeting-date {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .meeting-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background-color: transparent;
          color: var(--text-color);
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .copy-button:hover {
          background-color: #10b981;
          color: white;
          border-color: #10b981;
        }

        .share-button:hover {
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .meeting-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .highlights-section h4,
        .action-items-section h4 {
          color: var(--text-color);
          font-size: 16px;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .highlights-list,
        .action-items-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .highlights-list li {
          color: var(--text-secondary);
          padding: 8px 0;
          border-bottom: 1px solid var(--border-color);
          position: relative;
          padding-left: 16px;
        }

        .highlights-list li:before {
          content: "•";
          color: #3b82f6;
          position: absolute;
          left: 0;
        }

        .highlights-list li:last-child {
          border-bottom: none;
        }

        .action-items-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: var(--text-secondary);
          padding: 8px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .action-items-list li:last-child {
          border-bottom: none;
        }

        .action-items-list svg {
          color: #10b981;
          margin-top: 2px;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .main-content.sidebar-open {
            margin-left: 0;
          }

          .content-wrapper {
            padding: 16px;
          }

          .meeting-stats {
            grid-template-columns: 1fr;
          }

          .meeting-header {
            flex-direction: column;
            align-items: stretch;
          }

          .meeting-actions {
            justify-content: flex-start;
          }

          .meeting-content {
            grid-template-columns: 1fr;
          }

          .upload-area {
            padding: 32px 16px;
          }

          .action-button {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}
