import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Moon,
  Globe,
  Key,
  Mail,
  Camera,
  SettingsIcon,
  Link,
  Brain,
  CreditCard,
  Download,
  Trash2,
  Check,
  X,
  Upload,
  Clock
} from 'lucide-react';

export default function Settings({ isSidebarOpen, isDarkMode }) {
  const [profile, setProfile] = useState({
    name: 'Ayomiposi Balogun',
    email: 'ayomiposi.balogun@example.com',
    photo: null
  });

  const [integrations, setIntegrations] = useState({
    gmail: { connected: true, email: 'ayomiposi.balogun@gmail.com' },
    zoom: { connected: false },
    meet: { connected: false },
    notion: { connected: false, comingSoon: true },
    slack: { connected: false, comingSoon: true }
  });

  const [aiPreferences, setAiPreferences] = useState({
    replyTone: 'Friendly',
    replyLength: 'Medium',
    taskLabeling: 'Automatic'
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleIntegrationToggle = (service) => {
    if (integrations[service].comingSoon) return;
    
    setIntegrations(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        connected: !prev[service].connected
      }
    }));
  };

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAiPreferenceUpdate = (field, value) => {
    setAiPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="content-wrapper">
          <div className="page-header">
            <h1 className="page-title">Settings</h1>
            <p className="page-description">Manage your account preferences and system settings</p>
          </div>

          <div className="settings-grid">
            {/* Profile Settings */}
            <div className="settings-section">
              <h2 className="section-title">
                <User size={20} />
                Profile Settings
              </h2>
              <div className="setting-items">
                <div className="setting-item profile-photo">
                  <div className="setting-info">
                    <h3>Profile Photo</h3>
                    <p>Upload a profile picture to personalize your account</p>
                  </div>
                  <div className="photo-section">
                    <div className="photo-placeholder">
                      {profile.photo ? (
                        <img src={profile.photo} alt="Profile" className="profile-img" />
                      ) : (
                        <User size={40} />
                      )}
                    </div>
                    <button className="setting-button secondary">
                      <Camera size={16} />
                      Upload Photo
                    </button>
                  </div>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Full Name</h3>
                    <p>Your display name across the platform</p>
                  </div>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => handleProfileUpdate('name', e.target.value)}
                    className="setting-input"
                  />
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Email Address</h3>
                    <p>Your primary email for notifications and login</p>
                  </div>
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                    className="setting-input"
                  />
                </div>
              </div>
            </div>

            {/* Integration Management */}
            <div className="settings-section">
              <h2 className="section-title">
                <Link size={20} />
                Integration Management
              </h2>
              <div className="setting-items">
                <div className="setting-item integration-item">
                  <div className="integration-info">
                    <div className="integration-header">
                      <Mail size={16} />
                      <h3>Gmail</h3>
                      {integrations.gmail.connected && (
                        <span className="status-badge connected">Connected</span>
                      )}
                    </div>
                    <p>{integrations.gmail.connected ? 
                      `Connected to ${integrations.gmail.email}` : 
                      'Connect your Gmail account for email management'
                    }</p>
                  </div>
                  <button 
                    className={`setting-button ${integrations.gmail.connected ? 'danger' : ''}`}
                    onClick={() => handleIntegrationToggle('gmail')}
                  >
                    {integrations.gmail.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>

                <div className="setting-item integration-item">
                  <div className="integration-info">
                    <div className="integration-header">
                      <Settings size={16} />
                      <h3>Zoom/Meet</h3>
                      <span className="status-badge manual">Manual Upload</span>
                    </div>
                    <p>Upload meeting recordings and transcripts manually</p>
                  </div>
                  <button className="setting-button secondary">
                    <Upload size={16} />
                    Upload Files
                  </button>
                </div>

                <div className="setting-item integration-item">
                  <div className="integration-info">
                    <div className="integration-header">
                      <Settings size={16} />
                      <h3>Notion</h3>
                      <span className="status-badge coming-soon">Coming Soon</span>
                    </div>
                    <p>Sync your Notion workspace for seamless productivity</p>
                  </div>
                  <button className="setting-button disabled" disabled>
                    <Clock size={16} />
                    Coming Soon
                  </button>
                </div>

                <div className="setting-item integration-item">
                  <div className="integration-info">
                    <div className="integration-header">
                      <Settings size={16} />
                      <h3>Slack</h3>
                      <span className="status-badge coming-soon">Coming Soon</span>
                    </div>
                    <p>Connect Slack for team communication management</p>
                  </div>
                  <button className="setting-button disabled" disabled>
                    <Clock size={16} />
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>

            {/* AI Preferences */}
            <div className="settings-section">
              <h2 className="section-title">
                <Brain size={20} />
                AI Preferences
              </h2>
              <div className="setting-items">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Reply Tone</h3>
                    <p>Choose how AI should respond in your communications</p>
                  </div>
                  <select 
                    className="setting-select"
                    value={aiPreferences.replyTone}
                    onChange={(e) => handleAiPreferenceUpdate('replyTone', e.target.value)}
                  >
                    <option value="Friendly">Friendly</option>
                    <option value="Formal">Formal</option>
                    <option value="Assertive">Assertive</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Default Reply Length</h3>
                    <p>Set the preferred length for AI-generated responses</p>
                  </div>
                  <select 
                    className="setting-select"
                    value={aiPreferences.replyLength}
                    onChange={(e) => handleAiPreferenceUpdate('replyLength', e.target.value)}
                  >
                    <option value="Brief">Brief</option>
                    <option value="Medium">Medium</option>
                    <option value="Detailed">Detailed</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Task Labeling Logic</h3>
                    <p>How AI should categorize and label your tasks</p>
                  </div>
                  <select 
                    className="setting-select"
                    value={aiPreferences.taskLabeling}
                    onChange={(e) => handleAiPreferenceUpdate('taskLabeling', e.target.value)}
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="settings-section">
              <h2 className="section-title">
                <Shield size={20} />
                Privacy & Security
              </h2>
              <div className="setting-items">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Password</h3>
                    <p>Change your password and security settings</p>
                  </div>
                  <button className="setting-button">Change Password</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <button className="setting-button">Enable 2FA</button>
                </div>
              </div>
            </div>

            {/* Billing & Subscription */}
            <div className="settings-section">
              <h2 className="section-title">
                <CreditCard size={20} />
                Billing & Subscription
              </h2>
              <div className="setting-items">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Current Plan</h3>
                    <p>Premium Plan - $19.99/month</p>
                  </div>
                  <button className="setting-button">Manage Billing</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Payment Method</h3>
                    <p>**** **** **** 1234 (Visa)</p>
                  </div>
                  <button className="setting-button">Update Payment</button>
                </div>
              </div>
            </div>

            {/* Account Management */}
            <div className="settings-section">
              <h2 className="section-title">
                <SettingsIcon size={20} />
                Account Management
              </h2>
              <div className="setting-items">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Export Data</h3>
                    <p>Download a copy of all your data</p>
                  </div>
                  <button className="setting-button secondary">
                    <Download size={16} />
                    Export Data
                  </button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Delete Account</h3>
                    <p>Permanently delete your account and all data</p>
                  </div>
                  <button 
                    className="setting-button danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <Trash2 size={16} />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Account</h3>
            <p>Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.</p>
            <div className="modal-actions">
              <button 
                className="setting-button secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="setting-button danger">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

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
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .page-title {
          color: var(--page-title);
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .page-description {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .settings-grid {
          display: grid;
          gap: 24px;
        }

        .settings-section {
          background-color: var(--sidebar-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 24px;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-color);
          font-size: 18px;
          margin-bottom: 20px;
        }

        .setting-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: var(--input-bg);
        }

        .setting-item.profile-photo {
          align-items: flex-start;
        }

        .setting-info h3 {
          color: var(--text-color);
          font-size: 16px;
          margin: 0 0 4px 0;
        }

        .setting-info p {
          color: var(--text-secondary);
          font-size: 14px;
          margin: 0;
        }

        .photo-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .photo-placeholder {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          overflow: hidden;
        }

        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .integration-item {
          flex-direction: column;
          align-items: stretch !important;
          gap: 16px;
        }

        .integration-info {
          flex: 1;
        }

        .integration-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .integration-header h3 {
          margin: 0;
        }

        .status-badge {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-badge.connected {
          background-color: #e7f5e7;
          color: #2d7d32;
        }

        .status-badge.manual {
          background-color: #fff3cd;
          color: #856404;
        }

        .status-badge.coming-soon {
          background-color: #e3f2fd;
          color: #1565c0;
        }

        .setting-button {
          padding: 8px 16px;
          background-color: var(--active-color);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .setting-button:hover:not(:disabled) {
          background-color: var(--active-hover);
        }

        .setting-button.secondary {
          background-color: var(--border-color);
          color: var(--text-color);
        }

        .setting-button.secondary:hover {
          background-color: var(--input-bg);
        }

        .setting-button.danger {
          background-color: #dc3545;
        }

        .setting-button.danger:hover {
          background-color: #c82333;
        }

        .setting-button.disabled {
          background-color: var(--border-color);
          color: var(--text-secondary);
          cursor: not-allowed;
        }

        .setting-select {
          padding: 8px 16px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background-color: var(--sidebar-bg);
          color: var(--text-color);
          cursor: pointer;
          min-width: 120px;
        }

        .setting-input {
          padding: 8px 16px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background-color: var(--sidebar-bg);
          color: var(--text-color);
          min-width: 200px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background-color: var(--sidebar-bg);
          border-radius: 12px;
          padding: 24px;
          max-width: 400px;
          width: 90%;
          border: 1px solid var(--border-color);
        }

        .modal h3 {
          color: var(--text-color);
          margin: 0 0 12px 0;
          font-size: 18px;
        }

        .modal p {
          color: var(--text-secondary);
          margin: 0 0 20px 0;
          line-height: 1.5;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .main-content.sidebar-open {
            margin-left: 0;
          }

          .content-wrapper {
            padding: 16px;
          }

          .setting-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .setting-button,
          .setting-select,
          .setting-input {
            width: 100%;
          }

          .photo-section {
            width: 100%;
            justify-content: space-between;
          }

          .integration-item .setting-button {
            align-self: flex-start;
            width: auto;
          }
        }
      `}</style>
    </>
  );
}