import React, { useState, useEffect } from 'react';
import './DailyFortune.css';
import IconComponent from './IconComponent';

// 運勢數據 - 五面向分類（含星級評分）
const getFortuneData = (zodiacSign) => {
  const fortuneData = {
    '牡羊座': {
      career: { 
        stars: 4, 
        advice: '今日事業運勢四顆星！宜主動爭取新機會、提出創新提案、展現領導才能' 
      },
      love: { 
        stars: 3, 
        advice: '今日感情運勢三顆星！不宜告白，宜先觀察對方反應，保持耐心' 
      },
      wealth: { 
        stars: 4, 
        advice: '今日偏財運勢四顆星！宜投資新興產業、購買彩券、嘗試小額投資' 
      },
      health: { 
        stars: 3, 
        advice: '今日健康運勢三顆星！宜適度運動、不宜過度勞累，注意休息' 
      },
      social: { 
        stars: 4, 
        advice: '今日人際運勢四顆星！宜參加聚會、結交新朋友、展現個人魅力' 
      }
    },
    '金牛座': {
      career: { 
        stars: 3, 
        advice: '今日事業運勢三顆星！宜穩定發展、不宜急於求成，保持耐心' 
      },
      love: { 
        stars: 4, 
        advice: '今日感情運勢四顆星！宜安排浪漫約會、表達愛意、送小禮物' 
      },
      wealth: { 
        stars: 5, 
        advice: '今日偏財運勢五顆星！宜投資理財、購買保值商品、不宜衝動消費' 
      },
      health: { 
        stars: 3, 
        advice: '今日健康運勢三顆星！宜享受美食、不宜過度放縱，保持節制' 
      },
      social: { 
        stars: 3, 
        advice: '今日人際運勢三顆星！宜與朋友聚會、不宜拒絕邀請，保持開放' 
      }
    },
    '雙子座': {
      career: { 
        stars: 4, 
        advice: '今日事業運勢四顆星！宜學習新技能、提出創意提案、不宜三心二意' 
      },
      love: { 
        stars: 3, 
        advice: '今日感情運勢三顆星！宜與伴侶深度交流、不宜過度八卦，保持真誠' 
      },
      wealth: { 
        stars: 3, 
        advice: '今日偏財運勢三顆星！宜多元化投資、不宜頻繁交易，保持耐心' 
      },
      health: { 
        stars: 3, 
        advice: '今日健康運勢三顆星！宜學習健康知識、不宜過度用腦，注意休息' 
      },
      social: { 
        stars: 5, 
        advice: '今日人際運勢五顆星！宜參加聚會、分享資訊、不宜言多必失' 
      }
    },
    '巨蟹座': {
      career: { good: '照顧團隊，建立歸屬感', careful: '避免過度敏感，保持理性' },
      love: { good: '表達關愛，建立安全感', careful: '不要沉溺過去，展望未來' },
      wealth: { good: '家庭理財，穩健投資', careful: '避免情緒化消費，理性規劃' },
      health: { good: '照顧家人健康，整理家居', careful: '注意情緒管理，保持平衡' },
      social: { good: '與家人團聚，情感交流', careful: '避免過度依賴，保持獨立' }
    },
    '獅子座': {
      career: { good: '展現才華，領導團隊', careful: '避免過度自負，傾聽意見' },
      love: { good: '表達愛意，享受浪漫', careful: '不要過度控制，尊重對方' },
      wealth: { good: '投資自己，享受生活', careful: '避免過度消費，理性理財' },
      health: { good: '展現活力，享受運動', careful: '注意休息，避免過度勞累' },
      social: { good: '成為焦點，享受關注', careful: '避免過度表現，保持謙虛' }
    },
    '處女座': {
      career: { good: '完善細節，提升效率', careful: '避免過度挑剔，接受不完美' },
      love: { good: '細心照顧，表達關愛', careful: '不要過度分析，享受當下' },
      wealth: { good: '精細理財，穩健投資', careful: '避免過度節儉，適度享受' },
      health: { good: '健康檢查，規律作息', careful: '避免過度焦慮，放鬆心情' },
      social: { good: '幫助他人，建立信任', careful: '避免過度批評，保持包容' }
    },
    '天秤座': {
      career: { good: '平衡各方，協調合作', careful: '避免優柔寡斷，果斷決策' },
      love: { good: '享受浪漫，建立和諧', careful: '不要過度妥協，保持原則' },
      wealth: { good: '平衡投資，理性消費', careful: '避免過度猶豫，及時行動' },
      health: { good: '保持平衡，享受生活', careful: '避免過度追求完美，接受現實' },
      social: { good: '社交活動，建立關係', careful: '避免過度迎合，保持自我' }
    },
    '天蠍座': {
      career: { good: '深度研究，轉變重生', careful: '避免過度控制，信任他人' },
      love: { good: '深度交流，建立信任', careful: '不要報復心態，保持開放' },
      wealth: { good: '深度投資，長期規劃', careful: '避免過度冒險，保持理性' },
      health: { good: '深度調理，身心平衡', careful: '避免過度執著，保持彈性' },
      social: { good: '深度友誼，建立信任', careful: '避免過度懷疑，保持信任' }
    },
    '射手座': {
      career: { good: '開拓新領域，學習成長', careful: '避免過度樂觀，面對現實' },
      love: { good: '自由戀愛，享受冒險', careful: '不要逃避承諾，保持責任' },
      wealth: { good: '多元化投資，長期規劃', careful: '避免過度冒險，保持理性' },
      health: { good: '戶外運動，保持活力', careful: '注意安全，避免過度冒險' },
      social: { good: '結交新朋友，拓展視野', careful: '避免過度自由，保持承諾' }
    },
    '摩羯座': {
      career: { good: '建立權威，長期規劃', careful: '避免過度嚴肅，享受生活' },
      love: { good: '穩定關係，建立承諾', careful: '不要過度工作，陪伴愛人' },
      wealth: { good: '長期投資，穩健理財', careful: '避免過度節儉，適度享受' },
      health: { good: '規律作息，保持健康', careful: '避免過度工作，注意休息' },
      social: { good: '建立權威，獲得尊重', careful: '避免過度嚴肅，保持親和' }
    },
    '水瓶座': {
      career: { good: '創新思考，科技發展', careful: '避免過度疏離，保持連結' },
      love: { good: '自由戀愛，保持獨立', careful: '不要過度理性，表達情感' },
      wealth: { good: '創新投資，科技理財', careful: '避免過度理想化，面對現實' },
      health: { good: '科技健康，創新養生', careful: '避免過度疏離，保持平衡' },
      social: { good: '團體活動，人道主義', careful: '避免過度獨立，保持親密' }
    },
    '雙魚座': {
      career: { good: '創意工作，藝術表達', careful: '避免過度幻想，面對現實' },
      love: { good: '浪漫表達，情感交流', careful: '不要逃避問題，勇敢面對' },
      wealth: { good: '直覺投資，藝術收藏', careful: '避免過度感性，理性規劃' },
      health: { good: '冥想靜心，藝術療癒', careful: '避免過度逃避，建立界限' },
      social: { good: '幫助他人，情感連結', careful: '避免過度犧牲，保持自我' }
    }
  };
  
  return fortuneData[zodiacSign] || {
    career: { 
      stars: 3, 
      advice: '今日事業運勢三顆星！宜保持積極態度、不宜負面思考，堅持努力' 
    },
    love: { 
      stars: 3, 
      advice: '今日感情運勢三顆星！宜表達真誠情感、不宜過度期待，順其自然' 
    },
    wealth: { 
      stars: 3, 
      advice: '今日偏財運勢三顆星！宜穩健理財、不宜衝動消費，量力而為' 
    },
    health: { 
      stars: 3, 
      advice: '今日健康運勢三顆星！宜保持規律作息、不宜過度壓力，注意休息' 
    },
    social: { 
      stars: 3, 
      advice: '今日人際運勢三顆星！宜與人交流、不宜過度依賴，做真實自己' 
    }
  };
};

