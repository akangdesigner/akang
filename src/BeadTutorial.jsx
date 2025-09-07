import React from 'react';
import './BeadTutorial.css';
import IconComponent from './IconComponent';

const BeadTutorial = () => {
  return (
    <div className="bead-tutorial-container">
      <div className="tutorial-header">
        <h1><IconComponent name="art-palette" size={32} /> 珠子製作教學</h1>
        <p>學習各種珠子製作技巧和工藝</p>
      </div>
      
      <div className="tutorial-content">
        <div className="tutorial-section">
          <h2>📋 基礎工具</h2>
          <div className="tools-grid">
            <div className="tool-item">
              <div className="tool-icon">🔧</div>
              <h3>鉗子</h3>
              <p>用於彎曲和切割金屬線</p>
            </div>
            <div className="tool-item">
              <div className="tool-icon">
                <IconComponent name="art-palette" size={24} />
              </div>
              <h3>剪刀</h3>
              <p>裁剪線材和布料</p>
            </div>
            <div className="tool-item">
              <div className="tool-icon">📏</div>
              <h3>尺子</h3>
              <p>測量珠子和線材長度</p>
            </div>
            <div className="tool-item">
              <div className="tool-icon">🧵</div>
              <h3>線材</h3>
              <p>串珠用的各種線材</p>
            </div>
          </div>
        </div>

        <div className="tutorial-section">
          <h2><IconComponent name="target" size={24} /> 基礎技巧</h2>
          <div className="techniques-grid">
            <div className="technique-card">
              <h3>串珠技巧</h3>
              <ol>
                <li>選擇合適的線材</li>
                <li>準備珠子順序</li>
                <li>開始串珠</li>
                <li>固定結尾</li>
              </ol>
            </div>
            <div className="technique-card">
              <h3>編織技巧</h3>
              <ol>
                <li>學習基本結</li>
                <li>掌握編織圖案</li>
                <li>調整鬆緊度</li>
                <li>完成作品</li>
              </ol>
            </div>
            <div className="technique-card">
              <h3>設計原則</h3>
              <ol>
                <li>色彩搭配</li>
                <li>形狀平衡</li>
                <li>尺寸比例</li>
                <li>整體和諧</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="tutorial-section">
          <h2><IconComponent name="book-guide" size={24} /> 進階課程</h2>
          <div className="courses-grid">
            <div className="course-card">
              <h3>玻璃珠製作</h3>
              <p>學習使用火焰製作玻璃珠</p>
              <div className="course-level">進階</div>
            </div>
            <div className="course-card">
              <h3>金屬珠工藝</h3>
              <p>金屬珠的製作和裝飾技巧</p>
              <div className="course-level">中級</div>
            </div>
            <div className="course-card">
              <h3>複合材料</h3>
              <p>結合不同材料的創新工藝</p>
              <div className="course-level">高級</div>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-navigation">
        <button className="nav-btn" onClick={() => window.history.back()}>
          ← 返回創作區
        </button>
        <button className="nav-btn" onClick={() => window.location.href = '/patterns'}>
          圖案庫 →
        </button>
      </div>
    </div>
  );
};

export default BeadTutorial;
