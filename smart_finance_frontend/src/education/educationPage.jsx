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
      title: '5 Cara Melunasi Hutang dengan Cepat',
      category: 'Hutang',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
    },
    {
      id: 2,
      title: 'Investasi Saham untuk Pemula',
      category: 'Investasi',
      readTime: '8 min read',
      image:
        'https://images.unsplash.com/photo-1611974714656-718f3a0f9bb7?w=400',
    },
    {
      id: 3,
      title: 'Pentingnya Dana Darurat',
      category: 'Tabungan',
      readTime: '4 min read',
      image:
        'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=400',
    },
    {
      id: 4,
      title: 'Mengenal Pajak Penghasilan PPh 21',
      category: 'Pajak',
      readTime: '6 min read',
      image:
        'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?w=400',
    },
  ];

  const filteredArticles =
    activeCategory === 'Semua'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="education-container">
      <div className="education-header">
        <button
          className="back-btn-circle"
          onClick={() => navigate('/dashboard')}
        >
          ←
        </button>
        <h2>Edukasi Finansial</h2>
      </div>

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
          <div className="article-card" key={article.id}>
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
  );
};

export default EducationPage;
