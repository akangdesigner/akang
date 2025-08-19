import React, { useState, useRef, useEffect } from 'react';
import './BeadRating.css';

const BeadRating = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [fullMessage, setFullMessage] = useState('');
  const [scores, setScores] = useState({
    love: 0,
    windfall: 0,
    regularIncome: 0,
    career: 0,
    health: 0
  });
  const [savedDesign, setSavedDesign] = useState(null);

  // 通靈師的完整建議
  const psychicAdvice = `你的串珠作品展現了獨特的藝術天賦和內在智慧。這件作品不僅是一件美麗的飾品，更是你內心世界的真實寫照。從愛情運勢來看，紅色珠子的點綴象徵著熱情與勇氣，預示著美好的愛情即將到來，在接下來的三個月內，你將遇到一位與你靈魂共鳴的人。在財富方面，藍色珠子的能量與水元素相呼應，預示著流動的財富即將到來，建議你保持開放的心態，留意身邊的投資機會，但切記不要過於貪心，穩健的理財方式會為你帶來意想不到的收穫。事業發展上，串珠的對稱排列反映了你對工作的認真態度，而金色珠子的點綴則象徵著豐厚的回報，你的努力將得到認可，升職加薪的機會就在眼前。從創造力角度來看，綠色珠子的能量與成長相呼應，預示著你的事業將進入快速發展期，新的項目機會將接踵而至。在健康方面，整體能量非常和諧，你的串珠作品散發著平衡與健康的氣息，紫色珠子的能量與靈性相呼應，預示著你的身心狀態將達到最佳狀態。建議你將這份創造力運用到生活的各個方面，相信自己的直覺，勇敢追求夢想，保持規律的作息，多接觸大自然。記住，每個珠子都承載著獨特的能量，就像你人生中的每個選擇都蘊含著無限可能。`;

  // 檢查是否有保存的串珠設計
  useEffect(() => {
    const savedDesignData = localStorage.getItem('savedBeadDesign');
    if (savedDesignData) {
      try {
        const design = JSON.parse(savedDesignData);
        setSavedDesign(design);
        console.log('載入保存的串珠設計:', design);
      } catch (error) {
        console.error('解析保存的設計數據失敗:', error);
      }
    }
  }, []);

  // 根據珠子名稱的雙面向評分系統
  const getBeadDualCategoryAndScore = (beadName) => {
    // 根據珠子名稱來評分，每個珠子有兩個面向的評分
    const beadCategories = {
      // 玻璃珠系列
      '粉色': { 
        primary: { category: 'love', name: '粉色玻璃珠', score: 1, description: '愛情與和諧' },
        secondary: { category: 'health', name: '粉色玻璃珠', score: 1, description: '情感健康' }
      },
      '薄荷綠': { 
        primary: { category: 'windfall', name: '薄荷綠玻璃珠', score: 1, description: '財富與成功' },
        secondary: { category: 'career', name: '薄荷綠玻璃珠', score: 1, description: '事業自信' }
      },
      '黃色': { 
        primary: { category: 'regularIncome', name: '黃色玻璃珠', score: 1, description: '淨化與平衡' },
        secondary: { category: 'health', name: '黃色玻璃珠', score: 1, description: '身心淨化' }
      },
      '紅色': { 
        primary: { category: 'career', name: '紅色玻璃珠', score: 1, description: '保護與溝通' },
        secondary: { category: 'windfall', name: '紅色玻璃珠', score: 1, description: '財運保護' }
      },
      '淺藍': { 
        primary: { category: 'health', name: '淺藍玻璃珠', score: 1, description: '靈性與健康' },
        secondary: { category: 'love', name: '淺藍玻璃珠', score: 1, description: '智慧愛情' }
      },
      '橘色': { 
        primary: { category: 'love', name: '橘色玻璃珠', score: 1, description: '浪漫與熱情' },
        secondary: { category: 'career', name: '橘色玻璃珠', score: 1, description: '人際魅力' }
      },
      
      // 米珠系列
      '紫色': { 
        primary: { category: 'windfall', name: '紫色米珠', score: 1, description: '活力與勇氣' },
        secondary: { category: 'health', name: '紫色米珠', score: 1, description: '生命力' }
      },
      '淺綠': { 
        primary: { category: 'regularIncome', name: '淺綠米珠', score: 1, description: '智慧與財富' },
        secondary: { category: 'love', name: '淺綠米珠', score: 1, description: '智慧愛情' }
      },
      '米色': { 
        primary: { category: 'career', name: '米色米珠', score: 1, description: '保護與力量' },
        secondary: { category: 'regularIncome', name: '米色米珠', score: 1, description: '財運保護' }
      },
      '淺粉': { 
        primary: { category: 'health', name: '淺粉米珠', score: 1, description: '保護與平衡' },
        secondary: { category: 'windfall', name: '淺粉米珠', score: 1, description: '財運平衡' }
      },
      '天藍': { 
        primary: { category: 'love', name: '天藍米珠', score: 1, description: '溫柔與包容' },
        secondary: { category: 'regularIncome', name: '天藍米珠', score: 1, description: '財運和諧' }
      },
      '淡紫': { 
        primary: { category: 'windfall', name: '淡紫米珠', score: 1, description: '智慧與財運' },
        secondary: { category: 'career', name: '淡紫米珠', score: 1, description: '事業智慧' }
      },
      '金棕': { 
        primary: { category: 'regularIncome', name: '金棕米珠', score: 1, description: '平靜與穩定' },
        secondary: { category: 'health', name: '金棕米珠', score: 1, description: '情緒穩定' }
      },
      '深藍': { 
        primary: { category: 'career', name: '深藍米珠', score: 1, description: '智慧與靈性' },
        secondary: { category: 'love', name: '深藍米珠', score: 1, description: '靈性愛情' }
      },
      '深綠': { 
        primary: { category: 'health', name: '深綠米珠', score: 1, description: '淨化與療癒' },
        secondary: { category: 'windfall', name: '深綠米珠', score: 1, description: '財運淨化' }
      }
    };
    
    return beadCategories[beadName] || { 
      primary: { category: 'unknown', name: '未知', score: 1, description: '未知能量' },
      secondary: { category: 'unknown', score: 1, description: '未知能量' }
    };
  };

  // 根據珠子設計分析評分
  const analyzeBeadDesign = (design) => {
    const { beads } = design;
    let scores = {
      love: 4,        // 基礎分1分 + 設計感額外獎勵3分 = 4分
      windfall: 1,    // 基礎分1分
      regularIncome: 1, // 基礎分1分
      career: 1,      // 基礎分1分
      health: 1       // 基礎分1分
    };

    console.log('開始分析珠子設計，總共', beads.length, '顆珠子');
    console.log('初始評分（基礎分1分 + 設計感額外獎勵3分）:', scores);

    // 分析每顆珠子的能量屬性 - 根據珠子名稱評分
    beads.forEach((bead, index) => {
      const { id, name } = bead;
      
      console.log(`珠子${index + 1}: ID=${id}, 名稱=${name}`);
      
      // 根據珠子名稱來評分，不再限制ID範圍
      const beadInfo = getBeadDualCategoryAndScore(name);
      console.log(`珠子${index + 1}:`, { 
        id, 
        name, 
        primary: beadInfo.primary, 
        secondary: beadInfo.secondary 
      });
      
      // 主要面向評分 - 加1分
      switch (beadInfo.primary.category) {
        case 'love':
          scores.love = Math.min(10, scores.love + 1);
          console.log('愛情加上主要面向分數: +1, 總分:', scores.love);
          break;
          
        case 'windfall':
          scores.windfall = Math.min(10, scores.windfall + 1);
          console.log('偏財加上主要面向分數: +1, 總分:', scores.windfall);
          break;
          
        case 'regularIncome':
          scores.regularIncome = Math.min(10, scores.regularIncome + 1);
          console.log('正財加上主要面向分數: +1, 總分:', scores.regularIncome);
          break;
          
        case 'career':
          scores.career = Math.min(10, scores.career + 1);
          console.log('事業加上主要面向分數: +1, 總分:', scores.career);
          break;
          
        case 'health':
          scores.health = Math.min(10, scores.health + 1);
          console.log('健康加上主要面向分數: +1, 總分:', scores.health);
          break;
          
        default:
          console.log('未知珠子主要類型:', beadInfo.primary);
          break;
      }
      
      // 第二面向評分 - 加1分
      switch (beadInfo.secondary.category) {
        case 'love':
          scores.love = Math.min(10, scores.love + 1);
          console.log('愛情加上第二面向分數: +1, 總分:', scores.love);
          break;
          
        case 'windfall':
          scores.windfall = Math.min(10, scores.windfall + 1);
          console.log('偏財加上第二面向分數: +1, 總分:', scores.windfall);
          break;
          
        case 'regularIncome':
          scores.regularIncome = Math.min(10, scores.regularIncome + 1);
          console.log('正財加上第二面向分數: +1, 總分:', scores.regularIncome);
          break;
          
        case 'career':
          scores.career = Math.min(10, scores.career + 1);
          console.log('事業加上第二面向分數: +1, 總分:', scores.career);
          break;
          
        case 'health':
          scores.health = Math.min(10, scores.health + 1);
          console.log('健康加上第二面向分數: +1, 總分:', scores.health);
          break;
          
        default:
          console.log('未知珠子第二面向類型:', beadInfo.secondary);
          break;
      }
      
      console.log(`珠子${index + 1}評分完成 - 主要:+1, 第二:+1`);
      console.log('當前累計評分:', scores);
    });
    
    console.log('最終評分:', scores);
    return scores;
  };

  // 根據珠子設計生成個性化建議
  const generatePersonalizedAdvice = (design, scores) => {
    const { beads } = design;
    let advice = '你的串珠作品展現了獨特的藝術天賦和內在智慧。';
    
    // 分析珠子類型和數量
    const beadTypes = beads.map(bead => bead.type);
    const uniqueTypes = [...new Set(beadTypes)];
    const glassBeads = beads.filter(bead => bead.type === '玻璃珠');
    const riceBeads = beads.filter(bead => bead.type === '米珠');
    
    // 根據珠子類型給出肯定
    if (glassBeads.length > 0 && riceBeads.length > 0) {
      advice += '你巧妙地結合了玻璃珠的晶瑩剔透與米珠的溫潤質感，這種混搭展現了你對材質的敏銳感知！';
    } else if (glassBeads.length > 0) {
      advice += '你選擇的玻璃珠晶瑩剔透，散發著純淨的能量，這代表著你內心的清澈與透明。';
    } else if (riceBeads.length > 0) {
      advice += '你選擇的米珠溫潤細膩，蘊含著自然的質感，這展現了你對細節的完美追求。';
    }
    
    // 分析具體珠子搭配
    const beadNames = beads.map(bead => bead.name);
    const hasPink = beadNames.some(name => name.includes('粉色'));
    const hasPurple = beadNames.some(name => name.includes('紫色') || name.includes('淡紫'));
    const hasYellow = beadNames.some(name => name.includes('黃色') || name.includes('金棕'));
    const hasGreen = beadNames.some(name => name.includes('薄荷綠') || name.includes('淺綠') || name.includes('深綠'));
    const hasBlue = beadNames.some(name => name.includes('淺藍') || name.includes('天藍') || name.includes('深藍'));
    const hasRed = beadNames.some(name => name.includes('紅色'));
    const hasOrange = beadNames.some(name => name.includes('橘色'));
    
    // 根據珠子搭配給出專業點評
    if (hasPink && hasPurple) {
      advice += '粉色與紫色的搭配非常出色！這種組合既浪漫又神秘，預示著你將在愛情和靈性方面都有重大突破。';
    }
    
    if (hasYellow && hasGreen) {
      advice += '黃色與綠色的組合充滿活力！這代表著財富與成長的完美結合，你的投資眼光和事業發展將相輔相成。';
    }
    
    if (hasRed && hasBlue) {
      advice += '紅色與藍色的搭配極具張力！熱情與冷靜的對比展現了你內心的強大力量，這種組合將為你帶來勇氣和智慧。';
    }
    
    if (hasPurple && hasGreen) {
      advice += '紫色與綠色的搭配智慧與自然並存！這預示著你將在事業發展中展現出獨特的創造力和溝通天賦。';
    }
    
    if (hasOrange && hasBlue) {
      advice += '橘色與藍色的搭配充滿創意！這代表著熱情與智慧的完美平衡，你的創意靈感將源源不斷。';
    }
    
    // 根據評分給出具體建議
    if (scores.love >= 8) {
      advice += '從設計感來看，你的作品充滿了愛的氣息！粉色和天藍珠子的能量將為你帶來無限的創意靈感，在接下來的三個月內，你將在藝術創作方面大放異彩。';
    } else if (scores.love >= 6) {
      advice += '你的設計感穩步上升，串珠中的愛情能量正在積累，建議你保持開放的心態，創意會在不經意間降臨。';
    } else if (scores.love >= 4) {
      advice += '你的設計感有良好的基礎，建議你多嘗試不同的色彩搭配，這將為你帶來更多的靈感火花。';
    }
    
    if (scores.windfall >= 8) {
      advice += '偏財運勢非常旺盛！黃色和綠色珠子的能量預示著意外的財富機會，建議你留意身邊的投資機會，但切記保持理性。';
    } else if (scores.windfall >= 6) {
      advice += '偏財運勢正在發展中，你的創意和直覺將為你帶來額外的收入來源。';
    } else if (scores.windfall >= 4) {
      advice += '偏財運勢穩定，建議你保持當前的理財方式，穩健的投資會帶來可觀的收益。';
    }
    
    if (scores.regularIncome >= 8) {
      advice += '正財運勢極佳！金棕和黃色珠子的能量預示著穩定的收入增長，你的努力將得到豐厚的回報。';
    } else if (scores.regularIncome >= 6) {
      advice += '正財運勢穩定，建議你繼續保持當前的理財方式，穩健的投資會帶來可觀的收益。';
    } else if (scores.regularIncome >= 4) {
      advice += '正財運勢良好，建議你保持耐心，穩定的收入會逐步增長。';
    }
    
    if (scores.career >= 8) {
      advice += '事業運勢一片光明！紅色和深藍珠子的組合預示著你將在職場上大放異彩，升職加薪的機會就在眼前。';
    } else if (scores.career >= 6) {
      advice += '事業運勢穩步上升，你的專業能力和創造力正在被認可，新的發展機會即將到來。';
    } else if (scores.career >= 4) {
      advice += '事業運勢穩定，建議你繼續提升專業技能，機會會留給有準備的人。';
    }
    
    if (scores.health >= 8) {
      advice += '健康運勢非常和諧！淺藍和深綠珠子的能量預示著你的身心狀態將達到最佳狀態，整體能量非常平衡。';
    } else if (scores.health >= 6) {
      advice += '健康運勢良好，建議你保持規律的作息，多接觸大自然，身心會更加健康。';
    } else if (scores.health >= 4) {
      advice += '健康運勢穩定，建議你注意身心平衡，適度的運動會帶來更好的狀態。';
    }
    
    // 根據珠子數量給出建議
    const beadCount = beads.length;
    if (beadCount >= 15) {
      advice += '你的設計非常複雜精緻，這展現了你對完美的追求和耐心。建議你將這份專注力運用到生活的各個方面。';
    } else if (beadCount >= 8) {
      advice += '你的設計豐富多彩，這體現了你對生活的熱愛和對美的追求。這種積極的態度將為你帶來好運。';
    } else if (beadCount >= 5) {
      advice += '你的設計簡潔有力，這體現了你對本質的深刻理解。有時候，少即是多，你的簡約美學將為你帶來獨特的魅力。';
    } else {
      advice += '你的設計精簡優雅，這展現了你對品質的追求。精緻的設計往往比複雜的堆砌更有價值。';
    }
    
    // 根據珠子類型給出特殊建議
    if (glassBeads.length > riceBeads.length) {
      advice += '玻璃珠的透明質感代表著你內心的純淨與透明，建議你在人際交往中保持真誠，這將為你贏得更多信任。';
    } else if (riceBeads.length > glassBeads.length) {
      advice += '米珠的溫潤質感代表著你內心的溫暖與包容，建議你在生活中多展現關愛，這將為你帶來更多友誼。';
    }
    
    advice += '記住，每個珠子都承載著獨特的能量，就像你人生中的每個選擇都蘊含著無限可能。相信自己的直覺，勇敢追求夢想！';
    
    return advice;
  };

  // 模擬AI分析過程
  const startAnalysis = () => {
    if (!savedDesign) {
      alert('請先在珠子收納櫃保存串珠設計！');
      return;
    }

    console.log('開始分析，保存的設計:', savedDesign); // 調試用

    setIsAnalyzing(true);
    setCurrentMessage('');
    setShowResult(false);

    // 模擬分析過程
    setTimeout(() => {
      // 根據實際珠子設計分析評分
      const newScores = analyzeBeadDesign(savedDesign);
      console.log('分析完成，新評分:', newScores); // 調試用
      
      // 強制更新評分狀態
      setScores(newScores);

      // 根據珠子設計生成個性化建議
      const personalizedAdvice = generatePersonalizedAdvice(savedDesign, newScores);
      setFullMessage(personalizedAdvice);

      // 逐字顯示建議
      let index = 0;
      const typeWriter = () => {
        if (index < personalizedAdvice.length) {
          setCurrentMessage(personalizedAdvice.substring(0, index + 1));
          index++;
          setTimeout(typeWriter, 50);
        } else {
          setShowResult(true);
          setIsAnalyzing(false);
          console.log('分析完成，顯示結果，評分:', newScores); // 調試用
        }
      };
      typeWriter();
    }, 2000);
  };

  // 強制重新計算評分（用於調試）
  const forceRecalculateScores = () => {
    if (!savedDesign) {
      alert('沒有保存的設計！');
      return;
    }
    
    console.log('強制重新計算評分...'); // 調試用
    const newScores = analyzeBeadDesign(savedDesign);
    console.log('重新計算的評分:', newScores); // 調試用
    setScores(newScores);
    
    // 強制重新渲染
    setShowResult(false);
    setTimeout(() => {
      setShowResult(true);
    }, 100);
  };

  // 測試評分系統（創建示例設計）
  const testScoringSystem = () => {
    const testDesign = {
      designName: '測試設計',
      timestamp: Date.now(),
      beads: [
        { id: 1, name: '粉色玻璃珠', color: '#FF6B9D', type: '玻璃珠', shine: '#FFB6C1' }
      ]
    };
    
    console.log('=== 開始測試評分系統 ===');
    console.log('創建測試設計:', testDesign);
    console.log('測試設計珠子ID:', testDesign.beads[0].id);
    console.log('珠子ID範圍檢查 (1-15):', testDesign.beads[0].id >= 1 && testDesign.beads[0].id <= 15);
    
    setSavedDesign(testDesign);
    
    // 立即分析測試設計
    setTimeout(() => {
      console.log('=== 開始分析測試設計 ===');
      const testScores = analyzeBeadDesign(testDesign);
      console.log('=== 分析完成 ===');
      console.log('測試設計評分結果:', testScores);
      
      // 檢查評分是否正確
      console.log('預期評分 - 設計感(愛情):', 1 + 1 + 1); // 基礎1 + 主要1 + 第二1 = 3
      console.log('預期評分 - 健康:', 1 + 1); // 基礎1 + 第二1 = 2
      console.log('實際評分:', testScores);
      
      setScores(testScores);
      setShowResult(true);
      
      // 強制重新渲染雷達圖
      setTimeout(() => {
        setShowResult(false);
        setTimeout(() => {
          setShowResult(true);
          console.log('雷達圖重新渲染完成');
        }, 50);
      }, 100);
    }, 100);
  };

  // 清除保存的設計
  const clearSavedDesign = () => {
    localStorage.removeItem('savedBeadDesign');
    setSavedDesign(null);
    setShowResult(false);
    setCurrentMessage('');
    setFullMessage('');
  };

  // 前往珠子收納櫃創建新設計
  const goToBeadCabinet = () => {
    window.location.href = '/';
  };

  // 返回主頁
  const goHome = () => {
    window.open('http://127.0.0.1:5500/index.html', '_self');
  };

  // 計算安全的評分點位置，確保在格線內
  const getSafeScorePosition = (score, baseX, baseY) => {
    // 評分範圍：6-8分，對應到網格的不同層級
    // 6分 = 最內層，7分 = 中層，8分 = 外層
    const level = score - 6; // 0, 1, 2
    const maxRadius = 15; // 最大半徑，確保在格線內
    
    // 計算位置，限制在安全範圍內
    const x = baseX + (level * maxRadius);
    const y = baseY + (level * maxRadius);
    
    return { x, y };
  };

  // 計算六邊形評分區域的頂點位置
  const getHexagonScorePoints = (scores) => {
    // 六邊形的六個頂點，從頂部順時針排列
    const centerX = 175;
    const centerY = 175;
    
    // 評分範圍：0分在圓心，高分在頂點
    // 計算每個軸線上的評分點位置
    const points = [
      // 頂部：設計感 (y軸負方向)
      { x: centerX, y: centerY - (scores.love / 10) * 100 },
      
      // 右上：愛情 (右上方向，30度角)
      { x: centerX + (scores.windfall / 10) * 86.6, y: centerY - (scores.windfall / 10) * 50 },
      
      // 右下：偏財 (右下方向，30度角)
      { x: centerX + (scores.regularIncome / 10) * 86.6, y: centerY + (scores.regularIncome / 10) * 50 },
      
      // 底部：正財 (y軸正方向)
      { x: centerX, y: centerY + (scores.career / 10) * 100 },
      
      // 左下：事業 (左下方向，30度角)
      { x: centerX - (scores.regularIncome / 10) * 86.6, y: centerY + (scores.regularIncome / 10) * 50 },
      
      // 左上：健康 (左上方向，30度角)
      { x: centerX - (scores.health / 10) * 86.6, y: centerY - (scores.health / 10) * 50 }
    ];
    
    return points;
  };


  return (
    <div className="bead-rating-container">
      {/* 返回按鈕 */}
      <div className="rating-header">
        <button className="back-btn" onClick={goHome}>
          🏠 返回主頁
        </button>
        <h1>⭐ 串珠評分區 ⭐</h1>
      </div>

      <div className="rating-content">
        {/* 左側：通靈師和對話框 */}
        <div className="left-panel">
          {/* 左上：對話框 */}
          <div className="dialogue-box">
            {!isAnalyzing && !showResult && (
              <div className="welcome-message">
                <p>歡迎來到神秘占卜殿堂，讓我來解讀你的串珠設計...</p>
                {savedDesign ? (
                  <p>我看到你精心設計的串珠作品，讓我為你揭示其中的奧秘。</p>
                ) : (
                  <p>請先在珠子收納櫃創建並保存您的串珠設計，我將為你揭示其中的奧秘。</p>
                )}
              </div>
            )}

            {isAnalyzing && (
              <div className="analyzing-message">
                <div className="crystal-animation">🔮</div>
                <p>我正在解讀你的串珠作品...</p>
                <p>水晶球正在揭示命運的奧秘...</p>
              </div>
            )}

            {showResult && (
              <div className="result-message">
                <p className="advice-text">{currentMessage}</p>
                {currentMessage.length < fullMessage.length && (
                  <div className="typing-indicator">|</div>
                )}
              </div>
            )}
          </div>

          {/* 左中下：AI虛擬通靈師 */}
          <div className="psychic-medium">
            <div className="psychic-avatar">
              <div className="psychic-character">
                <img 
                  src="/psychic-medium.png" 
                  alt="神秘通靈師" 
                  className="psychic-image"
                />
              </div>
              <div className="psychic-title">神秘通靈師</div>
              <div className="psychic-subtitle">✨ 能量分析專家 ✨</div>
            </div>
          </div>
        </div>

        {/* 右側：作品上傳和雷達圖 */}
        <div className="right-panel">
          {/* 串珠設計展示 */}
          <div className="bead-design-section">
            <h3>📿 你的串珠設計</h3>
            {savedDesign ? (
              <div className="design-display">
                <div className="design-info">
                  <h4>{savedDesign.designName}</h4>
                  <p>包含 {savedDesign.beads.length} 顆珠子</p>
                  <p>創建時間: {new Date(savedDesign.timestamp).toLocaleString()}</p>
                </div>
                
                {/* 串珠設計視覺化 */}
                <div className="bead-design-visualization">
                  <div className="bead-string-preview">
                    {savedDesign.beads.map((bead, index) => (
                      <div 
                        key={index}
                        className="design-bead"
                        style={{ 
                          backgroundColor: bead.color,
                          animationDelay: `${index * 0.1}s`
                        }}
                        title={`${bead.name} - ${bead.type}`}
                      >
                        <div className="bead-shine"></div>
                        <div className="bead-reflection"></div>
                        <div className="bead-glow" style={{ boxShadow: `0 0 15px ${bead.shine}` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="design-controls">
                  <button 
                    className="analyze-btn" 
                    onClick={startAnalysis}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? '🔮 分析中...' : '🔮 開始分析'}
                  </button>
                  <button 
                    className="clear-design-btn" 
                    onClick={clearSavedDesign}
                  >
                    🗑️ 清除設計
                  </button>
                  <button 
                    className="force-recalculate-btn" 
                    onClick={forceRecalculateScores}
                  >
                    🔄 強制重新計算評分
                  </button>
                  <button 
                    className="test-scoring-btn" 
                    onClick={testScoringSystem}
                  >
                    🧪 測試評分系統
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-design-message">
                <div className="no-design-icon">🎨</div>
                <h4>還沒有串珠設計</h4>
                <p>請先到珠子收納櫃創建並保存您的串珠設計</p>
                <button 
                  className="go-to-cabinet-btn" 
                  onClick={goToBeadCabinet}
                >
                  🏠 前往珠子收納櫃
                </button>
              </div>
            )}
          </div>

          {/* 雷達圖 */}
          <div className="radar-chart-section">
            <h3>🌟 能量評分圖</h3>
            
            {/* 調試顯示 - 顯示當前評分狀態 */}
            {showResult && (
              <div className="debug-scores" style={{ 
                background: 'rgba(0,0,0,0.7)', 
                padding: '10px', 
                margin: '10px 0', 
                borderRadius: '5px',
                fontSize: '12px',
                color: 'white'
              }}>
                <strong>當前評分狀態 (根據珠子名稱評分):</strong><br/>
                設計感: {scores.love} | 愛情: {scores.windfall} | 偏財: {scores.regularIncome}<br/>
                正財: {scores.career} | 事業: {scores.regularIncome} | 健康: {scores.health}<br/>
                <small>設計感基礎分4分（含額外獎勵3分），其他面向基礎分1分，每個珠子為兩個面向各加1分，最高10分</small><br/>
                <small>支援的珠子：粉色、薄荷綠、黃色、紅色、淺藍、橘色、紫色、淺綠、米色、淺粉、天藍、淡紫、金棕、深藍、深綠</small>
              </div>
            )}
            
            <div className="radar-chart">
              {/* SVG雷達圖 */}
              <svg 
                className="radar-svg" 
                viewBox="0 0 350 350" 
                width="350" 
                height="350"
              >
                {/* 背景網格 - 三個同心六邊形 */}
                <polygon 
                  points="175,75 275,125 275,225 175,275 75,225 75,125" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.3)" 
                  strokeWidth="1"
                />
                <polygon 
                  points="175,105 245,145 245,205 175,245 105,205 105,145" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.3)" 
                  strokeWidth="1"
                />
                <polygon 
                  points="175,135 215,165 215,185 175,215 135,185 135,165" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.3)" 
                  strokeWidth="1"
                />
                
                {/* 軸線 - 從中心到六個頂點 */}
                <line x1="175" y1="175" x2="175" y2="75" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                <line x1="175" y1="175" x2="275" y2="125" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                <line x1="175" y1="175" x2="275" y2="225" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                <line x1="175" y1="175" x2="175" y2="275" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                <line x1="175" y1="175" x2="75" y2="225" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                <line x1="175" y1="175" x2="75" y2="125" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                
                {/* AI評分結果填充區域 - 真正的六邊形 */}
                {showResult && (() => {
                  const scorePoints = getHexagonScorePoints(scores);
                  const pointsString = scorePoints.map(point => `${point.x},${point.y}`).join(' ');
                  
                  return (
                    <polygon 
                      key={`fill-${JSON.stringify(scores)}`}
                      points={pointsString}
                      fill="rgba(138, 43, 226, 0.6)" 
                      stroke="rgba(138, 43, 226, 0.8)" 
                      strokeWidth="2"
                    />
                  );
                })()}
                
                {/* 評分點 */}
                {showResult && (() => {
                  const scorePoints = getHexagonScorePoints(scores);
                  
                  return (
                    <>
                      {scorePoints.map((point, index) => (
                        <circle 
                          key={`point-${index}-${JSON.stringify(scores)}`}
                          cx={point.x} 
                          cy={point.y} 
                          r="4" 
                          fill="#ffd700" 
                        />
                      ))}
                    </>
                  );
                })()}
                
                {/* 軸線標籤 - 調整位置避免被截斷 */}
                <text x="175" y="60" className="axis-label" textAnchor="middle">設計感 ({scores.love})</text>
                <text x="290" y="130" className="axis-label" textAnchor="start">愛情 ({scores.windfall})</text>
                <text x="290" y="230" className="axis-label" textAnchor="start">偏財 ({scores.regularIncome})</text>
                <text x="175" y="300" className="axis-label" textAnchor="middle">正財 ({scores.career})</text>
                <text x="60" y="230" className="axis-label" textAnchor="end">事業 ({scores.regularIncome})</text>
                <text x="60" y="130" className="axis-label" textAnchor="end">健康 ({scores.health})</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeadRating;