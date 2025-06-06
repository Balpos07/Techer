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
import '../styles/Settings.css'; // Assuming you have a CSS file for styles

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

    
    </>
  );
}