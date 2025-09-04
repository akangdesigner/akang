import React from 'react';
import './HomePage.css';
import IconComponent from './IconComponent';

function HomePage() {
  const openBeadCabinet = () => {
    window.location.href = '/';
  };

  const openTutorial = () => {
    window.location.href = '/tutorial';
  };

  const openGuide = () => {
    window.location.href = '/guide';
  };

  const openRating = () => {
    window.location.href = '/rating';
  };

  const openStores = () => {
    window.location.href = '/stores';
  };

  const openFortune = () => {
    window.location.href = '/fortune';
  };

  return (
    <div className="homepage">
      <div className="container">
        <div className="header">
          <h1 className="title">靈性串珠創作 App</h1>
          <p className="subtitle">
            探索靈性串珠的奧秘，創造屬於你的獨特作品
          </p>
          <p className="hero-description">
            透過數位化工具，體驗傳統串珠工藝的現代魅力。
            從基礎技巧到進階創作，讓每一顆珠子都承載著你的靈感與創意。
          </p>
        </div>

        {/* 底部按鈕區域 */}
        <div className="bottom-nav">
          <div className="nav-title">選擇您的創作領域</div>
          <div className="nav-grid">
            <div className="nav-button" onClick={openBeadCabinet}>
              <div className="nav-icon">
                <IconComponent name="art-palette" size={32} />
              </div>
              <div className="nav-text">數位串珠</div>
              <div className="nav-description">開始您的數位串珠創作之旅</div>
            </div>
            
            <div className="nav-button" onClick={openTutorial}>
              <div className="nav-icon">
                <IconComponent name="book-guide" size={32} />
              </div>
              <div className="nav-text">教學指南</div>
              <div className="nav-description">學習串珠技巧與方法</div>
            </div>
            
            <div className="nav-button" onClick={openGuide}>
              <div className="nav-icon">
                <IconComponent name="magnifying-glass" size={32} />
              </div>
              <div className="nav-text">珠子介紹指南</div>
              <div className="nav-description">了解各種珠子的特性與用途</div>
            </div>
            
            <div className="nav-button" onClick={openRating}>
              <div className="nav-icon">
                <IconComponent name="star-rating" size={32} />
              </div>
              <div className="nav-text">串珠評分</div>
              <div className="nav-description">評估您的作品並獲得建議</div>
            </div>
            
            <div className="nav-button" onClick={openStores}>
              <div className="nav-icon">
                <IconComponent name="shopping-bag" size={32} />
              </div>
              <div className="nav-text">珠子商店</div>
              <div className="nav-description">探索優質的珠子與材料</div>
            </div>
            
            <div className="nav-button" onClick={openFortune}>
              <div className="nav-icon">
                <IconComponent name="crystal-ball" size={32} />
              </div>
              <div className="nav-text">每日運勢</div>
              <div className="nav-description">查看今日運勢與推薦珠子</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
