import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete, autoComplete = true, isInitialized = false }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 模擬載入進度（無論 autoComplete 為何都顯示進度條）
    const loadingInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          return 100;
        }
        return prev + Math.random() * 15; // 隨機增加進度，讓動畫更自然
      });
    }, 100);

    return () => clearInterval(loadingInterval);
  }, []);

  // 當初始化完成時，隱藏載入畫面
  useEffect(() => {
    if (isInitialized) {
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onLoadingComplete();
        }, 500); // CSS transition 時間
      }, 800);
    }
  }, [isInitialized, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="loading-screen">
      <div className="loading-container">
        {/* Logo 動畫 */}
        <div className="logo-container">
          <img 
            src="/74559e4c-3a36-4268-8486-ed99ce2a1abf.png" 
            alt="App Logo" 
            className="loading-logo"
          />
          <div className="logo-glow"></div>
        </div>

        {/* 載入文字 */}
        <div className="loading-text">
          <h2>載入中...</h2>
        </div>

        {/* 進度條 */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {Math.round(progress)}%
          </div>
        </div>

        {/* 裝飾性動畫元素 */}
        <div className="loading-decorations">
          <div className="floating-particle particle-1"></div>
          <div className="floating-particle particle-2"></div>
          <div className="floating-particle particle-3"></div>
          <div className="floating-particle particle-4"></div>
          <div className="floating-particle particle-5"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
