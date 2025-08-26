import React, { useState } from 'react';
import './BeadCabinet.css';

// 共用的珠子位置計算函數
const calculateBeadPositions = (beads, scale = 1) => {
  if (beads.length === 0) return [];
  
  // 基礎半徑和圓心座標（根據縮放調整）
  const baseRadius = 125;
  const baseCenterX = 253.5; // 木製串珠盤寬度的一半 (507px / 2)
  const baseCenterY = 210; // 木製串珠盤高度的一半 (420px / 2)
  
  const radius = baseRadius * scale;
  const centerX = baseCenterX * scale;
  const centerY = baseCenterY * scale;
  
  const positions = [];
  let currentAngle = -Math.PI / 2; // 從12點鐘方向開始
  
  beads.forEach((bead, index) => {
    const isCurrentSmall = bead.type === '米珠' || bead.type === '珍珠' || bead.type === '過渡珠';
    const beadSize = (isCurrentSmall ? 15 : 35) * scale;
    
    // 計算當前珠子的角度
    if (index > 0) {
      const prevBead = beads[index - 1];
      const isPrevSmall = prevBead.type === '米珠' || prevBead.type === '珍珠' || prevBead.type === '過渡珠';
      const prevBeadSize = (isPrevSmall ? 15 : 35) * scale;
      
      // 統一使用20px間距（縮放後）
      const gap = 20 * scale;
      const angleIncrement = (prevBeadSize + gap) / radius;
      currentAngle += angleIncrement;
    }
    
    // 當前珠子的角度 = 累積角度 + 當前珠子的一半大小
    const angle = currentAngle + (beadSize / 2) / radius;
    
    // 計算珠子在串珠線圓周上的位置
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    
    positions.push({
      left: `${x}px`,
      top: `${y}px`,
      beadSize: beadSize,
      beadType: bead.type,
      image: bead.image
    });
  });
  
  return positions;
};

// 共用的繪製函數
const drawBeads = (beads, scale = 1, stringLength = 'full', stringWidth = 'medium') => {
  const positions = calculateBeadPositions(beads, scale);
  
  // 計算圓形線條的尺寸
  let radius;
  if (stringLength === 'half') {
    radius = 80 * scale; // 半圓
  } else if (stringLength === 'four-thirds') {
    radius = 100 * scale; // 4/3圓
  } else {
    radius = 120 * scale; // 全圓
  }
  
  const centerX = radius;
  const centerY = radius;
  
  return {
    positions,
    radius,
    centerX,
    centerY,
    stringWidth: stringWidth === 'thin' ? 2 * scale : stringWidth === 'medium' ? 3 * scale : 4 * scale
  };
};

