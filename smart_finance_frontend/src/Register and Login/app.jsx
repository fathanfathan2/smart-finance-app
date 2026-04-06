import React, { useState } from 'react';

import barChart from '../assets/bar-chart.png';
import hideIcon from '../assets/hide.png';
import viewIcon from '../assets/view.png';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container">
      <div className="logo">
        <img src={barChart} alt="Logo" className="logo-icon" />
        <span>Smart Finance</span>
      </div>

      <div className="card">{isLogin ? <Login /> : <Register />}</div>

      <div className="switch" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Login'}
      </div>
    </div>
  );
}

/* LOGIN */
function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/src/dashboard/dashboard.html';
      } else {
        alert(data.message || 'Login Gagal!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Koneksi ke server gagal. Pastikan Back-End sudah menyala!');
    }
  };

  return (
    <>
      <div className="title">Selamat datang kembali</div>

      <div className="input-group">
        <label className="label">Email</label>
        <div className="input-box">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="input-group">
        <label className="label">Password</label>
        <div className="input-box">
          <input
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="icon-right" onClick={() => setShow(!show)}>
            <img src={show ? hideIcon : viewIcon} className="eye-icon" />
          </span>
        </div>
      </div>

      <div className="small-text">Lupa password?</div>

      <button onClick={handleLogin} className="btn">
        Masuk
      </button>

      <div className="divider">
        <span>atau</span>
      </div>

      <button className="google-btn">Login dengan Google</button>
    </>
  );
}

/* REGISTER */
function Register() {
  const [show, setShow] = useState(false);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name: nama,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Registrasi Berhasil! Silakan Login.');
        window.location.reload();
      } else {
        console.log('Detail Error:', data);
        alert(data.message || 'Validasi Gagal');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal terhubung ke server.');
    }
  };

  return (
    <>
      <div className="title">Buat Akun Baru</div>

      <div className="input-group">
        <label className="label">Nama Lengkap</label>
        <div className="input-box">
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
      </div>

      <div className="input-group">
        <label className="label">Email</label>
        <div className="input-box">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="input-group">
        <label className="label">Password</label>
        <div className="input-box">
          <input
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="icon-right" onClick={() => setShow(!show)}>
            <img src={show ? hideIcon : viewIcon} className="eye-icon" />
          </span>
        </div>
      </div>

      <button onClick={handleRegister} className="btn">
        Daftar
      </button>

      <div className="divider">
        <span>atau</span>
      </div>

      <button className="google-btn">Login dengan Google</button>
    </>
  );
}

export default App;
