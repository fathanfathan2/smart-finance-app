import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'Loading...',
    email: '...',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/dashboard', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        if (response.ok) {
          setUserData({
            name: result.user?.name || 'User',
            email: result.user?.email || 'user@mail.com',
          });
        }
      } catch (error) {
        console.error('Fetch profile error:', error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="profile-container">
      <div className="health-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          ←
        </button>
        <h2>Profil Saya</h2>
      </div>

      <div className="user-info-card">
        <div className="profile-img">
          {/* Menampilkan inisial jika tidak ada gambar */}
          <span className="profile-initial">{userData.name.charAt(0)}</span>
        </div>
        <h3 style={{ margin: 0 }}>{userData.name}</h3>
        <p style={{ color: '#64748b', fontSize: '14px' }}>{userData.email}</p>
        <button className="edit-profile-btn">Edit Profil</button>
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
          <span>🌐 Bahasa</span> <span>›</span>
        </div>
        <div className="menu-item logout-item" onClick={handleLogout}>
          <span>🚪 Logout</span> <span>›</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
