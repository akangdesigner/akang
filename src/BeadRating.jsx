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
    
    // 根據評分給出整體分析
    if (scores.love >= 8) {
      advice += '從設計感來看，你的作品充滿了愛的氣息，創意靈感將源源不斷。';
    } else if (scores.love >= 6) {
      advice += '你的設計感穩步上升，愛情能量正在積累，建議保持開放的心態。';
    } else if (scores.love >= 4) {
      advice += '你的設計感有良好的基礎，建議多嘗試不同的色彩搭配。';
    }
    
    if (scores.windfall >= 8) {
      advice += '偏財運勢非常旺盛，意外財富機會即將到來，建議留意投資機會，但切記保持理性。';
    } else if (scores.windfall >= 6) {
      advice += '偏財運勢正在發展中，你的創意和直覺將為你帶來額外的收入來源。';
    } else if (scores.windfall >= 4) {
      advice += '偏財運勢穩定，建議保持當前的理財方式，穩健的投資會帶來可觀的收益。';
    }
    
    if (scores.regularIncome >= 8) {
      advice += '正財運勢極佳，穩定收入將大幅增長，你的努力將得到豐厚的回報。';
    } else if (scores.regularIncome >= 6) {
      advice += '正財運勢穩定，繼續保持當前的理財方式，穩健的投資會帶來可觀的收益。';
    } else if (scores.regularIncome >= 4) {
      advice += '正財運勢良好，建議保持耐心，穩定的收入會逐步增長。';
    }
    
    if (scores.career >= 8) {
      advice += '事業運勢一片光明，你將在職場上大放異彩，升職加薪的機會就在眼前。';
    } else if (scores.career >= 6) {
      advice += '事業運勢穩步上升，你的專業能力和創造力正在被認可，新的發展機會即將到來。';
    } else if (scores.career >= 4) {
      advice += '事業運勢穩定，建議繼續提升專業技能，機會會留給有準備的人。';
    }
    
    if (scores.health >= 8) {
      advice += '健康運勢非常和諧，你的身心狀態將達到最佳，整體能量非常平衡。';
    } else if (scores.health >= 6) {
      advice += '健康運勢良好，建議保持規律的作息，多接觸大自然，身心會更加健康。';
    } else if (scores.health >= 4) {
      advice += '健康運勢穩定，建議注意身心平衡，適度的運動會帶來更好的狀態。';
    }
    
    // 分析珠子顏色搭配，融入整體描述
    const beadNames = beads.map(bead => bead.name);
    const hasPink = beadNames.some(name => name.includes('粉色') || name.includes('黃粉色'));
    const hasPurple = beadNames.some(name => name.includes('紫色') || name.includes('淡紫') || name.includes('深紫'));
    const hasYellow = beadNames.some(name => name.includes('黃色') || name.includes('金棕') || name.includes('黃粉'));
    const hasGreen = beadNames.some(name => name.includes('薄荷綠') || name.includes('淺綠') || name.includes('深綠'));
    const hasBlue = beadNames.some(name => name.includes('淺藍') || name.includes('天藍') || name.includes('深藍') || name.includes('靛藍') || name.includes('靛色'));
    const hasRed = beadNames.some(name => name.includes('紅色') || name.includes('酒紅') || name.includes('紅棕'));
    const hasOrange = beadNames.some(name => name.includes('橘色'));
    const hasBrown = beadNames.some(name => name.includes('棕色') || name.includes('金棕') || name.includes('深棕') || name.includes('淺棕'));
    const hasWhite = beadNames.some(name => name.includes('白色') || name.includes('珍珠'));
    const hasBlack = beadNames.some(name => name.includes('黑色'));
    const hasSilver = beadNames.some(name => name.includes('銀色'));
    const hasGold = beadNames.some(name => name.includes('金色'));
    
    // 根據珠子搭配給出專業點評，融入整體描述
    if (hasPink && hasPurple) {
      advice += '你巧妙地運用了粉色與紫色的搭配，這種組合既浪漫又神秘，預示著你將在愛情和靈性方面都有重大突破。';
    } else if (hasPink) {
      advice += '粉色的溫暖色調代表著你內心的柔軟與愛心，這種顏色將為你帶來和諧的人際關係和美好的愛情運勢。';
    }
    
    if (hasPurple && hasGreen) {
      advice += '紫色與綠色的搭配智慧與自然並存，這預示著你將在事業發展中展現出獨特的創造力和溝通天賦。';
    } else if (hasPurple) {
      advice += '紫色的神秘色調象徵著你內在的智慧與靈性，這種高貴的顏色將為你帶來精神層面的提升和直覺的增強。';
    }
    
    if (hasYellow && hasGreen) {
      advice += '黃色與綠色的組合充滿活力，這代表著財富與成長的完美結合，你的投資眼光和事業發展將相輔相成。';
    } else if (hasYellow) {
      advice += '黃色的明亮色調代表著你內在的樂觀與智慧，這種充滿陽光的顏色將為你帶來財富運勢和思維的清晰。';
    }
    
    if (hasRed && hasBlue) {
      advice += '紅色與藍色的搭配極具張力，熱情與冷靜的對比展現了你內心的強大力量，這種組合將為你帶來勇氣和智慧。';
    } else if (hasRed) {
      advice += '紅色的熱情色調代表著你內在的活力與勇氣，這種充滿力量的顏色將為你帶來事業上的突破和保護。';
    }
    
    if (hasOrange && hasBlue) {
      advice += '橘色與藍色的搭配充滿創意，這代表著熱情與智慧的完美平衡，你的創意靈感將源源不斷。';
    } else if (hasOrange) {
      advice += '橘色的溫暖色調代表著你內在的創造力與熱情，這種充滿活力的顏色將為你帶來人際魅力和事業機會。';
    }
    
    if (hasGreen) {
      advice += '綠色的自然色調代表著你內在的成長與生命力，這種充滿生機的顏色將為你帶來健康運勢和事業發展。';
    }
    
    if (hasBlue) {
      advice += '藍色的寧靜色調代表著你內在的智慧與溝通能力，這種充滿智慧的顏色將為你帶來清晰的思維和良好的人際關係。';
    }
    
    if (hasBrown) {
      advice += '棕色的穩重色調代表著你內在的踏實與可靠，這種充滿大地氣息的顏色將為你帶來穩定的財運和事業基礎。';
    }
    
    if (hasWhite) {
      advice += '白色的純淨色調代表著你內在的純潔與智慧，這種充滿光明的顏色將為你帶來心靈的淨化和內在的平衡。';
    }
    
    if (hasBlack) {
      advice += '黑色的神秘色調代表著你內在的深度與力量，這種充滿魅力的顏色將為你帶來保護和內在的堅定。';
    }
    
    if (hasSilver) {
      advice += '銀色的優雅色調代表著你內在的智慧與直覺，這種充滿靈性的顏色將為你帶來精神層面的提升和洞察力。';
    }
    
    if (hasGold) {
      advice += '金色的富貴色調代表著你內在的價值與財富，這種充滿能量的顏色將為你帶來豐盛的財運和事業成功。';
    }
    
    // 移除重複的個別珠子顏色分析，避免跳針
    
    // 分析珠子類型和數量，融入整體描述
    const glassBeads = beads.filter(bead => bead.type === '玻璃珠');
    const riceBeads = beads.filter(bead => bead.type === '米珠');
    const crystalBeads = beads.filter(bead => bead.type === '水晶珠');
    const woodBeads = beads.filter(bead => bead.type === '木珠');
    const pearlBeads = beads.filter(bead => bead.type === '珍珠');
    const transitionBeads = beads.filter(bead => bead.type === '過渡珠');
    
    // 根據珠子類型給出特質分析，融入整體描述
    if (glassBeads.length > 0) {
      advice += '玻璃珠的透明質感代表著你內心的純淨與透明，這種材質象徵著清澈的思維和真誠的品格。';
    }
    
    if (riceBeads.length > 0) {
      advice += '米珠的溫潤質感代表著你內心的溫暖與包容，這種材質象徵著謙遜的美德和自然的智慧。';
    }
    
    if (crystalBeads.length > 0) {
      advice += '水晶珠的璀璨光澤代表著你內心的光芒與靈性，這種材質象徵著高貴的氣質和靈性的覺醒。';
    }
    
    if (woodBeads.length > 0) {
      advice += '木珠的自然紋理代表著你內心的堅韌與成長，這種材質象徵著生命的活力和大地的智慧。';
    }
    
    if (pearlBeads.length > 0) {
      advice += '珍珠的溫潤光澤代表著你內心的優雅與成熟，這種材質象徵著歲月的沉澱和內在的美麗。';
    }
    
    if (transitionBeads.length > 0) {
      advice += '過渡珠的連接作用代表著你內心的協調與平衡，這種材質象徵著人際關係的和諧和生活的智慧。';
    }
    
    // 根據珠子數量給出建議，融入整體描述
    const beadCount = beads.length;
    if (beadCount >= 15) {
      advice += '你的設計非常複雜精緻，這展現了你對完美的追求和耐心，建議你將這份專注力運用到生活的各個方面。';
    } else if (beadCount >= 8) {
      advice += '你的設計豐富多彩，這體現了你對生活的熱愛和對美的追求，這種積極的態度將為你帶來好運。';
    } else if (beadCount >= 5) {
      advice += '你的設計簡潔有力，這體現了你對本質的深刻理解，有時候，少即是多，你的簡約美學將為你帶來獨特的魅力。';
    } else {
      advice += '你的設計精簡優雅，這展現了你對品質的追求，精緻的設計往往比複雜的堆砌更有價值。';
    }
    
    // 總結建議，形成完整的結尾
    advice += '記住，每個珠子都承載著獨特的能量，就像你人生中的每個選擇都蘊含著無限可能。相信自己的直覺，勇敢追求夢想，保持規律的作息，多接觸大自然。';
    
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
    <div className="bead-rating-container bead-rating-page">
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
            
            {/* 神秘通靈師頭像 - 放在對話框右下角 */}
            <div className="psychic-avatar-in-dialogue">
              <img 
                src="/psychic-medium.jpeg" 
                alt="神秘通靈師" 
                className="psychic-image-full"
              />
              <div className="psychic-title-small">星象大師:小乖</div>
            </div>
          </div>

          {/* 移除原本的通靈師區域 */}
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
                  <p>包含 {(() => {
                    // 計算實際珠子數量，小珠子一顆算 0.5 顆
                    const bigBeads = savedDesign.beads.filter(bead => 
                      !(bead.type === '米珠' || bead.type === '珍珠' || bead.type === '過渡珠')
                    ).length;
                    const smallBeads = savedDesign.beads.filter(bead => 
                      bead.type === '米珠' || bead.type === '珍珠' || bead.type === '過渡珠'
                    ).length;
                    const actualTotal = bigBeads + (smallBeads * 0.5);
                    return `${actualTotal.toFixed(1)} 顆珠子`;
                  })()}</p>
                  <p>創建時間: {new Date(savedDesign.timestamp).toLocaleString()}</p>
                </div>
                
                {/* 串珠設計視覺化 - 圓形排列 */}
                <div className="bead-design-visualization">
                  <div className="bead-circle-container">
                    {/* 根據珠子數量自動調整串珠線圓半徑 */}
                    {(() => {
                      const beadCount = savedDesign.beads.length;
                      let radius = 80; // 預設半徑
                      let stringType = 'half'; // 預設半圓
                      
                      // 根據珠子數量調整半徑和線類型
                      if (beadCount <= 12) {
                        radius = 80; // 13顆以下用標準半徑
                        stringType = 'half';
                      } else if (beadCount <= 15) {
                        radius = 100; // 13-15顆用較大半徑，4/3圓
                        stringType = 'four-thirds';
                      } else {
                        radius = 120; // 16顆以上用最大半徑，全圓
                        stringType = 'full';
                      }
                      
                      return (
                        <>
                          {/* 根據線類型顯示不同比例的軌道線 */}
                          <div 
                            className={`bead-string bead-string-${stringType}`}
                            style={{
                              width: `${radius * 2}px`,
                              height: `${radius * 2}px`,
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)'
                            }}
                          ></div>
                          
                          {/* 從圓心到珠子的半徑線 */}
                          {savedDesign.beads.map((bead, index) => {
                            const totalBeads = savedDesign.beads.length;
                            const angle = (index / totalBeads) * 2 * Math.PI - Math.PI / 2;
                            const centerX = 150;
                            const centerY = 150;
                            
                            const x = centerX + radius * Math.cos(angle);
                            const y = centerY + radius * Math.sin(angle);
                            
                            return (
                              <div 
                                key={index}
                                className={`design-bead-circle ${(bead.type === '米珠' || bead.type === '珍珠' || bead.type === '過渡珠') ? 'small-bead' : ''}`}
                                style={{ 
                                  left: `${x}px`,
                                  top: `${y}px`,
                                  animationDelay: `${index * 0.1}s`,
                                  zIndex: index + 10
                                }}
                                title={`${bead.name} - ${bead.type}`}
                              >
                                <img 
                                  src={`/${bead.image}`}
                                  alt={bead.name}
                                  className="design-bead-image"
                                />
                              </div>
                            );
                          })}
                        </>
                      );
                    })()}
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