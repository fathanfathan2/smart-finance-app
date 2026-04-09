import React from 'react';
import './UserProfile.css';

const UserProfile = () => {
  return (
    <div className="profile-container">
      <div className="health-header">
        <button className="back-button">←</button>
        <h2>Profil Saya</h2>
      </div>
      <div className="user-info-card">
        <div className="profile-img"></div>
        <h3 style={{ margin: 0 }}>Velicia</h3>
        <p style={{ color: '#64748b', fontSize: '14px' }}>velicia@gmail.com</p>
        <button
          style={{
            marginTop: '10px',
            padding: '6px 15px',
            borderRadius: '20px',
            border: '1px solid #2d6a4f',
            background: 'none',
            color: '#2d6a4f',
          }}
        >
          Edit Profil
        </button>
      </div>
      <div className="menu-list">
        <div className="menu-item">
          <span>⚙️ Pengaturan</span> <span>›</span>
        </div>
        <div className="menu-item">
          <span>🔒 Password</span> <span>›</span>
        </div>
        <div className="menu-item">
          <span>🔔 Notifikasi</span> <span>›</span>
        </div>
        <div className="menu-item">
          <span>🌐 Language</span> <span>›</span>
        </div>
        <div className="menu-item logout">
          <span>🚪 Logout</span> <span>›</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
