import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';

import rect5 from '../assets/Rectangle5.png';
import rect6 from '../assets/Rectangle6.png';
import rect8 from '../assets/Rectangle8.png';
import accountIcon from '../assets/account.png';

function Dashboard() {
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
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
          setUserName(result.user?.name || 'User');
        } else {
          localStorage.removeItem('token');
          navigate('/');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchProfile();
  }, [navigate]);

  return (
    <div className="db-main-wrapper">
      <Header name={userName} />

      <div className="db-content-container">
        <div className="db-grid">
          <Card
            img={rect5}
            title="Edukasi Finansial"
            desc="Belajar dari artikel keuangan"
            btn="Lihat Artikel"
            link="/education"
          />
          <Card
            img={rect6}
            title="Financial Health Check"
            desc="Cek kesehatan keuanganmu"
            btn="Mulai Tes"
            link="/health-check"
          />
          <Card
            img={rect8}
            title="Konsultasi Keuangan"
            desc="Bicara dengan konsultan"
            btn="Mulai Konsultan"
            link="/consultation"
          />
        </div>
      </div>
    </div>
  );
}

function Header({ name }) {
  return (
    <div className="db-header">
      <div className="db-header-info">
        <h2 className="db-welcome-title">Halo, {name}</h2>
        <p className="db-welcome-subtitle">Selamat datang kembali!</p>
      </div>
      <div className="db-profile-section">
        <Link to="/profile">
          <img src={accountIcon} className="db-profile-img" alt="Profile" />
        </Link>
      </div>
    </div>
  );
}

function Card({ img, title, desc, btn, link }) {
  return (
    <div className="db-card">
      <div className="db-card-image">
        <img src={img} alt={title} />
      </div>
      <div className="db-card-body">
        <h3 className="db-card-title">{title}</h3>
        <p className="db-card-desc">{desc}</p>
        <Link to={link}>
          <button className="db-card-btn">{btn}</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
