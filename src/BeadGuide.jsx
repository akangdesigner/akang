import React, { useState, useEffect } from 'react';
import './BeadGuide.css';

// 珠子材質數據
const beadMaterials = {
  glass: {
    name: '玻璃珠',
    description: '晶瑩剔透，色彩豐富',
    icon: '/light-pink-bead-ID1.png',
    characteristics: [
      '透明度高，光澤度好',
      '色彩飽和度高',
      '適合製作亮眼的首飾',
      '重量適中，佩戴舒適'
    ],
    care: '避免碰撞，定期清潔',
    price: '中等',
    applications: ['項鍊', '手鍊', '耳環', '髮飾'],
    colors: ['紅色', '藍色', '綠色', '紫色', '黃色', '粉色', '金色', '銀色']
  },
  
  seed: {
    name: '米珠',
    description: '小巧精緻，質地細膩',
    icon: '/white-bead-ID24.png',
    characteristics: [
      '尺寸小，適合精細工藝',
      '質地堅硬，不易損壞',
      '色彩柔和，適合搭配',
      '重量輕，佩戴無負擔'
    ],
    care: '避免潮濕，定期擦拭',
    price: '經濟實惠',
    applications: ['精細編織', '刺繡裝飾', '小配件'],
    colors: ['淺粉', '薄荷綠', '天藍', '米色', '淺紫', '淺黃']
  },
  
  crystal: {
    name: '水晶珠',
    description: '高貴典雅，光澤璀璨',
    icon: '/dark-purple-bead-ID8.png',
    characteristics: [
      '折射率高，光澤璀璨',
      '質地堅硬，不易刮傷',
      '色彩純淨，高貴典雅',
      '重量較重，質感十足'
    ],
    care: '避免化學品，定期拋光',
    price: '較高',
    applications: ['高級首飾', '禮品製作', '收藏品'],
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
    icon: '/gold-brown-bead-ID9.png',
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
  return (
    <div 
      className={`material-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="material-icon">
        <img src={data.icon} alt={data.name} />
      </div>
      <h3>{data.name}</h3>
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
    <div className="material-detail">
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
          <h3>✨ 特點</h3>
          <ul className="characteristics-list">
            {data.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>
        
        <div className="detail-section">
          <h3>🎯 適用範圍</h3>
          <div className="applications-grid">
            {data.applications.map((app, index) => (
              <span key={index} className="application-tag">{app}</span>
            ))}
          </div>
        </div>
        
        <div className="detail-section">
          <h3>🎨 常見顏色</h3>
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
    const designs = JSON.parse(localStorage.getItem('beadDesigns') || '[]');
    setSavedDesigns(designs);
  }, []);

  const deleteDesign = (designId) => {
    const updatedDesigns = savedDesigns.filter(design => design.id !== designId);
    localStorage.setItem('beadDesigns', JSON.stringify(updatedDesigns));
    setSavedDesigns(updatedDesigns);
  };

  if (savedDesigns.length === 0) {
    return (
      <div className="saved-designs-empty">
        <div className="empty-content">
          <h3>✨ 還沒有保存的設計</h3>
          <p>在珠子收納櫃中串珠後，點擊「💾 保存設計」按鈕來保存您的創作！</p>
          <div className="empty-icon">💡</div>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-designs">
      <h3>💾 已保存的設計 ({savedDesigns.length})</h3>
      <div className="designs-grid">
        {savedDesigns.map((design) => (
          <div key={design.id} className="design-card">
            <div className="design-content">
              <div className="design-info">
                <div className="design-header">
                  <h4>{design.name}</h4>
                  <button 
                    className="delete-design-btn"
                    onClick={() => deleteDesign(design.id)}
                    title="刪除設計"
                  >
                    🗑️
                  </button>
                </div>
                <div className="design-details">
                  <div className="design-meta">
                    <span className="meta-tag">線材: {design.stringWidth}</span>
                    <span className="meta-tag">長度: {design.stringLength}</span>
                    <span className="meta-tag">珠子: {design.beads.length} 顆</span>
                  </div>
                  <div className="design-beads">
                    <h5>手串預覽:</h5>
                    <div className="bracelet-preview">
                      <div className="bracelet-line">
                        {design.beads.map((bead, index) => (
                          <div key={index} className="bracelet-bead-preview">
                            <img 
                              src={bead.image} 
                              alt={bead.name}
                              style={{
                                width: bead.type === '過渡珠' || bead.type === '米珠' || bead.type === '珍珠' ? '16px' : '24px',
                                height: bead.type === '過渡珠' || bead.type === '米珠' || bead.type === '珍珠' ? '16px' : '24px',
                                objectFit: 'contain',
                                borderRadius: '50%',
                                filter: 'brightness(1.1)'
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="design-date">
                    創建於: {new Date(design.createdAt).toLocaleDateString('zh-TW')}
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
    <div className="color-card" style={{ borderColor: data.hex }}>
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
            <h4>🎯 推薦搭配</h4>
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
  const [activeTab, setActiveTab] = useState('materials');
  const [selectedMaterial, setSelectedMaterial] = useState('glass');

  return (
    <div className="bead-guide-container">
      <div className="guide-header">
        <h1>🎨 珠子介紹指南</h1>
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
          🎨 顏色特性
        </button>
        <button 
          className={`tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendations')}
        >
          💡 推薦搭配
        </button>
      </div>

      <div className="guide-content">
        {activeTab === 'materials' && (
          <div className="materials-section">
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
            
            <div className="material-detail-container">
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
            <div className="recommendations-header">
              <h2>🎯 推薦搭配</h2>
              <p>精選的手串設計方案，為您提供創作靈感</p>
            </div>
            <div className="recommendations-container">
              <SavedDesigns />
            </div>
          </div>
        )}
      </div>

      <div className="guide-footer">
        {/* 返回按鈕已移除 */}
      </div>
    </div>
  );
};

export default BeadGuide;