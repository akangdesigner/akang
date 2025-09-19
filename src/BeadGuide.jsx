import React, { useState, useEffect } from 'react';
import './BeadGuide.css';
import IconComponent from './IconComponent';
import { useNavigation } from './hooks/useNavigation';


// 珠子材質數據
const beadMaterials = {
  glass: {
    name: '玻璃珠',
    description: '色彩繽紛，工藝多變',
    icon: '/light-pink-bead-ID1.png',
    characteristics: [
      '人工製作，顏色與形狀高度多樣',
      '光澤亮麗，可仿水晶、寶石質感',
      '價格親民，適合大量運用',
      '表面可加工（切割、壓紋、噴色）增加變化'
    ],
    care: '避免碰撞，定期清潔',
    price: '中等',
    applications: ['流行飾品', 'DIY 串珠手作', '裝飾品、工藝設計'],
    colors: ['紅色', '藍色', '綠色', '紫色', '黃色', '粉色', '金色', '銀色']
  },
  
  seed: {
    name: '米珠',
    description: '精緻小巧，百搭運用',
    icon: '/white-bead-ID24.png',
    characteristics: [
      '體積小巧，適合細緻設計',
      '重量輕盈，長時間配戴無負擔',
      '顏色與材質多樣，組合彈性大',
      '常用於點綴或編織，提升作品細節感'
    ],
    care: '避免潮濕，定期擦拭',
    price: '經濟實惠',
    applications: ['手鍊、項鍊點綴', '織珠工藝、串珠畫', 'DIY 飾品配件'],
    colors: ['淺粉', '薄荷綠', '天藍', '米色', '淺紫', '淺黃']
  },
  
  crystal: {
    name: '水晶珠',
    description: '晶瑩剔透，能量療癒',
    icon: '/dark-purple-bead-ID8.png',
    characteristics: [
      '透光性佳，色澤清澈',
      '擁有天然能量，寓意療癒與平衡',
      '硬度高，耐用不易刮傷',
      '色彩多樣，常帶有天然紋理'
    ],
    care: '避免化學品，定期拋光',
    price: '較高',
    applications: ['能量手鍊、項鍊', '靈性療癒飾品', '高質感時尚配件'],
    colors: ['透明', '粉晶', '紫晶', '黃晶', '綠晶', '白晶']
  },
  
  wooden: {
    name: '木珠',
    description: '自然質樸，環保健康',
    icon: '/dark-brown-bead-ID17.png',
    characteristics: [
      '天然材質，環保健康',
      '質地輕盈，佩戴舒適',
      '色彩自然，質樸溫馨',
      '可雕刻，個性化強'
    ],
    care: '避免水浸，定期上油',
    price: '經濟實惠',
    applications: ['自然風格首飾', '兒童飾品', '環保產品'],
    colors: ['原木色', '深棕', '淺棕', '紅棕', '黑棕']
  }
};