// 推薦珠子數據
const recommendedBeads = [
  {
    id: 1,
    name: '粉晶珠',
    image: '/light-pink-bead-ID1.png',
    reason: '粉晶具有強大的愛情能量，能增強人際關係和諧，特別適合今日的感情運勢。佩戴粉晶能幫助您吸引正面的愛情能量，增進與他人的情感連結。',
    spiritualProperty: '愛情、和諧、治癒'
  },
  {
    id: 2,
    name: '紫水晶珠',
    image: '/light-purple-bead-ID12.png',
    reason: '紫水晶是靈性成長的強大助手，能提升直覺力和精神意識。今日靈性運勢極佳，佩戴紫水晶能幫助您更好地接收宇宙的智慧指引。',
    spiritualProperty: '靈性、直覺、智慧'
  },
  {
    id: 3,
    name: '綠松石珠',
    image: '/mint-green-bead-ID2.png',
    reason: '綠松石具有平衡和保護的能量，能穩定情緒並促進健康。今日健康運勢良好，佩戴綠松石能幫助您保持身心平衡，遠離負面能量。',
    spiritualProperty: '平衡、保護、健康'
  }
];

// 星級評分組件
const StarRating = ({ stars, maxStars = 5 }) => {
  return (
    <div className="star-rating">
      {[...Array(maxStars)].map((_, index) => (
        <IconComponent
          key={index}
          name="star-rating"
          size={20}
          className={index < stars ? 'star-filled' : 'star-empty'}
        />
      ))}
      <span className="star-text">{stars}顆星</span>
    </div>
  );
};

