import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import './ShareResultImage.css';
import MyDesigns from './MyDesigns';

const ShareResultImage = ({ design, scores, advice, onClose }) => {
  const resultRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState('transparent'); // 預設透明背景
  const [showMyDesigns, setShowMyDesigns] = useState(false);

  // 組件掛載時自動生成分享圖
  useEffect(() => {
    if (design) {
      generateShareImage();
    }
  }, [design]);

  // 背景選擇變更時重新生成分享圖
  useEffect(() => {
    if (design && selectedBackground) {
      generateShareImage();
    }
  }, [selectedBackground]);

  // 生成分享結果圖 - 簡化版本
  const generateShareImage = async () => {
    setIsGenerating(true);
    
    // 添加調試信息
    console.log('開始生成分享圖...');
    console.log('設計數據:', design);
    
    // 設置總超時，避免無限等待
    const timeoutId = setTimeout(() => {
      console.warn('分享圖生成超時，使用備用方案');
      setIsGenerating(false);
      // 創建一個簡單的備用圖片
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      
      // 繪製簡單的背景
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, 400, 400);
      
      // 繪製標題
      ctx.fillStyle = '#fbbf24';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('串珠設計分享', 200, 50);
      
      // 繪製簡單的圓形
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(200, 200, 100, 0, 2 * Math.PI);
      ctx.stroke();
      
      const imageDataUrl = canvas.toDataURL('image/png', 1.0);
      setGeneratedImage(imageDataUrl);
    }, 5000); // 5秒超時
    
    try {
      // 創建一個臨時的 DOM 元素來包含實際的串珠設計內容
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = '800px';
      tempContainer.style.height = '1500px';
      tempContainer.style.backgroundColor = '#1a1a2e';
      tempContainer.style.padding = '40px 40px 10px 40px';
              tempContainer.style.fontFamily = 'Arial, sans-serif';
      tempContainer.style.color = 'white';
      tempContainer.style.overflow = 'hidden';
      
      // 創建設計信息區域 - 只顯示設計名稱和日期
      const designInfoSection = document.createElement('div');
      designInfoSection.style.marginBottom = '40px';
      designInfoSection.style.textAlign = 'center';
      designInfoSection.style.padding = '20px';
      designInfoSection.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      designInfoSection.style.borderRadius = '15px';
      designInfoSection.style.border = '1px solid rgba(255, 255, 255, 0.1)';
      
      // 設計名稱
      const designName = document.createElement('h2');
      designName.textContent = design?.designName || '串珠設計';
      designName.style.fontSize = '28px';
      designName.style.marginBottom = '10px';
      designName.style.marginTop = '0';
      designName.style.color = '#fbbf24';
      designName.style.fontWeight = 'bold';
      designInfoSection.appendChild(designName);
      
      // 設計日期
      const designDate = document.createElement('p');
      const date = design?.timestamp ? new Date(design.timestamp) : new Date();
      designDate.textContent = `設計日期: ${date.toLocaleDateString('zh-TW')}`;
      designDate.style.fontSize = '16px';
      designDate.style.margin = '0';
      designDate.style.color = 'rgba(255, 255, 255, 0.8)';
      designInfoSection.appendChild(designDate);
      
      tempContainer.appendChild(designInfoSection);
      
      // 創建手串預覽區域
      const braceletSection = document.createElement('div');
      braceletSection.style.marginBottom = '40px';
      braceletSection.style.textAlign = 'center';
      
      // 創建圓形手串預覽 - 使用與串珠評分區完全相同的邏輯
      if (design?.beads) {
        const braceletContainer = document.createElement('div');
        braceletContainer.style.position = 'relative';
        braceletContainer.style.width = '320px';
        braceletContainer.style.height = '320px';
        braceletContainer.style.margin = '0 auto';
        braceletContainer.style.border = '3px solid #8B4513';
        braceletContainer.style.borderRadius = '50%';
        braceletContainer.style.overflow = 'hidden';
        
        // 根據選擇的背景類型設置背景
        if (selectedBackground === 'wooden') {
          // 木製托盤背景
          braceletContainer.style.backgroundImage = 'url(/wooden-tray.png)';
          braceletContainer.style.backgroundSize = '140%'; // 從 cover 改為 120%，讓托盤更大
          braceletContainer.style.backgroundPosition = 'center';
          braceletContainer.style.backgroundColor = 'rgba(139, 69, 19, 0.1)';
        } else if (selectedBackground === 'aura') {
          // 靈氣背景 - 使用黑色絨布圖片
          braceletContainer.style.backgroundImage = 'url(/blackpaper.jpeg)';
          braceletContainer.style.backgroundSize = '150%'; // 放大黑色絨布圖片
          braceletContainer.style.backgroundPosition = 'center';
          braceletContainer.style.backgroundColor = '#0a0a0a';
        } else {
          // 透明背景（預設）
          braceletContainer.style.backgroundColor = 'rgba(139, 69, 19, 0.1)';
        }
        
        // 創建 Canvas 來渲染珠子 - 與串珠評分區完全一致
        const canvas = document.createElement('canvas');
        canvas.width = 320;
        canvas.height = 320;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '2';
        
        const ctx = canvas.getContext('2d');
        
        // 根據手鍊長度設定半徑 - 分享圖等比例內縮
        let radius;
        if (design.stringLength === 'half') {
          radius = 80; // 進一步縮小到80
        } else if (design.stringLength === 'four-thirds') {
          radius = 110; // 稍微增加4/3圓線半徑
        } else {
          radius = 100; // 進一步縮小到100
        }
        
        const centerX = 160;
        const centerY = 160;
        
        // 繪製串珠線 - 與串珠評分區邏輯一致
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = design.braceletStyle?.strokeColor || '#FFFFFF';
        ctx.lineWidth = design.stringWidth === '細線' ? 2 : design.stringWidth === '中等' ? 4 : 6;
        ctx.stroke();
        
        // 渲染珠子 - 使用與串珠評分區完全相同的邏輯和珠子大小
        const beadPromises = design.beads.map((bead, index) => {
          return new Promise((resolve) => {
            const angle = (2 * Math.PI / design.beads.length) * index - Math.PI / 2;
            const beadX = centerX + radius * Math.cos(angle);
            const beadY = centerY + radius * Math.sin(angle);
            
            // 根據手鍊長度調整珠子大小 - 與串珠評分區邏輯一致
            let baseSize;
            if (design.stringLength === 'half') {
              baseSize = 1.1; // 半圓：珠子最大
            } else if (design.stringLength === 'four-thirds') {
              baseSize = 1.0; // 4/3圓：珠子中等
            } else { // full
              baseSize = 0.7; // 全圓：珠子更小
            }
            
            // 調整分享圖中珠子的大小，小型珠子要更小
            const beadSize = bead.type === '過渡珠' ? Math.round(10 * baseSize) :
                            (bead.type === '米珠' || bead.type === '珍珠') ? Math.round(15 * baseSize) :
                            Math.round(40 * baseSize);
            
            // 創建珠子圖片元素並繪製到 Canvas
            const image = new Image();
            // 修復圖片路徑，確保正確載入
            const imagePath = bead.image.startsWith('/') ? bead.image : `/${bead.image}`;
            
            // 設置超時機制，避免無限等待
            const timeout = setTimeout(() => {
              console.warn(`珠子圖片載入超時: ${imagePath}`);
              // 繪製一個替代的圓形珠子
              ctx.save();
              ctx.fillStyle = bead.type === '過渡珠' ? '#C0C0C0' : 
                            (bead.type === '米珠' || bead.type === '珍珠') ? '#FFD700' : '#8B4513';
              ctx.beginPath();
              ctx.arc(beadX, beadY, beadSize, 0, 2 * Math.PI);
              ctx.fill();
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
              ctx.lineWidth = 2;
              ctx.stroke();
              ctx.restore();
              resolve();
            }, 3000); // 3秒超時
            
            image.onload = () => {
              clearTimeout(timeout);
              // 繪製珠子圖片
              ctx.save();
              
              // 添加珠子的光澤效果
              ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
              ctx.shadowBlur = 5;
              ctx.shadowOffsetX = 2;
              ctx.shadowOffsetY = 2;
              
              // 繪製珠子圖片
              ctx.drawImage(
                image, 
                beadX - beadSize, 
                beadY - beadSize, 
                beadSize * 2, 
                beadSize * 2
              );
              
              ctx.restore();
              resolve(); // 標記這個珠子已繪製完成
            };
            
            image.onerror = () => {
              clearTimeout(timeout);
              console.warn(`珠子圖片載入失敗: ${imagePath}`);
              // 繪製一個替代的圓形珠子
              ctx.save();
              ctx.fillStyle = bead.type === '過渡珠' ? '#C0C0C0' : 
                            (bead.type === '米珠' || bead.type === '珍珠') ? '#FFD700' : '#8B4513';
              ctx.beginPath();
              ctx.arc(beadX, beadY, beadSize, 0, 2 * Math.PI);
              ctx.fill();
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
              ctx.lineWidth = 2;
              ctx.stroke();
              ctx.restore();
              resolve(); // 即使失敗也要 resolve，避免阻塞
            };
            
            // 設置跨域屬性
            image.crossOrigin = 'anonymous';
            image.src = imagePath;
          });
        });
        
        // 等待所有珠子繪製完成，設置總超時
        await Promise.race([
          Promise.all(beadPromises),
          new Promise((resolve) => setTimeout(resolve, 10000)) // 10秒總超時
        ]);
        
        // 添加調試信息
        console.log(`已繪製 ${design.beads.length} 顆珠子到 Canvas`);
        console.log('Canvas 尺寸:', canvas.width, 'x', canvas.height);
        
        braceletContainer.appendChild(canvas);
        braceletSection.appendChild(braceletContainer);
        
        // 移除設計名稱和時間信息
      }
      
      tempContainer.appendChild(braceletSection);
      
              // 創建雷達圖和文字區域的整體布局
        if (scores) {
          const mainSection = document.createElement('div');
          mainSection.style.display = 'flex';
          mainSection.style.gap = '20px';
          mainSection.style.marginBottom = '40px';
          mainSection.style.alignItems = 'flex-start';
        
        // 左側雷達圖區域
        const radarSection = document.createElement('div');
        radarSection.style.flex = '1';
        radarSection.style.textAlign = 'left';
        
        // 雷達圖標題
        const radarTitle = document.createElement('h3');
        radarTitle.textContent = '🌟 能量評分圖';
        radarTitle.style.fontSize = '24px';
        radarTitle.style.marginBottom = '5px';
        radarTitle.style.marginTop = '0';
        radarTitle.style.marginLeft = '70px';
        radarTitle.style.color = '#fbbf24';
        radarTitle.style.textAlign = 'left';
        radarSection.appendChild(radarTitle);
        
        // 創建 SVG 雷達圖 - 五邊形版本
        const radarSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        radarSvg.setAttribute('width', '420');
        radarSvg.setAttribute('height', '420');
        radarSvg.setAttribute('viewBox', '0 0 600 600');
        radarSvg.style.margin = '0';
        radarSvg.style.display = 'block';
        radarSvg.style.marginTop = '0';
        radarSvg.style.marginLeft = '-20';
        radarSvg.style.marginRight = 'auto';
        
        const centerX = 300;
        const centerY = 300;
        const R = 150; // 五邊形半徑
        const N = 5; // 五邊形
        
        // 計算五邊形頂點
        const getPentagonPoints = (radius) => {
          const points = [];
          for (let i = 0; i < N; i++) {
            const ang = -90 + i * (360 / N);
            const x = centerX + radius * Math.cos(ang * Math.PI / 180);
            const y = centerY + radius * Math.sin(ang * Math.PI / 180);
            points.push([x, y]);
          }
          return points;
        };
        
        // 繪製背景網格 - 四個同心五邊形
        [0.8, 0.6, 0.4, 0.2].forEach(scale => {
          const gridPoints = getPentagonPoints(R * scale);
          const grid = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          grid.setAttribute('points', gridPoints.map(p => p.join(',')).join(' '));
          grid.setAttribute('fill', 'none');
          grid.setAttribute('stroke', 'rgba(255,255,255,0.3)');
          grid.setAttribute('stroke-width', '1');
          radarSvg.appendChild(grid);
        });
        
        // 繪製軸線 - 五條輻射線
        const framePoints = getPentagonPoints(R);
        framePoints.forEach(([x, y]) => {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', centerX);
          line.setAttribute('y1', centerY);
          line.setAttribute('x2', x);
          line.setAttribute('y2', y);
          line.setAttribute('stroke', 'rgba(255,255,255,0.25)');
          line.setAttribute('stroke-width', '2');
          radarSvg.appendChild(line);
        });
        
        // 先繪製外框，確保紫色區域在上面
        const frame = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        frame.setAttribute('points', framePoints.map(p => p.join(',')).join(' '));
        frame.setAttribute('fill', 'none');
        frame.setAttribute('stroke', '#FFFFFF');
        frame.setAttribute('stroke-width', '3');
        radarSvg.appendChild(frame);
        
        // 計算評分點位置 - 五邊形版本
        const getScorePoints = () => {
          // 確保 scores 有默認值，避免 undefined
          const safeScores = {
            love: scores.love || 3,
            windfall: scores.windfall || 3,
            social: scores.social || 3,
            career: scores.career || 3,
            health: scores.health || 3
          };
          
          const values = [
            safeScores.love / 10,
            safeScores.windfall / 10,
            safeScores.social / 10,
            safeScores.career / 10,
            safeScores.health / 10
          ];
          
          console.log('分享圖評分數據:', safeScores, 'values:', values);
          
          const points = [];
          for (let i = 0; i < N; i++) {
            const ang = -90 + i * (360 / N);
            const value = isNaN(values[i]) ? 0.3 : (values[i] || 0.3); // 默認 0.3 (3分)
            const r = Math.max(0, Math.min(1, value)) * R;
            const x = centerX + r * Math.cos(ang * Math.PI / 180);
            const y = centerY + r * Math.sin(ang * Math.PI / 180);
            points.push([x, y]);
          }
          return points;
        };
        
        const scorePoints = getScorePoints();
        const pointsString = scorePoints.map(point => `${point[0]},${point[1]}`).join(' ');
        
        console.log('分享圖評分點:', scorePoints);
        console.log('分享圖點位字符串:', pointsString);
        
        // 繪製評分填充區域
        const fillArea = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        fillArea.setAttribute('points', pointsString);
        fillArea.setAttribute('fill', 'rgba(138, 43, 226, 0.6)');
        fillArea.setAttribute('stroke', 'rgba(138, 43, 226, 0.8)');
        fillArea.setAttribute('stroke-width', '2');
        radarSvg.appendChild(fillArea);
        
        console.log('分享圖紫色區域已添加，點位:', pointsString);
        
        // 繪製評分點 - 白色圓點
        scorePoints.forEach(point => {
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('cx', point[0]);
          circle.setAttribute('cy', point[1]);
          circle.setAttribute('r', '4');
          circle.setAttribute('fill', '#FFFFFF');
          circle.setAttribute('stroke', 'rgba(138, 43, 226, 0.8)');
          circle.setAttribute('stroke-width', '2');
          radarSvg.appendChild(circle);
        });
        
        
        // 添加軸線標籤 - 五邊形版本
        const safeScores = {
          love: scores.love || 3,
          windfall: scores.windfall || 3,
          social: scores.social || 3,
          career: scores.career || 3,
          health: scores.health || 3
        };
        
        const labels = [
          { x: centerX, y: 120, text: `愛情 (${safeScores.love})`, anchor: 'middle' }, // 上方：愛情
          { x: 450, y: 225, text: `偏財 (${safeScores.windfall})`, anchor: 'start' }, // 右上：偏財
          { x: 350, y: 480, text: `人際 (${safeScores.social})`, anchor: 'start' }, // 右下：人際
          { x: 250, y: 480, text: `事業 (${safeScores.career})`, anchor: 'end' }, // 左下：事業
          { x: 165, y: 225, text: `健康 (${safeScores.health})`, anchor: 'end' } // 左上：健康
        ];
        
        labels.forEach(label => {
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', label.x);
          text.setAttribute('y', label.y);
          text.setAttribute('text-anchor', label.anchor);
          text.setAttribute('fill', '#ffd700');
          text.setAttribute('font-size', '27px');
          text.setAttribute('font-weight', 'bold');
          text.textContent = label.text;
          radarSvg.appendChild(text);
        });
        
        radarSection.appendChild(radarSvg);
        mainSection.appendChild(radarSection);
        
        // 右側文字區域
        const textSection = document.createElement('div');
        textSection.style.flex = '1';
        textSection.style.display = 'flex';
        textSection.style.flexDirection = 'column';
        textSection.style.justifyContent = 'flex-start';
        
        // 創建灰字文字框
        const commentContent = document.createElement('div');
        commentContent.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        commentContent.style.padding = '20px';
        commentContent.style.borderRadius = '15px';
        commentContent.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        commentContent.style.minHeight = '500px';
        commentContent.style.maxHeight = '600px';
        commentContent.style.overflowY = 'auto';
        commentContent.style.margin = '0 0 20px 0';
        commentContent.style.wordWrap = 'break-word';
        commentContent.style.overflowWrap = 'break-word';
        
        // 生成通靈師建議，直接使用 BeadRating.jsx 的完整建議並進行篩選
        const generateShortComment = () => {
          if (!design?.beads || !scores) {
            return '通靈師建議：請先完成串珠設計並進行評分分析。';
          }

          // 直接使用 BeadRating.jsx 中的完整建議生成邏輯
          const fullAdvice = generatePersonalizedAdvice(design, scores);
          
          // 從完整建議中篩選出最精華的部分作為短評
          return extractShortAdvice(fullAdvice, scores);
        };

        // 從完整建議中提取精華短評
        const extractShortAdvice = (fullAdvice, scores) => {
          let shortAdvice = '';
          
          // 找出評分最高的面向
          const sortedScores = Object.entries(scores)
            .sort(([,a], [,b]) => b - a)
            .filter(([, score]) => score > 5);
          
          if (sortedScores.length === 0) {
            return '你的串珠設計展現了獨特的藝術天賦和內在智慧，每個珠子的選擇都蘊含著深層的意義。';
          }

          // 提取顏色相關建議（從完整建議中找顏色描述）
          const colorAdvice = extractColorAdvice(fullAdvice);
          if (colorAdvice) {
            shortAdvice += colorAdvice;
          }

          // 提取最高分面向的預測建議
          const topCategory = sortedScores[0][0];
          const topScore = sortedScores[0][1];
          const predictionAdvice = extractPredictionAdvice(fullAdvice, topCategory, topScore);
          if (predictionAdvice) {
            shortAdvice += ' ' + predictionAdvice;
          }
          
          return shortAdvice;
        };

        // 從完整建議中提取顏色相關建議
        const extractColorAdvice = (fullAdvice) => {
          // 尋找顏色相關的描述
          const colorPatterns = [
            /粉色的溫暖色調代表著你內心的柔軟與愛心[^。]*。/,
            /紫色的神秘色調象徵著你內在的智慧與靈性[^。]*。/,
            /黃色的明亮色調代表著你內在的樂觀與智慧[^。]*。/,
            /綠色的自然色調代表著你內在的成長與生命力[^。]*。/,
            /藍色的寧靜色調代表著你內在的智慧與溝通能力[^。]*。/,
            /紅色的熱情色調代表著你內在的活力與勇氣[^。]*。/,
            /橘色的溫暖色調代表著你內在的創造力與熱情[^。]*。/,
            /棕色的穩重色調代表著你內在的踏實與可靠[^。]*。/,
            /白色的純淨色調代表著你內在的純潔與智慧[^。]*。/,
            /黑色的神秘色調代表著你內在的深度與力量[^。]*。/,
            /銀色的優雅色調代表著你內在的智慧與直覺[^。]*。/,
            /金色的富貴色調代表著你內在的價值與財富[^。]*。/,
            /你巧妙地運用了粉色與紫色的搭配[^。]*。/,
            /黃色與綠色的組合充滿活力[^。]*。/,
            /紅色與藍色的搭配極具張力[^。]*。/,
            /橘色與藍色的搭配充滿創意[^。]*。/
          ];

          for (const pattern of colorPatterns) {
            const match = fullAdvice.match(pattern);
            if (match) {
              return match[0];
            }
          }
          
          return null;
        };

        // 從完整建議中提取預測建議
        const extractPredictionAdvice = (fullAdvice, category, score) => {
          const categoryNames = {
            love: '愛情運勢',
            windfall: '偏財運勢',
            regularIncome: '正財運勢', 
            career: '事業運勢',
            health: '健康運勢'
          };

          const categoryName = categoryNames[category];
          
          // 尋找該面向的預測建議
          const predictionPatterns = [
            new RegExp(`你的${categoryName}非常旺盛[^。]*。`),
            new RegExp(`你的${categoryName}正在上升期[^。]*。`),
            new RegExp(`${categoryName}極佳[^。]*。`),
            new RegExp(`${categoryName}不錯[^。]*。`),
            new RegExp(`${categoryName}非常穩定[^。]*。`),
            new RegExp(`${categoryName}穩定[^。]*。`),
            new RegExp(`${categoryName}良好[^。]*。`)
          ];

          for (const pattern of predictionPatterns) {
            const match = fullAdvice.match(pattern);
            if (match) {
              return match[0];
            }
          }
          
          return null;
        };

        // 複製 BeadRating.jsx 中的完整建議生成邏輯
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
              advice += '為你帶來旺盛的人際運勢！你將在社交圈中大放異彩，新的朋友和合作機會將接踵而至。';
            } else if (scores.social >= 6) {
              advice += '提升你的人際運勢，你的溝通能力和魅力正在提升，建議多參與社交活動。';
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
          
          return advice;
        };
        
        const commentText = document.createElement('p');
        commentText.textContent = generateShortComment();
        commentText.style.fontSize = '25px';
        commentText.style.lineHeight = '1.5';
        commentText.style.color = 'rgba(255, 255, 255, 0.9)';
        commentText.style.margin = '0';
        commentText.style.textAlign = 'justify';
        commentContent.appendChild(commentText);
        
        textSection.appendChild(commentContent);
        mainSection.appendChild(textSection);
        
        tempContainer.appendChild(mainSection);
      }
      
      // 將臨時容器添加到頁面
      document.body.appendChild(tempContainer);
      
      // 使用 html2canvas 截取圖片
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: '#1a1a2e',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: 800,
        height: 1100
      });
      
      const imageDataUrl = canvas.toDataURL('image/png', 1.0);
      setGeneratedImage(imageDataUrl);
      
      // 清理臨時容器
      document.body.removeChild(tempContainer);
      
      // 清除超時
      clearTimeout(timeoutId);
      
    } catch (error) {
      console.error('生成分享圖片失敗:', error);
      clearTimeout(timeoutId);
      
      // 使用備用方案
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      
      // 繪製簡單的背景
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, 400, 400);
      
      // 繪製標題
      ctx.fillStyle = '#fbbf24';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('串珠設計分享', 200, 50);
      
      // 繪製簡單的圓形
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(200, 200, 100, 0, 2 * Math.PI);
      ctx.stroke();
      
      const imageDataUrl = canvas.toDataURL('image/png', 1.0);
      setGeneratedImage(imageDataUrl);
    } finally {
      setIsGenerating(false);
    }
  };

  // 下載圖片
  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.download = `串珠設計_${design?.designName || '設計'}_${new Date().toISOString().split('T')[0]}.png`;
    link.href = generatedImage;
    link.click();
  };

  // 保存到我的設計專區
  const saveToMyDesigns = () => {
    if (!design) return;
    
    try {
      const designId = `beadDesign_${Date.now()}`;
      const designToSave = {
        ...design,
        id: designId,
        timestamp: Date.now(),
        savedAt: new Date().toLocaleString('zh-TW')
      };
      
      localStorage.setItem(designId, JSON.stringify(designToSave));
      
      // 顯示成功提示
      alert('設計已保存到我的設計專區！');
    } catch (error) {
      console.error('保存設計時發生錯誤:', error);
      alert('保存失敗，請稍後再試。');
    }
  };

  // 分享到社群媒體
  const shareToSocial = async () => {
    if (!generatedImage) return;
    
    try {
      // 嘗試使用 Web Share API（如果支援且環境安全）
      if (navigator.share && window.isSecureContext) {
        try {
          const blob = await fetch(generatedImage).then(r => r.blob());
          const file = new File([blob], `串珠設計_${design?.designName || '設計'}.png`, { type: 'image/png' });
          
          await navigator.share({
            title: `看看我設計的串珠手鍊「${design?.designName || '串珠設計'}」！💎✨`,
            text: '這是我精心設計的串珠作品，包含能量評分和神秘占卜結果！',
            files: [file]
          });
          return; // 成功分享，直接返回
        } catch (shareError) {
          console.log('Web Share API 失敗，嘗試其他方法:', shareError);
        }
      }
      
      // 備用方案 1：嘗試複製圖片到剪貼簿
      try {
        if (navigator.clipboard && navigator.clipboard.write) {
          const blob = await fetch(generatedImage).then(r => r.blob());
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ]);
          alert('✅ 圖片已複製到剪貼簿！您可以貼上到任何支援圖片的應用程式。');
          return;
        }
      } catch (clipboardError) {
        console.log('剪貼簿 API 失敗，嘗試其他方法:', clipboardError);
      }
      
      // 備用方案 2：提供下載連結和手動分享說明
      const downloadLink = document.createElement('a');
      downloadLink.href = generatedImage;
      downloadLink.download = `串珠設計_${design?.designName || '設計'}.png`;
      downloadLink.click();
      
      alert('📱 圖片已下載！\n\n💡 分享建議：\n1. 將圖片儲存到手機相簿\n2. 在社群媒體 App 中選擇「從相簿分享」\n3. 選擇剛下載的圖片進行分享');
      
    } catch (error) {
      console.error('分享失敗:', error);
      
      // 最後的備用方案：強制下載
      try {
        const downloadLink = document.createElement('a');
        downloadLink.href = generatedImage;
        downloadLink.download = `串珠設計_${design?.designName || '設計'}.png`;
        downloadLink.click();
        alert('⚠️ 分享功能暫時無法使用，但圖片已下載到您的裝置。請手動分享圖片。');
      } catch (downloadError) {
        console.error('下載也失敗:', downloadError);
        alert('❌ 分享和下載都失敗，請稍後再試或截圖分享。');
      }
    }
  };

  // 複製連結
  const copyLink = async () => {
    try {
      const designData = {
        name: design?.designName || '串珠設計',
        beads: design?.beads || [],
        scores: scores,
        timestamp: new Date().toISOString()
      };
      
      const shareUrl = `${window.location.origin}${window.location.pathname}?design=${encodeURIComponent(JSON.stringify(designData))}`;
      
      // 嘗試使用現代剪貼簿 API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        alert('✅ 連結已複製到剪貼簿！');
      } else {
        // 備用方案：使用傳統方法
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          alert('✅ 連結已複製到剪貼簿！');
        } catch (execError) {
          console.error('execCommand 複製失敗:', execError);
          // 最後備用方案：顯示連結讓用戶手動複製
          alert(`📋 無法自動複製，請手動複製以下連結：\n\n${shareUrl}`);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (error) {
      console.error('複製失敗:', error);
      
      // 顯示連結讓用戶手動複製
      const shareUrl = `${window.location.origin}${window.location.pathname}?design=${encodeURIComponent(JSON.stringify({
        name: design?.designName || '串珠設計',
        beads: design?.beads || [],
        scores: scores,
        timestamp: new Date().toISOString()
      }))}`;
      
      alert(`📋 複製失敗，請手動複製以下連結：\n\n${shareUrl}`);
    }
  };

  return (
    <div className="share-result-overlay">
      <div className="share-result-modal">
        <div className="modal-header">
          <h2>🎨 分享結果圖</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-content">
          {/* 生成中狀態 */}
          {isGenerating && (
            <div className="generating-section">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                <img 
                  src="/psychic-medium.jpeg" 
                  alt="通靈師" 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%',
                    animation: 'spin 2s linear infinite'
                  }}
                />
                <h3 style={{ color: 'white', margin: 0 }}>Loading...</h3>
              </div>
            </div>
          )}
          
          {/* 操作按鈕 - 始終顯示 */}
          <div className="action-section">
            <div className="action-buttons">
              <button 
                className="action-btn download-btn"
                onClick={downloadImage}
                disabled={!generatedImage}
              >
                💾 下載圖片
              </button>
              
              <button 
                className="action-btn save-btn"
                onClick={saveToMyDesigns}
                disabled={!design}
              >
                💾 保存設計
              </button>
              
              <button 
                className="action-btn my-designs-btn"
                onClick={() => setShowMyDesigns(true)}
              >
                🎨 我的設計專區
              </button>
            </div>
          </div>

          {/* 生成完成後顯示完整的分享圖 */}
          {!isGenerating && generatedImage && (
            <>
              {/* 生成的圖片預覽 */}
              <div className="preview-section">
                <h3>📸 生成的分享圖</h3>
                <div className="image-preview">
                  <img 
                    src={generatedImage} 
                    alt="生成的分享圖" 
                    style={{ 
                      maxWidth: '100%', 
                      height: 'auto',
                      border: '2px solid #8a2be2',
                      borderRadius: '10px'
                    }}
                  />
                </div>
              </div>
              
              {/* 背景選擇按鈕 */}
              <div className="background-selection">
                <h4>🎨 選擇背景</h4>
                <div className="background-buttons">
                  <button 
                    className={`background-btn ${selectedBackground === 'transparent' ? 'active' : ''}`}
                    onClick={() => setSelectedBackground('transparent')}
                  >
                    <div className="background-preview transparent"></div>
                    <span>一般背景</span>
                  </button>
                  
                  <button 
                    className={`background-btn ${selectedBackground === 'wooden' ? 'active' : ''}`}
                    onClick={() => setSelectedBackground('wooden')}
                  >
                    <div className="background-preview wooden"></div>
                    <span>木紋背景</span>
                  </button>
                  
                  <button 
                    className={`background-btn ${selectedBackground === 'aura' ? 'active' : ''}`}
                    onClick={() => setSelectedBackground('aura')}
                  >
                    <div className="background-preview aura"></div>
                    <span>絨布背景</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* 我的設計專區彈窗 */}
      {showMyDesigns && (
        <MyDesigns onClose={() => setShowMyDesigns(false)} />
      )}
    </div>
  );
};

export default ShareResultImage;
