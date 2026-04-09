import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BookingConsultation.css';

const BookingConsultation = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  const consultantName = name
    ? name
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Konsultan';

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const timeSlots = ['09:00', '10:00', '13:00', '15:00', '19:00'];

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Silakan pilih tanggal dan waktu terlebih dahulu');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Sesi Anda berakhir, silakan login kembali.');
      navigate('/');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          consultant_id: 1,
          booking_date: selectedDate,
          booking_time: selectedTime,
          total_price: 150000,
          status: 'pending',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Booking Berhasil dengan ${consultantName}!`);
        navigate('/dashboard');
      } else {
        alert(result.message || 'Validasi gagal: Cek kembali data Anda');
      }
    } catch (error) {
      alert('Gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        <button
          className="back-btn-circle"
          onClick={() => navigate('/consultation')}
        >
          ←
        </button>
        <h2>Jadwal Konsultasi</h2>
      </div>

      <div className="booking-card">
        <div className="consultant-preview">
          <div className="preview-avatar">{consultantName.charAt(0)}</div>
          <div>
            <h3>{consultantName}</h3>
            <p>Spesialis Keuangan</p>
          </div>
        </div>

        <div className="booking-section">
          <label>Pilih Tanggal</label>
          <input
            type="date"
            className="date-input"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="booking-section">
          <label>Pilih Waktu</label>
          <div className="time-grid">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                className={`time-btn ${selectedTime === time ? 'active' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="booking-summary">
          <div className="summary-row">
            <span>Biaya Sesi (60 Menit)</span>
            <span>Rp 150.000</span>
          </div>
          <div className="summary-row total">
            <span>Total Pembayaran</span>
            <span>Rp 150.000</span>
          </div>
        </div>

        <button
          className="confirm-btn"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? 'Memproses...' : 'Konfirmasi & Bayar'}
        </button>
      </div>
    </div>
  );
};

export default BookingConsultation;