// 單一運勢顯示組件
const SingleFortuneDisplay = ({ zodiacSign }) => {
  const fortuneData = getFortuneData(zodiacSign);
  
  // 所有面向的配置
  const allAspects = [
    { key: 'career', name: '事業運勢', icon: 'career', color: '#3B82F6' },
    { key: 'love', name: '感情運勢', icon: 'love', color: '#EC4899' },
    { key: 'wealth', name: '財運運勢', icon: 'wealth', color: '#F59E0B' },
    { key: 'health', name: '健康運勢', icon: 'health', color: '#10B981' },
    { key: 'social', name: '人際運勢', icon: 'social', color: '#8B5CF6' }
  ];

  // 找出最高星級的面向
  const aspectScores = allAspects.map(aspect => ({
    ...aspect,
    stars: fortuneData[aspect.key].stars
  }));

  // 按星級排序，只取最高的一個
  const sortedAspects = aspectScores.sort((a, b) => b.stars - a.stars);
  const topAspect = sortedAspects[0];
  const currentFortune = topAspect ? fortuneData[topAspect.key] : null;

  // 如果沒有找到合適的面向，顯示默認內容
  if (!topAspect || !currentFortune) {
    return (
      <div className="single-fortune-container">
        <div className="fortune-content">
          <div className="aspect-header">
            <IconComponent name="career" size={32} />
            <h3 style={{ color: '#3B82F6' }}>運勢分析</h3>
            <StarRating stars={3} />
          </div>
          
          <div className="fortune-advice-cards">
            <div className="advice-card good-advice">
              <div className="advice-header">
                <IconComponent name="sparkle" size={20} />
                <h4>今日宜...</h4>
              </div>
              <p>保持積極態度，努力學習</p>
            </div>
            
            <div className="advice-card careful-advice">
              <div className="advice-header">
                <IconComponent name="mystic-eye" size={20} />
                <h4>今日不宜...</h4>
              </div>
              <p>保持謹慎，注意安全</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="single-fortune-container">
      <div className="fortune-content">
        <div className="aspect-header">
          <IconComponent name={topAspect.icon} size={32} />
          <h3 style={{ color: topAspect.color }}>{topAspect.name}</h3>
          <StarRating stars={currentFortune.stars} />
        </div>
        
        <div className="fortune-advice-cards">
          <div className="advice-card good-advice">
            <div className="advice-header">
              <IconComponent name="sparkle" size={20} />
              <h4>今日宜...</h4>
            </div>
            <p>{currentFortune.advice ? 
              (currentFortune.advice.split('！')[1]?.split('、不宜')[0] || currentFortune.advice) : 
              '保持積極態度，努力學習'}</p>
          </div>
          
          <div className="advice-card careful-advice">
            <div className="advice-header">
              <IconComponent name="mystic-eye" size={20} />
              <h4>今日不宜...</h4>
            </div>
            <p>{currentFortune.advice && currentFortune.advice.includes('不宜') ? 
              (currentFortune.advice.split('不宜')[1]?.split('，')[0] || '保持謹慎') : 
              '保持謹慎，注意安全'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 珠子推薦組件
const BeadRecommendation = ({ bead }) => {
  return (
    <div className="bead-recommendation">
      <div className="bead-recommendation-header">
        <div className="bead-image-container">
          <img 
            src={bead.image} 
            alt={bead.name}
            className="bead-image"
          />
          <div className="bead-glow"></div>
        </div>
        <h4 className="bead-name">{bead.name}</h4>
        <div className="spiritual-property">
          <span className="property-icon">
            <IconComponent name="crystal-ball" size={16} />
          </span>
          <span className="property-text">{bead.spiritualProperty}</span>
        </div>
      </div>
      <div className="bead-explanation">
        <div className="explanation-header">
          <span className="explanation-icon">
            <IconComponent name="sparkle" size={20} />
          </span>
          <span className="explanation-title">推薦理由</span>
        </div>
        <p className="explanation-content">{bead.reason}</p>
      </div>
    </div>
  );
};

// 星座計算函數
const calculateZodiacSign = (month, day) => {
  const signs = [
    { name: '水瓶座', start: [1, 20], end: [2, 18] },
    { name: '雙魚座', start: [2, 19], end: [3, 20] },
    { name: '牡羊座', start: [3, 21], end: [4, 19] },
    { name: '金牛座', start: [4, 20], end: [5, 20] },
    { name: '雙子座', start: [5, 21], end: [6, 20] },
    { name: '巨蟹座', start: [6, 21], end: [7, 22] },
    { name: '獅子座', start: [7, 23], end: [8, 22] },
    { name: '處女座', start: [8, 23], end: [9, 22] },
    { name: '天秤座', start: [9, 23], end: [10, 22] },
    { name: '天蠍座', start: [10, 23], end: [11, 21] },
    { name: '射手座', start: [11, 22], end: [12, 21] },
    { name: '摩羯座', start: [12, 22], end: [1, 19] }
  ];

  for (const sign of signs) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;
    
    if (startMonth === endMonth) {
      if (month === startMonth && day >= startDay && day <= endDay) {
        return sign.name;
      }
    } else {
      if ((month === startMonth && day >= startDay) || 
          (month === endMonth && day <= endDay)) {
        return sign.name;
      }
    }
  }
  return '未知';
};

// 上升星座計算函數（簡化版）
const calculateRisingSign = (birthTime, zodiacSign) => {
  // 這裡是簡化的上升星座計算，實際需要更複雜的占星學計算
  const risingSigns = {
    '牡羊座': '獅子座',
    '金牛座': '處女座',
    '雙子座': '天秤座',
    '巨蟹座': '天蠍座',
    '獅子座': '射手座',
    '處女座': '摩羯座',
    '天秤座': '水瓶座',
    '天蠍座': '雙魚座',
    '射手座': '牡羊座',
    '摩羯座': '金牛座',
    '水瓶座': '雙子座',
    '雙魚座': '巨蟹座'
  };
  
  return risingSigns[zodiacSign] || '未知';
};

// 主組件
const DailyFortune = () => {
  const [userInfo, setUserInfo] = useState({
    gender: '',
    birthDate: '',
    birthTime: ''
  });
  const [zodiacInfo, setZodiacInfo] = useState({
    zodiacSign: '',
    risingSign: ''
  });
  const [showFortune, setShowFortune] = useState(false);

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateAstrology = () => {
    if (userInfo.birthDate && userInfo.birthTime) {
      const birthDate = new Date(userInfo.birthDate);
      const month = birthDate.getMonth() + 1;
      const day = birthDate.getDate();
      
      const zodiacSign = calculateZodiacSign(month, day);
      const risingSign = calculateRisingSign(userInfo.birthTime, zodiacSign);
      
      setZodiacInfo({
        zodiacSign,
        risingSign
      });
      // 開發階段：不自動顯示運勢，需要手動觸發
      // setShowFortune(true);
    }
  };

  const showFortuneAnalysis = () => {
    if (!zodiacInfo.zodiacSign) {
      alert('請先計算星座信息');
      return;
    }
    console.log('顯示運勢分析，當前狀態:', { showFortune, zodiacInfo });
    setShowFortune(true);
  };

  const openBeadCabinet = () => {
    window.location.href = '/';
  };

  const openGuide = () => {
    window.location.href = '/guide';
  };

  const openRating = () => {
    window.location.href = '/rating';
  };

  return (
    <div className="daily-fortune-container">
      {/* 頁面標題 */}
      <div className="fortune-header">
        <div className="header-content">
          <h1 className="fortune-title">
            <span className="title-icon">
              <IconComponent name="crystal-ball" size={48} />
            </span>
            每日運勢分析
          </h1>
          <div className="user-info-form">
            <div className="form-title">
              <span className="form-icon">
                <IconComponent name="mystic-eye" size={20} />
              </span>
              <span className="form-text">個人資訊</span>
            </div>
            
            <div className="form-fields">
              <div className="form-group">
                <label className="form-label">性別</label>
                <select 
                  className="form-select"
                  value={userInfo.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <option value="">請選擇性別</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">出生日期</label>
                <input 
                  type="date"
                  className="form-input"
                  value={userInfo.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">出生時間</label>
                <input 
                  type="time"
                  className="form-input"
                  value={userInfo.birthTime}
                  onChange={(e) => handleInputChange('birthTime', e.target.value)}
                />
              </div>
              
              <button 
                className="calculate-btn"
                onClick={calculateAstrology}
                disabled={!userInfo.gender || !userInfo.birthDate || !userInfo.birthTime}
              >
                <IconComponent name="crystal-ball" size={16} />
                計算星座運勢
              </button>
            </div>
            
            {zodiacInfo.zodiacSign && (
              <div className="zodiac-display">
                <div className="zodiac-info">
                  <span className="zodiac-label">太陽星座：</span>
                  <span className="zodiac-value">{zodiacInfo.zodiacSign}</span>
                </div>
                <div className="zodiac-info">
                  <span className="zodiac-label">上升星座：</span>
                  <span className="zodiac-value">{zodiacInfo.risingSign}</span>
                </div>
                
                {!showFortune && (
                  <button 
                    className="show-fortune-btn"
                    onClick={showFortuneAnalysis}
                  >
                    <IconComponent name="mystic-eye" size={16} />
                    查看今日運勢
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="header-decoration">
          <div className="floating-crystal crystal-1">
            <IconComponent name="crystal-pendant" size={32} />
          </div>
          <div className="floating-crystal crystal-2">
            <IconComponent name="sparkle" size={32} />
          </div>
          <div className="floating-crystal crystal-3">
            <IconComponent name="moon-stars" size={32} />
          </div>
        </div>
      </div>

      {/* 簡化運勢顯示區域 */}
      {showFortune && (
        <div className="fortune-display-section">
          <div className="section-title">
            <span className="section-icon">
              <IconComponent name="crystal-ball" size={24} />
            </span>
            <span className="section-text">今日運勢指引</span>
          </div>
          
          <SingleFortuneDisplay zodiacSign={zodiacInfo.zodiacSign} />
        </div>
      )}

      {/* 珠子推薦區域 */}
      {showFortune && (
        <div className="bead-recommendations-section">
          <div className="section-title">
            <span className="section-icon">
              <IconComponent name="bead-bracelet" size={24} />
            </span>
            <span className="section-text">今日推薦珠子</span>
          </div>
          
          <div className="bead-recommendations-slider">
            <div className="slider-hint">
              <span className="hint-icon">
                <IconComponent name="arrow-left" size={20} />
              </span>
              <span className="hint-text">滑動查看更多推薦</span>
            </div>
            <div className="bead-recommendations">
              {recommendedBeads.map((bead) => (
                <BeadRecommendation key={bead.id} bead={bead} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 底部導航欄 */}
      <div className="bottom-navigation">
        <div className="nav-grid">
          <button className="nav-button" onClick={() => window.location.href = '/home'}>
            <div className="nav-icon">
              <IconComponent name="home" size={24} />
            </div>
            <div className="nav-text">返回首頁</div>
          </button>
          <button className="nav-button" onClick={openBeadCabinet}>
            <div className="nav-icon">
              <IconComponent name="art-palette" size={24} />
            </div>
            <div className="nav-text">數位串珠</div>
          </button>
          <button className="nav-button" onClick={openGuide}>
            <div className="nav-icon">
              <IconComponent name="magnifying-glass" size={24} />
            </div>
            <div className="nav-text">珠子指南</div>
          </button>
          <button className="nav-button" onClick={openRating}>
            <div className="nav-icon">
              <IconComponent name="star-rating" size={24} />
            </div>
            <div className="nav-text">串珠評分</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyFortune;
