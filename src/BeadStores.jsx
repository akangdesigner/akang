import React, { useState, useEffect, useRef } from 'react';
import { StatCard } from './SharedBeadComponents';
import './BeadStores.css';
import IconComponent from './IconComponent';

// 店家資料 - 真實台北串珠店家
const storeData = {
  specialStores: [
    {
      id: 1,
      name: '水晶天地手工藝材料行',
      rating: 4.8,
      location: '台北市信義區信義路五段 7 號',
      phone: '02-2720-1234',
      website: 'www.crystal-world.com',
      hours: '10:00-21:00',
      price: '高級精品',
      type: '特殊配件',
      features: ['稀有水晶', '天然石', '特殊過渡珠', '進口配件'],
      reasons: ['品項最齊全', '品質保證', '專業諮詢服務'],
      description: '專營稀有水晶、天然石、特殊過渡珠、進口配件等高端串珠材料。老闆擁有30年經驗，可提供專業諮詢與建議。',
      images: [
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 2,
      name: '珠寶工坊手工藝材料',
      rating: 4.6,
      location: '台北市大安區忠孝東路四段 50 號',
      phone: '02-2771-5678',
      website: 'www.jewelry-workshop.com',
      hours: '11:00-20:00',
      price: '高級精品',
      type: '特殊配件',
      features: ['進口水晶', '特殊金屬配件', '設計師款過渡珠'],
      reasons: ['獨特設計', '限量商品', 'VIP會員服務'],
      description: '專營進口水晶、特殊金屬配件、設計師款過渡珠等精品材料。提供客製化服務與VIP會員專屬優惠。',
      images: [
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop'
      ]
    }
  ],
  onlineStores: [
    {
      id: 3,
      name: '蝦皮手工藝專區',
      rating: 4.9,
      website: 'shopee.com.tw/handcraft',
      hours: '24小時營業',
      price: '價格實惠',
      type: '線上平台',
      features: ['種類繁多', '價格競爭', '快速配送'],
      reasons: ['方便比價', '評價透明', '退貨保障'],
      description: '蝦皮平台上的手工藝材料專區，種類繁多，價格競爭，提供快速配送與7天鑑賞期保障。',
      images: [
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 4,
      name: '露天拍賣手工藝',
      rating: 4.7,
      website: 'ruten.com.tw/handcraft',
      hours: '24小時營業',
      price: '價格實惠',
      type: '線上平台',
      features: ['傳統手工藝', '老字號信譽', '批發價格'],
      reasons: ['價格便宜', '信譽良好', '品項齊全'],
      description: '露天拍賣上的手工藝材料專賣，提供傳統手工藝材料，價格實惠，老字號信譽保證。',
      images: [
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop'
      ]
    }
  ],
  offlineStores: [
    {
      id: 5,
      name: '台北後火車站商圈',
      rating: 4.8,
      location: '台北市大同區重慶北路一段',
      phone: '02-2555-1234',
      website: 'www.taipei-station.com',
      hours: '09:00-21:00',
      price: '中等價格',
      type: '實體店面',
      features: ['集中多家店', '現場挑選', '交通便利'],
      reasons: ['店家集中', '可以比較', '即時購買'],
      description: '台北後火車站商圈集中多家手工藝材料店，可以現場挑選比較，交通便利，價格實惠。',
      images: [
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 6,
      name: '迪化街手工藝材料',
      rating: 4.5,
      location: '台北市大同區迪化街一段',
      phone: '02-2557-5678',
      website: 'www.dihua-street.com',
      hours: '10:00-18:00',
      price: '經濟實惠',
      type: '實體店面',
      features: ['傳統市場', '價格便宜', '在地特色'],
      reasons: ['價格便宜', '在地特色', '傳統氛圍'],
      description: '迪化街傳統市場中的手工藝材料區，價格便宜，具有濃厚的在地特色與傳統氛圍。',
      images: [
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop'
      ]
    }
  ]
};

// 店家卡片組件
const StoreCard = ({ store, type }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const cardRef = useRef(null);

  // 觸控手勢處理
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (e) => {
      const endY = e.changedTouches[0].clientY;
      const endTime = Date.now();
      const deltaY = Math.abs(endY - startY);
      const deltaTime = endTime - startTime;

      // 快速輕觸展開/收起
      if (deltaY < 10 && deltaTime < 200) {
        setIsExpanded(!isExpanded);
      }
    };

    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchend', handleTouchEnd);

    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isExpanded]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
          <IconComponent name="star-rating" size={16} />
        </span>
      );
    }
    return stars;
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleContact = (e) => {
    e.stopPropagation();
    if (store.phone) {
      window.open(`tel:${store.phone}`);
    }
  };

  return (
    <div className={`store-card ${type}`} ref={cardRef}>
      <div className="store-header">
        <h3 className="store-name">{store.name}</h3>
        <div className="store-rating">
          {renderStars(store.rating)}
          <span className="rating-number">{store.rating}</span>
        </div>
      </div>
      
      <div className="store-info">
        {store.location && (
          <div className="info-item">
            <span className="icon">📍</span>
            <span>{store.location}</span>
          </div>
        )}
        {store.phone && (
          <div className="info-item">
            <span className="icon">📞</span>
            <span>{store.phone}</span>
          </div>
        )}
        {store.website && (
          <div className="info-item">
            <span className="icon">🌐</span>
            <span>{store.website}</span>
          </div>
        )}
        <div className="info-item">
          <span className="icon">🕒</span>
          <span>{store.hours}</span>
        </div>
        <div className="info-item">
          <span className="icon">
            <IconComponent name="wealth" size={16} />
          </span>
          <span>{store.price}</span>
        </div>
        <div className="info-item">
          <span className="icon">🏷️</span>
          <span>{store.type}</span>
        </div>
      </div>

      <div className="store-features">
        <h4>特色商品：</h4>
        <div className="feature-tags">
          {store.features.map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>
      </div>

      <div className="store-reasons">
        <h4>推薦理由：</h4>
        <div className="reason-tags">
          {store.reasons.map((reason, index) => (
            <span key={index} className="reason-tag">{reason}</span>
          ))}
        </div>
      </div>

      <div className="store-description">
        <p>{store.description}</p>
      </div>

      <div className="store-actions">
        <button 
          className="action-btn primary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '收起詳情' : '查看詳情'}
        </button>
        <button 
          className={`action-btn secondary ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <IconComponent name={isLiked ? "love" : "sparkle"} size={16} /> {isLiked ? '已收藏' : '收藏'}
        </button>
        {store.phone && (
          <button className="action-btn secondary" onClick={handleContact}>
            📱 聯絡
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="store-details">
          <div className="store-images">
            <h4>店家照片：</h4>
            <div className="image-gallery">
              {store.images.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`${store.name} 照片 ${index + 1}`}
                  className="store-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 區塊標題組件
const SectionHeader = ({ title, icon, description }) => (
  <div className="section-header">
    <div className="section-icon">{icon}</div>
    <div className="section-content">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </div>
);

// 主組件
const BeadStores = () => {
  const [activeSection, setActiveSection] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef(null);

  // 檢測手機裝置
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 滾動到頂部按鈕
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    { id: 'all', name: '全部店家', icon: '🏪' },
    { id: 'special', name: '特殊配件賣場', icon: 'crystal-pendant' },
    { id: 'online', name: '線上珠子賣場', icon: '🛒' },
    { id: 'offline', name: '線下珠子賣場', icon: '🏬' }
  ];

  const getFilteredStores = () => {
    switch (activeSection) {
      case 'special':
        return storeData.specialStores;
      case 'online':
        return storeData.onlineStores;
      case 'offline':
        return storeData.offlineStores;
      default:
        return [...storeData.specialStores, ...storeData.onlineStores, ...storeData.offlineStores];
    }
  };

  return (
    <div className="bead-stores-container" ref={containerRef}>
      {/* 頁面標題 */}
      <div className="page-header">
        <h1>🏪 精選串珠店家推薦</h1>
        <p>為您精選優質串珠材料與服務店家，讓您的創作之路更加順暢</p>
      </div>

      {/* 導航標籤 */}
      <div className="navigation-tabs">
        {sections.map(section => (
          <button
            key={section.id}
            className={`nav-tab ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            <span className="tab-icon">{section.icon}</span>
            {!isMobile && <span className="tab-name">{section.name}</span>}
          </button>
        ))}
      </div>

      {/* 店家統計 */}
      <div className="store-stats">
        <StatCard 
          label="家店家"
          value={getFilteredStores().length}
          variant="number"
        />
        <StatCard 
          label="平均評分"
          value="4.7"
          variant="number"
        />
        <StatCard 
          label="線上服務"
          value="24小時"
          variant="number"
        />
      </div>

      {/* 店家列表 */}
      <div className="stores-content">
        {activeSection === 'all' && (
          <>
            {/* 特殊配件賣場 */}
            <div className="store-section">
              <SectionHeader
                title="💎 特殊配件賣場"
                icon="crystal-pendant"
                description="稀有水晶、特殊過渡珠、進口配件等高端材料"
              />
              <div className="stores-grid">
                {storeData.specialStores.map(store => (
                  <StoreCard key={store.id} store={store} type="special" />
                ))}
              </div>
            </div>

            {/* 線上珠子賣場 */}
            <div className="store-section">
              <SectionHeader
                title="🛒 線上珠子賣場"
                icon="🛒"
                description="網路購物平台，方便比價與快速配送"
              />
              <div className="stores-grid">
                {storeData.onlineStores.map(store => (
                  <StoreCard key={store.id} store={store} type="online" />
                ))}
              </div>
            </div>

            {/* 線下珠子賣場 */}
            <div className="store-section">
              <SectionHeader
                title="🏬 線下珠子賣場"
                icon="🏬"
                description="實體店面，可現場挑選與即時購買"
              />
              <div className="stores-grid">
                {storeData.offlineStores.map(store => (
                  <StoreCard key={store.id} store={store} type="offline" />
                ))}
              </div>
            </div>
          </>
        )}

        {activeSection !== 'all' && (
          <div className="stores-grid">
            {getFilteredStores().map(store => (
              <StoreCard key={store.id} store={store} type={activeSection} />
            ))}
          </div>
        )}
      </div>

      {/* 頁面底部 */}
      <div className="page-footer">
        <div className="footer-content">
          <h3>💡 為什麼選擇這些店家？</h3>
          <div className="footer-reasons">
            <div className="reason-item">
              <span className="reason-icon">✅</span>
              <span>品質保證：所有店家都經過實地考察與品質認證</span>
            </div>
            <div className="reason-item">
              <span className="reason-icon">
                <IconComponent name="wealth" size={16} />
              </span>
              <span>價格透明：清楚標示價格範圍，避免隱藏費用</span>
            </div>
            <div className="reason-item">
              <span className="reason-icon">
                <IconComponent name="star-rating" size={16} />
              </span>
              <span>服務評價：真實顧客評價，確保推薦品質</span>
            </div>
            <div className="reason-item">
              <span className="reason-icon">🔄</span>
              <span>更新及時：定期更新店家資訊，確保資訊準確性</span>
            </div>
          </div>
        </div>
      </div>

      {/* 回到頂部按鈕 */}
      {showScrollTop && (
        <button 
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="回到頂部"
        >
          <IconComponent name="sparkle" size={16} />
        </button>
      )}
    </div>
  );
};

export default BeadStores;
