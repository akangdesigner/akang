import React, { useState, useRef, useEffect } from 'react';
import { Button, Fade, Slide, Grow } from '@mui/material';
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
  const [isExiting, setIsExiting] = useState(false);
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

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
    
    // 模擬全局 loading 效果
    const timer = setTimeout(() => {
      setIsGlobalLoading(false);
    }, 2000); // 2秒後隱藏 loading
    
    return () => clearTimeout(timer);
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
    
    // 更精確的顏色檢測，避免誤判
    const hasPink = beadNames.some(name => 
      name.includes('粉色') && !name.includes('黃粉') && !name.includes('金棕')
    );
    const hasPurple = beadNames.some(name => 
      name.includes('紫色') || name.includes('淡紫') || name.includes('深紫')
    );
    const hasYellow = beadNames.some(name => 
      name.includes('黃色') || (name.includes('金棕') && !name.includes('紅棕'))
    );
    const hasGreen = beadNames.some(name => 
      name.includes('薄荷綠') || name.includes('淺綠') || name.includes('深綠')
    );
    const hasBlue = beadNames.some(name => 
      name.includes('淺藍') || name.includes('天藍') || name.includes('深藍') || name.includes('靛藍') || name.includes('靛色')
    );
    const hasRed = beadNames.some(name => 
      name.includes('紅色') || name.includes('酒紅') || name.includes('紅棕')
    );
    const hasOrange = beadNames.some(name => 
      name.includes('橘色')
    );
    const hasBrown = beadNames.some(name => 
      (name.includes('棕色') || name.includes('深棕') || name.includes('淺棕')) && !name.includes('金棕') && !name.includes('紅棕')
    );
    const hasWhite = beadNames.some(name => 
      name.includes('白色') && !name.includes('珍珠')
    );
    const hasBlack = beadNames.some(name => 
      name.includes('黑色')
    );
    const hasSilver = beadNames.some(name => 
      name.includes('銀色')
    );
    const hasGold = beadNames.some(name => 
      name.includes('金色') && !name.includes('金棕')
    );
    
    // 調試：顯示檢測到的顏色（開發時使用）
    console.log('珠子名稱:', beadNames);
    console.log('檢測到的顏色:', {
      hasPink, hasPurple, hasYellow, hasGreen, hasBlue, 
      hasRed, hasOrange, hasBrown, hasWhite, hasBlack, hasSilver, hasGold
    });
    
    // 根據珠子搭配給出專業點評，融入整體描述
    // 只分析實際存在的顏色組合，避免虛假描述
    
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
    
    // 只分析實際存在的顏色，避免虛假描述
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
    
         // 刪除珠子材質相關建議，只保留分數超過5分的面向建議
    
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
    
                                                     // 根據實際評分和珠子組合給出多樣化的總結建議
       
        advice += '我預測：';
        
        // 只給分數超過5分的面向提供運勢預測建議
       
       // 愛情運勢預測
       if (scores.love > 5) {
         if (scores.love >= 8) {
           advice += '你的愛情運勢非常旺盛！在接下來的三個月內，你很可能會遇到一位與你靈魂共鳴的人，這段感情將充滿浪漫與激情。';
         } else if (scores.love >= 6) {
           advice += '你的愛情運勢正在上升期，單身的朋友可能在近期遇到心儀對象，已有伴侶的感情會更加穩定甜蜜。';
         }
       }
       
       // 偏財運勢預測
       if (scores.windfall > 5) {
         if (scores.windfall >= 8) {
           advice += '偏財運勢極佳！你最近很可能會有一筆意外之財，可能是投資獲利、中獎或收到禮物，建議保持理性，不要過於貪心。';
         } else if (scores.windfall >= 6) {
           advice += '偏財運勢不錯，近期可能有額外收入機會，建議留意身邊的投資機會，但切記穩健理財。';
         }
       }
       
       // 正財運勢預測
       if (scores.regularIncome > 5) {
         if (scores.regularIncome >= 8) {
           advice += '正財運勢非常穩定！你的工作收入將大幅增長，升職加薪的機會就在眼前，你的努力將得到豐厚的回報。';
         } else if (scores.regularIncome >= 6) {
           advice += '正財運勢穩定，繼續保持當前的理財方式，穩健的投資會帶來可觀的收益。';
         }
       }
       
       // 事業運勢預測
       if (scores.career > 5) {
         if (scores.career >= 8) {
           advice += '事業運勢一片光明！你將在職場上大放異彩，升職加薪的機會就在眼前，新的發展機會將接踵而至。';
         } else if (scores.career >= 6) {
           advice += '事業運勢穩步上升，你的專業能力和創造力正在被認可，新的發展機會即將到來。';
         }
       }
       
       // 健康運勢預測
       if (scores.health > 5) {
         if (scores.health >= 8) {
           advice += '健康運勢非常和諧！你的身心狀態將達到最佳，整體能量非常平衡，建議保持當前的健康習慣。';
         } else if (scores.health >= 6) {
           advice += '健康運勢良好，建議保持規律的作息，適度的運動會帶來更好的狀態。';
         }
       }
      
             // 多樣化的總結建議 - 根據珠子組合和評分情況
       const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
       const averageScore = totalScore / Object.keys(scores).length;
       const maxScore = Math.max(...Object.values(scores));
       const minScore = Math.min(...Object.values(scores));
       const scoreRange = maxScore - minScore;
       
       // 根據珠子顏色組合選擇不同的總結風格
       const hasWarmColors = beadNames.some(name => name.includes('紅色') || name.includes('橘色') || name.includes('黃色') || name.includes('粉色'));
       const hasCoolColors = beadNames.some(name => name.includes('藍色') || name.includes('綠色') || name.includes('紫色'));
       const hasNeutralColors = beadNames.some(name => name.includes('白色') || name.includes('黑色') || name.includes('棕色') || name.includes('米色'));
      
      // 根據評分分布選擇總結風格
      if (scoreRange <= 2 && averageScore >= 7) {
        // 均衡高分型
        if (hasWarmColors && hasCoolColors) {
          advice += '你的設計展現了完美的平衡美學，暖色與冷色的和諧搭配象徵著你內在的智慧與熱情的完美融合。這種平衡將為你帶來全方位的運勢提升，你的人生將如同你的設計一樣，充滿和諧與美好。';
        } else if (hasWarmColors) {
          advice += '你的設計充滿溫暖的能量，這種熱情將感染身邊的每一個人，為你帶來豐富的人際關係和美好的生活體驗。你的熱情將成為你成功的最大動力。';
        } else if (hasCoolColors) {
          advice += '你的設計展現了深邃的智慧，冷色調的運用體現了你內在的冷靜與理性，這種特質將幫助你在人生的關鍵時刻做出最明智的選擇。';
        } else {
          advice += '你的設計簡約而優雅，中性色調的運用展現了你內在的穩重與成熟，這種特質將為你帶來穩定的發展和持久的成功。';
        }
      } else if (maxScore >= 8 && scoreRange > 3) {
        // 突出優勢型
        if (hasWarmColors) {
          advice += '你的設計突出了你最強的優勢領域，暖色調的運用增強了你的個人魅力。專注發展你的強項，你將在擅長的領域創造非凡的成就。';
        } else if (hasCoolColors) {
          advice += '你的設計展現了你在特定領域的卓越能力，冷色調的運用增強了你的專業形象。繼續深耕你的專長，你將成為該領域的專家。';
        } else {
          advice += '你的設計突出了你的核心優勢，這種專注將幫助你在關鍵領域取得突破性進展。相信自己的判斷，你將創造屬於自己的傳奇。';
        }
      } else if (averageScore >= 6 && scoreRange <= 3) {
        // 穩定發展型
        if (hasWarmColors && hasCoolColors) {
          advice += '你的設計展現了穩定的發展潛力，暖色與冷色的平衡搭配象徵著你穩健的成長步伐。保持這種平衡，你將在人生的各個方面都取得穩定的進步。';
        } else if (hasWarmColors) {
          advice += '你的設計充滿積極向上的能量，這種樂觀的態度將幫助你克服困難，在穩定的基礎上不斷提升自己。';
        } else if (hasCoolColors) {
          advice += '你的設計展現了穩定的智慧，冷色調的運用體現了你務實的態度。繼續保持這種穩健的風格，你將在穩定的基礎上實現突破。';
        } else {
          advice += '你的設計展現了穩定的品質，中性色調的運用體現了你踏實的性格。這種穩定性將為你帶來可靠的發展基礎。';
        }
      } else if (averageScore < 5) {
        // 潛力發展型
        if (hasWarmColors) {
          advice += '你的設計雖然簡單，但充滿了溫暖的潛力，暖色調的運用展現了你內在的熱情。每個人都從基礎開始，你的熱情將幫助你快速成長。';
        } else if (hasCoolColors) {
          advice += '你的設計展現了學習的潛力，冷色調的運用體現了你對知識的渴望。保持學習的熱情，你將在串珠藝術的道路上越走越遠。';
        } else {
          advice += '你的設計雖然基礎，但展現了無限的發展可能。每個大師都從學徒開始，保持謙遜的學習態度，你將創造屬於自己的精彩。';
        }
      }
      
             // 根據珠子數量選擇不同的鼓勵語
       if (beadCount >= 15) {
         advice += '你對完美的追求令人敬佩，這種專注力將幫助你在人生的各個領域都達到卓越的水準。';
       } else if (beadCount >= 10) {
         advice += '你的設計豐富多彩，這種多樣性展現了你對生活的熱愛，這種積極的態度將為你帶來豐富的人生體驗。';
       } else if (beadCount >= 6) {
         advice += '你的設計簡潔有力，這種簡約美學展現了你對本質的深刻理解，有時候，少即是多。';
       } else {
         advice += '你的設計精簡優雅，這種精緻展現了你對品質的追求，精緻往往比複雜更有價值。';
       }
      
      // 最終總結 - 根據整體風格選擇
      if (hasWarmColors && hasCoolColors) {
        advice += '記住，每個珠子都承載著獨特的能量，就像你人生中的每個選擇都蘊含著無限可能。你的設計展現了平衡與和諧的美學，相信這種平衡將為你帶來圓滿的人生。';
      } else if (hasWarmColors) {
        advice += '記住，每個珠子都承載著獨特的能量，就像你人生中的每個選擇都蘊含著無限可能。你的設計充滿熱情與活力，讓這份熱情點燃你的人生夢想。';
      } else if (hasCoolColors) {
        advice += '記住，每個珠子都承載著獨特的能量，就像你人生中的每個選擇都蘊含著無限可能。你的設計展現了智慧與理性，讓這份智慧指引你的人生方向。';
      } else {
        advice += '記住，每個珠子都承載著獨特的能量，就像你人生中的每個選擇都蘊含著無限可能。你的設計展現了穩重與成熟，讓這份穩重成為你成功的基石。';
      }
    
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
    setIsExiting(true);
    // 延遲跳轉，讓動畫有時間播放
    setTimeout(() => {
      window.location.href = '/home';
    }, 800); // 800ms 後跳轉，配合動畫時長
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
    // 六邊形的六個頂點，從頂部順時針排列，與軸線標籤完全匹配
    const centerX = 175;
    const centerY = 175;
    
    // 評分範圍：0分在圓心，高分在頂點
    // 計算每個軸線上的評分點位置
    const points = [
      // 頂部：設計感 (y軸負方向)
      { x: centerX, y: centerY - (scores.love / 10) * 100 },
      
      // 右上：愛情 (右上方向，30度角)
      { x: centerX + (scores.love / 10) * 86.6, y: centerY - (scores.love / 10) * 50 },
      
      // 右下：偏財 (右下方向，30度角)
      { x: centerX + (scores.windfall / 10) * 86.6, y: centerY + (scores.windfall / 10) * 50 },
      
      // 底部：正財 (y軸正方向)
      { x: centerX, y: centerY + (scores.regularIncome / 10) * 100 },
      
      // 左下：事業 (左下方向，30度角)
      { x: centerX - (scores.career / 10) * 86.6, y: centerY + (scores.career / 10) * 50 },
      
      // 左上：健康 (左上方向，30度角)
      { x: centerX - (scores.health / 10) * 86.6, y: centerY - (scores.health / 10) * 50 }
    ];
    
    return points;
  };

  return (
    <>
      {/* 全局 Loading 動畫 */}
      {isGlobalLoading && (
        <div className="global-loading-overlay">
          <div className="loading-content">
            <div className="psychic-loading-avatar">
              <img 
                src="/psychic-medium.jpeg" 
                alt="神秘通靈師" 
                className="psychic-loading-image"
              />
            </div>
            <div className="loading-text">
              <p>🔮 正在連接神秘能量...</p>
              <p>✨ 請稍候，通靈師正在準備...</p>
            </div>
          </div>
        </div>
      )}
      
      <Fade in={!isExiting && !isGlobalLoading} timeout={800}>
        <div className="bead-rating-container bead-rating-page">
          {/* 頁面標題 */}
          <div className="rating-header">
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
                         onClick={startAnalysis}
                         disabled={isAnalyzing}
                         className="design-button primary-button"
                       >
                         <div className="button-icon">🔮</div>
                         <div className="button-text">{isAnalyzing ? '分析中...' : '開始分析'}</div>
                       </button>
                       <button 
                         onClick={clearSavedDesign}
                         className="design-button secondary-button"
                       >
                         <div className="button-icon">🗑️</div>
                         <div className="button-text">清除設計</div>
                       </button>
                     </div>
                  </div>
                ) : (
                  <div className="no-design-message">
                    <div className="no-design-icon">🎨</div>
                    <h4>還沒有串珠設計</h4>
                    <p>請先到珠子收納櫃創建並保存您的串珠設計</p>
                    <Button 
                      variant="outlined" 
                      size="medium"
                      onClick={goToBeadCabinet}
                      className="border-blue-400 text-blue-400 hover:bg-blue-400/10"
                      startIcon={<span>🏠</span>}
                    >
                      前往珠子收納櫃
                    </Button>
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
                    
                                         {/* 軸線標籤 - 修正評分變數對應關係，與頂點位置完全匹配 */}
                     <text x="175" y="60" className="axis-label" textAnchor="middle">設計感 ({scores.love})</text>
                     <text x="290" y="130" className="axis-label" textAnchor="start">愛情 ({scores.love})</text>
                     <text x="290" y="230" className="axis-label" textAnchor="start">偏財 ({scores.windfall})</text>
                     <text x="175" y="300" className="axis-label" textAnchor="middle">正財 ({scores.regularIncome})</text>
                     <text x="60" y="230" className="axis-label" textAnchor="end">事業 ({scores.career})</text>
                     <text x="60" y="130" className="axis-label" textAnchor="end">健康 ({scores.health})</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 底部導航欄 */}
          <div className="bottom-navigation">
            <div className="nav-grid">
              <button className="nav-button" onClick={goHome}>
                <div className="nav-icon">🏠</div>
                <div className="nav-text">返回首頁</div>
              </button>
              <button className="nav-button" onClick={goToBeadCabinet}>
                <div className="nav-icon">🎨</div>
                <div className="nav-text">數位串珠</div>
              </button>
              <button className="nav-button" onClick={() => window.location.href = '/guide'}>
                <div className="nav-icon">📚</div>
                <div className="nav-text">珠子指南</div>
              </button>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default BeadRating;
