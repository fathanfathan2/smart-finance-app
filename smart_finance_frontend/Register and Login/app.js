const { useState } = React;

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container">
      <div className="logo">
        <img src="../assets/bar-chart.png" alt="Logo" className="logo-icon" />
        <span>Smart Finance</span>
      </div>

      <div className="card">
        {isLogin ? <Login /> : <Register />}
      </div>

      <div className="switch" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Belum punya akun? Daftar" : "Sudah punya akun? Login"}
      </div>
    </div>
  );
}

/* LOGIN */
function Login() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="title">Selamat datang kembali</div>

      <div className="input-group">
        <label className="label">Email</label>
        <div className="input-box">
          <input type="email" />
        </div>
      </div>

      <div className="input-group">
        <label className="label">Password</label>
        <div className="input-box">
          <input type={show ? "text" : "password"} />
          <span className="icon-right" onClick={() => setShow(!show)}>
            <img src={show ? "../assets/hide.png" : "../assets/view.png"} className="eye-icon" />
          </span>
        </div>
      </div>

      <div className="small-text">Lupa password?</div>

      <button onClick={() => window.location.href = "../dashboard/dashboard.html"} className="btn">Masuk</button>

      <div className="divider"><span>atau</span></div>

      <button className="google-btn">Login dengan Google</button>
    </>
  );
}

/* REGISTER */
function Register() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="title">Buat Akun Baru</div>

      <div className="input-group">
        <label className="label">Nama Lengkap</label>
        <div className="input-box">
          <input type="text" />
        </div>
      </div>

      <div className="input-group">
        <label className="label">Email</label>
        <div className="input-box">
          <input type="email" />
        </div>
      </div>

      <div className="input-group">
        <label className="label">Password</label>
        <div className="input-box">
          <input type={show ? "text" : "password"} />
          <span className="icon-right" onClick={() => setShow(!show)}>
            <img src={show ? "../assets/hide.png" : "../assets/view.png"} className="eye-icon" />
          </span>
        </div>
      </div>

      <button className="btn">Daftar</button>

      <div className="divider"><span>atau</span></div>

      <button className="google-btn">Login dengan Google</button>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);