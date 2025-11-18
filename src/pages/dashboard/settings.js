import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import '../../css/dash/Settings.css';

const Settings = () => {
  const handleLogout = () => {
    // Logika logout di sini
    if (window.confirm('Are you sure you want to logout?')) {
      console.log('User logged out');
      // Redirect ke halaman login atau lakukan cleanup session
      // window.location.href = '/login';
    }
  };

  return (
    <div className="settings-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>Settings</h1>
          <p>Manage your account settings and preferences</p>
        </div>
      </div>

      {/* Settings Content */}
      <div className="settings-content">
        {/* Danger Zone Section */}
        <div className="settings-section danger-zone">
          <div className="section-header">
            <FontAwesomeIcon icon={faExclamationTriangle} className="section-icon danger" />
            <div className="section-title">
              <h3>Danger Zone</h3>
              <p>Irreversible and destructive actions</p>
            </div>
          </div>

          <div className="section-content">
            <div className="logout-card">
              <div className="logout-info">
                <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
                <div className="logout-details">
                  <h4>Logout</h4>
                  <p>Sign out from your account. You will need to login again to access your images.</p>
                </div>
              </div>
              <button 
                className="logout-btn"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Empty State untuk section lainnya */}
        <div className="settings-section">
          <div className="section-header">
            <div className="section-title">
              <h3>Other Settings</h3>
              <p>Additional settings will be available soon</p>
            </div>
          </div>
          <div className="section-content">
            <div className="empty-state">
              <p>No additional settings available at the moment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;