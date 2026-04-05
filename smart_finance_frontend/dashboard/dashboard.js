const { useState } = React;

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header toggle={() => setOpen(!open)} />
      <Sidebar open={open} />

      {open && (
        <div className="overlay" onClick={() => setOpen(false)}></div>
      )}


      <Card 
        img="../assets/Rectangle5.png"
        title="Edukasi Finansial"
        desc="Belajar dari artikel keuangan"
        btn="Lihat Artikel"
      />

      <Card 
        img="../assets/Rectangle6.png"
        title="Financial Health Check"
        desc="Cek kesehatan keuanganmu"
        btn="Mulai Tes"
      />

      <Card 
        img="../assets/Rectangle8.png"
        title="Konsultasi Keuangan"
        desc="Bicara dengan konsultan"
        btn="Mulai Konsultan"
      />

      <Card 
        img="../assets/Rectangle7.png"
        title="Insight Data"
        desc="Lihat analisis keuanganmu"
        btn="Lihat Insight"
      />
    </>
  );
}

function Header({ toggle }) {
  return (
    <div className="header">
      <div className="burger" onClick={toggle}>☰</div>

      <div className="header-text">
        <div className="title"><b>Halo, Jiunn</b></div>
        <div className="subtitle">Selamat datang kembali!</div>
      </div>

      <img src="../assets/account.png" className="profile" />
    </div>
  );
}

function Sidebar({ open }) {
  return (
    <div className={`sidebar ${open ? "active" : ""}`}>
      <h3>Menu</h3>
      <p>🏠 Beranda</p>
      <p>📚 Edukasi</p>
      <p>📊 Health</p>
      <p>💬 Konsultasi</p>
    </div>
  );
}

function Card({ img, title, desc, btn }) {
  return (
    <div className="card">
      <img src={img} />
      <div className="card-content">
        <div className="card-title">{title}</div>
        <div className="card-desc">{desc}</div>
        <button>{btn}</button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));