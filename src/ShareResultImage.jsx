import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import './ShareResultImage.css';

const ShareResultImage = ({ design, scores, advice, onClose }) => {
  const resultRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState('transparent'); // 預設透明背景

  // 組件掛載時自動生成分享圖
  useEffect(() => {
    if (design && !generatedImage) {
      generateShareImage();
    }
  }, [design, generatedImage]);

  // 當背景選擇改變時重新生成圖片
  useEffect(() => {
    if (design && generatedImage) {
      generateShareImage();
    }
  }, [selectedBackground]);

  // 生成分享結果圖 - 直接截取串珠評分區的實際圓形手串
  const generateShareImage = async () => {
    setIsGenerating(true);
    
    // 添加調試信息
    console.log('開始生成分享圖...');
    console.log('設計數據:', design);
    console.log('評分數據:', scores);
    console.log('建議文字:', advice);
    
    try {
      // 創建一個臨時的 DOM 元素來包含實際的串珠設計內容
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = '800px';
      tempContainer.style.height = '1200px';
      tempContainer.style.backgroundColor = '#1a1a2e';
      tempContainer.style.padding = '40px';
              tempContainer.style.fontFamily = 'Arial, sans-serif';
      tempContainer.style.color = 'white';
      tempContainer.style.overflow = 'hidden';
      
      // 添加標題
      const title = document.createElement('h1');
      title.textContent = '✨ 串珠設計分享 ✨';
      title.style.textAlign = 'center';
      title.style.fontSize = '32px';
      title.style.marginBottom = '20px';
      title.style.background = 'linear-gradient(45deg, #fbbf24, #d97706)';
      title.style.webkitBackgroundClip = 'text';
      title.style.webkitTextFillColor = 'transparent';
      title.style.backgroundClip = 'text';
      tempContainer.appendChild(title);
      
      // 添加副標題
      const subtitle = document.createElement('p');
      subtitle.textContent = '神秘占卜結果';
      subtitle.style.textAlign = 'center';
      subtitle.style.fontSize = '18px';
      subtitle.style.marginBottom = '40px';
      subtitle.style.color = 'rgba(255, 255, 255, 0.8)';
      tempContainer.appendChild(subtitle);
      
      // 創建手串預覽區域
      const braceletSection = document.createElement('div');
      braceletSection.style.marginBottom = '40px';
      braceletSection.style.textAlign = 'center';
      
      const braceletTitle = document.createElement('h3');
      braceletTitle.textContent = '📿 你的串珠設計';
      braceletTitle.style.fontSize = '24px';
      braceletTitle.style.marginBottom = '20px';
      braceletTitle.style.color = '#fbbf24';
      braceletSection.appendChild(braceletTitle);
      
      // 創建圓形手串預覽 - 使用與串珠評分區完全相同的邏輯
      if (design?.beads) {
        const braceletContainer = document.createElement('div');
        braceletContainer.style.position = 'relative';
        braceletContainer.style.width = '400px';
        braceletContainer.style.height = '400px';
        braceletContainer.style.margin = '0 auto';
        braceletContainer.style.border = '3px solid #8B4513';
        braceletContainer.style.borderRadius = '50%';
        braceletContainer.style.overflow = 'hidden';
        
        // 根據選擇的背景類型設置背景
        if (selectedBackground === 'wooden') {
          // 木製托盤背景
          braceletContainer.style.backgroundImage = 'url(/wooden-tray.png)';
          braceletContainer.style.backgroundSize = 'cover';
          braceletContainer.style.backgroundPosition = 'center';
          braceletContainer.style.backgroundColor = 'rgba(139, 69, 19, 0.1)';
        } else if (selectedBackground === 'gradient') {
          // 漸層背景
          braceletContainer.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          braceletContainer.style.backgroundColor = 'transparent';
        } else {
          // 透明背景（預設）
          braceletContainer.style.backgroundColor = 'rgba(139, 69, 19, 0.1)';
        }
        
        // 創建 Canvas 來渲染珠子 - 與串珠評分區完全一致
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '2';
        
        const ctx = canvas.getContext('2d');
        
        // 根據手鍊長度設定半徑 - 與串珠評分區邏輯一致
        let radius;
        if (design.stringLength === 'half') {
          radius = 120;
        } else if (design.stringLength === 'four-thirds') {
          radius = 130;
        } else {
          radius = 140;
        }
        
        const centerX = 200;
        const centerY = 200;
        
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
              baseSize = 0.9; // 全圓：珠子最小
            }
            
            // 大幅增加分享圖中珠子的大小，讓它們非常明顯
            const beadSize = bead.type === '過渡珠' ? Math.round(20 * baseSize) :
                            (bead.type === '米珠' || bead.type === '珍珠') ? Math.round(28 * baseSize) :
                            Math.round(50 * baseSize);
            
            // 創建珠子圖片元素並繪製到 Canvas
            const image = new Image();
            const imagePath = bead.image.startsWith('/') ? bead.image : `/${bead.image}`;
            
            image.onload = () => {
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
              console.warn(`珠子圖片載入失敗: ${imagePath}`);
              resolve(); // 即使失敗也要 resolve，避免阻塞
            };
            
            image.src = imagePath;
          });
        });
        
        // 等待所有珠子繪製完成
        await Promise.all(beadPromises);
        
        // 添加調試信息
        console.log(`已繪製 ${design.beads.length} 顆珠子到 Canvas`);
        console.log('Canvas 尺寸:', canvas.width, 'x', canvas.height);
        
        braceletContainer.appendChild(canvas);
        braceletSection.appendChild(braceletContainer);
        
        // 添加設計信息
        const designInfo = document.createElement('div');
        designInfo.style.marginTop = '20px';
        designInfo.style.textAlign = 'center';
        
        const designName = document.createElement('p');
        designName.textContent = design.designName || '串珠設計';
        designName.style.fontSize = '20px';
        designName.style.fontWeight = 'bold';
        designName.style.marginBottom = '10px';
        designName.style.color = '#fbbf24';
        designInfo.appendChild(designName);
        
        const designDetails = document.createElement('p');
        designDetails.textContent = `包含 ${design.beads.length} 顆珠子 • 創建於 ${new Date(design.timestamp || Date.now()).toLocaleDateString()}`;
        designDetails.style.fontSize = '16px';
        designDetails.style.color = 'rgba(255, 255, 255, 0.8)';
        designInfo.appendChild(designDetails);
        
        braceletSection.appendChild(designInfo);
      }
      
      tempContainer.appendChild(braceletSection);
      
      // 創建雷達圖區域
      if (scores) {
        const radarSection = document.createElement('div');
        radarSection.style.marginBottom = '40px';
        radarSection.style.textAlign = 'center';
        
        const radarTitle = document.createElement('h3');
        radarTitle.textContent = '🌟 能量評分圖';
        radarTitle.style.fontSize = '24px';
        radarTitle.style.marginBottom = '20px';
        radarTitle.style.color = '#fbbf24';
        radarSection.appendChild(radarTitle);
        
        // 創建 SVG 雷達圖
        const radarSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        radarSvg.setAttribute('width', '400');
        radarSvg.setAttribute('height', '400');
        radarSvg.setAttribute('viewBox', '0 0 400 400');
        radarSvg.style.margin = '0 auto';
        
        const centerX = 200;
        const centerY = 200;
        
        // 繪製背景網格
        const grid1 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        grid1.setAttribute('points', '200,100 300,150 300,250 200,300 100,250 100,150');
        grid1.setAttribute('fill', 'none');
        grid1.setAttribute('stroke', 'rgba(255,255,255,0.3)');
        grid1.setAttribute('stroke-width', '1');
        radarSvg.appendChild(grid1);
        
        const grid2 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        grid2.setAttribute('points', '200,130 270,170 270,230 200,270 130,230 130,170');
        grid2.setAttribute('fill', 'none');
        grid2.setAttribute('stroke', 'rgba(255,255,255,0.3)');
        grid2.setAttribute('stroke-width', '1');
        radarSvg.appendChild(grid2);
        
        const grid3 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        grid3.setAttribute('points', '200,160 240,190 240,210 200,240 160,210 160,190');
        grid3.setAttribute('fill', 'none');
        grid3.setAttribute('stroke', 'rgba(255,255,255,0.3)');
        grid3.setAttribute('stroke-width', '1');
        radarSvg.appendChild(grid3);
        
        // 繪製軸線
        const axes = [
          { x1: centerX, y1: centerY, x2: centerX, y2: 100 },
          { x1: centerX, y1: centerY, x2: 300, y2: 150 },
          { x1: centerX, y1: centerY, x2: 300, y2: 250 },
          { x1: centerX, y1: centerY, x2: centerX, y2: 300 },
          { x1: centerX, y1: centerY, x2: 100, y2: 250 },
          { x1: centerX, y1: centerY, x2: 100, y2: 150 }
        ];
        
        axes.forEach(axis => {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', axis.x1);
          line.setAttribute('y1', axis.y1);
          line.setAttribute('x2', axis.x2);
          line.setAttribute('y2', axis.y2);
          line.setAttribute('stroke', 'rgba(255,255,255,0.5)');
          line.setAttribute('stroke-width', '1');
          radarSvg.appendChild(line);
        });
        
        // 計算評分點位置
        const getScorePoints = () => {
          return [
            { x: centerX, y: centerY - (scores.love / 10) * 100 },
            { x: centerX + (scores.love / 10) * 86.6, y: centerY - (scores.love / 10) * 50 },
            { x: centerX + (scores.windfall / 10) * 86.6, y: centerY + (scores.windfall / 10) * 50 },
            { x: centerX, y: centerY + (scores.regularIncome / 10) * 100 },
            { x: centerX - (scores.career / 10) * 86.6, y: centerY + (scores.career / 10) * 50 },
            { x: centerX - (scores.health / 10) * 86.6, y: centerY + (scores.health / 10) * 50 }
          ];
        };
        
        const scorePoints = getScorePoints();
        const pointsString = scorePoints.map(point => `${point.x},${point.y}`).join(' ');
        
        // 繪製評分填充區域
        const fillArea = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        fillArea.setAttribute('points', pointsString);
        fillArea.setAttribute('fill', 'rgba(138, 43, 226, 0.6)');
        fillArea.setAttribute('stroke', 'rgba(138, 43, 226, 0.8)');
        fillArea.setAttribute('stroke-width', '2');
        radarSvg.appendChild(fillArea);
        
        // 繪製評分點
        scorePoints.forEach(point => {
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('cx', point.x);
          circle.setAttribute('cy', point.y);
          circle.setAttribute('r', '4');
          circle.setAttribute('fill', '#ffd700');
          radarSvg.appendChild(circle);
        });
        
        // 添加軸線標籤
        const labels = [
          { x: centerX, y: 80, text: `設計感 (${scores.love})`, anchor: 'middle' },
          { x: 310, y: 150, text: `愛情 (${scores.love})`, anchor: 'start' },
          { x: 310, y: 250, text: `偏財 (${scores.windfall})`, anchor: 'start' },
          { x: centerX, y: 320, text: `正財 (${scores.regularIncome})`, anchor: 'middle' },
          { x: 90, y: 250, text: `事業 (${scores.career})`, anchor: 'end' },
          { x: 90, y: 150, text: `健康 (${scores.health})`, anchor: 'end' }
        ];
        
        labels.forEach(label => {
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', label.x);
          text.setAttribute('y', label.y);
          text.setAttribute('text-anchor', label.anchor);
          text.setAttribute('fill', 'white');
          text.setAttribute('font-size', '12px');
          text.setAttribute('font-weight', 'bold');
          text.textContent = label.text;
          radarSvg.appendChild(text);
        });
        
        radarSection.appendChild(radarSvg);
        tempContainer.appendChild(radarSection);
      }
      
      // 創建評分總結區域
      if (advice) {
        const adviceSection = document.createElement('div');
        adviceSection.style.marginBottom = '40px';
        adviceSection.style.textAlign = 'center';
        
        const adviceTitle = document.createElement('h3');
        adviceTitle.textContent = '🔮 神秘占卜結果';
        adviceTitle.style.fontSize = '24px';
        adviceTitle.style.marginBottom = '20px';
        adviceTitle.style.color = '#fbbf24';
        adviceSection.appendChild(adviceTitle);
        
        const adviceContent = document.createElement('div');
        adviceContent.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        adviceContent.style.padding = '20px';
        adviceContent.style.borderRadius = '15px';
        adviceContent.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        
        const adviceText = document.createElement('p');
        adviceText.textContent = advice;
        adviceText.style.fontSize = '16px';
        adviceText.style.lineHeight = '1.6';
        adviceText.style.color = 'rgba(255, 255, 255, 0.9)';
        adviceText.style.margin = '0';
        adviceContent.appendChild(adviceText);
        
        adviceSection.appendChild(adviceContent);
        tempContainer.appendChild(adviceSection);
      }
      
      // 添加底部標籤
      const footer = document.createElement('div');
      footer.style.textAlign = 'center';
      footer.style.marginTop = '40px';
      footer.style.paddingTop = '20px';
      footer.style.borderTop = '1px solid rgba(255, 255, 255, 0.2)';
      
      const footerText = document.createElement('p');
      footerText.textContent = '💎 由神秘串珠占卜系統生成 💎';
      footerText.style.fontSize = '18px';
      footerText.style.color = '#fbbf24';
      footerText.style.marginBottom = '10px';
      footerText.style.fontWeight = 'bold';
      footer.appendChild(footerText);
      
      const footerDate = document.createElement('p');
      footerDate.textContent = new Date().toLocaleDateString();
      footerDate.style.fontSize = '16px';
      footerDate.style.color = 'rgba(255, 255, 255, 0.7)';
      footer.appendChild(footerDate);
      
      tempContainer.appendChild(footer);
      
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
        height: 1200
      });
      
      const imageDataUrl = canvas.toDataURL('image/png', 1.0);
      setGeneratedImage(imageDataUrl);
      
      // 清理臨時容器
      document.body.removeChild(tempContainer);
      
    } catch (error) {
      console.error('生成分享圖片失敗:', error);
      alert('生成分享圖片失敗，請重試');
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
              <h3>🔄 正在生成分享圖...</h3>
              <p>請稍候，系統正在為您生成精美的分享圖</p>
            </div>
          )}
          
          {/* 背景選擇器 */}
          <div className="background-selector">
            <h3>🎨 選擇圓形背景</h3>
            <div className="background-options">
              <button 
                className={`bg-option ${selectedBackground === 'transparent' ? 'selected' : ''}`}
                onClick={() => setSelectedBackground('transparent')}
              >
                <div className="bg-preview transparent-bg"></div>
                <span>透明背景</span>
              </button>
              
              <button 
                className={`bg-option ${selectedBackground === 'wooden' ? 'selected' : ''}`}
                onClick={() => setSelectedBackground('wooden')}
              >
                <div className="bg-preview wooden-bg"></div>
                <span>木製托盤</span>
              </button>
              
              <button 
                className={`bg-option ${selectedBackground === 'gradient' ? 'selected' : ''}`}
                onClick={() => setSelectedBackground('gradient')}
              >
                <div className="bg-preview gradient-bg"></div>
                <span>漸層背景</span>
              </button>
            </div>
          </div>
          
          {/* 生成的圖片和操作按鈕 */}
          {generatedImage && (
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
              
              {/* 操作按鈕 */}
              <div className="action-section">
                <button 
                  className="action-btn download-btn"
                  onClick={downloadImage}
                >
                  💾 下載圖片
                </button>
                
                <button 
                  className="action-btn share-btn"
                  onClick={shareToSocial}
                >
                  📤 分享到社群
                </button>
                
                <button 
                  className="action-btn copy-btn"
                  onClick={copyLink}
                >
                  🔗 複製連結
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareResultImage;
