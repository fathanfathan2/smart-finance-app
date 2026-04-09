import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './FinancialHealth.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const FinancialHealth = () => {
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [data, setData] = useState({
    income: 0,
    expense: 0,
    debt: 0,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: Number(e.target.value) });
  };

  const handleCalculate = async () => {
    if (data.income <= 0) {
      alert('Mohon masukkan pendapatan yang valid');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3000/api/health-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          monthly_income: data.income,
          monthly_expenses: data.expense,
          monthly_debt_payment: data.debt,
          total_debt: 0,
          emergency_fund: 0,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setApiResponse(result.data.result);
        setShowResult(true);
      } else {
        alert(result.message || 'Validasi gagal');
      }
    } catch (error) {
      alert('Gagal terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Sisa', 'Pengeluaran', 'Cicilan'],
    datasets: [
      {
        data: [
          Math.max(0, data.income - data.expense - data.debt),
          data.expense,
          data.debt,
        ],
        backgroundColor: ['#10b981', '#3b82f6', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="financial-health-container">
      <div className="health-header">
        <button
          className="back-button"
          onClick={() =>
            showResult ? setShowResult(false) : navigate('/dashboard')
          }
        >
          ←
        </button>
        <h2>{showResult ? 'Hasil Analisis' : 'Financial Health Check'}</h2>
      </div>

      {!showResult ? (
        <div className="health-card">
          <div className="health-main-info">
            <div className="health-icon">💙</div>
            <div>
              <h4 style={{ margin: 0 }}>Cek Kesehatan Keuangan</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                Masukkan data bulanan Anda
              </p>
            </div>
          </div>

          <div className="field-group">
            <label>Pendapatan Bulanan (Rp)</label>
            <input
              type="number"
              name="income"
              placeholder="Contoh: 8000000"
              onChange={handleChange}
            />
          </div>

          <div className="field-group">
            <label>Pengeluaran Bulanan (Rp)</label>
            <input
              type="number"
              name="expense"
              placeholder="Contoh: 5000000"
              onChange={handleChange}
            />
          </div>

          <div className="field-group">
            <label>Cicilan / Hutang (Rp)</label>
            <input
              type="number"
              name="debt"
              placeholder="Contoh: 1500000"
              onChange={handleChange}
            />
          </div>

          <button
            className="calculate-btn"
            onClick={handleCalculate}
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Hitung Kondisi Keuangan'}
          </button>
        </div>
      ) : (
        <div className="health-card">
          <div className="chart-container">
            <Pie data={chartData} />
          </div>

          <div className="result-score">
            <p>Skor Kesehatan Finansial</p>
            <h1>{apiResponse?.score}</h1>
            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>
              DTI Ratio: {apiResponse?.debt_to_income_ratio}%
            </p>
          </div>

          <div
            className="status-box"
            style={{
              backgroundColor:
                apiResponse?.status === 'Sehat' ? '#dcfce7' : '#fee2e2',
              borderLeft: `5px solid ${apiResponse?.status === 'Sehat' ? '#2d6a4f' : '#b91c1c'}`,
            }}
          >
            <strong
              style={{
                color: apiResponse?.status === 'Sehat' ? '#2d6a4f' : '#b91c1c',
              }}
            >
              Status: {apiResponse?.status}
            </strong>
            <p
              className="advice-text"
              style={{ fontSize: '13px', marginTop: '5px' }}
            >
              {apiResponse?.recommendation}
            </p>
          </div>

          <button
            className="calculate-btn"
            style={{ marginTop: '20px' }}
            onClick={() => navigate('/consultation')}
          >
            Konsultasi dengan Ahli
          </button>
        </div>
      )}
    </div>
  );
};

export default FinancialHealth;
