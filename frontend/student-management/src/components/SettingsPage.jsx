import React, { useState } from 'react';
import '../styles/SettingsPage.css';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    appName: 'StudentHub',
    language: 'English',
    theme: 'Light',
    notifications: true,
    autoSave: true,
    dataBackup: true,
    emailAlerts: false,
    darkMode: false
  });

  const [savedMessage, setSavedMessage] = useState('');

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    setSavedMessage('Settings saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>⚙️ Settings & Preferences</h1>
        <p>Manage your system configuration and preferences</p>
      </div>

      {savedMessage && (
        <div className="success-alert">
          ✓ {savedMessage}
        </div>
      )}

      <div className="settings-container">
        {/* Application Settings */}
        <section className="settings-section">
          <div className="section-header">
            <h2>🎨 Application Settings</h2>
            <p>Customize your application experience</p>
          </div>

          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-label">
                <h3>Application Name</h3>
                <p>Name of your system</p>
              </div>
              <input
                type="text"
                value={settings.appName}
                onChange={(e) => handleChange('appName', e.target.value)}
                className="setting-input"
              />
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <h3>Language</h3>
                <p>Select your preferred language</p>
              </div>
              <select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="setting-select"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <h3>Theme</h3>
                <p>Choose color theme</p>
              </div>
              <select
                value={settings.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                className="setting-select"
              >
                <option>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="settings-section">
          <div className="section-header">
            <h2>🔔 Notification Settings</h2>
            <p>Control how and when you receive notifications</p>
          </div>

          <div className="settings-group">
            <div className="toggle-item">
              <div className="toggle-label">
                <h3>In-App Notifications</h3>
                <p>Show notifications within the application</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={() => handleToggle('notifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-label">
                <h3>Email Alerts</h3>
                <p>Receive important updates via email</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.emailAlerts}
                  onChange={() => handleToggle('emailAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </section>

        {/* Data & Privacy Settings */}
        <section className="settings-section">
          <div className="section-header">
            <h2>🔒 Data & Privacy</h2>
            <p>Manage your data and privacy preferences</p>
          </div>

          <div className="settings-group">
            <div className="toggle-item">
              <div className="toggle-label">
                <h3>Auto-Save Data</h3>
                <p>Automatically save changes every minute</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={() => handleToggle('autoSave')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-label">
                <h3>Automatic Backup</h3>
                <p>Backup your data daily at 2:00 AM</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.dataBackup}
                  onChange={() => handleToggle('dataBackup')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </section>

        {/* Account Settings */}
        <section className="settings-section">
          <div className="section-header">
            <h2>👤 Account Settings</h2>
            <p>Manage your account information</p>
          </div>

          <div className="settings-group">
            <div className="action-box">
              <div>
                <h3>Change Password</h3>
                <p>Update your account password</p>
              </div>
              <button className="btn btn-secondary">Change Password</button>
            </div>

            <div className="action-box">
              <div>
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
              </div>
              <button className="btn btn-secondary">Enable 2FA</button>
            </div>

            <div className="action-box">
              <div>
                <h3>Export Data</h3>
                <p>Download all your data in a single file</p>
              </div>
              <button className="btn btn-secondary">Export Data</button>
            </div>
          </div>
        </section>

        {/* System Information */}
        <section className="settings-section">
          <div className="section-header">
            <h2>ℹ️ System Information</h2>
            <p>System details and version information</p>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Application Version</span>
              <span className="info-value">v1.0.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Updated</span>
              <span className="info-value">March 30, 2026</span>
            </div>
            <div className="info-item">
              <span className="info-label">API Version</span>
              <span className="info-value">v1.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Database</span>
              <span className="info-value">Connected</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status</span>
              <span className="info-value">Active</span>
            </div>
            <div className="info-item">
              <span className="info-label">Uptime</span>
              <span className="info-value">99.9%</span>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="settings-section settings-actions">
          <button className="btn btn-primary btn-lg" onClick={handleSave}>
            💾 Save Settings
          </button>
          <button className="btn btn-secondary btn-lg">
            ↺ Reset to Default
          </button>
        </section>
      </div>
    </div>
  );
}
