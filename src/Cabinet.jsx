import React, { useState } from 'react';
import './Cabinet.css';

const Cabinet = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="cabinet-container">
      <div className="cabinet">
        {/* 櫃子外殼 */}
        <div className="cabinet-body">
          {/* 抽屜 */}
          <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
            <div className="drawer-front">
              <div className="drawer-handle" onClick={toggleDrawer}>
                <div className="handle-knob"></div>
              </div>
            </div>
            <div className="drawer-content">
              <div className="drawer-inside">
                <h3>抽屜內容</h3>
                <p>這裡可以放置物品</p>
                <div className="drawer-items">
                  <div className="item">📁 文件夾</div>
                  <div className="item">📄 文件</div>
                  <div className="item">✏️ 筆</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 櫃子底部 */}
          <div className="cabinet-bottom"></div>
        </div>
      </div>
      
      {/* 控制按鈕 */}
      <div className="controls">
        <button 
          className={`toggle-btn ${isDrawerOpen ? 'active' : ''}`}
          onClick={toggleDrawer}
        >
          {isDrawerOpen ? '關閉抽屜' : '打開抽屜'}
        </button>
      </div>
    </div>
  );
};

export default Cabinet;
