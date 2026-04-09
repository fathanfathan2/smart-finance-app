import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConsultationList.css';

const ConsultationList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const consultants = [
    {
      name: 'Budi Santoso',
      job: 'Perencanaan Keuangan',
      rate: '4.7',
      color: '#dcfce7',
    },
    {
      name: 'Shinta Sriwijaya',
      job: 'Management Hutang',
      rate: '4.8',
      color: '#dbeafe',
    },
    {
      name: 'Andi Wijaya',
      job: 'Investasi Saham',
      rate: '4.9',
      color: '#fef3c7',
    },
    {
      name: 'Rina Permata',
      job: 'Pajak Pribadi',
      rate: '4.6',
      color: '#fee2e2',
    },
  ];

  const filteredConsultants = consultants.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.job.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelect = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/booking/${slug}`);
  };

  return (
    <div className="consultation-container">
      <div className="consultation-header">
        <button
          className="back-btn-circle"
          onClick={() => navigate('/dashboard')}
        >
          ←
        </button>
        <h2>Konsultasi Keuangan</h2>
      </div>

      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Cari nama atau spesialisasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="consultant-list">
        {filteredConsultants.length > 0 ? (
          filteredConsultants.map((item, index) => (
            <div className="consultant-card" key={index}>
              <div
                className="avatar-box"
                style={{ backgroundColor: item.color }}
              >
                {item.name.charAt(0)}
              </div>
              <div className="consultant-info">
                <h4>{item.name}</h4>
                <p>{item.job}</p>
                <div className="rating-tag">★ {item.rate}</div>
              </div>
              <button
                className="select-btn"
                onClick={() => handleSelect(item.name)}
              >
                Pilih
              </button>
            </div>
          ))
        ) : (
          <p className="no-result">Konsultan tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default ConsultationList;
