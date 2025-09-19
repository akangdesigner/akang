import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Avatar, 
  Box,
  Grid,
  Paper,
  Fade,
  Slide,
  Grow
} from '@mui/material';
import { 
  Star, 
  Favorite, 
  Psychology, 
  AutoAwesome,
  TrendingUp,
  HealthAndSafety
} from '@mui/icons-material';

const ModernBeadRating = () => {
  // 模擬從串珠設計獲取的分數（這裡應該連接到實際的串珠設計）
  const [scores, setScores] = useState({
    love: 0,
    windfall: 0,
    regularIncome: 0,
    career: 0,
    health: 0
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [beadDesign, setBeadDesign] = useState(null);

  // 分析串珠設計並計算分數
  const analyzeBeadDesign = () => {
    // 這裡應該連接到實際的串珠設計數據
    // 暫時使用模擬數據來演示功能
    
    // 模擬分析您的12顆珠子設計
    const mockBeadDesign = {
      beads: [
        { type: '木珠', color: '淺米色', count: 6 },
        { type: '水晶珠', color: '淡紫色', count: 6 }
      ],
      pattern: '圓形交替',
      totalBeads: 12
    };
    
    setBeadDesign(mockBeadDesign);
    
    // 根據珠子類型和顏色計算運勢分數
    const calculatedScores = calculateScoresFromDesign(mockBeadDesign);
    setScores(calculatedScores);
  };

  // 根據串珠設計計算運勢分數
  const calculateScoresFromDesign = (design) => {
    // 基礎分：每個面向都有1分基礎分
    let scores = {
      love: 4,        // 基礎分1分 + 設計感額外獎勵3分 = 4分
      windfall: 1,    // 基礎分1分
      regularIncome: 1, // 基礎分1分
      career: 1,      // 基礎分1分
      health: 1       // 基礎分1分
    };


    // 分析每顆珠子的能量屬性
    if (design.beads && Array.isArray(design.beads)) {
      design.beads.forEach((bead, index) => {
        const { id, name, type, color } = bead;
        
        // 根據珠子類型和顏色來評分
        const beadInfo = getBeadDualCategoryAndScore(name || type || color);
        
        // 主要面向評分 - 加0.5分
        if (beadInfo.primary.category !== 'unknown') {
          switch (beadInfo.primary.category) {
            case 'love':
              scores.love = Math.min(10, Math.round((scores.love + 0.5) * 10) / 10);
              break;
              
            case 'windfall':
              scores.windfall = Math.min(10, Math.round((scores.windfall + 0.5) * 10) / 10);
              break;
              
            case 'regularIncome':
              scores.regularIncome = Math.min(10, Math.round((scores.regularIncome + 0.5) * 10) / 10);
              break;
              
            case 'career':
              scores.career = Math.min(10, Math.round((scores.career + 0.5) * 10) / 10);
              break;
              
            case 'health':
              scores.health = Math.min(10, Math.round((scores.health + 0.5) * 10) / 10);
              break;
              
            default:
              break;
          }
        }
        
        // 第二面向評分 - 加0.25分
        if (beadInfo.secondary.category !== 'unknown') {
          switch (beadInfo.secondary.category) {
            case 'love':
              scores.love = Math.min(10, Math.round((scores.love + 0.25) * 10) / 10);
              break;
              
            case 'windfall':
              scores.windfall = Math.min(10, Math.round((scores.windfall + 0.25) * 10) / 10);
              break;
              
            case 'regularIncome':
              scores.regularIncome = Math.min(10, Math.round((scores.regularIncome + 0.25) * 10) / 10);
              break;
              
            case 'career':
              scores.career = Math.min(10, Math.round((scores.career + 0.25) * 10) / 10);
              break;
              
            case 'health':
              scores.health = Math.min(10, Math.round((scores.health + 0.25) * 10) / 10);
              break;
              
            default:
              break;
          }
        }
        
      });
    }
    
    return scores;
  };

  // 獲取珠子的雙重類別和分數（從BeadRating.jsx複製）
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
      }
    };
    
    return beadCategories[beadName] || { 
      primary: { category: 'unknown', name: '未知', score: 1, description: '未知能量' },
      secondary: { category: 'unknown', score: 1, description: '未知能量' }
    };
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      analyzeBeadDesign();
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'success';
    if (score >= 6) return 'warning';
    return 'error';
  };

  const getScoreIcon = (score) => {
    if (score >= 8) return <Star sx={{ color: 'gold' }} />;
    if (score >= 6) return <TrendingUp sx={{ color: 'orange' }} />;
    return <TrendingUp sx={{ color: 'red' }} />;
  };

  // 根據分數獲取結語建議
  const getConclusionAdvice = (category, score) => {
    const adviceMap = {
      love: {
        high: "你的愛情運勢非常旺盛！建議多佩戴粉紅色或紅色系的珠子，如粉色水晶珠、紅色水晶珠、酒紅米珠等，這些珠子能增強你的魅力與桃花運。在串珠設計中，可以嘗試心形或圓形的珠子組合，象徵圓滿的愛情。",
        medium: "你的愛情運勢穩定發展中。建議使用綠色系的珠子，如薄荷綠玻璃珠、深棕木珠等，這些珠子能幫助你保持內心的平靜，吸引真誠的緣分。在設計上可以加入一些對稱的元素，代表平衡的關係。",
        low: "你的愛情運勢需要一些提升。建議使用白色或銀色的珠子，如白色珍珠、白色米珠、銀色過渡珠等，這些珠子能淨化負面能量，為你帶來新的愛情機會。設計上建議使用流線型的串法，象徵順暢的感情發展。"
      },
      windfall: {
        high: "你的偏財運勢極佳！建議多使用黃色或金色的珠子，如橘色玻璃珠、黃粉色玻璃珠、金色過渡珠等，這些珠子能增強你的財運與機遇。在串珠設計中，可以嘗試星形或菱形的珠子，象徵財富的閃耀。",
        medium: "你的偏財運勢有潛力。建議使用藍色系的珠子，如天空藍水晶珠、淺藍水晶珠、靛色水晶珠等，這些珠子能幫助你保持冷靜的判斷力，抓住投資機會。設計上可以加入一些幾何圖案，代表理性的財富管理。",
        low: "你的偏財運勢需要改善。建議使用紫色系的珠子，如深紫色水晶珠、淡紫色水晶珠等，這些珠子能提升你的智慧與洞察力，幫助你做出更好的財務決策。設計上建議使用漸變色的搭配，象徵財運的逐步提升。"
      },
      regularIncome: {
        high: "你的正財運勢非常穩定！建議使用綠色系的珠子，如薄荷綠玻璃珠、深棕木珠、淺棕木珠等，這些珠子能增強你的事業運與收入穩定性。在串珠設計中，可以嘗試方形或矩形的珠子，象徵穩固的基礎。",
        medium: "你的正財運勢正在成長。建議使用橙色系的珠子，如橘色玻璃珠、金棕玻璃珠、金棕水晶珠等，這些珠子能激發你的工作熱情，提升收入潛力。設計上可以加入一些向上的箭頭元素，代表事業的上升趨勢。",
        low: "你的正財運勢需要加強。建議使用紅色系的珠子，如紅色玻璃珠、紅色水晶珠、酒紅米珠等，這些珠子能增強你的行動力與決心，幫助你在工作中取得更好的成績。設計上建議使用螺旋形的串法，象徵收入的螺旋式增長。"
      },
      career: {
        high: "你的事業運勢達到巔峰！建議使用金色或銀色的珠子，如金色過渡珠、銀色過渡珠、金棕玻璃珠、金棕水晶珠等，這些珠子能增強你的領導力與專業形象。在串珠設計中，可以嘗試金字塔或階梯形的設計，象徵事業的步步高升。",
        medium: "你的事業運勢穩步發展。建議使用藍色系的珠子，如天空藍水晶珠、淺藍水晶珠、靛色水晶珠等，這些珠子能幫助你保持專業的溝通能力，促進職場合作。設計上可以加入一些網絡狀的圖案，代表人脈的擴展。",
        low: "你的事業運勢需要突破。建議使用黑色系的珠子，如黑色木珠、黑色米珠等，這些珠子能幫助你建立穩固的事業基礎，增強抗壓能力。設計上建議使用層次分明的結構，象徵事業的穩步建立。"
      },
      health: {
        high: "你的健康運勢非常良好！建議使用白色或透明的珠子，如白色珍珠、白色米珠、淺藍水晶珠等，這些珠子能維持你現有的健康狀態，增強身體的自我修復能力。在串珠設計中，可以嘗試圓形或橢圓形的珠子，象徵身體的完整與和諧。",
        medium: "你的健康運勢需要關注。建議使用綠色系的珠子，如薄荷綠玻璃珠、深棕木珠、淺棕木珠等，這些珠子能幫助你平衡身心，增強免疫力。設計上可以加入一些自然元素，如葉子或花朵的圖案，代表生命的活力。",
        low: "你的健康運勢需要改善。建議使用紅色系的珠子，如紅色玻璃珠、紅色水晶珠、酒紅米珠等，這些珠子能增強你的生命力與活力，幫助你恢復健康。設計上建議使用溫暖色調的搭配，象徵身體的溫暖與活力。"
      }
    };

    if (score >= 8) return adviceMap[category].high;
    if (score >= 6) return adviceMap[category].medium;
    return adviceMap[category].low;
  };

  // 根據評分獲取個性化建議標題
  const getAdviceTitle = (category, score) => {
    const titles = {
      love: {
        high: "💕 愛情運勢建議 - 保持優勢",
        medium: "💕 愛情運勢建議 - 穩步提升",
        low: "💕 愛情運勢建議 - 需要改善"
      },
      windfall: {
        high: "💰 偏財運勢建議 - 保持優勢",
        medium: "💰 偏財運勢建議 - 穩步提升",
        low: "💰 偏財運勢建議 - 需要改善"
      },
      regularIncome: {
        high: "💼 正財運勢建議 - 保持優勢",
        medium: "💼 正財運勢建議 - 穩步提升",
        low: "💼 正財運勢建議 - 需要改善"
      },
      career: {
        high: "🚀 事業運勢建議 - 保持優勢",
        medium: "🚀 事業運勢建議 - 穩步提升",
        low: "🚀 事業運勢建議 - 需要改善"
      },
      health: {
        high: "💚 健康運勢建議 - 保持優勢",
        medium: "💚 健康運勢建議 - 穩步提升",
        low: "💚 健康運勢建議 - 需要改善"
      }
    };

    if (score >= 8) return titles[category].high;
    if (score >= 6) return titles[category].medium;
    return titles[category].low;
  };

  // 獲取最高分的面向
  const getHighestScoreCategory = () => {
    const entries = Object.entries(scores);
    const highest = entries.reduce((max, current) => 
      current[1] > max[1] ? current : max
    );
    return highest[0];
  };

  const highestCategory = getHighestScoreCategory();

  // 根據運勢類別獲取對應的珠子建議（基於實際擁有的珠子）
  const getBeadSuggestions = (category) => {
    // 根據您的實際評分，調整建議策略
    const currentScore = scores[category];
    
    const beadSuggestions = {
      love: [
        { name: '粉色水晶珠', color: '#F0E68C', type: '水晶珠' },
        { name: '紅色水晶珠', color: '#FFB6C1', type: '水晶珠' },
        { name: '酒紅米珠', color: '#FF6347', type: '米珠' },
        { name: '粉色玻璃珠', color: '#87CEEB', type: '玻璃珠' },
        { name: '白色珍珠', color: '#FF69B4', type: '珍珠' },
        { name: '海藍寶', color: '#87CEEB', type: '天然礦石' },
        { name: '白月光', color: '#F0F8FF', type: '天然礦石' },
        { name: '銀耀石', color: '#C0C0C0', type: '天然礦石' }
      ],
      windfall: [
        { name: '橘色玻璃珠', color: '#FFE66D', type: '玻璃珠' },
        { name: '黃粉色玻璃珠', color: '#FFD700', type: '玻璃珠' },
        { name: '金色過渡珠', color: '#00CED1', type: '過渡珠' },
        { name: '金棕玻璃珠', color: '#FF6B6B', type: '玻璃珠' },
        { name: '金棕水晶珠', color: '#FFA07A', type: '水晶珠' },
        { name: '煙水晶', color: '#696969', type: '天然礦石' }
      ],
      regularIncome: [
        { name: '薄荷綠玻璃珠', color: '#4ECDC4', type: '玻璃珠' },
        { name: '深棕木珠', color: '#F0E68C', type: '木珠' },
        { name: '淺棕木珠', color: '#4682B4', type: '木珠' },
        { name: '橘色玻璃珠', color: '#FFE66D', type: '玻璃珠' },
        { name: '紅色玻璃珠', color: '#4ECDC4', type: '玻璃珠' }
      ],
      career: [
        { name: '金色過渡珠', color: '#00CED1', type: '過渡珠' },
        { name: '銀色過渡珠', color: '#FF4500', type: '過渡珠' },
        { name: '金棕玻璃珠', color: '#FF6B6B', type: '玻璃珠' },
        { name: '金棕水晶珠', color: '#FFA07A', type: '水晶珠' },
        { name: '天空藍水晶珠', color: '#98FB98', type: '水晶珠' },
        { name: '孔雀石', color: '#228B22', type: '天然礦石' },
        { name: '銀耀石', color: '#C0C0C0', type: '天然礦石' },
        { name: '煙水晶', color: '#696969', type: '天然礦石' }
      ],
      health: [
        { name: '白色珍珠', color: '#FF69B4', type: '珍珠' },
        { name: '白色米珠', color: '#9370DB', type: '米珠' },
        { name: '淺藍水晶珠', color: '#DDA0DD', type: '水晶珠' },
        { name: '薄荷綠玻璃珠', color: '#4ECDC4', type: '玻璃珠' },
        { name: '孔雀石', color: '#228B22', type: '天然礦石' },
        { name: '海藍寶', color: '#87CEEB', type: '天然礦石' },
        { name: '白月光', color: '#F0F8FF', type: '天然礦石' }
      ]
    };

    // 根據分數調整建議策略
    if (currentScore >= 8) {
      // 高分：建議保持和增強
      return beadSuggestions[category].slice(0, 3); // 只顯示前3個建議
    } else if (currentScore >= 6) {
      // 中等分：建議改善
      return beadSuggestions[category].slice(0, 4); // 顯示前4個建議
    } else {
      // 低分：建議大幅改善
      return beadSuggestions[category]; // 顯示所有建議
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      {/* 標題區域 */}
      <Fade in timeout={1000}>
        <Box className="text-center mb-12">
          <Typography 
            variant="h2" 
            className="text-white font-bold mb-4"
            sx={{ 
              background: 'linear-gradient(45deg, #FFD700, #FF6B6B)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ✨ 神秘串珠評分 ✨
          </Typography>
          <Typography variant="h6" className="text-gray-300">
            讓星象大師為您解讀串珠設計的奧秘
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={4} className="max-w-7xl mx-auto">
        {/* 左側：通靈師對話區 */}
        <Grid item xs={12} md={6}>
          <Slide direction="right" in timeout={800}>
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <Box className="flex items-center mb-6">
                  <Avatar 
                    src="/psychic-medium.jpeg" 
                    className="w-16 h-16 mr-4 border-4 border-purple-300/50"
                  />
                  <Box>
                    <Typography variant="h5" className="text-purple-200 font-bold">
                      BY: 星象大師: 小乖
                    </Typography>
                    <Typography variant="body2" className="text-purple-300">
                      ✨ 能量分析專家 ✨
                    </Typography>
                  </Box>
                </Box>

                                 {!isAnalyzing && !showResult && (
                   <Fade in timeout={500}>
                     <Box className="text-center">
                       <Psychology className="text-6xl text-purple-400 mb-4 animate-bounce-gentle" />
                       <Typography variant="h6" className="text-white mb-4">
                         歡迎來到神秘占卜殿堂
                       </Typography>
                       <Typography variant="body1" className="text-gray-300 mb-6">
                         讓我來解讀你的串珠設計...
                       </Typography>
                       
                       {/* 串珠設計預覽 */}
                       <Box className="mb-6 p-4 bg-white/5 rounded-lg border border-white/20">
                         <Typography variant="subtitle1" className="text-purple-200 mb-3">
                           🎨 當前串珠設計
                         </Typography>
                         <Box className="flex justify-center items-center space-x-2 mb-3">
                           {/* 模擬12顆珠子的顯示 */}
                           {Array.from({ length: 12 }, (_, i) => (
                             <div
                               key={i}
                               className={`w-4 h-4 rounded-full ${
                                 i % 2 === 0 
                                   ? 'bg-amber-200' // 淺米色木珠
                                   : 'bg-purple-300' // 淡紫色水晶珠
                               }`}
                               title={i % 2 === 0 ? '淺米色木珠' : '淡紫色水晶珠'}
                             />
                           ))}
                         </Box>
                         <Typography variant="caption" className="text-gray-300">
                           12顆珠子 • 圓形交替排列 • 木珠+水晶珠
                         </Typography>
                       </Box>
                       
                       <Button 
                         variant="contained" 
                         size="large"
                         onClick={startAnalysis}
                         className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                         startIcon={<AutoAwesome />}
                       >
                         開始神秘分析
                       </Button>
                     </Box>
                   </Fade>
                 )}

                                 {isAnalyzing && (
                   <Grow in timeout={300}>
                     <Box className="text-center">
                       <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
                       <Typography variant="h6" className="text-purple-200 mb-2">
                         正在分析你的串珠設計...
                       </Typography>
                       <Typography variant="body2" className="text-purple-300">
                         分析珠子類型、顏色、排列方式...
                       </Typography>
                       <Typography variant="body2" className="text-purple-300">
                         計算運勢能量分數...
                       </Typography>
                     </Box>
                   </Grow>
                 )}

                                 {showResult && (
                   <Fade in timeout={800}>
                     <Box>
                       <Typography variant="h6" className="text-purple-200 mb-4">
                         神秘解析結果
                       </Typography>
                       
                       {/* 設計分析結果 */}
                       {beadDesign && (
                         <Paper className="bg-blue-500/10 p-4 border border-blue-300/30 mb-4">
                           <Typography variant="subtitle1" className="text-blue-200 mb-2 font-semibold">
                             🔍 串珠設計分析
                           </Typography>
                           <Box className="grid grid-cols-2 gap-2 text-sm">
                             <Box>
                               <Typography variant="caption" className="text-blue-300">
                                 珠子類型：
                               </Typography>
                               <Typography variant="body2" className="text-white">
                                 {beadDesign.beads.map(bead => `${bead.type}(${bead.count}顆)`).join('、')}
                               </Typography>
                             </Box>
                             <Box>
                               <Typography variant="caption" className="text-blue-300">
                                 顏色搭配：
                               </Typography>
                               <Typography variant="body2" className="text-white">
                                 {beadDesign.beads.map(bead => bead.color).join('、')}
                               </Typography>
                             </Box>
                             <Box>
                               <Typography variant="caption" className="text-blue-300">
                                 排列模式：
                               </Typography>
                               <Typography variant="body2" className="text-white">
                                 {beadDesign.pattern}
                               </Typography>
                             </Box>
                             <Box>
                               <Typography variant="caption" className="text-blue-300">
                                 總珠子數：
                               </Typography>
                               <Typography variant="body2" className="text-white">
                                 {beadDesign.totalBeads}顆
                               </Typography>
                             </Box>
                           </Box>
                         </Paper>
                       )}

                       {/* 評分總結 */}
                       <Paper className="bg-green-500/10 p-4 border border-green-300/30 mb-4">
                         <Typography variant="subtitle1" className="text-green-200 mb-2 font-semibold">
                           📊 評分總結分析
                         </Typography>
                         <Box className="space-y-2">
                           <Box className="flex justify-between items-center">
                             <Typography variant="body2" className="text-green-100">
                               🏆 最強運勢：
                             </Typography>
                             <Typography variant="body2" className="text-white font-semibold">
                               {highestCategory === 'love' ? '愛情運勢' : 
                                highestCategory === 'windfall' ? '偏財運勢' :
                                highestCategory === 'regularIncome' ? '正財運勢' :
                                highestCategory === 'career' ? '事業運勢' : '健康運勢'} ({scores[highestCategory]}分)
                             </Typography>
                           </Box>
                           <Box className="flex justify-between items-center">
                             <Typography variant="body2" className="text-green-100">
                               💪 優勢領域：
                             </Typography>
                             <Typography variant="body2" className="text-white">
                               {Object.entries(scores)
                                 .filter(([_, score]) => score >= 6)
                                 .map(([category, score]) => 
                                   category === 'love' ? '愛情運勢' : 
                                   category === 'windfall' ? '偏財運勢' :
                                   category === 'regularIncome' ? '正財運勢' :
                                   category === 'career' ? '事業運勢' : '健康運勢'
                                 ).join('、')}
                             </Typography>
                           </Box>
                           <Box className="flex justify-between items-center">
                             <Typography variant="body2" className="text-green-100">
                               🔧 需要改善：
                             </Typography>
                             <Typography variant="body2" className="text-white">
                               {Object.entries(scores)
                                 .filter(([_, score]) => score < 6)
                                 .map(([category, score]) => 
                                   category === 'love' ? '愛情運勢' : 
                                   category === 'windfall' ? '偏財運勢' :
                                   category === 'regularIncome' ? '正財運勢' :
                                   category === 'career' ? '事業運勢' : '健康運勢'
                                 ).join('、')}
                             </Typography>
                           </Box>
                         </Box>
                       </Paper>
                      
                                             {/* 最高分面向的特別建議 */}
                       <Paper className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 border border-yellow-300/50 mb-4">
                         <Typography variant="h6" className="text-yellow-200 mb-2 font-bold">
                           🏆 最強運勢：{highestCategory === 'love' ? '愛情運勢' : 
                                        highestCategory === 'windfall' ? '偏財運勢' :
                                        highestCategory === 'regularIncome' ? '正財運勢' :
                                        highestCategory === 'career' ? '事業運勢' : '健康運勢'}
                         </Typography>
                         <Typography variant="body1" className="text-yellow-100 leading-relaxed">
                           {getConclusionAdvice(highestCategory, scores[highestCategory])}
                         </Typography>
                         
                         {/* 最高分面向的珠子選擇器 */}
                         <Box className="mt-3 p-2 bg-yellow-500/10 rounded border border-yellow-300/30">
                           <Typography variant="caption" className="text-yellow-200 mb-2 block font-semibold">
                             ⭐ 推薦珠子（您可選擇擁有的）：
                           </Typography>
                           <Box className="flex flex-wrap gap-1">
                             {getBeadSuggestions(highestCategory).map((bead, index) => (
                               <Chip
                                 key={index}
                                 label={bead.name}
                                 size="small"
                                 className="text-xs"
                                 sx={{
                                   backgroundColor: bead.color + '20',
                                   color: 'white',
                                   border: `1px solid ${bead.color}40`,
                                   '&:hover': {
                                     backgroundColor: bead.color + '30',
                                   }
                                 }}
                               />
                             ))}
                           </Box>
                         </Box>
                       </Paper>

                                                                     {/* 各面向詳細建議 */}
                        <Box className="space-y-3">
                          {Object.entries(scores).map(([category, score]) => (
                            <Paper key={category} className="bg-white/5 p-3 border border-white/20">
                              <Typography variant="subtitle1" className="text-purple-200 mb-2 font-semibold">
                                {getAdviceTitle(category, score)}
                              </Typography>
                             <Typography variant="body2" className="text-gray-200 leading-relaxed">
                               {getConclusionAdvice(category, score)}
                             </Typography>
                             
                             {/* 珠子選擇器 */}
                             <Box className="mt-3 p-2 bg-white/5 rounded border border-white/10">
                               <Typography variant="caption" className="text-purple-300 mb-2 block">
                                 🎯 選擇您擁有的珠子：
                               </Typography>
                               <Box className="flex flex-wrap gap-1">
                                 {getBeadSuggestions(category).map((bead, index) => (
                                   <Chip
                                     key={index}
                                     label={bead.name}
                                     size="small"
                                     className="text-xs"
                                     sx={{
                                       backgroundColor: bead.color + '20',
                                       color: 'white',
                                       border: `1px solid ${bead.color}40`,
                                       '&:hover': {
                                         backgroundColor: bead.color + '30',
                                       }
                                     }}
                                   />
                                 ))}
                               </Box>
                             </Box>
                           </Paper>
                         ))}
                       </Box>
                    </Box>
                  </Fade>
                )}
              </CardContent>
            </Card>
          </Slide>
        </Grid>

        {/* 右側：評分雷達圖 */}
        <Grid item xs={12} md={6}>
          <Slide direction="left" in timeout={800}>
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <Typography variant="h5" className="text-center text-white mb-6">
                  🎯 能量評分雷達圖
                </Typography>
                
                <Box className="space-y-4">
                  {Object.entries(scores).map(([key, value]) => (
                    <Grow in timeout={200 * Object.keys(scores).indexOf(key)}>
                      <Paper key={key} className="bg-white/5 p-4 border border-white/20">
                        <Box className="flex items-center justify-between">
                          <Box className="flex items-center">
                            {key === 'love' && <Favorite className="text-red-400 mr-2" />}
                            {key === 'windfall' && <TrendingUp className="text-green-400 mr-2" />}
                            {key === 'regularIncome' && <TrendingUp className="text-blue-400 mr-2" />}
                            {key === 'career' && <AutoAwesome className="text-yellow-400 mr-2" />}
                            {key === 'health' && <HealthAndSafety className="text-emerald-400 mr-2" />}
                            
                            <Typography variant="body1" className="text-white capitalize">
                              {key === 'love' ? '愛情運勢' : 
                               key === 'windfall' ? '偏財運勢' :
                               key === 'regularIncome' ? '正財運勢' :
                               key === 'career' ? '事業運勢' : '健康運勢'}
                            </Typography>
                          </Box>
                          
                          <Box className="flex items-center">
                            {getScoreIcon(value)}
                            <Chip 
                              label={value} 
                              color={getScoreColor(value)}
                              className="ml-2"
                              size="small"
                            />
                          </Box>
                        </Box>
                        
                        {/* 進度條 */}
                        <Box className="mt-2">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-1000 ${
                                value >= 8 ? 'bg-green-500' : 
                                value >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${value * 10}%` }}
                            ></div>
                          </div>
                        </Box>
                      </Paper>
                    </Grow>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Slide>
        </Grid>
      </Grid>
    </div>
  );
};

export default ModernBeadRating;