// 顏色特性數據
const colorCharacteristics = {
  red: {
    name: '紅色系',
    icon: '/red-bead-ID10.png',
    psychology: '熱情、活力、自信',
    occasions: ['慶祝場合', '重要會議', '約會'],
    combinations: ['金色', '白色', '黑色'],
    beads: ['紅色玻璃珠', '酒紅米珠', '粉色水晶珠'],
    hex: '#FF6B6B',
    recommendations: [
      {
        name: '熱情項鍊',
        length: '半圓',
        width: '細線',
        description: '適合慶祝場合，展現活力與自信',
        beads: ['紅色水晶珠', '金色過渡珠', '白色米珠']
      },
      {
        name: '優雅手鍊',
        length: '4/3圓',
        width: '中等',
        description: '適合重要會議，專業且不失個性',
        beads: ['紅色玻璃珠', '銀色過渡珠', '黑色木珠']
      }
    ]
  },
  
  blue: {
    name: '藍色系',
    icon: '/light-blue-bead-ID15.png',
    psychology: '冷靜、信任、專業',
    occasions: ['工作場合', '正式會議', '日常休閒'],
    combinations: ['白色', '銀色', '灰色'],
    beads: ['淺藍水晶珠', '天空藍水晶珠', '薄荷綠玻璃珠'],
    hex: '#4ECDC4',
    recommendations: [
      {
        name: '專業手鍊',
        length: '4/3圓',
        width: '中等',
        description: '適合工作場合，展現專業與信任感',
        beads: ['淺藍水晶珠', '銀色過渡珠', '白色米珠']
      },
      {
        name: '休閒項鍊',
        length: '半圓',
        width: '細線',
        description: '適合日常休閒，輕鬆自在的風格',
        beads: ['天空藍水晶珠', '薄荷綠玻璃珠', '銀色過渡珠']
      }
    ]
  },
  
  green: {
    name: '綠色系',
    icon: '/mint-green-bead-ID2.png',
    psychology: '自然、平衡、成長',
    occasions: ['戶外活動', '環保主題', '放鬆時刻'],
    combinations: ['棕色', '白色', '黃色'],
    beads: ['薄荷綠玻璃珠', '靛色水晶珠', '黑色木珠'],
    hex: '#32CD32',
    recommendations: [
      {
        name: '自然手鍊',
        length: '半圓',
        width: '細線',
        description: '適合戶外活動，與大自然和諧共處',
        beads: ['薄荷綠玻璃珠', '棕色木珠', '白色米珠']
      },
      {
        name: '平衡項鍊',
        length: '全圓',
        width: '中等',
        description: '適合放鬆時刻，營造寧靜平衡的氛圍',
        beads: ['靛色水晶珠', '黑色木珠', '黃色玻璃珠']
      }
    ]
  },
  
  purple: {
    name: '紫色系',
    icon: '/light-purple-bead-ID12.png',
    psychology: '神秘、高貴、創意',
    occasions: ['藝術活動', '正式場合', '冥想放鬆'],
    combinations: ['金色', '銀色', '白色'],
    beads: ['淡紫色水晶珠', '深紫色水晶珠', '白色米珠'],
    hex: '#9370DB',
    recommendations: [
      {
        name: '高貴項鍊',
        length: '全圓',
        width: '粗線',
        description: '適合正式場合，展現神秘高貴的氣質',
        beads: ['淡紫色水晶珠', '金色過渡珠', '白色米珠']
      },
      {
        name: '創意手鍊',
        length: '4/3圓',
        width: '中等',
        description: '適合藝術活動，激發創意靈感',
        beads: ['深紫色水晶珠', '銀色過渡珠', '白色米珠']
      }
    ]
  },
  
  yellow: {
    name: '黃色系',
    icon: '/gold-brown-bead-ID4.png',
    psychology: '快樂、樂觀、智慧',
    occasions: ['生日慶祝', '學習場合', '創意活動'],
    combinations: ['白色', '藍色', '綠色'],
    beads: ['金棕水晶珠', '橘色玻璃珠', '黃粉色玻璃珠'],
    hex: '#FFE66D',
    recommendations: [
      {
        name: '快樂手鍊',
        length: '半圓',
        width: '細線',
        description: '適合生日慶祝，帶來快樂與活力',
        beads: ['金棕水晶珠', '白色米珠', '橘色玻璃珠']
      },
      {
        name: '智慧項鍊',
        length: '4/3圓',
        width: '中等',
        description: '適合學習場合，激發智慧與創意',
        beads: ['黃粉色玻璃珠', '藍色水晶珠', '綠色玻璃珠']
      }
    ]
  },
  

};

