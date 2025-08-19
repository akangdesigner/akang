import React, { useState } from 'react';
import './BeadPatterns.css';

const BeadPatterns = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const patterns = [
    {
      id: 1,
      name: '彩虹手鍊',
      category: 'bracelet',
      difficulty: '初級',
      colors: ['#FF6B9D', '#FFE66D', '#4ECDC4', '#FF6B6B', '#9370DB'],
      description: '經典的彩虹色彩搭配，適合初學者'
    },
    {
      id: 2,
      name: '星空項鍊',
      category: 'necklace',
      difficulty: '中級',
      colors: ['#1a1a2e', '#16213e', '#0f3460', '#e94560'],
      description: '深色系星空主題，展現神秘美感'
    },
    {
      id: 3,
      name: '花園耳環',
      category: 'earring',
      difficulty: '中級',
      colors: ['#FF6B9D', '#98FB98', '#FFD700', '#FF69B4'],
      description: '粉色系花朵設計，充滿春天氣息'
    },
    {
      id: 4,
      name: '海洋手環',
      category: 'bracelet',
      difficulty: '初級',
      colors: ['#4ECDC4', '#87CEEB', '#4682B4', '#00CED1'],
      description: '藍色系海洋主題，清涼舒適'
    },
    {
      id: 5,
      name: '日落項鍊',
      category: 'necklace',
      difficulty: '高級',
      colors: ['#FF4500', '#FF6347', '#FFA07A', '#FFD700'],
      description: '暖色系日落漸變，溫暖浪漫'
    },
    {
      id: 6,
      name: '森林戒指',
      category: 'ring',
      difficulty: '中級',
      colors: ['#228B22', '#32CD32', '#98FB98', '#90EE90'],
      description: '綠色系森林主題，自然清新'
    }
  ];

  const categories = [
    { id: 'all', name: '全部', icon: '🌟' },
    { id: 'bracelet', name: '手鍊', icon: '💫' },
    { id: 'necklace', name: '項鍊', icon: '✨' },
    { id: 'earring', name: '耳環', icon: '💎' },
    { id: 'ring', name: '戒指', icon: '💍' }
  ];

  const filteredPatterns = selectedCategory === 'all' 
    ? patterns 
    : patterns.filter(pattern => pattern.category === selectedCategory);

  return (
    <div className="bead-patterns-container">
      <div className="patterns-header">
        <h1>📚 珠子圖案庫</h1>
        <p>探索各種精美的珠子製作圖案和設計靈感</p>
      </div>

      <div className="patterns-content">
        {/* 分類篩選 */}
        <div className="category-filter">
          <h2>選擇分類</h2>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 圖案展示 */}
        <div className="patterns-grid">
          {filteredPatterns.map(pattern => (
            <div key={pattern.id} className="pattern-card">
              <div className="pattern-header">
                <h3>{pattern.name}</h3>
                <span className={`difficulty-badge ${pattern.difficulty}`}>
                  {pattern.difficulty}
                </span>
              </div>
              
              <div className="pattern-colors">
                {pattern.colors.map((color, index) => (
                  <div
                    key={index}
                    className="color-sample"
                    style={{ backgroundColor: color }}
                    title={`顏色 ${index + 1}`}
                  ></div>
                ))}
              </div>
              
              <p className="pattern-description">{pattern.description}</p>
              
              <div className="pattern-actions">
                <button className="action-btn view-btn">
                  👁️ 查看詳情
                </button>
                <button className="action-btn download-btn">
                  📥 下載圖案
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 創建新圖案 */}
        <div className="create-pattern-section">
          <h2>🎨 創建自己的圖案</h2>
          <div className="create-pattern-card">
            <div className="pattern-creator">
              <h3>設計工具</h3>
              <div className="creator-tools">
                <button className="tool-btn">🎨 顏色選擇器</button>
                <button className="tool-btn">📏 尺寸調整</button>
                <button className="tool-btn">🔄 圖案預覽</button>
                <button className="tool-btn">💾 儲存設計</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="patterns-navigation">
        <button className="nav-btn" onClick={() => window.history.back()}>
          ← 返回收納櫃
        </button>
        <button className="nav-btn" onClick={() => window.location.href = '/tutorial'}>
          教學中心 →
        </button>
      </div>
    </div>
  );
};

export default BeadPatterns;