// 預覽組件
const Preview = ({ scale = 0.4, beads, stringLength = 'full', stringWidth = 'medium' }) => {
  const { positions, radius, centerX, centerY, stringWidth: strokeWidth } = drawBeads(beads, scale, stringLength, stringWidth);
  
  return (
    <div className="bead-preview" style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}>
      {/* SVG 圓形線條 */}
      <svg width={radius * 2} height={radius * 2} style={{ position: 'absolute', top: 0, left: 0 }}>
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="transparent"
          stroke="#FFFFFF"
          strokeWidth={strokeWidth}
          opacity="0.8"
        />
      </svg>
      
      {/* 珠子 */}
      {positions.map((pos, index) => (
        <div
          key={`preview-${index}`}
          className="preview-bead"
          style={{
            position: 'absolute',
            left: pos.left,
            top: pos.top,
            transform: 'translate(-50%, -50%)',
            width: `${pos.beadSize}px`,
            height: `${pos.beadSize}px`,
            borderRadius: '50%',
            backgroundImage: `url(/${pos.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 2
          }}
        />
      ))}
    </div>
  );
};

// 實際串珠盤組件
const ActualBoard = ({ scale = 1, beads, stringLength = 'full', stringWidth = 'medium' }) => {
  const { positions, radius, centerX, centerY, stringWidth: strokeWidth } = drawBeads(beads, scale, stringLength, stringWidth);
  
  return (
    <div className="actual-bead-board" style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}>
      {/* SVG 圓形線條 */}
      <svg width={radius * 2} height={radius * 2} style={{ position: 'absolute', top: 0, left: 0 }}>
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="transparent"
          stroke="#FFFFFF"
          strokeWidth={strokeWidth}
          opacity="0.8"
        />
      </svg>
      
      {/* 珠子 */}
      {positions.map((pos, index) => (
        <div
          key={`actual-${index}`}
          className="actual-bead"
          style={{
            position: 'absolute',
            left: pos.left,
            top: pos.top,
            transform: 'translate(-50%, -50%)',
            width: `${pos.beadSize}px`,
            height: `${pos.beadSize}px`,
            borderRadius: '50%',
            backgroundImage: `url(/${pos.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 2
          }}
        />
      ))}
    </div>
  );
};

// 示例使用組件
const SharedBeadComponentsExample = () => {
  // 示例珠子數據
  const [beads] = useState([
    { id: 1, type: '米珠', image: 'light-pink-bead-ID1.png' },
    { id: 2, type: '米珠', image: 'mint-green-bead-ID2.png' },
    { id: 3, type: '大珠', image: 'orange-bead-ID3.png' },
    { id: 4, type: '大珠', image: 'gold-brown-bead-ID4.png' },
    { id: 5, type: '大珠', image: 'red-bead-ID5.png' }
  ]);

  const [stringLength, setStringLength] = useState('full');
  const [stringWidth, setStringWidth] = useState('medium');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>共用繪製邏輯的串珠組件示例</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          串珠長度：
          <select value={stringLength} onChange={(e) => setStringLength(e.target.value)}>
            <option value="half">半圓</option>
            <option value="four-thirds">4/3圓</option>
            <option value="full">全圓</option>
          </select>
        </label>
        
        <label style={{ marginLeft: '20px' }}>
          串珠線寬度：
          <select value={stringWidth} onChange={(e) => setStringWidth(e.target.value)}>
            <option value="thin">細線</option>
            <option value="medium">中等</option>
            <option value="thick">粗線</option>
          </select>
        </label>
      </div>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        {/* 預覽組件 */}
        <div>
          <h3>預覽圖 (scale=0.4)</h3>
          <Preview 
            scale={0.4} 
            beads={beads} 
            stringLength={stringLength}
            stringWidth={stringWidth}
          />
        </div>

        {/* 實際串珠盤組件 */}
        <div>
          <h3>實際串珠盤 (scale=1)</h3>
          <ActualBoard 
            scale={1} 
            beads={beads} 
            stringLength={stringLength}
            stringWidth={stringWidth}
          />
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>實現說明：</h3>
        <ul>
          <li><strong>共用邏輯：</strong>兩個組件都使用相同的 <code>drawBeads()</code> 函數</li>
          <li><strong>縮放控制：</strong>通過 <code>scale</code> 參數控制大小，預覽用 0.4，實際用 1</li>
          <li><strong>完全一致：</strong>珠子的位置、大小、間距都按比例縮放，保持視覺一致性</li>
          <li><strong>參數同步：</strong>串珠長度和線寬度會同時影響兩個組件</li>
        </ul>
      </div>
    </div>
  );
};

// 統計卡片組件
const StatCard = ({ label, value, className = "", variant = "default" }) => {
  // 根據變體決定使用哪個 CSS 類
  const valueClassName = variant === "number" ? "stat-number" : "stat-value";
  
  return (
    <div className={`stat-item ${className}`}>
      <span className="stat-label">{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
};

export default SharedBeadComponentsExample;
export { Preview, ActualBoard, drawBeads, calculateBeadPositions, StatCard };