// 材質介紹組件
const MaterialCard = ({ material, data, isActive, onClick }) => {
  const handleClick = () => {
    // 先執行原本的 onClick 函數
    onClick();
    
    // 延遲一點時間讓狀態更新完成，然後滾動到詳情卡片
    setTimeout(() => {
      const detailElement = document.getElementById('material-detail');
      if (detailElement) {
        detailElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  };

  return (
    <div 
      className={`material-card ${isActive ? 'active' : ''}`}
      data-material={material}
      onClick={handleClick}
    >
      <div className="material-header">
        <div className="material-icon">
          <img src={data.icon} alt={data.name} />
        </div>
        <h3>{data.name}</h3>
      </div>
      <p className="material-description">{data.description}</p>
      <div className="material-tags">
        <span className="price-tag">{data.price}</span>
        <span className="care-tag">保養: {data.care}</span>
      </div>
    </div>
  );
};

// 材質詳情組件
const MaterialDetail = ({ material, data }) => {
  return (
    <div className="material-detail" id="material-detail">
      <div className="detail-header">
        <div className="detail-icon">
          <img src={data.icon} alt={data.name} />
        </div>
        <div className="detail-info">
          <h2>{data.name}</h2>
          <p>{data.description}</p>
        </div>
      </div>
      
      <div className="detail-content">
        <div className="detail-section">
          <h3><IconComponent name="gemstone" size={20} /> 特點</h3>
          <ul className="characteristics-list">
            {data.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>
        
        <div className="detail-section">
          <h3><IconComponent name="bead-string" size={20} /> 適用範圍</h3>
          <div className="applications-grid">
            {data.applications.map((app, index) => (
              <span key={index} className="application-tag">{app}</span>
            ))}
          </div>
        </div>
        
        <div className="detail-section">
          <h3><IconComponent name="bead-pattern" size={20} /> 常見顏色</h3>
          <div className="colors-grid">
            {data.colors.map((color, index) => (
              <span key={index} className="color-tag">{color}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


// 保存的設計組件
const SavedDesigns = () => {
  const [savedDesigns, setSavedDesigns] = useState([]);

  useEffect(() => {
    // 從 localStorage 讀取保存的設計
    // 檢查兩個可能的 localStorage 鍵
    const beadDesigns = JSON.parse(localStorage.getItem('beadDesigns') || '[]');
    const savedBeadDesign = JSON.parse(localStorage.getItem('savedBeadDesign') || 'null');
    
    let allDesigns = [...beadDesigns];
    
    // 如果存在單個保存的設計，將其轉換並添加到列表中
    if (savedBeadDesign && savedBeadDesign.beads) {
      const convertedDesign = {
        id: savedBeadDesign.timestamp || Date.now(),
        name: savedBeadDesign.designName || '未命名設計',
        beads: savedBeadDesign.beads,
        stringWidth: savedBeadDesign.stringWidth,
        stringLength: savedBeadDesign.stringLength,
        description: savedBeadDesign.description || '暫無設計描述',
        timestamp: savedBeadDesign.timestamp || Date.now()
      };
      
      // 檢查是否已存在相同的設計，避免重複
      const exists = allDesigns.some(design => design.id === convertedDesign.id);
      if (!exists) {
        allDesigns.push(convertedDesign);
      }
    }
    
    // 清理無效的設計數據（沒有 ID 或沒有珠子的設計）
    const validDesigns = allDesigns.filter(design => 
      design.id && 
      design.beads && 
      Array.isArray(design.beads) && 
      design.beads.length > 0
    );
    
    setSavedDesigns(validDesigns);
    
    // 如果有清理掉的無效設計，更新 localStorage
    if (validDesigns.length !== allDesigns.length) {
      localStorage.setItem('beadDesigns', JSON.stringify(validDesigns));
    }
  }, []);


  // 渲染圓形手串預覽
  const renderCircularBracelet = (design) => {
         // 根據串珠長度和珠子數量設定半徑
     let radius;
     if (design.beads.length === 10) {
       // 10顆珠子時使用更小的半徑
       if (design.stringLength === 'half') {
         radius = 45; // 半圓：10顆珠子時調整到 45px
       } else if (design.stringLength === 'four-thirds') {
         radius = 50; // 4/3圓：10顆珠子時縮小到 50px
       } else { // full
         radius = 50; // 全圓：10顆珠子時縮小到 50px
       }
     } else {
       // 其他數量珠子時使用正常半徑
       if (design.stringLength === 'half') {
         radius = 70; // 半圓：調大到 70px
         } else if (design.stringLength === 'four-thirds') {
           radius = Math.round(70 * 0.9); // 4/3圓：調整到 63px (70 * 0.9)
       } else { // full
         radius = 70; // 全圓：正常大小 70px
       }
     }

    const centerX = 120; // 圓心 X 座標
    const centerY = 120; // 圓心 Y 座標
    
    return (
      <div className={`circular-bracelet-preview ${design.beads.length === 10 ? 'preview-small' : ''} ${design.stringLength === 'four-thirds' ? 'preview-four-thirds' : ''}`}>
        {/* 木製串珠盤背景圖片 */}
        <div className="wooden-tray-background">
          <img 
            src="/wooden-tray.png" 
            alt="木製串珠盤"
            className={`tray-bg-image ${design.beads.length === 10 ? 'tray-small' : ''} ${design.stringLength === 'four-thirds' ? 'tray-four-thirds' : ''}`}
            onError={(e) => {
              // 如果圖片載入失敗，隱藏圖片但不設置背景色
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        <svg width="240" height="240" viewBox="0 0 240 240" className="bracelet-svg-overlay">
          {/* 圓形串珠線 - 始終保持完整圓形 */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke={design.braceletStyle?.strokeColor || "#FFFFFF"}
            strokeWidth={(() => {
              // 根據手鍊寬度動態調整線條寬度
              switch (design.stringWidth) {
                case '細線':
                  return 1;
                case '中等':
                  return 3;
                case '粗線':
                  return 5;
                default:
                  return 3;
              }
            })()}
            strokeDasharray="none"
            strokeLinecap="round"
          />
          {/* 珠子放在圓形線上 - 與圓形手鍊動畫邏輯相同 */}
          {design.beads.map((bead, index) => {
            // 調整角度計算，讓珠子間隔更均勻
            const angle = (2 * Math.PI / design.beads.length) * index - Math.PI / 2; // 從12點開始，與動畫邏輯一致
            const beadX = centerX + radius * Math.cos(angle);
            const beadY = centerY + radius * Math.sin(angle);
                         // 統一珠子大小，不根據手鍊長度調整
             let baseSize = 1.0; // 所有手鍊長度使用相同大小
             
             // 調整珠子大小，讓間隔更均勻
             const beadSize = bead.type === '過渡珠' ? Math.round(7 * baseSize * 0.8) + 2 : /* 過渡珠 */
                            (bead.type === '米珠' || bead.type === '珍珠') ? Math.round(10 * baseSize * 0.8) + 2 : /* 米珠/珍珠 */
                            Math.round(24 * baseSize * 0.8); /* 大珠子 */
            
            return (
              <g key={index}>
                {/* 珠子圖片 - 直接放在圓形線上 */}
                <image
                  href={bead.image}
                  x={beadX - beadSize}
                  y={beadY - beadSize}
                  width={beadSize * 2}
                  height={beadSize * 2}
                  style={{ filter: 'brightness(1.1)' }}
                />
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  // 渲染直線手串預覽（現在也改為圓形）
  const renderLinearBracelet = (design) => {
    // 所有手串都使用圓形樣式
    return renderCircularBracelet(design);
  };



  if (savedDesigns.length === 0) {
    return (
      <div className="saved-designs-empty">
        <div className="empty-content">
          <h3><IconComponent name="mystic-crystal" size={20} /> 還沒有保存的設計</h3>
          <p>在數位串珠創作區中串珠後，點擊「💾 保存設計」按鈕來保存您的創作！</p>
          <div className="empty-icon">💡</div>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-designs">
      <div className="designs-grid">
        {savedDesigns.map((design) => (
          <div key={design.id} className="design-card">
              <div className="design-content">
              <div className="design-info">
                <div className="design-header">
                  <h4 className="design-name">
                    {design.name}
                  </h4>
                </div>
                <div className="design-details">
                  <div className="basic-settings">
                    <h5>基礎設定:</h5>
                    <div className="design-meta">
                      <span className="meta-tag-small">線材: {design.stringWidth}</span>
                      <span className="meta-tag-small">長度: {design.stringLength}</span>
                      <span className="meta-tag-small">珠子: {design.beads.length} 顆</span>
                    </div>
                  </div>
                  
                  <div className="bead-types">
                    <h5>使用珠子種類:</h5>
                    <div className="bead-type-list">
                      {(() => {
                        // 計算每種珠子的數量
                        const beadCounts = {};
                        design.beads.forEach(bead => {
                          // 組合珠子的名稱和類型
                          const fullName = bead.name && bead.type ? 
                            `${bead.name}${bead.type}` : 
                            (bead.name || bead.type);
                          beadCounts[fullName] = (beadCounts[fullName] || 0) + 1;
                        });
                        
                        // 生成標籤
                        return Object.entries(beadCounts).map(([beadName, count]) => (
                          <span key={beadName} className="bead-type-tag">
                            {beadName} x{count}
                          </span>
                        ));
                      })()}
                    </div>
                  </div>
                  
                  <div className="design-description">
                    <h5>設計描述:</h5>
                    <p className="design-description-text">
                      {design.description || '暫無設計描述'}
                    </p>
                  </div>
                  
                  <div className="design-beads">
                    <h5>手串預覽:</h5>
                    {/* 所有手串都使用圓形樣式 */}
                    {renderCircularBracelet(design)}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 顏色特性組件
const ColorCard = ({ color, data }) => {
  const [showRecommendations, setShowRecommendations] = useState(false);

  return (
    <div className="color-card" data-color={color} style={{ borderColor: data.hex }}>
      <div className="color-header">
        <div className="color-icon">
          <img src={data.icon} alt={data.name} />
        </div>
        <h3>{data.name}</h3>
        <div className="color-sample" style={{ backgroundColor: data.hex }}></div>
      </div>
      
      <div className="color-content">
        <div className="psychology">
          <h4>心理特質</h4>
          <p>{data.psychology}</p>
        </div>
        
        <div className="occasions">
          <h4>適用場合</h4>
          <div className="occasion-tags">
            {data.occasions.map((occasion, index) => (
              <span key={index} className="occasion-tag">{occasion}</span>
            ))}
          </div>
        </div>
        
        <div className="combinations">
          <h4>搭配建議</h4>
          <div className="combination-tags">
            {data.combinations.map((combo, index) => (
              <span key={index} className="combination-tag">{combo}</span>
            ))}
          </div>
        </div>
        
        <div className="bead-types">
          <h4>珠子類型</h4>
          <div className="bead-tags">
            {data.beads.map((bead, index) => (
              <span key={index} className="bead-tag">{bead}</span>
            ))}
          </div>
        </div>

        {showRecommendations && (
          <div className="recommendations-section">
            <h4><IconComponent name="energy-flow" size={18} /> 推薦搭配</h4>
            <div className="recommendations-grid">
              {data.recommendations.map((rec, index) => (
                <div key={index} className="recommendation-card">
                  <h5>{rec.name}</h5>
                  <div className="recommendation-details">
                    <span className="length-tag">長度: {rec.length}</span>
                    <span className="width-tag">粗度: {rec.width}</span>
                  </div>
                  <p className="recommendation-description">{rec.description}</p>
                  <div className="recommended-beads">
                    <span className="beads-label">推薦珠子:</span>
                    {rec.beads.map((bead, beadIndex) => (
                      <span key={beadIndex} className="recommended-bead-tag">{bead}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 主組件
const BeadGuide = () => {
  const { goToHome, goToRating, goToFortune } = useNavigation();
  const [activeTab, setActiveTab] = useState('materials');
  const [selectedMaterial, setSelectedMaterial] = useState('glass');

  return (
    <div className="bead-guide-container">
      <div className="guide-header">
        <h1><IconComponent name="crystal-heart" size={32} /> 珠子介紹指南</h1>
        <p>了解不同材質和顏色的珠子特性，為您的串珠創作提供靈感</p>
      </div>

      <div className="guide-tabs">
        <button 
          className={`tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
          onClick={() => setActiveTab('materials')}
        >
          📦 材質介紹
        </button>
        <button 
          className={`tab-btn ${activeTab === 'colors' ? 'active' : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          <IconComponent name="magic-circle" size={16} /> 顏色特性
        </button>
        <button 
          className={`tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendations')}
        >
          <IconComponent name="four-pointed-star" size={16} /> 推薦搭配
        </button>
      </div>

      <div className="guide-content">
        {activeTab === 'materials' && (
          <div className="materials-section">
            {/* 四張介紹小卡 - 2x2 四宮格排列 */}
            <div className="materials-grid">
              {Object.entries(beadMaterials).map(([key, data]) => (
                <MaterialCard
                  key={key}
                  material={key}
                  data={data}
                  isActive={selectedMaterial === key}
                  onClick={() => setSelectedMaterial(key)}
                />
              ))}
            </div>
            
            {/* 最大張說明卡片 - 最底層 */}
            <div className="material-detail">
              <MaterialDetail 
                material={selectedMaterial}
                data={beadMaterials[selectedMaterial]}
              />
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="colors-section">
            <div className="colors-grid">
              {Object.entries(colorCharacteristics).map(([key, data]) => (
                <ColorCard key={key} color={key} data={data} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="recommendations-page">
            <div className="recommendations-container">
              <SavedDesigns />
            </div>
          </div>
        )}
      </div>

      {/* 底部導航欄 */}
      <div className="bottom-navigation">
        <div className="nav-grid">
                  <button className="nav-button" onClick={goToHome}>
          <div className="nav-icon">
            <IconComponent name="home" size={20} />
          </div>
          <div className="nav-text">返回首頁</div>
        </button>
          <button className="nav-button" onClick={goToHome}>
            <div className="nav-icon">
              <IconComponent name="art-palette" size={20} />
            </div>
            <div className="nav-text">數位串珠</div>
          </button>
          <button className="nav-button" onClick={goToRating}>
            <div className="nav-icon">
              <IconComponent name="star-rating" size={20} />
            </div>
            <div className="nav-text">串珠評分</div>
          </button>
          <button className="nav-button" onClick={goToFortune}>
            <div className="nav-icon">
              <IconComponent name="crystal-ball" size={20} />
            </div>
            <div className="nav-text">每日運勢</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeadGuide;