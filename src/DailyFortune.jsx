import React, { useState, useEffect } from 'react';
import './DailyFortune.css';
import IconComponent from './IconComponent';
import { useNavigation } from './hooks/useNavigation';

// 運勢資料庫 - 五個面向，每個面向有多個不同星級的選項
const getFortuneData = () => {
  return {
    career: [
      { stars: 5, advice: '宇宙能量正為您的事業之路開闢新航道，宜主動爭取新機會、提出創新提案、展現領導才能。記住：自信是您最閃亮的盔甲，但謙遜是您最強大的武器！', luckyColor: '金色', luckyNumber: 8 },
      { stars: 5, advice: '今日是展現專業實力的絕佳時機！宜參與重要會議、發表專業見解、建立權威形象。您的專業知識將為您贏得尊重和認可，把握機會展現您的核心競爭力！', luckyColor: '深紫色', luckyNumber: 11 },
      { stars: 5, advice: '貴人運勢極佳，面試新工作、升職加薪的機會就在眼前！穿著得體並準備充分，您的專業能力將在今日大放異彩。', luckyColor: '深藍色', luckyNumber: 3 },
      { stars: 4, advice: '創意靈感如泉水般湧現，宜學習新技能、提出創意提案。可以嘗試線上課程或參加研習會，知識就是您最寶貴的投資！', luckyColor: '紫色', luckyNumber: 7 },
      { stars: 4, advice: '溝通能力特別突出，宜參加會議、發表意見。記得先做好功課再發言，您的見解將獲得眾人認同。', luckyColor: '綠色', luckyNumber: 5 },
      { stars: 4, advice: '今日適合建立新的合作關係！宜主動聯繫潛在合作夥伴、參加行業活動、拓展人脈網絡。良好的合作關係將為您的事業帶來新的機遇！', luckyColor: '天藍色', luckyNumber: 12 },
      { stars: 3, advice: '不宜急於求成，保持耐心是今日的關鍵。先穩固基礎再求突破，羅馬不是一天建成的。', luckyColor: '棕色', luckyNumber: 2 },
      { stars: 3, advice: '不宜貿然跳槽，宜專注於現有工作。提升專業能力比換工作更重要，厚積薄發才是王道。', luckyColor: '灰色', luckyNumber: 9 },
      { stars: 2, advice: '不宜做重大決定，宜先觀察局勢。多聽取他人意見，三個臭皮匠勝過一個諸葛亮。', luckyColor: '深灰色', luckyNumber: 4 },
      { stars: 2, advice: '不宜與同事爭執，宜保持低調。專注於完成任務，和氣生財才是上策。', luckyColor: '米色', luckyNumber: 6 },
      { stars: 1, advice: '不宜簽約或投資，宜低調行事。專注於手邊工作，穩紮穩打才能度過難關。', luckyColor: '黑色', luckyNumber: 1 },
      { stars: 1, advice: '不宜提出新提案，宜維持現狀。多學習充實自己，機會總是留給有準備的人。', luckyColor: '深藍色', luckyNumber: 10 }
    ],
    love: [
      { stars: 5, advice: '愛神維納斯正為您撒下粉紅花瓣，宜安排浪漫約會、準備小驚喜、表達愛意。選擇對方喜歡的地點，讓愛情在美好的氛圍中綻放！', luckyColor: '粉紅色', luckyNumber: 6 },
      { stars: 5, advice: '告白、求婚的絕佳時機！安排驚喜約會、送花送禮，真誠的心意將感動對方。記住：真愛無敵，勇敢表達您的感情！', luckyColor: '玫瑰金', luckyNumber: 9 },
      { stars: 5, advice: '今日感情運勢達到巔峰！宜安排浪漫旅行、準備驚喜禮物、創造難忘回憶。您的情感表達將深深打動對方，讓愛情在美好時光中綻放！', luckyColor: '珊瑚粉', luckyNumber: 13 },
      { stars: 4, advice: '心靈交流的黃金時刻，宜與伴侶深度交流、準備小禮物。聊聊彼此的夢想，讓感情在真誠對話中升溫。', luckyColor: '薰衣草紫', luckyNumber: 3 },
      { stars: 4, advice: '約會的好日子！看電影、共進晚餐，選擇溫馨的餐廳。在美食與電影的陪伴下，感情將更加甜蜜。', luckyColor: '暖橙色', luckyNumber: 7 },
      { stars: 4, advice: '今日適合深度交流！宜分享內心想法、討論未來規劃、建立更深層的情感連結。真誠的對話將讓彼此更加了解，感情更加穩固！', luckyColor: '薰衣草紫', luckyNumber: 14 },
      { stars: 3, advice: '不宜告白，宜先觀察對方反應。多了解對方的喜好，知己知彼才能百戰百勝。', luckyColor: '淺藍色', luckyNumber: 2 },
      { stars: 3, advice: '不宜急於進展，宜慢慢培養感情。多花時間相處，細水長流的愛情更珍貴。', luckyColor: '薄荷綠', luckyNumber: 5 },
      { stars: 2, advice: '不宜爭吵，宜冷靜溝通。先深呼吸再說話，和氣生財也生愛。', luckyColor: '淺灰色', luckyNumber: 4 },
      { stars: 2, advice: '不宜談論未來規劃，宜專注當下。享受簡單的相處時光，平凡中的幸福最珍貴。', luckyColor: '米色', luckyNumber: 8 },
      { stars: 1, advice: '不宜談論敏感話題，宜保持距離。給彼此一些空間，距離產生美。', luckyColor: '深灰色', luckyNumber: 1 },
      { stars: 1, advice: '不宜約會，宜獨處思考。先整理自己的心情，愛自己才能愛別人。', luckyColor: '深藍色', luckyNumber: 10 }
    ],
    wealth: [
      { stars: 5, advice: '財神爺正對您微笑！宜打麻將、玩德州撲克、投資理財。記住：設定停損點避免貪心，見好就收才是王道！', luckyColor: '金色', luckyNumber: 8 },
      { stars: 5, advice: '幸運女神眷顧您！宜買彩券、刮刮樂、股票投資。小賭怡情大賭傷身，理性投資才能長久獲利！', luckyColor: '銀色', luckyNumber: 5 },
      { stars: 5, advice: '今日財運亨通！宜進行大額投資、購買貴重物品、參與高收益項目。您的投資眼光特別敏銳，把握機會將獲得豐厚回報！', luckyColor: '翡翠綠', luckyNumber: 15 },
      { stars: 4, advice: '投資眼光特別敏銳！宜投資新興產業、購買彩券、嘗試小額投資。分散風險，不要把雞蛋放在同一個籃子裡！', luckyColor: '綠色', luckyNumber: 3 },
      { stars: 4, advice: '小額投資的好時機！宜小額賭博、買樂透，記得量力而為。適度參與，享受投資的樂趣！', luckyColor: '銅色', luckyNumber: 7 },
      { stars: 4, advice: '今日偏財運勢良好！宜購買彩券、參與抽獎活動、嘗試新的投資方式。保持樂觀心態，好運將伴隨您左右！', luckyColor: '琥珀色', luckyNumber: 16 },
      { stars: 3, advice: '不宜頻繁交易，保持耐心是關鍵。先研究市場趨勢，知己知彼才能百戰百勝！', luckyColor: '藍色', luckyNumber: 2 },
      { stars: 3, advice: '不宜大額下注，宜小額試水。先觀察再行動，穩健投資才能長久！', luckyColor: '灰色', luckyNumber: 6 },
      { stars: 2, advice: '不宜大額投資，宜保守理財。選擇定存或債券，安全第一！', luckyColor: '深藍色', luckyNumber: 4 },
      { stars: 2, advice: '不宜賭博，宜節省開支。把錢存起來，積少成多！', luckyColor: '棕色', luckyNumber: 9 },
      { stars: 1, advice: '不宜任何投資，宜節省開支。記帳控制支出，理財從節流開始！', luckyColor: '黑色', luckyNumber: 1 },
      { stars: 1, advice: '不宜借錢給人，宜守住現金。避免任何金錢往來，現金為王！', luckyColor: '深灰色', luckyNumber: 10 }
    ],
    health: [
      { stars: 5, advice: '活力滿滿的一天！宜運動健身、保持規律作息。選擇自己喜歡的運動方式，讓身體在快樂中變得更強壯！', luckyColor: '活力橙', luckyNumber: 7 },
      { stars: 5, advice: '養生的絕佳時機！宜健檢、養生、戶外活動。記得多喝水補充水分，身體是革命的本錢！', luckyColor: '森林綠', luckyNumber: 3 },
      { stars: 5, advice: '今日健康運勢極佳！宜進行全面體檢、開始新的運動計劃、調整飲食習慣。您的身體正處於最佳狀態，是建立健康生活方式的絕佳時機！', luckyColor: '翠綠色', luckyNumber: 17 },
      { stars: 4, advice: '享受美食的好日子！宜享受美食、保持節制。選擇新鮮食材，讓味蕾和身體都得到滿足！', luckyColor: '櫻桃紅', luckyNumber: 5 },
      { stars: 4, advice: '放鬆身心的時刻！宜按摩、泡澡、放鬆身心。聽些輕音樂，讓身心在寧靜中得到療癒！', luckyColor: '薰衣草紫', luckyNumber: 9 },
      { stars: 4, advice: '今日適合戶外活動！宜登山健行、海邊散步、公園運動。大自然的力量將為您注入活力，讓身心得到充分的放鬆和充電！', luckyColor: '天空藍', luckyNumber: 18 },
      { stars: 3, advice: '不宜過度勞累，注意休息。每小時起身活動，勞逸結合才能長久！', luckyColor: '淺藍色', luckyNumber: 2 },
      { stars: 3, advice: '不宜暴飲暴食，宜清淡飲食。多吃蔬果，讓身體在清爽中恢復活力！', luckyColor: '薄荷綠', luckyNumber: 6 },
      { stars: 2, advice: '不宜劇烈運動，宜學習健康知識。從簡單的伸展開始，循序漸進才是王道！', luckyColor: '淺灰色', luckyNumber: 4 },
      { stars: 2, advice: '不宜熬夜，宜早睡早起。調整作息時間，規律生活是健康的基礎！', luckyColor: '深藍色', luckyNumber: 8 },
      { stars: 1, advice: '不宜熬夜，宜早睡早起。睡前避免使用3C產品，讓大腦在寧靜中休息！', luckyColor: '黑色', luckyNumber: 1 },
      { stars: 1, advice: '不宜過度工作，宜多休息。請假在家休養，身體健康比什麼都重要！', luckyColor: '深灰色', luckyNumber: 10 }
    ],
    social: [
      { stars: 5, advice: '社交達人的一天！宜參加聚會、分享資訊。主動與人交流，您的人格魅力將吸引眾人目光！', luckyColor: '金黃色', luckyNumber: 6 },
      { stars: 5, advice: '人脈拓展的絕佳時機！宜社交活動、認識新朋友。保持真誠友善，真誠是建立友誼的基石！', luckyColor: '溫暖橙', luckyNumber: 9 },
      { stars: 5, advice: '今日人際運勢達到頂峰！宜舉辦聚會、參加重要社交場合、建立長期合作關係。您的人格魅力將吸引眾多貴人，為您帶來意想不到的機會！', luckyColor: '金橙色', luckyNumber: 19 },
      { stars: 4, advice: '展現魅力的好日子！宜參加聚會、結交新朋友、展現個人魅力。準備一些有趣的話題，讓對話更加精彩！', luckyColor: '粉紫色', luckyNumber: 3 },
      { stars: 4, advice: '聚餐聊天的好時機！宜聚餐、聊天。選擇輕鬆的環境，讓友誼在美食中升溫！', luckyColor: '暖棕色', luckyNumber: 7 },
      { stars: 4, advice: '今日適合團隊合作！宜參與團體活動、協作項目、集體討論。良好的團隊精神將為您贏得同事和朋友的信任與支持！', luckyColor: '橄欖綠', luckyNumber: 20 },
      { stars: 3, advice: '不宜拒絕邀請，保持開放態度。先了解活動內容再決定，機會總是留給有準備的人！', luckyColor: '淺綠色', luckyNumber: 2 },
      { stars: 3, advice: '不宜過度表現，宜低調參與。多傾聽少說話，有時候沉默是金！', luckyColor: '淺藍色', luckyNumber: 5 },
      { stars: 2, advice: '不宜參加大型聚會，宜小範圍社交。與親近的朋友相聚，質比量更重要！', luckyColor: '深綠色', luckyNumber: 4 },
      { stars: 2, advice: '不宜與人爭執，宜保持和諧。避免敏感話題，和氣生財也生友誼！', luckyColor: '淺灰色', luckyNumber: 8 },
      { stars: 1, advice: '不宜社交活動，宜獨處思考。利用時間自我充實，獨處是成長的良機！', luckyColor: '深藍色', luckyNumber: 1 },
      { stars: 1, advice: '不宜與人深交，宜保持距離。專注於自己的事情，有時候距離產生美！', luckyColor: '深灰色', luckyNumber: 10 }
    ]
  };
};

// 確定性選擇運勢的函數
const chooseTodaySuggestions = (sunSign, ascSign, dateStr, suggestionPool, gender = 'male') => {
  // 星座對應索引 (0-11)
  const zodiacSigns = [
    '牡羊座', '金牛座', '雙子座', '巨蟹座', '獅子座', '處女座',
    '天秤座', '天蠍座', '射手座', '摩羯座', '水瓶座', '雙魚座'
  ];
  
  // 性別對應索引 (0-1)
  const genderMap = { 'male': 0, 'female': 1, '其他': 2 };
  const genderIdx = genderMap[gender] || 0;
  
  // 面向名稱對應索引 (0-4)
  const faces = ['career', 'love', 'wealth', 'health', 'social'];
  const faceNames = ['事業', '愛情', '財運', '健康', '人際'];
  
  // 1. 將太陽星座與上升星座轉為索引 0..11
  const sunIdx = zodiacSigns.indexOf(sunSign);
  const ascIdx = zodiacSigns.indexOf(ascSign);
  
  if (sunIdx === -1 || ascIdx === -1) {
    throw new Error('無效的星座名稱');
  }
  
  // 計算組合ID (0-143) + 性別影響
  const comboId = sunIdx * 12 + ascIdx + genderIdx * 144;
  
  // 2. 將日期轉為 dayNumber
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const dayNumber = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
  
  // 3. 為每個面向計算星級和索引
  const faceResults = [];
  
  for (let faceIdx = 0; faceIdx < 5; faceIdx++) {
    // 計算星級 (1-5) - 加入性別影響
    const star = ((sunIdx * ascIdx + dayNumber + faceIdx * 11 + genderIdx * 7) % 5) + 1;
    
    // 計算建議索引 (0-1，每個星級底下2條建議) - 加入性別影響
    const index = (sunIdx + ascIdx * 13 + dayNumber + faceIdx * 7 + genderIdx * 3) % 2;
    
    faceResults.push({
      face: faces[faceIdx],
      faceName: faceNames[faceIdx],
      faceIdx: faceIdx,
      star: star,
      index: index
    });
  }
  
  // 4. 選取高星級面向（星級 >=4）1個，低星級面向（星級 <=3）1個
  const highStarFaces = faceResults.filter(face => face.star >= 4);
  const lowStarFaces = faceResults.filter(face => face.star <= 3);
  
  if (highStarFaces.length === 0 || lowStarFaces.length === 0) {
    throw new Error('無法找到合適的高星級或低星級面向');
  }
  
  // 使用確定性算法選擇高星級和低星級面向 - 加入性別影響
  const highFaceIndex = (comboId + dayNumber + genderIdx * 5) % highStarFaces.length;
  const lowFaceIndex = (comboId + dayNumber * 3 + genderIdx * 7) % lowStarFaces.length;
  
  let selectedHigh = highStarFaces[highFaceIndex];
  let selectedLow = lowStarFaces[lowFaceIndex];
  
  // 確保高/低面向不重複
  if (selectedHigh.faceIdx === selectedLow.faceIdx) {
    const nextLowFaceIndex = (lowFaceIndex + 1) % lowStarFaces.length;
    selectedLow = lowStarFaces[nextLowFaceIndex];
  }
  
  // 5. 從選中面向的星級底下，用index決定要選哪條建議
  const getSuggestion = (face, star, index) => {
    const faceSuggestions = suggestionPool[face];
    if (!faceSuggestions) {
      throw new Error(`找不到面向 "${face}" 的建議池`);
    }
    
    const starSuggestions = faceSuggestions.filter(item => item.stars === star);
    if (!starSuggestions || starSuggestions.length === 0) {
      throw new Error(`找不到面向 "${face}" 星級 ${star} 的建議`);
    }
    
    const suggestionIndex = index % starSuggestions.length;
    return starSuggestions[suggestionIndex];
  };
  
  // 6. 回傳結果
  const highSuggestion = getSuggestion(selectedHigh.face, selectedHigh.star, selectedHigh.index);
  const lowSuggestion = getSuggestion(selectedLow.face, selectedLow.star, selectedLow.index);
  
  return {
    date: dateStr,
    high: {
      face: selectedHigh.faceName,
      faceKey: selectedHigh.face,
      star: selectedHigh.star,
      suggestion: highSuggestion.advice,
      luckyColor: highSuggestion.luckyColor,
      luckyNumber: highSuggestion.luckyNumber
    },
    low: {
      face: selectedLow.faceName,
      faceKey: selectedLow.face,
      star: selectedLow.star,
      suggestion: lowSuggestion.advice,
      luckyColor: lowSuggestion.luckyColor,
      luckyNumber: lowSuggestion.luckyNumber
    }
  };
};

// 推薦珠子數據 - 根據運勢動態推薦（使用數位串珠的真實珠子資料）
const getRecommendedBeads = (fortuneResult) => {
  const baseBeads = [
    // 玻璃珠系列 - 適合愛情和人際運勢
    {
      id: 1,
      name: '米色玻璃珠',
      image: '/light-pink-bead-ID1.png',
      reason: '米色玻璃珠具有溫暖和諧的能量，能增強人際關係和愛情運勢。佩戴此珠能幫助您吸引正面的情感能量，增進與他人的和諧連結。',
      spiritualProperty: '愛情、和諧、溫暖',
      suitableFor: ['love', 'social']
    },
    {
      id: 2,
      name: '薄荷綠玻璃珠',
      image: '/mint-green-bead-ID2.png',
      reason: '薄荷綠玻璃珠具有清新平衡的能量，能穩定情緒並促進健康。今日健康運勢良好，佩戴此珠能幫助您保持身心平衡，遠離負面能量。',
      spiritualProperty: '平衡、清新、健康',
      suitableFor: ['health', 'social']
    },
    {
      id: 3,
      name: '橘色玻璃珠',
      image: '/orange-bead-ID3.png',
      reason: '橘色玻璃珠具有活力和創造力的能量，能增強自信和行動力。今日需要額外的勇氣和動力，佩戴此珠能幫助您克服困難，展現創造力。',
      spiritualProperty: '活力、創造力、自信',
      suitableFor: ['career', 'social']
    },
    {
      id: 4,
      name: '金棕玻璃珠',
      image: '/gold-brown-bead-ID4.png',
      reason: '金棕玻璃珠具有財富和穩定的能量，能增強財運和事業運勢。今日財運運勢良好，佩戴此珠能幫助您吸引財富能量，提升事業運勢。',
      spiritualProperty: '財富、穩定、成功',
      suitableFor: ['wealth', 'career']
    },
    {
      id: 5,
      name: '紅色玻璃珠',
      image: '/red-bead-ID5.png',
      reason: '紅色玻璃珠具有熱情和活力的能量，能增強愛情運勢和人際關係。佩戴此珠能幫助您展現熱情，吸引正面的愛情能量。',
      spiritualProperty: '熱情、活力、愛情',
      suitableFor: ['love', 'social']
    },
    {
      id: 6,
      name: '黃粉色玻璃珠',
      image: '/yellow-pink-bead-ID6.png',
      reason: '黃粉色玻璃珠具有溫暖和樂觀的能量，能增強人際關係和愛情運勢。佩戴此珠能幫助您保持樂觀態度，增進與他人的情感連結。',
      spiritualProperty: '溫暖、樂觀、愛情',
      suitableFor: ['love', 'social']
    },
    {
      id: 7,
      name: '粉色玻璃珠',
      image: '/pink-bead-ID7.png',
      reason: '粉色玻璃珠具有溫柔愛情的能量，能增強愛情運勢和人際關係。佩戴此珠能幫助您吸引正面的愛情能量，增進與他人的情感連結。',
      spiritualProperty: '溫柔、愛情、和諧',
      suitableFor: ['love', 'social']
    },
    
    // 水晶珠系列 - 適合事業和健康運勢
    {
      id: 10,
      name: '深紫色水晶珠',
      image: '/dark-purple-bead-ID8.png',
      reason: '深紫色水晶珠具有靈性和智慧的能量，能提升直覺力和精神意識。今日靈性運勢極佳，佩戴此珠能幫助您更好地接收宇宙的智慧指引。',
      spiritualProperty: '靈性、智慧、直覺',
      suitableFor: ['career', 'health']
    },
    {
      id: 11,
      name: '金棕水晶珠',
      image: '/gold-brown-bead-ID9.png',
      reason: '金棕水晶珠具有財富和成功的能量，能增強財運和事業運勢。今日財運運勢良好，佩戴此珠能幫助您吸引財富能量，提升事業運勢。',
      spiritualProperty: '財富、成功、自信',
      suitableFor: ['wealth', 'career']
    },
    {
      id: 12,
      name: '紅色水晶珠',
      image: '/red-bead-ID10.png',
      reason: '紅色水晶珠具有熱情和活力的能量，能增強愛情運勢和人際關係。佩戴此珠能幫助您展現熱情，吸引正面的愛情能量。',
      spiritualProperty: '熱情、活力、愛情',
      suitableFor: ['love', 'social']
    },
    {
      id: 13,
      name: '粉色水晶珠',
      image: '/pink-bead-ID11.png',
      reason: '粉色水晶珠具有溫柔愛情的能量，能增強愛情運勢和人際關係。佩戴此珠能幫助您吸引正面的愛情能量，增進與他人的情感連結。',
      spiritualProperty: '溫柔、愛情、和諧',
      suitableFor: ['love', 'social']
    },
    {
      id: 14,
      name: '淡紫色水晶珠',
      image: '/light-purple-bead-ID12.png',
      reason: '淡紫色水晶珠具有靈性和直覺的能量，能提升精神意識和智慧。今日靈性運勢極佳，佩戴此珠能幫助您更好地接收宇宙的智慧指引。',
      spiritualProperty: '靈性、直覺、智慧',
      suitableFor: ['career', 'health']
    },
    {
      id: 15,
      name: '靛色水晶珠',
      image: '/indigo-bead-ID13.png',
      reason: '靛色水晶珠具有深度和洞察力的能量，能提升直覺力和精神意識。今日需要深度思考，佩戴此珠能幫助您更好地理解事物的本質。',
      spiritualProperty: '洞察、直覺、深度',
      suitableFor: ['career', 'health']
    },
    {
      id: 16,
      name: '天空藍水晶珠',
      image: '/sky-blue-bead-ID14.png',
      reason: '天空藍水晶珠具有智慧和溝通的能量，能提升表達能力和人際關係。今日需要良好的溝通，佩戴此珠能幫助您更好地表達想法。',
      spiritualProperty: '智慧、溝通、表達',
      suitableFor: ['love', 'social']
    },
    {
      id: 17,
      name: '淺藍水晶珠',
      image: '/light-blue-bead-ID15.png',
      reason: '淺藍水晶珠具有平靜和溝通的能量，能穩定情緒並促進人際關係。今日需要冷靜思考，佩戴此珠能幫助您保持清晰的思維。',
      spiritualProperty: '平靜、溝通、智慧',
      suitableFor: ['love', 'social']
    },
    
    // 木珠和天然礦石系列 - 適合健康和保護
    {
      id: 19,
      name: '紅棕木珠',
      image: '/red-brown-bead-ID16.png',
      reason: '紅棕木珠具有穩定和保護的能量，能增強健康運勢和提供精神保護。今日需要額外保護，佩戴此珠能幫助您遠離負面影響。',
      spiritualProperty: '穩定、保護、健康',
      suitableFor: ['health', 'social']
    },
    {
      id: 20,
      name: '深棕木珠',
      image: '/dark-brown-bead-ID17.png',
      reason: '深棕木珠具有穩定和堅實的能量，能增強健康運勢和提供精神保護。今日需要額外保護，佩戴此珠能幫助您遠離負面影響。',
      spiritualProperty: '穩定、堅實、保護',
      suitableFor: ['health', 'social']
    },
    {
      id: 21,
      name: '淺棕木珠',
      image: '/light-brown-bead-ID18.png',
      reason: '淺棕木珠具有溫暖和穩定的能量，能增強健康運勢和提供精神保護。今日需要額外保護，佩戴此珠能幫助您遠離負面影響。',
      spiritualProperty: '溫暖、穩定、保護',
      suitableFor: ['health', 'social']
    },
    {
      id: 22,
      name: '黑色木珠',
      image: '/black-bead-ID19.png',
      reason: '黑色木珠具有強大的保護能量，能吸收負面能量並提供精神保護。今日需要額外保護，佩戴此珠能幫助您遠離負面影響。',
      spiritualProperty: '保護、淨化、力量',
      suitableFor: ['health', 'social']
    },
    {
      id: 23,
      name: '孔雀石',
      image: '/malachite-bead-ID23.png',
      reason: '孔雀石具有平衡和治癒的能量，能穩定情緒並促進身心健康。今日需要平衡和治癒，佩戴此珠能幫助您保持內心的平靜。',
      spiritualProperty: '平衡、治癒、平靜',
      suitableFor: ['health', 'love']
    },
    {
      id: 24,
      name: '銀耀石',
      image: '/silver-shine-bead-ID24.png',
      reason: '銀耀石具有智慧和直覺的能量，能提升精神意識和智慧。今日靈性運勢極佳，佩戴此珠能幫助您更好地接收宇宙的智慧指引。',
      spiritualProperty: '智慧、直覺、靈性',
      suitableFor: ['career', 'health']
    },
    {
      id: 25,
      name: '海藍寶',
      image: '/aquamarine-bead-ID25.png',
      reason: '海藍寶具有平靜和溝通的能量，能穩定情緒並促進人際關係。今日需要冷靜思考，佩戴此珠能幫助您保持清晰的思維。',
      spiritualProperty: '平靜、溝通、智慧',
      suitableFor: ['love', 'social']
    },
    {
      id: 26,
      name: '白月光',
      image: '/moonstone-bead-ID26.png',
      reason: '白月光具有純潔和智慧的能量，能帶來內心的平靜和智慧。今日需要冷靜思考，佩戴此珠能幫助您保持清晰的思維。',
      spiritualProperty: '純潔、智慧、平靜',
      suitableFor: ['love', 'health']
    },
    {
      id: 27,
      name: '煙水晶',
      image: '/smoky-quartz-bead-ID27.png',
      reason: '煙水晶具有保護和淨化的能量，能吸收負面能量並提供精神保護。今日需要額外保護，佩戴此珠能幫助您遠離負面影響。',
      spiritualProperty: '保護、淨化、力量',
      suitableFor: ['health', 'social']
    },
    
    // 珍珠和過渡珠系列
    // ID 18 留空，之後會放新的珠子
    {
      id: 28,
      name: '白色珍珠',
      image: '/white-pearl-ID20.png',
      reason: '白色珍珠象徵純潔和智慧，能帶來內心的平靜和智慧。今日需要冷靜思考，佩戴此珠能幫助您保持清晰的思維。',
      spiritualProperty: '純潔、智慧、平靜',
      suitableFor: ['love', 'health']
    },
    {
      id: 29,
      name: '金色過渡珠',
      image: '/gold-bead-ID21.png',
      reason: '金色過渡珠具有財富和成功的能量，能增強財運和事業運勢。今日財運運勢良好，佩戴此珠能幫助您吸引財富能量，提升事業運勢。',
      spiritualProperty: '財富、成功、自信',
      suitableFor: ['wealth', 'career']
    },
    {
      id: 30,
      name: '銀色過渡珠',
      image: '/silver-bead-ID22.png',
      reason: '銀色過渡珠具有智慧和直覺的能量，能提升精神意識和智慧。今日靈性運勢極佳，佩戴此珠能幫助您更好地接收宇宙的智慧指引。',
      spiritualProperty: '智慧、直覺、靈性',
      suitableFor: ['career', 'health']
    },
    {
      id: 32,
      name: '黑色米珠',
      image: '/black-bead-ID23.png',
      reason: '黑色米珠具有保護和淨化的能量，能吸收負面能量並提供精神保護。今日需要額外保護，佩戴此珠能幫助您遠離負面影響。',
      spiritualProperty: '保護、淨化、力量',
      suitableFor: ['health', 'social']
    },
    {
      id: 33,
      name: '白色米珠',
      image: '/white-bead-ID24.png',
      reason: '白色米珠具有純潔和智慧的能量，能帶來內心的平靜和智慧。今日需要冷靜思考，佩戴此珠能幫助您保持清晰的思維。',
      spiritualProperty: '純潔、智慧、平靜',
      suitableFor: ['love', 'health']
    },
    {
      id: 34,
      name: '酒紅米珠',
      image: '/tomato-red-bead-ID25.png',
      reason: '酒紅米珠具有熱情和活力的能量，能增強愛情運勢和人際關係。佩戴此珠能幫助您展現熱情，吸引正面的愛情能量。',
      spiritualProperty: '熱情、活力、愛情',
      suitableFor: ['love', 'social']
    }
  ];

  if (!fortuneResult) {
    // 如果沒有運勢數據，返回默認推薦
    return baseBeads.slice(0, 3);
  }

  const recommendedBeads = [];
  const usedBeadIds = new Set();

  // 使用確定性隨機算法，基於日期和運勢結果生成種子
  const today = new Date().toISOString().split('T')[0];
  const seed = today + fortuneResult.high.faceKey + fortuneResult.low.faceKey;
  let randomSeed = 0;
  for (let i = 0; i < seed.length; i++) {
    randomSeed += seed.charCodeAt(i);
  }

  // 簡單的偽隨機數生成器
  const random = () => {
    randomSeed = (randomSeed * 9301 + 49297) % 233280;
    return randomSeed / 233280;
  };

  // 根據今日宜的面向推薦1個珠子（隨機選擇）
  const highAspectBeads = baseBeads.filter(bead => 
    bead.suitableFor.includes(fortuneResult.high.faceKey)
  );
  if (highAspectBeads.length > 0) {
    const randomIndex = Math.floor(random() * highAspectBeads.length);
    const selectedBead = highAspectBeads[randomIndex];
    recommendedBeads.push(selectedBead);
    usedBeadIds.add(selectedBead.id);
  }

  // 根據今日不宜的面向推薦珠子（隨機選擇，避免重複）
  const lowAspectBeads = baseBeads.filter(bead => 
    bead.suitableFor.includes(fortuneResult.low.faceKey) && 
    !usedBeadIds.has(bead.id)
  );
  
  // 隨機添加適合的珠子，最多2個
  let addedCount = 0;
  const shuffledLowBeads = [...lowAspectBeads].sort(() => random() - 0.5);
  for (const bead of shuffledLowBeads) {
    if (addedCount >= 2) break;
    recommendedBeads.push(bead);
    usedBeadIds.add(bead.id);
    addedCount++;
  }

  // 如果推薦的珠子不足3個，用其他珠子補足（隨機選擇，確保不重複）
  if (recommendedBeads.length < 3) {
    const remainingBeads = baseBeads.filter(bead => 
      !usedBeadIds.has(bead.id)
    );
    
    // 隨機打亂剩餘珠子
    const shuffledRemainingBeads = [...remainingBeads].sort(() => random() - 0.5);
    const neededCount = 3 - recommendedBeads.length;
    for (let i = 0; i < Math.min(neededCount, shuffledRemainingBeads.length); i++) {
      recommendedBeads.push(shuffledRemainingBeads[i]);
      usedBeadIds.add(shuffledRemainingBeads[i].id);
    }
  }

  return recommendedBeads.slice(0, 3);
};

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

// 幸運資訊顯示組件（已移除，不再在每日宜/不宜中顯示）
const LuckyInfoDisplay = ({ fortune }) => {
  return null;
};

// 顏色值對應函數
const getColorValue = (colorName) => {
  const colorMap = {
    '金色': '#FFD700',
    '深藍色': '#000080',
    '紫色': '#800080',
    '綠色': '#008000',
    '棕色': '#8B4513',
    '灰色': '#808080',
    '深灰色': '#696969',
    '米色': '#F5F5DC',
    '黑色': '#000000',
    '粉紅色': '#FFC0CB',
    '玫瑰金': '#E8B4B8',
    '薰衣草紫': '#E6E6FA',
    '暖橙色': '#FF8C00',
    '淺藍色': '#ADD8E6',
    '薄荷綠': '#98FB98',
    '淺灰色': '#D3D3D3',
    '深藍色': '#000080',
    '銀色': '#C0C0C0',
    '銅色': '#B87333',
    '活力橙': '#FF6B35',
    '森林綠': '#228B22',
    '櫻桃紅': '#DE3163',
    '金黃色': '#FFD700',
    '溫暖橙': '#FF7F50',
    '粉紫色': '#DDA0DD',
    '暖棕色': '#D2691E',
    '淺綠色': '#90EE90',
    '深綠色': '#006400'
  };
  return colorMap[colorName] || '#666666';
};

// 雙面向運勢顯示組件
const TwoAspectFortuneDisplay = ({ zodiacInfo, userInfo, onFortuneDataChange }) => {
  // 使用確定性算法選擇運勢
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 格式
  
  let fortuneResult;
  try {
    fortuneResult = chooseTodaySuggestions(
      zodiacInfo.zodiacSign, 
      zodiacInfo.risingSign, 
      today, 
      getFortuneData(),
      userInfo.gender
    );
  } catch (error) {
    // 如果計算失敗，使用默認值
    fortuneResult = {
      high: {
        face: '事業運勢',
        faceKey: 'career',
        star: 4,
        suggestion: '保持積極態度，努力學習',
        luckyColor: '藍色',
        luckyNumber: 7
      },
      low: {
        face: '健康運勢',
        faceKey: 'health',
        star: 2,
        suggestion: '保持謹慎，注意安全',
        luckyColor: '綠色',
        luckyNumber: 3
      }
    };
  }

  // 根據結果獲取面向信息
  const allAspects = [
    { key: 'career', name: '事業運勢', icon: 'career', color: '#3B82F6' },
    { key: 'love', name: '感情運勢', icon: 'love', color: '#EC4899' },
    { key: 'wealth', name: '偏財運勢', icon: 'wealth', color: '#F59E0B' },
    { key: 'health', name: '健康運勢', icon: 'health', color: '#10B981' },
    { key: 'social', name: '人際運勢', icon: 'social', color: '#8B5CF6' }
  ];

  const topAspect = allAspects.find(aspect => aspect.key === fortuneResult.high.faceKey);
  const bottomAspect = allAspects.find(aspect => aspect.key === fortuneResult.low.faceKey);

  // 使用確定性算法選擇的運勢數據
  const topFortune = {
    stars: fortuneResult.high.star,
    advice: fortuneResult.high.suggestion,
    luckyColor: fortuneResult.high.luckyColor,
    luckyNumber: fortuneResult.high.luckyNumber
  };
  
  const bottomFortune = {
    stars: fortuneResult.low.star,
    advice: fortuneResult.low.suggestion,
    luckyColor: fortuneResult.low.luckyColor,
    luckyNumber: fortuneResult.low.luckyNumber
  };

  // 將幸運數據和運勢結果傳遞給父組件
  React.useEffect(() => {
    if (onFortuneDataChange && topFortune.luckyColor && topFortune.luckyNumber) {
      onFortuneDataChange({
        luckyColor: topFortune.luckyColor,
        luckyNumber: topFortune.luckyNumber,
        fortuneResult: fortuneResult
      });
    }
  }, [topFortune.luckyColor, topFortune.luckyNumber, onFortuneDataChange]);

  // 如果沒有找到合適的面向，顯示默認內容
  if (!topAspect || !topFortune || !bottomAspect || !bottomFortune) {
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
    <div className="two-aspect-fortune-container">
      {/* 今日宜卡片（4-5顆星） */}
      <div className="fortune-card top-fortune">
        <div className="aspect-header">
          <IconComponent name={topAspect.icon} size={32} />
          <h3 style={{ color: topAspect.color }}>{topAspect.name}</h3>
          <StarRating stars={topFortune.stars} />
        </div>
        
        <div className="fortune-advice-card">
          <div className="advice-content">
            <IconComponent name="sparkle" size={24} />
            <div className="advice-text">
              <h4>今日宜...</h4>
              <p>{topFortune.advice || '保持積極態度，努力學習'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 今日不宜卡片（1-3顆星） */}
      <div className="fortune-card bottom-fortune">
        <div className="aspect-header">
          <IconComponent name={bottomAspect.icon} size={32} />
          <h3 style={{ color: bottomAspect.color }}>{bottomAspect.name}</h3>
          <StarRating stars={bottomFortune.stars} />
        </div>
        
        <div className="fortune-advice-card">
          <div className="advice-content">
            <IconComponent name="mystic-eye" size={24} />
            <div className="advice-text">
              <h4>今日不宜...</h4>
              <p>{bottomFortune.advice || '保持謹慎，注意安全'}</p>
            </div>
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
        <img 
          src={bead.image} 
          alt={bead.name}
          className="bead-image"
        />
        <h4 className="bead-name">{bead.name}</h4>
        <div className="spiritual-property">
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

// 上升星座計算函數（基於出生時間的簡化版）
const calculateRisingSign = (birthTime, zodiacSign) => {
  if (!birthTime) {
    return '未知';
  }

  // 解析出生時間
  const [hours, minutes] = birthTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  
  // 將一天分為12個時段，每個時段對應一個上升星座
  // 每2小時對應一個星座（24小時/12星座 = 2小時/星座）
  const timeSlot = Math.floor(totalMinutes / 120); // 120分鐘 = 2小時
  
  // 星座順序（從牡羊座開始）
  const zodiacOrder = [
    '牡羊座', '金牛座', '雙子座', '巨蟹座', '獅子座', '處女座',
    '天秤座', '天蠍座', '射手座', '摩羯座', '水瓶座', '雙魚座'
  ];
  
  // 根據太陽星座和出生時間計算上升星座
  const sunSignIndex = zodiacOrder.indexOf(zodiacSign);
  if (sunSignIndex === -1) {
    return '未知';
  }
  
  // 上升星座 = (太陽星座索引 + 時間段) % 12
  // 這樣可以讓不同時間出生的人有不同的上升星座
  const risingSignIndex = (sunSignIndex + timeSlot) % 12;
  
  return zodiacOrder[risingSignIndex];
};

// 個人化運勢分析組件
const PersonalizedFortuneAnalysis = ({ zodiacSign, gender, fortuneData }) => {
  if (!zodiacSign) return null;

  return (
    <div className="personalized-analysis">
      {/* 幸運色和幸運數字顯示 */}
      {fortuneData && (
        <div className="lucky-info-section">
          <div className="lucky-info">
            <div className="lucky-item">
              <span className="lucky-label">幸運顏色：</span>
              <span className="lucky-color" style={{ color: getColorValue(fortuneData.luckyColor) }}>
                {fortuneData.luckyColor}
              </span>
            </div>
            <div className="lucky-item">
              <span className="lucky-label">幸運數字：</span>
              <span className="lucky-number" style={{ color: getColorValue(fortuneData.luckyColor) }}>
                {fortuneData.luckyNumber}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 主組件
const DailyFortune = () => {
  const { goToHome, goToGuide, goToRating } = useNavigation();
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
  const [fortuneData, setFortuneData] = useState(null);
  const [fortuneResult, setFortuneResult] = useState(null);

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFortuneDataChange = React.useCallback((data) => {
    setFortuneData({
      luckyColor: data.luckyColor,
      luckyNumber: data.luckyNumber
    });
    setFortuneResult(data.fortuneResult);
  }, []);

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
    setShowFortune(true);
  };

  const openBeadCabinet = () => {
    goToHome();
  };

  const openGuide = () => {
    goToGuide();
  };

  const openRating = () => {
    goToRating();
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
          
          {/* 個人化分析 */}
          <PersonalizedFortuneAnalysis 
            zodiacSign={zodiacInfo.zodiacSign} 
            gender={userInfo.gender}
            fortuneData={fortuneData}
          />
        
                     <TwoAspectFortuneDisplay 
                       zodiacInfo={zodiacInfo} 
                       userInfo={userInfo}
                       onFortuneDataChange={handleFortuneDataChange}
                     />
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
            {getRecommendedBeads(fortuneResult).map((bead) => (
              <BeadRecommendation key={bead.id} bead={bead} />
            ))}
          </div>
        </div>
      </div>
      )}

      {/* 底部導航欄 */}
      <div className="bottom-navigation">
        <div className="nav-grid">
          <button className="nav-button" onClick={goToHome}>
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
