import React, { useState, useRef, useEffect } from 'react';
import { Button, Fade, Slide, Grow } from '@mui/material';
import './BeadRating.css';
import ShareResultImage from './ShareResultImage';
import IconComponent from './IconComponent';
import MyDesigns from './MyDesigns';

const BeadRating = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [fullMessage, setFullMessage] = useState('');
  const [scores, setScores] = useState({
    love: 0,
    windfall: 0,
    social: 0,
    career: 0,
    health: 0
  });
  const [savedDesign, setSavedDesign] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  
  // 分享功能狀態
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [showShareResultImage, setShowShareResultImage] = useState(false);
  
  // 設計名稱編輯功能狀態
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState('');
  
  // 標籤切換功能狀態
  const [activeTab, setActiveTab] = useState('design');

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
        primary: { category: 'social', name: '黃色玻璃珠', score: 1, description: '人際和諧' },
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
        primary: { category: 'social', name: '淺綠米珠', score: 1, description: '人際智慧' },
        secondary: { category: 'love', name: '淺綠米珠', score: 1, description: '智慧愛情' }
      },
      '米色': { 
        primary: { category: 'career', name: '米色米珠', score: 1, description: '保護與力量' },
        secondary: { category: 'social', name: '米色米珠', score: 1, description: '人際保護' }
      },
      '淺粉': { 
        primary: { category: 'health', name: '淺粉米珠', score: 1, description: '保護與平衡' },
        secondary: { category: 'windfall', name: '淺粉米珠', score: 1, description: '財運平衡' }
      },
      '天藍': { 
        primary: { category: 'love', name: '天藍米珠', score: 1, description: '溫柔與包容' },
        secondary: { category: 'social', name: '天藍米珠', score: 1, description: '人際和諧' }
      },
      '淡紫': { 
        primary: { category: 'windfall', name: '淡紫米珠', score: 1, description: '智慧與財運' },
        secondary: { category: 'career', name: '淡紫米珠', score: 1, description: '事業智慧' }
      },
      '淡紫色': { 
        primary: { category: 'windfall', name: '淡紫色米珠', score: 1, description: '智慧與財運' },
        secondary: { category: 'career', name: '淡紫色米珠', score: 1, description: '事業智慧' }
      },
      '金棕': { 
        primary: { category: 'social', name: '金棕米珠', score: 1, description: '人際穩定' },
        secondary: { category: 'health', name: '金棕米珠', score: 1, description: '情緒穩定' }
      },
      '深藍': { 
        primary: { category: 'career', name: '深藍米珠', score: 1, description: '智慧與靈性' },
        secondary: { category: 'love', name: '深藍米珠', score: 1, description: '靈性愛情' }
      },
      '深綠': { 
        primary: { category: 'health', name: '深綠米珠', score: 1, description: '淨化與療癒' },
        secondary: { category: 'windfall', name: '深綠米珠', score: 1, description: '財運淨化' }
      },
      
      // 天然礦石系列
      '孔雀石': { 
        primary: { category: 'health', name: '孔雀石', score: 1, description: '療癒與保護' },
        secondary: { category: 'career', name: '孔雀石', score: 1, description: '事業保護' }
      },
      '銀耀石': { 
        primary: { category: 'career', name: '銀耀石', score: 1, description: '智慧與直覺' },
        secondary: { category: 'love', name: '銀耀石', score: 1, description: '靈性愛情' }
      },
      '海藍寶': { 
        primary: { category: 'love', name: '海藍寶', score: 1, description: '溝通與表達' },
        secondary: { category: 'health', name: '海藍寶', score: 1, description: '情緒平衡' }
      },
      '白月光': { 
        primary: { category: 'love', name: '白月光', score: 1, description: '溫柔與包容' },
        secondary: { category: 'health', name: '白月光', score: 1, description: '身心平衡' }
      },
      '煙水晶': { 
        primary: { category: 'windfall', name: '煙水晶', score: 1, description: '財富與保護' },
        secondary: { category: 'career', name: '煙水晶', score: 1, description: '事業穩定' }
      },
      
      // 靛色系列
      '靛色': { 
        primary: { category: 'career', name: '靛色珠', score: 1, description: '智慧與靈性' },
        secondary: { category: 'love', name: '靛色珠', score: 1, description: '靈性愛情' }
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
      love: 3,        // 基礎分3分
      windfall: 3,    // 基礎分3分
      social: 3,      // 基礎分3分
      career: 3,      // 基礎分3分
      health: 3       // 基礎分3分
    };

    console.log('開始分析珠子設計，總共', beads.length, '顆珠子');
    console.log('初始評分（基礎分3分）:', scores);

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
      
      // 檢查 beadInfo 是否有效
      if (!beadInfo || !beadInfo.primary || !beadInfo.secondary) {
        console.warn(`珠子 ${name} 的評分信息無效，跳過此珠子`);
        return;
      }
      
      // 主要面向評分 - 加0.5分
      switch (beadInfo.primary.category) {
        case 'love':
          scores.love = Math.min(10, Math.round((scores.love + 0.5) * 10) / 10);
          console.log('愛情加上主要面向分數: +0.5, 總分:', scores.love);
          break;
          
        case 'windfall':
          scores.windfall = Math.min(10, Math.round((scores.windfall + 0.5) * 10) / 10);
          console.log('偏財加上主要面向分數: +0.5, 總分:', scores.windfall);
          break;
          
        case 'social':
          scores.social = Math.min(10, Math.round((scores.social + 0.5) * 10) / 10);
          console.log('人際加上主要面向分數: +0.5, 總分:', scores.social);
          break;
          
        case 'career':
          scores.career = Math.min(10, Math.round((scores.career + 0.5) * 10) / 10);
          console.log('事業加上主要面向分數: +0.5, 總分:', scores.career);
          break;
          
        case 'health':
          scores.health = Math.min(10, Math.round((scores.health + 0.5) * 10) / 10);
          console.log('健康加上主要面向分數: +0.5, 總分:', scores.health);
          break;
          
        default:
          console.log('未知珠子主要類型:', beadInfo.primary);
          break;
      }
      
      // 第二面向評分 - 加0.25分
      switch (beadInfo.secondary.category) {
        case 'love':
          scores.love = Math.min(10, Math.round((scores.love + 0.25) * 10) / 10);
          console.log('愛情加上第二面向分數: +0.25, 總分:', scores.love);
          break;
          
        case 'windfall':
          scores.windfall = Math.min(10, Math.round((scores.windfall + 0.25) * 10) / 10);
          console.log('偏財加上第二面向分數: +0.25, 總分:', scores.windfall);
          break;
          
        case 'social':
          scores.social = Math.min(10, Math.round((scores.social + 0.25) * 10) / 10);
          console.log('人際加上第二面向分數: +0.25, 總分:', scores.social);
          break;
          
        case 'career':
          scores.career = Math.min(10, Math.round((scores.career + 0.25) * 10) / 10);
          console.log('事業加上第二面向分數: +0.25, 總分:', scores.career);
          break;
          
        case 'health':
          scores.health = Math.min(10, Math.round((scores.health + 0.25) * 10) / 10);
          console.log('健康加上第二面向分數: +0.25, 總分:', scores.health);
          break;
          
        default:
          console.log('未知珠子第二面向類型:', beadInfo.secondary);
          break;
      }
      
      console.log(`珠子${index + 1}評分完成 - 主要:+0.5, 第二:+0.25`);
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
    
    if (scores.social >= 8) {
      advice += '人際運勢非常旺盛！你將在社交場合大放異彩，結識許多貴人朋友，人脈關係將為你帶來意想不到的機會。';
    } else if (scores.social >= 6) {
      advice += '人際運勢穩定發展，你的社交能力正在提升，建議多參加聚會活動，拓展人脈網絡。';
    } else if (scores.social >= 4) {
      advice += '人際運勢良好，建議保持開放的心態，主動與人交流，建立良好的關係。';
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
       
        advice += '戴上這串手鍊會：';
        
        // 只給分數超過5分的面向提供運勢預測建議
       
       // 愛情運勢預測
       if (scores.love > 5) {
         if (scores.love >= 8) {
           advice += '為你帶來旺盛的愛情運勢！在接下來的三個月內，你很可能會遇到一位與你靈魂共鳴的人，這段感情將充滿浪漫與激情。';
         } else if (scores.love >= 6) {
           advice += '提升你的愛情運勢，單身的朋友可能在近期遇到心儀對象，已有伴侶的感情會更加穩定甜蜜。';
         }
       }
       
       // 偏財運勢預測
       if (scores.windfall > 5) {
         if (scores.windfall >= 8) {
           advice += '為你帶來極佳的偏財運勢！你最近很可能會有一筆意外之財，可能是投資獲利、中獎或收到禮物，建議保持理性，不要過於貪心。';
         } else if (scores.windfall >= 6) {
           advice += '提升你的偏財運勢，近期可能有額外收入機會，建議留意身邊的投資機會，但切記穩健理財。';
         }
       }
       
       // 人際運勢預測
       if (scores.social > 5) {
         if (scores.social >= 8) {
           advice += '為你帶來旺盛的人際運勢！你將在社交場合大放異彩，結識許多貴人朋友，人脈關係將為你帶來意想不到的機會。';
         } else if (scores.social >= 6) {
           advice += '提升你的人際運勢，你的社交能力正在提升，建議多參加聚會活動，拓展人脈網絡。';
         }
       }
       
       // 事業運勢預測
       if (scores.career > 5) {
         if (scores.career >= 8) {
           advice += '為你帶來光明的事業運勢！你將在職場上大放異彩，升職加薪的機會就在眼前，新的發展機會將接踵而至。';
         } else if (scores.career >= 6) {
           advice += '提升你的事業運勢，你的專業能力和創造力正在被認可，新的發展機會即將到來。';
         }
       }
       
       // 健康運勢預測
       if (scores.health > 5) {
         if (scores.health >= 8) {
           advice += '為你帶來和諧的健康運勢！你的身心狀態將達到最佳，整體能量非常平衡，建議保持當前的健康習慣。';
         } else if (scores.health >= 6) {
           advice += '提升你的健康運勢，建議保持規律的作息，適度的運動會帶來更好的狀態。';
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
      alert('請先在數位串珠創作區保存串珠設計！');
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

  // 暫存設計到我的設計專區
  const saveDesignToMyDesigns = () => {
    if (!savedDesign) {
      alert('請先完成串珠設計！');
      return;
    }
    
    try {
      const designId = `beadDesign_${Date.now()}`;
      const designToSave = {
        ...savedDesign,
        id: designId,
        timestamp: Date.now(),
        savedAt: new Date().toLocaleString('zh-TW')
      };
      
      localStorage.setItem(designId, JSON.stringify(designToSave));
      alert('設計已暫存到我的設計專區！');
    } catch (error) {
      console.error('保存設計時發生錯誤:', error);
      alert('保存失敗，請稍後再試。');
    }
  };

  // 開始編輯設計名稱
  const startEditingName = () => {
    setIsEditingName(true);
    setEditingName(savedDesign?.designName || '');
  };

  // 取消編輯設計名稱
  const cancelEditingName = () => {
    setIsEditingName(false);
    setEditingName('');
  };

  // 保存設計名稱
  const saveDesignName = () => {
    const newName = editingName.trim();
    if (!newName) {
      alert('設計名稱不能為空！');
      return;
    }
    
    if (newName === savedDesign?.designName) {
      // 名稱沒有改變，直接取消編輯
      cancelEditingName();
      return;
    }
    
    // 更新設計名稱
    const updatedDesign = {
      ...savedDesign,
      designName: newName
    };
    
    // 保存到 localStorage
    localStorage.setItem('savedBeadDesign', JSON.stringify(updatedDesign));
    setSavedDesign(updatedDesign);
    
    // 取消編輯狀態
    cancelEditingName();
    
    // 顯示成功提示
    const successMessage = document.createElement('div');
    successMessage.textContent = '✅ 設計名稱已更新！';
    successMessage.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(34, 197, 94, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      animation: slideInRight 0.3s ease-out;
    `;
    
    // 添加動畫樣式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successMessage);
    
    // 3秒後移除提示
    setTimeout(() => {
      if (document.body.contains(successMessage)) {
        document.body.removeChild(successMessage);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    }, 3000);
  };

  // 處理鍵盤事件
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveDesignName();
    } else if (e.key === 'Escape') {
      cancelEditingName();
    }
  };

  // 前往數位串珠創作區創建新設計
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



  const copyLink = async () => {
    try {
      const designData = {
        name: savedDesign?.designName || '串珠設計',
        beads: savedDesign?.beads || [],
        timestamp: savedDesign?.timestamp || new Date().toISOString(),
        scores: scores
      };
      
      const shareUrl = `${window.location.origin}${window.location.pathname}?design=${encodeURIComponent(JSON.stringify(designData))}`;
      
      await navigator.clipboard.writeText(shareUrl);
      setShareMessage('連結已複製到剪貼簿！');
      setTimeout(() => setShareMessage(''), 3000);
    } catch (error) {
      console.error('複製失敗:', error);
      setShareMessage('複製失敗，請手動複製');
      setTimeout(() => setShareMessage(''), 3000);
    }
  };

  const shareToSocial = (platform) => {
    try {
      const designData = {
        name: savedDesign?.designName || '串珠設計',
        beads: savedDesign?.beads || [],
        timestamp: savedDesign?.timestamp || new Date().toISOString(),
        scores: scores
      };
      
      const shareUrl = `${window.location.origin}${window.location.pathname}?design=${encodeURIComponent(JSON.stringify(designData))}`;
      const shareText = `看看我的串珠設計「${savedDesign?.designName || '串珠設計'}」的評分結果！`;
      
      let shareLink = '';
      
      switch (platform) {
        case 'facebook':
          shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
          break;
        case 'twitter':
          shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
          break;
        case 'line':
          shareLink = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
          break;
        case 'instagram':
          setShareMessage('Instagram 不支援直接分享連結，請手動截圖分享');
          setTimeout(() => setShareMessage(''), 5000);
          return;
        default:
          return;
      }
      
      // 嘗試使用 Web Share API（如果支援）
      if (navigator.share && platform !== 'instagram') {
        navigator.share({
          title: `串珠設計「${savedDesign?.designName || '串珠設計'}」評分結果`,
          text: shareText,
          url: shareUrl
        }).catch((error) => {
          console.log('Web Share API 失敗，使用彈出視窗:', error);
          openShareWindow(shareLink);
        });
      } else {
        // 備用方案：彈出視窗
        openShareWindow(shareLink);
      }
    } catch (error) {
      console.error('分享失敗:', error);
      setShareMessage('分享失敗，請稍後再試');
      setTimeout(() => setShareMessage(''), 3000);
    }
  };

  // 開啟分享視窗的輔助函數
  const openShareWindow = (shareLink) => {
    try {
      const popup = window.open(shareLink, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
      
      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        // 彈出視窗被阻擋，提供備用方案
        setShareMessage('彈出視窗被阻擋，已複製連結到剪貼簿');
        
        // 複製連結到剪貼簿作為備用
        navigator.clipboard.writeText(shareLink).then(() => {
          console.log('連結已複製到剪貼簿');
        }).catch(() => {
          // 如果剪貼簿 API 失敗，顯示連結讓用戶手動複製
          setShareMessage(`彈出視窗被阻擋，請手動複製連結：${shareLink}`);
        });
        
        setTimeout(() => setShareMessage(''), 5000);
      } else {
        // 彈出視窗成功開啟
        setShareMessage('分享視窗已開啟');
        setTimeout(() => setShareMessage(''), 2000);
      }
    } catch (error) {
      console.error('開啟分享視窗失敗:', error);
      setShareMessage('無法開啟分享視窗，請手動複製連結');
      setTimeout(() => setShareMessage(''), 3000);
    }
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


  return (
    <>
      
      <Fade in={!isExiting} timeout={800}>
        <div className="bead-rating-container bead-rating-page">
          {/* 頁面標題 */}
          <div className="rating-header">
            <h1><IconComponent name="star-rating" size={32} /> 串珠評分區 <IconComponent name="star-rating" size={32} /></h1>
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
                      <p>請先在數位串珠創作區創建並保存您的串珠設計，我將為你揭示其中的奧秘。</p>
                    )}
                  </div>
                )}

                {isAnalyzing && (
                  <div className="analyzing-message">
                    <div className="crystal-animation">
                      <IconComponent name="crystal-ball" size={32} />
                    </div>
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
              {/* 標籤切換按鈕 */}
              <div className="tab-buttons">
                 <button 
                   className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
                   onClick={() => setActiveTab('design')}
                 >
                   <IconComponent name="bead-bracelet" size={16} />
                   串珠分析
                 </button>
                <button 
                  className={`tab-btn ${activeTab === 'myDesigns' ? 'active' : ''}`}
                  onClick={() => setActiveTab('myDesigns')}
                >
                  <IconComponent name="art-palette" size={16} />
                  我的設計
                </button>
              </div>

              {/* 串珠設計展示 */}
              {activeTab === 'design' && (
                <div className="bead-design-section">
                  <h3>📿 你的串珠設計</h3>
                {savedDesign ? (
                  <div className="design-display">
                    <div className="design-info">
                      {/* 設計名稱 - 可編輯 */}
                      <div className="design-name-section">
                        {isEditingName ? (
                          <div className="edit-name-container">
                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              onKeyDown={handleKeyPress}
                              onBlur={saveDesignName}
                              className="edit-name-input"
                              placeholder="輸入設計名稱"
                              maxLength="30"
                              autoFocus
                            />
                            <div className="edit-name-buttons">
                              <button 
                                className="save-name-btn"
                                onClick={saveDesignName}
                                title="保存"
                              >
                                ✓
                              </button>
                              <button 
                                className="cancel-name-btn"
                                onClick={cancelEditingName}
                                title="取消"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="display-name-container">
                            <h4 className="design-name-display">
                              {savedDesign.designName}
                            </h4>
                            <button 
                              className="edit-name-btn"
                              onClick={startEditingName}
                              title="編輯名稱"
                            >
                              ✏️
                            </button>
                          </div>
                        )}
                      </div>
                      
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
                                    className={`design-bead-circle ${
                                      bead.type === '珍珠' ? 'pearl-bead' : 
                                      (bead.type === '米珠' || bead.type === '過渡珠') ? 'small-bead' : ''
                                    }`}
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
                         <div className="button-icon">
                           <IconComponent name="crystal-ball" size={20} />
                         </div>
                         <div className="button-text">{isAnalyzing ? '分析中...' : '開始分析'}</div>
                       </button>
                       <button 
                         onClick={clearSavedDesign}
                         className="design-button secondary-button"
                       >
                         <div className="button-icon">
                           <IconComponent name="sparkle" size={20} />
                         </div>
                         <div className="button-text">清除設計</div>
                       </button>
                       
                       {/* 暫存設計按鈕 */}
                       <button 
                         onClick={saveDesignToMyDesigns}
                         className="design-button save-design-button"
                       >
                         <div className="button-icon">
                           <IconComponent name="art-palette" size={20} />
                         </div>
                         <div className="button-text">暫存設計</div>
                       </button>
                       
                       {/* 分享設計按鈕 */}
                       <div className="share-button-container">
                         <button 
                           onClick={() => setShowShareMenu(!showShareMenu)}
                           className="design-button share-button"
                         >
                           <div className="button-icon">📤</div>
                           <div className="button-text">分享設計</div>
                         </button>
                         
                         {showShareMenu && (
                           <div className="share-menu">
                             <button 
                               className="share-option"
                               onClick={() => setShowShareResultImage(true)}
                               title="生成分享結果圖"
                             >
                               <IconComponent name="art-palette" size={16} /> 生成分享圖
                             </button>
                             
                             <button 
                               className="share-option"
                               onClick={copyLink}
                               title="複製連結"
                             >
                               🔗 複製連結
                             </button>
                             
                             <div className="social-share-buttons">
                               <button 
                                 className="social-share-btn facebook"
                                 onClick={() => shareToSocial('facebook')}
                                 title="分享到 Facebook"
                               >
                                 📘 Facebook
                               </button>
                               
                               <button 
                                 className="social-share-btn twitter"
                                 onClick={() => shareToSocial('twitter')}
                                 title="分享到 Twitter"
                               >
                                 🐦 Twitter
                               </button>
                               
                               <button 
                                 className="social-share-btn line"
                                 onClick={() => shareToSocial('line')}
                                 title="分享到 Line"
                               >
                                 💬 Line
                               </button>
                               
                               <button 
                                 className="social-share-btn instagram"
                                 onClick={() => shareToSocial('instagram')}
                                 title="分享到 Instagram"
                               >
                                 📷 Instagram
                               </button>
                             </div>
                           </div>
                         )}
                       </div>
                     </div>
                     
                     {/* 分享訊息顯示區域 */}
                     {shareMessage && (
                       <div className="share-message">
                         {shareMessage}
                       </div>
                     )}
                  </div>
                ) : (
                  <div className="no-design-message">
                    <div className="no-design-icon">
                      <IconComponent name="art-palette" size={48} />
                    </div>
                    <h4>還沒有串珠設計</h4>
                    <p>請先到數位串珠創作區創建並保存您的串珠設計</p>
                    <Button 
                      variant="outlined" 
                      size="medium"
                      onClick={goToBeadCabinet}
                      className="border-blue-400 text-blue-400 hover:bg-blue-400/10"
                      startIcon={<IconComponent name="home" size={20} />}
                    >
                      前往數位串珠創作區
                    </Button>
                  </div>
                )}
              </div>
              )}


              {/* 我的設計專區標籤 */}
              {activeTab === 'myDesigns' && (
                <div className="my-designs-section">
                  <MyDesigns onClose={() => setActiveTab('design')} isEmbedded={true} />
                </div>
              )}

              {/* 雷達圖 */}
              <div className="radar-chart-section">
                <h3><IconComponent name="moon-stars" size={24} /> 能量評分圖</h3>
                
                <div className="radar-chart">
                  {/* 正五邊形雷達圖 - 根據您提供的設計 */}
                  <div className="radar-container">
                    <svg 
                      className="radar-svg" 
                      viewBox="0 0 800 800" 
                      width="350" 
                      height="350"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* 正五邊形雷達圖 */}
                      {(() => {
                        const values = [
                          scores.love / 10,
                          scores.windfall / 10,
                          scores.social / 10,
                          scores.career / 10,
                          scores.health / 10
                        ];
                        const R = 300;
                        const N = 5;
                        const deg2rad = d => d * Math.PI / 180;

                        // 計算正五邊形外框頂點（白色線框）
                        const framePts = [];
                        for (let i = 0; i < N; i++) {
                          const ang = -90 + i * (360 / N);
                          const x = R * Math.cos(deg2rad(ang));
                          const y = R * Math.sin(deg2rad(ang));
                          framePts.push([x, y]);
                        }

                        // 計算資料多邊形（紫色填滿）
                        const dataPts = [];
                        for (let i = 0; i < N; i++) {
                          const ang = -90 + i * (360 / N);
                          // 確保 values[i] 是有效數字，避免 NaN
                          const value = isNaN(values[i]) ? 0 : (values[i] || 0);
                          const r = Math.max(0, Math.min(1, value)) * R;
                          const x = r * Math.cos(deg2rad(ang));
                          const y = r * Math.sin(deg2rad(ang));
                          dataPts.push([x, y]);
                        }

                        const framePointsString = framePts.map(p => p.join(',')).join(' ');
                        const dataPointsString = dataPts.map(p => p.join(',')).join(' ');

                        return (
                          <g transform="translate(400,400)">
                            {/* 等比縮小的五邊形網格線條 */}
                            {[0.8, 0.6, 0.4, 0.2].map((scale, gridIndex) => {
                              const gridPts = [];
                              for (let i = 0; i < N; i++) {
                                const ang = -90 + i * (360 / N);
                                const x = R * scale * Math.cos(deg2rad(ang));
                                const y = R * scale * Math.sin(deg2rad(ang));
                                gridPts.push([x, y]);
                              }
                              const gridPointsString = gridPts.map(p => p.join(',')).join(' ');
                              
                              return (
                                <polygon
                                  key={`grid-${gridIndex}`}
                                  points={gridPointsString}
                                  fill="none"
                                  stroke="#FFFFFF"
                                  strokeOpacity="0.3"
                                  strokeWidth="1"
                                />
                              );
                            })}
                            
                            {/* 五條輻射線，低存在感白色 */}
                            {framePts.map(([x, y], i) => (
                              <line
                                key={`ray-${i}`}
                                x1="0" y1="0"
                                x2={x} y2={y}
                                stroke="#FFFFFF"
                                strokeOpacity="0.25"
                                strokeWidth="2"
                              />
                            ))}
                            
                            {/* 資料區域（紫色填滿） */}
                            <polygon
                              points={dataPointsString}
                              fill="rgba(138, 43, 226, 0.6)"
                              stroke="rgba(138, 43, 226, 0.8)"
                              strokeWidth="2"
                            />
                            
                            {/* 紫色區域頂點的白點 */}
                            {dataPts.map(([x, y], index) => (
                              <circle
                                key={`data-point-${index}`}
                                cx={x}
                                cy={y}
                                r="8"
                                fill="#FFFFFF"
                                stroke="rgba(138, 43, 226, 0.8)"
                                strokeWidth="2"
                              />
                            ))}
                            
                            {/* 外框 */}
                            <polygon
                              points={framePointsString}
                              fill="none"
                              stroke="#FFFFFF"
                              strokeWidth="3"
                            />
                          </g>
                        );
                      })()}
                    </svg>
                    
                    {/* 軸線標籤 - 在 SVG 外面用絕對定位 */}
                    <div className="radar-label top">愛情 ({scores.love})</div>
                    <div className="radar-label top-right">偏財 ({scores.windfall})</div>
                    <div className="radar-label bottom-right">人際 ({scores.social})</div>
                    <div className="radar-label bottom-left">事業 ({scores.career})</div>
                    <div className="radar-label top-left">健康 ({scores.health})</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 底部導航欄 */}
          <div className="bottom-navigation">
            <div className="nav-grid">
              <button className="nav-button" onClick={goHome}>
                <div className="nav-icon">
                  <IconComponent name="home" size={20} />
                </div>
                <div className="nav-text">返回首頁</div>
              </button>
              <button className="nav-button" onClick={goToBeadCabinet}>
                <div className="nav-icon">
                  <IconComponent name="art-palette" size={20} />
                </div>
                <div className="nav-text">數位串珠</div>
              </button>
              <button className="nav-button" onClick={() => window.location.href = '/guide'}>
                <div className="nav-icon">
                  <IconComponent name="magnifying-glass" size={20} />
                </div>
                <div className="nav-text">珠子指南</div>
              </button>
              <button className="nav-button" onClick={() => window.location.href = '/fortune'}>
                <div className="nav-icon">
                  <IconComponent name="crystal-ball" size={20} />
                </div>
                <div className="nav-text">每日運勢</div>
              </button>
            </div>
          </div>
        </div>
      </Fade>
      
      {/* 分享結果圖生成組件 */}
      {showShareResultImage && (
        <ShareResultImage
          design={savedDesign}
          scores={scores}
          advice={currentMessage || fullMessage || "這是一個充滿神秘能量的串珠設計，展現了獨特的個人風格和創意。每個珠子的選擇都蘊含著深層的意義，為您帶來獨特的能量和運勢。"}
          onClose={() => setShowShareResultImage(false)}
        />
      )}
    </>
  );
};

export default BeadRating;
