import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './insightDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const InsightDashboard = () => {
  const navigate = useNavigate();

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    datasets: [
      {
        fill: true,
        label: 'Rata-rata DTI %',
        data: [30, 32, 35, 33, 40, 35],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#3b82f6',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="insight-container">
      <div className="insight-header">
        <button
          className="back-btn-circle"
          onClick={() => navigate('/dashboard')}
        >
          ←
        </button>
        <h2>Insight Keuangan</h2>
      </div>

      <div className="graph-box">
        <div className="graph-info">
          <h4>Tren DTI Pengguna</h4>
          <p>Rata-rata rasio hutang terhadap pendapatan</p>
        </div>
        <Line data={lineData} options={options} />
      </div>

      <div className="trend-card">
        <h4>Statistik Kondisi Pengguna</h4>
        <div className="trend-list">
          <div className="trend-row">
            <div className="trend-label">
              <span
                className="dot"
                style={{ backgroundColor: '#22c55e' }}
              ></span>
              <span>Kondisi Sehat</span>
            </div>
            <span className="trend-value">30%</span>
          </div>
          <div className="trend-row">
            <div className="trend-label">
              <span
                className="dot"
                style={{ backgroundColor: '#f59e0b' }}
              ></span>
              <span>Kondisi Rawan</span>
            </div>
            <span className="trend-value">36%</span>
          </div>
          <div className="trend-row">
            <div className="trend-label">
              <span
                className="dot"
                style={{ backgroundColor: '#ef4444' }}
              ></span>
              <span>Kondisi Kritis</span>
            </div>
            <span className="trend-value">20%</span>
          </div>
          <div className="trend-row">
            <div className="trend-label">
              <span
                className="dot"
                style={{ backgroundColor: '#94a3b8' }}
              ></span>
              <span>Lainnya</span>
            </div>
            <span className="trend-value">14%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightDashboard;
