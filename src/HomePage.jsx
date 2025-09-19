import React from 'react';
import './HomePage.css';
import IconComponent from './IconComponent';
import { useNavigation } from './hooks/useNavigation';

function HomePage() {
  const { goToCabinet, goToGuide, goToRating, goToStores, goToFortune } = useNavigation();

  const openBeadCabinet = () => {
    goToCabinet();
  };

  const openGuide = () => {
    goToGuide();
  };

  const openRating = () => {
    goToRating();
  };

  const openStores = () => {
    alert('功能測試中...');
  };

  const openFortune = () => {
    goToFortune();
  };

  return (
    <div className="homepage">
      {/* 星空背景裝飾 */}
      <div className="stars-background">
        <div className="star star-1">✨</div>
        <div className="star star-2">⭐</div>
        <div className="star star-3">✨</div>
        <div className="star star-4">⭐</div>
        <div className="star star-5">✨</div>
        <div className="star star-6">⭐</div>
        <div className="star star-7">✨</div>
        <div className="star star-8">⭐</div>
      </div>
      
      {/* 漂浮的靈性元素 */}
      <div className="floating-elements">
        <div className="floating-icon floating-crystal">🔮</div>
        <div className="floating-icon floating-moon">🌙</div>
        <div className="floating-icon floating-star">⭐</div>
        <div className="floating-icon floating-sparkle">✨</div>
      </div>
      
      <div className="container">
        {/* 標題區域 */}
        <div className="header">
          <div className="title-section">
            <div className="title-content">
              <h1 className="title">
                <div className="title-line">掌上靈珠</div>
                <div className="title-line">PalmBeads</div>
              </h1>
              <div className="logo-container">
                <IconComponent name="hand-orb" size={64} />
              </div>
            </div>
            <button className="start-button" onClick={openBeadCabinet}>
              開始串珠
            </button>
            <div className="mascot-container">
              <img 
                src="/psychic-medium-transparent.png" 
                alt="通靈師" 
                className="mascot-cat"
              />
            </div>
          </div>
        </div>

        {/* 功能卡片區域 */}
        <div className="feature-cards">
          {/* 第一列：每日運勢 + 串珠指南 */}
          <div className="card-row">
            <div className="feature-card daily-fortune" onClick={openFortune}>
              <div className="card-icon">
                <IconComponent name="crystal-ball" size={24} />
              </div>
              <div className="card-text">每日運勢</div>
            </div>
            
            <div className="feature-card bead-guide" onClick={openGuide}>
              <div className="card-icon">
                <IconComponent name="book-guide" size={24} />
              </div>
              <div className="card-text">串珠指南</div>
            </div>
          </div>
          
          {/* 第二列：串珠評分 + 實體商店 */}
          <div className="card-row">
            <div className="feature-card bead-rating" onClick={openRating}>
              <div className="card-icon">
                <IconComponent name="star-rating" size={24} />
              </div>
              <div className="card-text">串珠評分</div>
            </div>
            
            <div className="feature-card recommended-stores" onClick={openStores}>
              <div className="card-icon">
                <IconComponent name="shopping-bag" size={24} />
              </div>
              <div className="card-text">實體商店</div>
            </div>
          </div>
        </div>

        {/* 底部標語 */}
        <div className="footer-slogan">
          <p>線上打造您的專屬能量手串</p>
          <p>掌握每日個人運勢♥</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
