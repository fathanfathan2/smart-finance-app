import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './dashboard.css';

import rect5 from '../assets/Rectangle5.png';
import rect6 from '../assets/Rectangle6.png';
import rect7 from '../assets/Rectangle7.png';
import rect8 from '../assets/Rectangle8.png';
import accountIcon from '../assets/account.png';

function App() {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/';
          return;
        }

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
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Header name={userName} toggle={() => setOpen(!open)} />
      <Sidebar open={open} />
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
      <div className="content-container">
        <Card
          img={rect5}
          title="Edukasi Finansial"
          desc="Belajar dari artikel keuangan"
          btn="Lihat Artikel"
        />
        <Card
          img={rect6}
          title="Financial Health Check"
          desc="Cek kesehatan keuanganmu"
          btn="Mulai Tes"
        />
        <Card
          img={rect8}
          title="Konsultasi Keuangan"
          desc="Bicara dengan konsultan"
          btn="Mulai Konsultan"
        />
        <Card
          img={rect7}
          title="Insight Data"
          desc="Lihat analisis keuanganmu"
          btn="Lihat Insight"
        />
      </div>
    </>
  );
}

function Header({ toggle, name }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  return (
    <div className="header">
      <div className="burger" onClick={toggle}>
        ☰
      </div>
      <div className="header-text">
        <div className="title">
          <b>Halo, {name}</b>
        </div>
        <div className="subtitle">Selamat datang kembali!</div>
      </div>
      <div
        className="profile-container"
        style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
      >
        <button
          onClick={handleLogout}
          style={{
            padding: '5px 10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#ff4d4d',
            color: 'white',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Logout
        </button>
        <img src={accountIcon} className="profile" alt="Profile" />
      </div>
    </div>
  );
}

function Sidebar({ open }) {
  return (
    <div className={`sidebar ${open ? 'active' : ''}`}>
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <div className="sidebar-menu">
        <p>🏠 Beranda</p>
        <p>📚 Edukasi</p>
        <p>📊 Health Check</p>
        <p>💬 Konsultasi</p>
        <p>📈 Insight</p>
      </div>
    </div>
  );
}

function Card({ img, title, desc, btn }) {
  return (
    <div className="card">
      <img src={img} alt={title} />
      <div className="card-content">
        <div className="card-title">{title}</div>
        <div className="card-desc">{desc}</div>
        <button className="card-btn">{btn}</button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

export default App;
