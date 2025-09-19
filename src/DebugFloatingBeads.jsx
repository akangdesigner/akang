import React, { useState } from 'react';
import './DebugFloatingBeads.css';

const DebugFloatingBeads = () => {
  const [floatingBeads, setFloatingBeads] = useState({});
  const [testDrawerId, setTestDrawerId] = useState('test-drawer');

  const testDrawer = {
    id: testDrawerId,
    name: '測試珠子',
    type: '玻璃珠',
    color: '#FF6B9D',
    shine: '#FFB6C1'
  };

  const toggleFloatingBeads = () => {
    setFloatingBeads(prev => {
      const newState = {
        ...prev,
        [testDrawerId]: !prev[testDrawerId]
      };
      return newState;
    });
  };

  const clearFloatingBeads = () => {
    setFloatingBeads({});
  };

  return (
    <div className="debug-container">
      <h1>🔧 浮空珠子調試頁面</h1>
      
      <div className="debug-controls">
        <button onClick={toggleFloatingBeads} className="debug-btn">
          {floatingBeads[testDrawerId] ? '隱藏' : '顯示'} 浮空珠子
        </button>
        <button onClick={clearFloatingBeads} className="debug-btn">
          清除所有浮空珠子
        </button>
      </div>

      <div className="debug-info">
        <h3>當前狀態:</h3>
        <pre>{JSON.stringify(floatingBeads, null, 2)}</pre>
      </div>

      {/* 浮空展示的珠子 */}
      {Object.entries(floatingBeads).map(([drawerId, isFloating]) => {
        if (!isFloating) return null;
        
        return (
          <div key={drawerId} className="floating-beads-container">
            <div className="floating-bead-info">
              <h3>{testDrawer.name}</h3>
              <p>{testDrawer.type}</p>
              <button 
                className="close-floating-btn"
                onClick={() => {
                  setFloatingBeads(prev => ({ ...prev, [drawerId]: false }));
                }}
              >
                ✕ 關閉展示
              </button>
            </div>
            {[...Array(10)].map((_, index) => (
              <div
                key={`${drawerId}-${index}`}
                className="floating-bead"
                style={{
                  backgroundColor: testDrawer.color,
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  animationDelay: `${index * 0.1}s`,
                  zIndex: 1000 + index
                }}
              >
                <div className="bead-shine"></div>
                <div className="bead-reflection"></div>
                <div className="bead-glow" style={{ boxShadow: `0 0 20px ${testDrawer.shine}` }}></div>
              </div>
            ))}
          </div>
        );
      })}

      <div className="debug-instructions">
        <h3>使用說明:</h3>
        <ol>
          <li>點擊"顯示浮空珠子"按鈕來測試浮空效果</li>
          <li>觀察控制台輸出，查看狀態變化</li>
          <li>檢查浮空珠子是否正確顯示</li>
          <li>點擊"關閉展示"按鈕來關閉浮空效果</li>
        </ol>
      </div>
    </div>
  );
};

export default DebugFloatingBeads;
