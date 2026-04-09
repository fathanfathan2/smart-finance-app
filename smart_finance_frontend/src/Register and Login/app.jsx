import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import './style.css';

import Dashboard from '../dashboard/dashboard.jsx';
import FinancialHealth from '../financialHealth/financialHealth.jsx';
import ConsultationList from '../consultation/consultationList.jsx';
import BookingConsultation from '../consultation/bookingConsultation.jsx';
import EducationPage from '../education/educationPage.jsx';
import UserProfile from '../profile/userProfile.jsx';

import logo from '../assets/bar-chart.png';
import hideIcon from '../assets/hide.png';
import viewIcon from '../assets/view.png';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'register';

    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/${endpoint}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            isLogin ? { email, password } : { name, email, password },
          ),
        },
      );

      const result = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('token', result.token || result.data?.token);
          navigate('/dashboard');
        } else {
          alert('Registrasi berhasil, silakan login!');
          setIsLogin(true);
        }
      } else {
        alert(result.message || 'Proses gagal');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Koneksi ke server gagal!');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-logo">
          <img src={logo} alt="logo" className="logo-img" />
          <span>Smart Finance</span>
        </div>

        <div className="auth-card">
          <h2 className="auth-title">{isLogin ? 'Masuk' : 'Daftar Akun'}</h2>

          <form className="auth-form-content" onSubmit={handleAuth}>
            {!isLogin && (
              <div className="auth-input-group">
                <label className="auth-label">Nama Lengkap</label>
                <div className="auth-input-box">
                  <input
                    type="text"
                    placeholder="Masukkan nama Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="auth-input-group">
              <label className="auth-label">Email</label>
              <div className="auth-input-box">
                <input
                  type="email"
                  placeholder="contoh@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Kata Sandi</label>
              <div className="auth-input-box">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="auth-icon-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img src={showPassword ? hideIcon : viewIcon} alt="toggle" />
                </div>
              </div>
            </div>

            <div className="auth-action-group">
              <button type="submit" className="auth-btn auth-btn-primary">
                {isLogin ? 'Masuk' : 'Daftar Sekarang'}
              </button>
            </div>
          </form>
        </div>

        <div className="auth-switch-container">
          <span
            className="auth-switch-text"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? 'Belum punya akun? Daftar di sini'
              : 'Sudah punya akun? Login di sini'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health-check" element={<FinancialHealth />} />
        <Route path="/consultation" element={<ConsultationList />} />
        <Route path="/booking/:name" element={<BookingConsultation />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}
