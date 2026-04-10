import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './educationPage.css';

const EducationPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Hutang', 'Investasi', 'Tabungan', 'Pajak'];

  const articles = [
    {
      id: 1,
      title: '10 Cara Melunasi Hutang dengan Cepat',
      category: 'Hutang',
      readTime: '5 min read',
      image:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400',
      link: 'https://www.megasyariah.co.id/id/artikel/edukasi-tips/simpanan/cara-melunasi-hutang',
    },
    {
      id: 2,
      title: 'Investasi Saham untuk Pemula',
      category: 'Investasi',
      readTime: '8 min read',
      image:
        'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400',
      link: 'https://mediakeuangan.kemenkeu.go.id/article/show/7-tips-memulai-investasi-saham-bagi-pemula',
    },
    {
      id: 3,
      title: 'Pentingnya Dana Darurat',
      category: 'Tabungan',
      readTime: '4 min read',
      image:
        'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80&w=400',
      link: 'https://mediakeuangan.kemenkeu.go.id/article/show/dana-darurat-apakah-penting',
    },
    {
      id: 4,
      title: 'Mengenal Pajak Penghasilan PPh 21',
      category: 'Pajak',
      readTime: '6 min read',
      image:
        'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&q=80&w=400',
      link: 'https://klikpajak.id/blog/pajak-penghasilan-jenis-pph-objek-subjek-tarif-perhitungan/',
    },
  ];

  const filteredArticles =
    activeCategory === 'Semua'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const handleCardClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="education-container">
      {/* Header di luar wrapper animasi agar diam */}
      <div className="education-header">
        <button
          className="back-btn-circle"
          onClick={() => navigate('/dashboard')}
        >
          ←
        </button>
        <h2>Edukasi Finansial</h2>
      </div>

      {/* Wrapper ini yang akan bergerak naik saat load */}
      <div className="education-content-wrapper">
        <div className="category-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="article-grid">
          {filteredArticles.map((article) => (
            <div
              className="article-card"
              key={article.id}
              onClick={() => handleCardClick(article.link)}
            >
              <div
                className="article-image"
                style={{ backgroundImage: `url(${article.image})` }}
              >
                <span className="category-tag">{article.category}</span>
              </div>
              <div className="article-content">
                <h4>{article.title}</h4>
                <p>{article.readTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
