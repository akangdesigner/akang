import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import './BeadCabinet.css';

/*
 * ========================================
 * 版本2 - 2024-12-12
 * 狀態：完整串珠動畫系統完成
 * 功能：
 * - ✅ 第一顆珠子串珠動畫正常
 * - ✅ 第二顆及後續珠子串珠動畫正常
 * - ✅ 移除浮動效果
 * - ✅ 珠子不會重疊
 * - ✅ 終點位置計算正確
 * - ✅ 使用 0.707 (cos45°) 計算45度旋轉終點
 * - ✅ 間距規則：前大後小35px, 前小後小20px, 前大後大50px, 前小後大40px
 * - ✅ 動畫速度：1.5秒滑動，無等待時間
 * - ✅ 所有珠子參照第一顆終點位置計算
 * ========================================
 */

// 浮空珠子組件
const FloatingBead = ({ drawer, drawerId, onClose, onClickToTray }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    const updatePosition = () => {
      const drawerElement = document.querySelector(`[data-drawer-id="${drawerId}"]`);
      if (drawerElement) {
        const rect = drawerElement.getBoundingClientRect();
        
        setPosition({
          top: rect.top - 150, // 在抽屜上方150px，給說明視窗留更多空間
          left: rect.left + rect.width / 2
        });
      }
    };
    
    // 立即更新位置
    updatePosition();
    
    // 監聽視窗大小變化
    window.addEventListener('resize', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [drawerId]);

  // 檢查是否為薄荷綠珠子，使用擬真圖片
  const isMintGreenBead = drawer.name === '薄荷綠';
  
  // 調試訊息
  console.log('浮空珠子檢查:', {
    drawerName: drawer.name,
    isMintGreen: isMintGreenBead,
    shouldUseImage: isMintGreenBead
  });
  
  return (
    <div 
      className="floating-bead-container"
      data-type={drawer.type}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)',
        zIndex: 2000,
        pointerEvents: 'auto',
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="floating-bead-info" style={{ pointerEvents: 'auto' }}>
        <div className="floating-bead-text">
          <h4>{drawer.name}</h4>
          <small>{drawer.type}</small>
        </div>
        <button 
          className="close-floating-btn"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div
        className={`floating-bead ${isMintGreenBead ? 'mint-green-floating-bead' : ''}`}
        data-type={drawer.type}
        onClick={(e) => {
          e.stopPropagation();
          console.log('=== 浮空珠子點擊事件觸發 ===');
          console.log('點擊的珠子:', drawer.name);
          console.log('點擊的珠子類型:', drawer.type);
          console.log('onClickToTray 函數:', onClickToTray);
          console.log('事件對象:', e);
          console.log('點擊位置:', { x: e.clientX, y: e.clientY });
          console.log('浮空珠子位置:', position);
          
          // 點擊浮空珠子，將其添加到串珠盤
          if (onClickToTray) {
            console.log('調用 onClickToTray 函數');
            onClickToTray(drawer);
          } else {
            console.error('onClickToTray 函數未定義！');
          }
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2001,
          pointerEvents: 'auto',
          width: (drawer.type === '過渡珠') ? '15px' : 
                 (drawer.type === '米珠' || drawer.type === '珍珠') ? '21px' : '60px',
          height: (drawer.type === '過渡珠') ? '15px' : 
                  (drawer.type === '米珠' || drawer.type === '珍珠') ? '21px' : '60px',
          cursor: 'pointer',
          backgroundColor: 'rgba(255, 0, 0, 0.1)'
        }}
        title={`點擊 ${drawer.name} 添加到串珠盤`}
      >
        {/* 所有珠子都使用圖片 */}
        <img 
          src={drawer.image} 
          alt={`${drawer.name}${drawer.type}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '50%',
            outline: 'none',
            border: 'none',
            filter: 'none',
            boxShadow: 'none',
            textShadow: 'none',
            pointerEvents: 'none'
          }}
          onError={(e) => {
            console.error(`${drawer.name}珠子圖片載入失敗:`, e);
            // 如果圖片載入失敗，回退到原有樣式
            e.target.style.display = 'none';
            // 顯示備用的顏色珠子
            const fallbackBead = document.createElement('div');
            fallbackBead.style.cssText = `
              width: 100%;
              height: 100%;
              background-color: ${drawer.color};
              border-radius: 50%;
              pointer-events: none;
            `;
            e.target.parentNode.appendChild(fallbackBead);
          }}
          onLoad={() => {
            console.log(`${drawer.name}珠子圖片載入成功`);
          }}
        />
      </div>
    </div>
  );
};

// 木質串珠盤組件
const WoodenBeadTray = ({ selectedBeads, setSelectedBeads, onSaveDesign, onSaveFloatingDesign }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [stringWidth, setStringWidth] = useState('medium');
  const [stringLength, setStringLength] = useState('full'); // 串珠線顏色：white 或 yellow
  const [showFloatingAnimation, setShowFloatingAnimation] = useState(false);
  const [floatingBeads, setFloatingBeads] = useState([]);
  const [strungBeads, setStrungBeads] = useState([]); // 保存所有已經串好的珠子
  const animationRef = useRef(null);

  // 處理拖曳放置
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    
    console.log('接收到拖曳放置事件');
    console.log('可用的數據類型:', e.dataTransfer.types);
    
    try {
      let beadData = e.dataTransfer.getData('application/json');
      console.log('接收到的珠子數據 (application/json):', beadData);
      
      if (!beadData) {
        beadData = e.dataTransfer.getData('text/plain');
        console.log('接收到的珠子數據 (text/plain):', beadData);
      }
      
             if (beadData) {
         const bead = JSON.parse(beadData);
         console.log('解析後的珠子:', bead);
         setSelectedBeads(prev => {
           const newBeads = [...prev, { ...bead, id: Date.now() }];
           console.log('新的珠子陣列:', newBeads.map((b, i) => `${i + 1}. ${b.name}`));
           return newBeads;
         });
       } else {
        console.log('沒有接收到珠子數據');
      }
    } catch (error) {
      console.log('拖曳數據解析失敗:', error);
    }
  };

  // 移除珠子
  const removeBead = (beadId) => {
    setSelectedBeads(prev => prev.filter(bead => bead.id !== beadId));
  };

  // 開始串珠動畫
  const startStringingAnimation = () => {
    console.log('按鈕被點擊了！'); // 測試按鈕是否工作
    
    if (selectedBeads.length === 0) {
      alert('請先選擇一些珠子再開始串珠！');
      return;
    }
    
    // 根據串珠長度限制可串的珠子數量
    let maxBeads;
    if (stringLength === 'half') {
      maxBeads = 10; // 半圓可串10顆
    } else if (stringLength === 'four-thirds') {
      maxBeads = 13; // 4/3圓可串13顆
    } else { // full
      maxBeads = 16; // 全圓可串16顆
    }
    
    // 計算實際的珠子總數（考慮小珠子按0.5顆計算）
    const bigBeads = selectedBeads.filter(bead => !(bead.type === '米珠' || bead.type === '珍珠' || bead.type === '過渡珠')).length;
    const smallBeads = selectedBeads.filter(bead => bead.type === '米珠' || bead.type === '珍珠' || bead.type === '過渡珠').length;
    const actualTotalCount = bigBeads + (smallBeads * 0.5);
    
    if (actualTotalCount > maxBeads) {
      alert(`當前選擇的珠子總數為 ${actualTotalCount.toFixed(1)} 顆（${bigBeads} 顆大珠子 + ${smallBeads} 顆小珠子×0.5），但${stringLength === 'half' ? '半圓' : stringLength === 'four-thirds' ? '4/3圓' : '全圓'}最多只能串 ${maxBeads} 顆珠子！請減少選擇的珠子數量。`);
      return;
    }
    
    if (actualTotalCount < maxBeads) {
      alert(`當前選擇的珠子總數為 ${actualTotalCount.toFixed(1)} 顆（${bigBeads} 顆大珠子 + ${smallBeads} 顆小珠子×0.5），但${stringLength === 'half' ? '半圓' : stringLength === 'four-thirds' ? '4/3圓' : '全圓'}需要串滿 ${maxBeads} 顆珠子才能開始串珠！請繼續選擇珠子。`);
      return;
    }

    console.log('開始串珠動畫，當前設置：', {
      stringWidth,
      stringLength,
      selectedBeadsCount: selectedBeads.length
    });

    // 清空之前的動畫狀態
    setStrungBeads([]);
    setFloatingBeads([]);
    
    // 從第一顆珠子開始串珠
    const firstBead = selectedBeads[0];
    
    // 創建動畫數據
    console.log('準備創建 beads 數組...');
    console.log('firstBead:', firstBead);
    console.log('總共要串的珠子數量:', selectedBeads.length);
    
    const beads = [{
      ...firstBead,
      id: `floating-${firstBead.id}`,
      beadIndex: 0  // 第一顆珠子的索引
    }];
    
    console.log('beads 數組創建完成:', beads);
    console.log('動畫珠子數據：', beads);

    console.log('準備設置 floatingBeads state...');
    try {
      setFloatingBeads(beads);
      console.log('floatingBeads state 已設置');
    } catch (error) {
      console.error('設置 floatingBeads 時出錯:', error);
    }

    console.log('準備設置 showFloatingAnimation state...');
    try {
      setShowFloatingAnimation(true);
      console.log('showFloatingAnimation state 已設置');
    } catch (error) {
      console.error('設置 showFloatingAnimation 時出錯:', error);
    }

    console.log('第一顆珠子設置完成，等待渲染後開始動畫');
  };

  // 創建圓形手鍊
  const createCircularBracelet = () => {
    console.log('開始創建圓形手鍊');
    
    // 建立圓形手鍊容器，放在浮空頁面內
    const braceletContainer = document.createElement('div');
    braceletContainer.className = 'bracelet-container';
    braceletContainer.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.8s ease-in;
    `;
    
    // 計算圓形排列
    const totalBeads = selectedBeads.length;
    
    // 根據串珠長度設定固定半徑（與 SVG 圓形線一致）
    let radius;
    if (stringLength === 'half') {
      radius = 80; // 半圓：固定半徑 80px
    } else if (stringLength === 'four-thirds') {
      radius = 100; // 4/3圓：固定半徑 100px
    } else { // full
      radius = 120; // 全圓：固定半徑 120px
    }
    
    const centerX = 0;
    const centerY = 0;

    // 建立 SVG 元素
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", `${radius * 2}px`);  // 直徑 = 2 * 半徑
    svg.setAttribute("height", `${radius * 2}px`); // 直徑 = 2 * 半徑
    svg.style.position = "absolute";
    svg.style.left = "50%";
    svg.style.top = "50%";
    svg.style.transform = "translate(-50%, -50%)";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = "1";

    // 建立圓形
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", `${radius}`);  // 圓心 x = 半徑
    circle.setAttribute("cy", `${radius}`);  // 圓心 y = 半徑
    circle.setAttribute("r", `${radius}`);   // 半徑
    circle.setAttribute("fill", "transparent");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", stringWidth === 'thin' ? 2 : stringWidth === 'medium' ? 3 : 4);

    // 加入到 svg
    svg.appendChild(circle);
    braceletContainer.appendChild(svg);
    

    

    
    selectedBeads.forEach((bead, index) => {
      const angle = (2 * Math.PI / totalBeads) * index - Math.PI / 2; // 從12點開始
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      const beadElement = document.createElement('div');
      beadElement.className = 'bracelet-bead';
      beadElement.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        width: ${bead.type === '過渡珠' ? '15px' : 
                 (bead.type === '米珠' || bead.type === '珍珠') ? '21px' : '60px'};
        height: ${bead.type === '過渡珠' ? '15px' : 
                  (bead.type === '米珠' || bead.type === '珍珠') ? '21px' : '60px'};
        border-radius: 50%;
        background-image: url(${bead.image});
        background-size: cover;
        background-position: center;
        animation: braceletBeadAppear 0.27s ease-out ${index * 0.033}s both;
      `;
      
      braceletContainer.appendChild(beadElement);
    });
    
    // 添加到浮空頁面內，而不是整個頁面
    const floatingContainer = document.querySelector('.floating-beads-animation');
    if (floatingContainer) {
      floatingContainer.appendChild(braceletContainer);
      console.log('圓形手鍊已添加到浮空頁面內');
      
      // 觸發淡入效果 - 串珠線和珠子一起淡入
      setTimeout(() => {
        braceletContainer.style.opacity = '1';
        

      }, 100);
    } else {
      console.error('找不到浮空頁面容器');
    }
    
    // 圓形手鍊創建完成後，不自動關閉，等待用戶主動完成
    console.log('圓形手鍊創建完成，等待用戶完成串珠');
  };

  // 完成串珠動畫
  const completeStringingAnimation = () => {
    if (animationRef.current) {
      animationRef.current.kill();
    }
    setShowFloatingAnimation(false);
    setFloatingBeads([]);
    setStrungBeads([]); // 清空已串好的珠子
    
    // 清除可能顯示的手鍊
    const existingBracelets = document.querySelectorAll('.bracelet-container');
    existingBracelets.forEach(bracelet => {
      bracelet.remove();
      console.log('已清除手鍊');
    });
    
    // 清除可能殘留的手鍊珠子
    const existingBraceletBeads = document.querySelectorAll('.bracelet-bead');
    existingBraceletBeads.forEach(bead => {
      bead.remove();
      console.log('已清除手鍊珠子');
    });
    
    // 清除可能殘留的手鍊線
    const existingBraceletLines = document.querySelectorAll('.bracelet-line');
    existingBraceletLines.forEach(line => {
      line.remove();
      console.log('已清除手鍊線');
    });
    
    // 顯示完成訊息
    alert('串珠完成！您的設計已經準備就緒。');
  };



  // 監聽 floatingBeads 變化，自動觸發動畫
  useEffect(() => {
    if (floatingBeads.length > 0 && showFloatingAnimation) {
      console.log('useEffect 觸發，準備為珠子', floatingBeads[0].beadIndex, '設置動畫');
      
      // 等待 DOM 渲染完成後觸發動畫
      const timer = setTimeout(() => {
        // 只查找當前正在串的珠子，避免影響已串好的珠子
        const beadElement = document.querySelector(`[data-bead-id="${floatingBeads[0].id}"]`);
        if (beadElement) {
          console.log('找到珠子元素，開始觸發動畫');
          
          // 計算當前珠子的終點位置
          const beadIndex = floatingBeads[0].beadIndex || 0;
          let endLeft, endTop;
          
          // 添加額外的檢查，確保珠子狀態正確
          if (beadIndex >= selectedBeads.length) {
            console.error('珠子索引超出範圍:', beadIndex, selectedBeads.length);
            return;
          }
          
          if (beadIndex === 0) {
            // 第一顆珠子滑到線尾 - 根據串珠線實際長度計算
            let lineEndDistance;
            if (stringLength === 'half') {
              lineEndDistance = 20; // 半圓串珠，適中的距離
            } else if (stringLength === 'four-thirds') {
              lineEndDistance = 35; // 4/3圓串珠，固定35vh
            } else { // full
              lineEndDistance = 45; // 全圓串珠，加長的距離
            }
            
            // 串珠線旋轉45度，珠子沿著線的方向滑動
            endLeft = `calc(50% + ${lineEndDistance * 0.707}vh)`; // 向右下方滑動
            endTop = `calc(50% + ${lineEndDistance * 0.707}vh)`;  // 向右下方滑動
          } else {
            // 處理第二顆及後續珠子 - 終點 = 前一顆珠子的終點座標減掉前一顆珠子的大小
            const prevBead = selectedBeads[beadIndex - 1];
            const prevBeadSize = prevBead.type === '過渡珠' ? 21 : 
                                (prevBead.type === '米珠' || prevBead.type === '珍珠') ? 21 : 60;
            
            // 使用與第一顆珠子相同的基準距離
            let baseLineEndDistance;
            if (stringLength === 'half') {
              baseLineEndDistance = 20; // 半圓串珠，適中的距離
            } else if (stringLength === 'four-thirds') {
              baseLineEndDistance = 35; // 4/3圓串珠，固定35vh
            } else { // full
              baseLineEndDistance = 45; // 全圓串珠，加長的距離
            }
            
            // 新的運算邏輯：所有珠子都參照第一顆的終點位置
            // 根據前後珠子大小決定間距
            let totalOffset = 0;
            
            // 計算前面所有珠子的累積偏移量
            for (let i = 0; i < beadIndex; i++) {
              const bead = selectedBeads[i];
              const nextBead = selectedBeads[i + 1];
              
              if (nextBead) {
                const beadSize = bead.type === '過渡珠' ? 15 : 
                                (bead.type === '米珠' || bead.type === '珍珠') ? 21 : 60;
                const nextBeadSize = nextBead.type === '過渡珠' ? 15 : 
                                    (nextBead.type === '米珠' || nextBead.type === '珍珠') ? 21 : 60;
                
                // 判斷間距：前大後小-35px, 前小後小-20px, 前大後大-50px, 前小後大-40px
                let spacing;
                if (beadSize >= 60 && nextBeadSize < 60) {
                  spacing = 35; // 前大後小
                } else if (beadSize < 60 && nextBeadSize < 60) {
                  spacing = 20; // 前小後小
                } else if (beadSize >= 60 && nextBeadSize >= 60) {
                  spacing = 50; // 前大後大
                } else {
                  spacing = 40; // 前小後大
                }
                
                totalOffset += spacing;
              }
            }
            
            // 當前珠子位置 = 第一顆終點位置 - 累積偏移量（調整係數讓間距更合理）
            const currentLineEndDistance = baseLineEndDistance - (totalOffset / 10);
            
            // 串珠線旋轉45度，珠子沿著線的方向滑動
            endLeft = `calc(50% + ${currentLineEndDistance * 0.707}vh)`; // 向右下方滑動
            endTop = `calc(50% + ${currentLineEndDistance * 0.707}vh)`;  // 向右下方滑動
            
            console.log(`珠子 ${beadIndex} 的終點計算:`, {
              prevBeadSize,
              baseLineEndDistance,
              currentLineEndDistance,
              finalLeft: endLeft,
              finalTop: endTop
            });
          }
          
          console.log(`珠子 ${beadIndex} 將滑動到:`, { endLeft, endTop });
          
          // 觸發滑動動畫 - 無浮動效果
          beadElement.style.left = endLeft;
          beadElement.style.top = endTop;
          // 確保沒有浮動效果
          beadElement.style.filter = 'none';
          beadElement.style.boxShadow = 'none';
          beadElement.style.animation = 'none';
          beadElement.style.transform = 'translate(-50%, -50%)';
          
          // 添加動畫完成檢查
          console.log(`珠子 ${beadIndex} 動畫已觸發，目標位置:`, { endLeft, endTop });
        } else {
          console.error('找不到珠子元素');
        }
      }, 67); // 等待 67ms 確保 DOM 渲染完成
      
      return () => clearTimeout(timer);
    }
  }, [floatingBeads, showFloatingAnimation, stringLength]); // 移除 selectedBeads 依賴，避免已串好珠子被重新計算

  // 計算圓形排列的位置 - 統一使用20px間距
  const calculateBeadPosition = (index, totalBeads, beadType, selectedBeads) => {
    if (totalBeads === 0) return { left: '50%', top: '50%' };
    
    // 串珠盤上的珠子使用與靜態串珠線一致的半徑
    const radius = 125; // 與靜態串珠線的 r 一致
    
    // 串珠線的圓心座標（與靜態串珠線一致）
    const centerX = 142; // 與靜態串珠線的 cx 一致
    const centerY = 140; // 與靜態串珠線的 cy 一致
    
    // 判斷當前珠子是否為小珠子
    const isCurrentSmall = beadType === '米珠' || beadType === '珍珠' || beadType === '過渡珠';
    
    // 計算珠子大小
    const beadSize = isCurrentSmall ? 15 : 35;
    
    // 統一使用20px間距
    // 從12點鐘方向開始，每顆珠子緊接著前一顆
    let currentAngle = -Math.PI / 2; // 12點鐘方向
    
    // 累積前面所有珠子的角度
    for (let i = 0; i < index; i++) {
      const prevBead = selectedBeads[i];
      const isPrevSmall = prevBead.type === '米珠' || prevBead.type === '珍珠' || prevBead.type === '過渡珠';
      const prevBeadSize = isPrevSmall ? 15 : 35;
      
      // 統一使用20px間距
      const prevGap = 5;
      
      // 角度增量 = (珠子大小 + 間距) / 半徑
      const angleIncrement = (prevBeadSize + prevGap) / radius;
      currentAngle += angleIncrement;
    }
    
    // 當前珠子的角度 = 累積角度 + 當前珠子的一半大小
    const angle = currentAngle + (beadSize / 2) / radius;
    
    // 計算珠子在串珠線圓周上的位置
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    
    // 調試信息
    const angleDegrees = (angle * 180 / Math.PI).toFixed(1);
    let position = '';
    if (angleDegrees >= -45 && angleDegrees < 45) position = '12點鐘方向（上方）';
    else if (angleDegrees >= 45 && angleDegrees < 135) position = '3點鐘方向（右側）';
    else if (angleDegrees >= 135 || angleDegrees < -135) position = '6點鐘方向（下方）';
    else position = '9點鐘方向（左側）';
    
    console.log(`珠子 ${index + 1}/${totalBeads} (${beadType}): ${position} (${angleDegrees}°), x=${x.toFixed(1)}, y=${y.toFixed(1)}, 間距=20px, 大小=${beadSize}px, 類型=${isCurrentSmall ? '小' : '大'}`);
    
    return {
      left: `${x}px`,
      top: `${y}px`
    };
  };

  return (
    <div className="wooden-bead-tray-container">
      {/* 浮空串珠動畫 */}
      {showFloatingAnimation && (
        <div className="floating-beads-animation">
          {/* 中央串珠線 - 根據用戶選擇動態生成 */}
          <div className="stringing-line">
            {(() => {
              console.log('渲染串珠線，當前設置：', { stringLength, stringWidth });
              
              if (stringLength === 'half') {
                return (
                  <>
                    <div className="line-segment line-start" style={{ 
                      left: '0%',
                      width: '15%',
                      height: stringWidth === 'thin' ? '2px' : stringWidth === 'medium' ? '3px' : '4px' 
                    }}></div>
                    <div className="line-segment line-middle" style={{ 
                      left: '15%',
                      width: '50%',
                      height: stringWidth === 'thin' ? '2px' : stringWidth === 'medium' ? '3px' : '4px' 
                    }}></div>
                    <div className="line-segment line-end" style={{ 
                      left: '65%',
                      width: '15%',
                      height: stringWidth === 'thin' ? '2px' : stringWidth === 'medium' ? '3px' : '4px' 
                    }}></div>
                  </>
                );
              } else if (stringLength === 'four-thirds') {
                return (
                  <>
                    <div className="line-segment line-start" style={{ 
                      left: '0%',
                      width: '15%',
                      height: stringWidth === 'thin' ? '2px' : stringWidth === 'medium' ? '3px' : '4px' 
                    }}></div>
                    <div className="line-segment line-middle" style={{ 
                      left: '15%',
                      width: '75%',
                      height: stringWidth === 'thin' ? '2px' : stringWidth === 'medium' ? '3px' : '4px' 
                    }}></div>
                    <div className="line-segment line-end" style={{ 
                      left: '90%',
                      width: '15%',
                      height: stringWidth === 'thin' ? '2px' : stringWidth === 'medium' ? '3px' : '4px' 
                    }}></div>
                  </>
                );
              } else { // full
                return (
                  <>
                    <div className="line-segment line-start" style={{ 
                      left: '-10%',
                      width: '25%',
                      height: stringWidth === 'thin' ? '2px' : stringWidth === 'medium' ? '3px' : '4px' 
                    }}></div>
                    <div className="line-segment line-middle" style={{ 
                      left: '15%',
                      width: '95%',
                      height: stringWidth === 'thin' ? '2px' : stringWidth === 'medium' ? '3px' : '4px' 
                    }}></div>
                    <div className="line-segment line-end" style={{ 
                      left: '110%',
                      width: '15%',
                      height: stringWidth === 'thin' ? '2px' : stringWidth === 'medium' ? '3px' : '4px' 
                    }}></div>
                  </>
                );
              }
            })()}
          </div>
          
          {/* 已串好的珠子 - 顯示在最終位置，無浮動效果 */}
          {strungBeads.map((bead, index) => (
            <div
              key={`strung-${bead.id}-${bead.beadIndex}-${index}`}
              className="strung-bead"
              style={{
                position: 'absolute',
                left: bead.finalPosition.left,
                top: bead.finalPosition.top,
                zIndex: 999,
                transform: 'translate(-50%, -50%)',
                transition: 'none', // 確保完全靜止
                animation: 'none',   // 確保沒有動畫
                pointerEvents: 'none', // 防止任何交互
                willChange: 'auto', // 告訴瀏覽器不要優化這個元素的位置
                filter: 'none', // 無濾鏡效果
                boxShadow: 'none', // 無陰影效果
                textShadow: 'none' // 無文字陰影
              }}
            >
              <img 
                src={bead.image} 
                alt={bead.name}
                style={{
                  width: (() => {
                    if (bead.type === '過渡珠') return '15px';
                    if (bead.type === '米珠' || bead.type === '珍珠') return '21px';
                    if (bead.type === '米珠') return '40px';
                    return '60px';
                  })(),
                  height: (() => {
                    if (bead.type === '過渡珠') return '15px';
                    if (bead.type === '米珠' || bead.type === '珍珠') return '21px';
                    if (bead.type === '米珠') return '60px';
                    return '60px';
                  })(),
                  objectFit: 'contain',
                  borderRadius: '50%',
                  filter: 'none',
                  boxShadow: 'none',
                  outline: 'none',
                  border: 'none'
                }}
              />
            </div>
          ))}
          
          {/* 串珠珠子 - 顯示當前正在串的珠子，無浮動效果 */}
          {floatingBeads.length > 0 && (
            <div
              key={floatingBeads[0].id}
              className="stringing-bead"
              data-bead-id={floatingBeads[0].id}
              style={{
                position: 'absolute',
                left: stringLength === 'half' ? 'calc(50% - 25vh)' : 
                      stringLength === 'four-thirds' ? 'calc(50% - 30vh)' : 
                      'calc(50% - 35vh)',
                top: stringLength === 'half' ? 'calc(50% - 25vh)' : 
                     stringLength === 'four-thirds' ? 'calc(50% - 30vh)' : 
                     'calc(50% - 35vh)',
                zIndex: 1000,
                transition: 'all 0.5s ease-in-out',
                transform: 'translate(-50%, -50%)',
                filter: 'none',
                boxShadow: 'none',
                animation: 'none'
              }}
              onTransitionEnd={() => {
                console.log(`珠子 ${floatingBeads[0].beadIndex} 滑動完成，停在終點位置`);
                
                // 當前珠子完成後，將其添加到已串好的珠子列表中
                let lineEndDistance;
                if (stringLength === 'half') {
                  lineEndDistance = 20; // 半圓串珠，適中的距離
                } else if (stringLength === 'four-thirds') {
                  lineEndDistance = 35; // 4/3圓串珠，固定35vh
                } else { // full
                  lineEndDistance = 45; // 全圓串珠，加長的距離
                }
                
                // 根據珠子索引計算終點位置
                let finalPosition;
                if (floatingBeads[0].beadIndex === 0) {
                  // 第一顆珠子
                  finalPosition = {
                    left: `calc(50% + ${lineEndDistance * 0.707}vh)`,
                    top: `calc(50% + ${lineEndDistance * 0.707}vh)`
                  };
                } else {
                  // 第二顆及後續珠子 - 使用與 useEffect 相同的邏輯
                  let totalOffset = 0;
                  
                  // 計算前面所有珠子的累積偏移量
                  for (let i = 0; i < floatingBeads[0].beadIndex; i++) {
                    const bead = selectedBeads[i];
                    const nextBead = selectedBeads[i + 1];
                    
                    if (nextBead) {
                      const beadSize = bead.type === '過渡珠' ? 15 : 
                                      (bead.type === '米珠' || bead.type === '珍珠') ? 21 : 60;
                      const nextBeadSize = nextBead.type === '過渡珠' ? 15 : 
                                          (nextBead.type === '米珠' || nextBead.type === '珍珠') ? 21 : 60;
                      
                      // 判斷間距：前大後小-35px, 前小後小-20px, 前大後大-50px, 前小後大-40px
                      let spacing;
                      if (beadSize >= 60 && nextBeadSize < 60) {
                        spacing = 35; // 前大後小
                      } else if (beadSize < 60 && nextBeadSize < 60) {
                        spacing = 20; // 前小後小
                      } else if (beadSize >= 60 && nextBeadSize >= 60) {
                        spacing = 50; // 前大後大
                      } else {
                        spacing = 40; // 前小後大
                      }
                      
                      totalOffset += spacing;
                    }
                  }
                  
                  // 當前珠子位置 = 第一顆終點位置 - 累積偏移量（調整係數讓間距更合理）
                  const currentLineEndDistance = lineEndDistance - (totalOffset / 10);
                  
                  finalPosition = {
                    left: `calc(50% + ${currentLineEndDistance * 0.707}vh)`,
                    top: `calc(50% + ${currentLineEndDistance * 0.707}vh)`
                  };
                }
                    
                setStrungBeads(prev => [...prev, {
                  ...floatingBeads[0],
                  finalPosition: finalPosition
                }]);
                
                console.log(`珠子 ${floatingBeads[0].beadIndex} 已添加到已串好列表，位置:`, finalPosition);
                
                // 檢查是否還有下一顆珠子
                if (floatingBeads[0].beadIndex < selectedBeads.length - 1) {
                  // 還有下一顆珠子，立即開始
                  const nextBeadIndex = floatingBeads[0].beadIndex + 1;
                  const nextBead = selectedBeads[nextBeadIndex];
                  
                  console.log(`開始下一顆珠子: ${nextBead.name}, 索引: ${nextBeadIndex}`);
                  
                  // 使用 setTimeout 確保狀態更新不會阻塞
                  setTimeout(() => {
                    setFloatingBeads([{
                      ...nextBead,
                      id: `floating-${nextBead.id}`,
                      beadIndex: nextBeadIndex
                    }]);
                  }, 50);
                } else {
                  // 所有珠子都串完了
                  console.log('所有珠子串珠完成！開始手鍊成形動畫！');
                  setFloatingBeads([]);
                  
                  // 先淡出直線串珠元素，然後淡入圓形手鍊
                  setTimeout(() => {
                    // 淡出直線串珠相關元素
                    const stringingLine = document.querySelector('.stringing-line');
                    const strungBeads = document.querySelectorAll('.strung-bead');
                    
                    if (stringingLine) {
                      stringingLine.style.transition = 'opacity 0.5s ease-out';
                      stringingLine.style.opacity = '0';
                    }
                    
                    strungBeads.forEach(bead => {
                      bead.style.transition = 'opacity 0.5s ease-out';
                      bead.style.opacity = '0';
                    });
                    
                    // 0.5秒後淡入圓形手鍊
                    setTimeout(() => {
                      createCircularBracelet();
                    }, 500);
                  }, 300);
                }
              }}
            >
              <img 
                src={floatingBeads[0].image} 
                alt={floatingBeads[0].name}
                style={{
                  width: (() => {
                    if (floatingBeads[0].type === '過渡珠') return '15px';
                    if (floatingBeads[0].type === '米珠' || floatingBeads[0].type === '珍珠') return '21px';
                    if (floatingBeads[0].type === '米珠') return '40px';
                    return '60px';
                  })(),
                  height: (() => {
                    if (floatingBeads[0].type === '過渡珠') return '15px';
                    if (floatingBeads[0].type === '米珠' || floatingBeads[0].type === '珍珠') return '21px';
                    if (floatingBeads[0].type === '米珠') return '60px';
                    return '60px';
                  })(),
                  objectFit: 'contain',
                  borderRadius: '50%',
                  filter: 'none',
                  boxShadow: 'none',
                  outline: 'none',
                  border: 'none'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallbackBead = document.createElement('div');
                  fallbackBead.style.cssText = `
                    width: ${(() => {
                      if (floatingBeads[0].type === '過渡珠') return '15px';
                      if (floatingBeads[0].type === '米珠' || floatingBeads[0].type === '珍珠') return '21px';
                      if (floatingBeads[0].type === '米珠') return '40px';
                      return '60px';
                    })()};
                    height: ${(() => {
                      if (floatingBeads[0].type === '過渡珠') return '15px';
                      if (floatingBeads[0].type === '米珠' || floatingBeads[0].type === '珍珠') return '21px';
                      if (floatingBeads[0].type === '米珠') return '60px';
                      return '60px';
                    })()};
                    background-color: ${floatingBeads[0].color};
                    border-radius: 50%;
                  `;
                  e.target.parentNode.appendChild(fallbackBead);
                }}
              />
            </div>
          )}

          {/* 完成串珠 + 保存設計 + 保存圖片按鈕 */}
          <div className="complete-actions">
            <button
              className="complete-stringing-btn"
              onClick={completeStringingAnimation}
              title="完成串珠"
            >
              ✨ 完成串珠
            </button>
            <button
              className="save-after-animation-btn"
              onClick={() => onSaveFloatingDesign(stringWidth, stringLength)}
              title="保存設計到推薦搭配"
            >
              💾 保存設計
            </button>

          </div>
        </div>
      )}
      
      <div className="tray-title">
        <h3>🌳 木質串珠盤</h3>
        <div className="string-width-selector">
          <span>線材寬度：</span>
          <button 
            className={`string-width-btn ${stringWidth === 'thin' ? 'active' : ''}`}
            onClick={() => setStringWidth('thin')}
            title="細線"
          >
            🧵 細線
          </button>
          <button 
            className={`string-width-btn ${stringWidth === 'medium' ? 'active' : ''}`}
            onClick={() => setStringWidth('medium')}
            title="中等線"
          >
            🧶 中等
          </button>
          <button 
            className={`string-width-btn ${stringWidth === 'thick' ? 'active' : ''}`}
            onClick={() => setStringWidth('thick')}
            title="粗線"
          >
            🪢 粗線
          </button>
        </div>
        <div className="string-length-selector">
          <span>串珠長度：</span>
          <button 
            className={`string-length-btn ${stringLength === 'half' ? 'active' : ''}`}
            onClick={() => setStringLength('half')}
            title="半圓串珠"
          >
            🌙 半圓
          </button>
          <button 
            className={`string-length-btn ${stringLength === 'four-thirds' ? 'active' : ''}`}
            onClick={() => setStringLength('four-thirds')}
            title="4/3圓串珠"
          >
            🔄 4/3圓
          </button>
          <button 
            className={`string-length-btn ${stringLength === 'full' ? 'active' : ''}`}
            onClick={() => setStringLength('full')}
            title="全圓串珠"
          >
            ⭕ 全圓
          </button>
        </div>
        <div className="stringing-capacity-hint">
          <span>💡 可串珠子：</span>
          <span>
            {(() => {
              switch (stringLength) {
                case 'half': return '🌙 半圓可串 10 顆珠子';
                case 'four-thirds': return '🔄 4/3圓可串 13 顆珠子';
                case 'full': return '⭕ 全圓可串 16 顆珠子';
                default: return '⭕ 全圓可串 16 顆珠子';
              }
            })()}
          </span>
        </div>
        <div className="tray-buttons">
          <button
            className="save-design-btn"
            onClick={() => onSaveDesign(stringWidth, stringLength)}
            title="保存設計至推薦搭配展示區"
          >
            💾 保存設計
          </button>
          <button
            className="start-stringing-btn"
            onClick={() => {
              console.log('內聯點擊測試！');
              startStringingAnimation();
            }}
            title="開始串珠"
          >
            🧵 開始串珠
          </button>
        </div>
      </div>
      
      <div 
        className={`wooden-bead-tray ${isDraggingOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* 同心圓設計區域 */}
        <div className="concentric-circles">
          <div className="circle outer-circle"></div>
        </div>
        
        {/* 串珠區域 */}
        <div className="bead-stringing-area">
          {/* 始終顯示凹槽指示器 */}
          <div className="drop-zone-indicator">
          </div>
          
          {/* 串珠線連接器 - 始終顯示圓形線條 */}
          <svg 
            className="string-connector" 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            {/* 根據選擇的長度繪製不同長度的圓弧 */}
            <path
              d={(() => {
                const cx = 162;
                const cy = 160;
                const r = 125;
                const startAngle = -Math.PI / 2; // 12點鐘方向開始
                
                let endAngle;
                switch (stringLength) {
                  case 'half':
                    endAngle = startAngle + Math.PI; // 半圓：180度
                    break;
                  case 'four-thirds':
                    endAngle = startAngle + (3 * Math.PI / 2); // 4/3圓：270度
                    break;
                  case 'full':
                  default:
                    endAngle = startAngle + (2 * Math.PI); // 全圓：360度
                    break;
                }
                
                // 計算起點和終點
                const startX = cx + r * Math.cos(startAngle);
                const startY = cy + r * Math.sin(startAngle);
                const endX = cx + r * Math.cos(endAngle);
                const endY = cy + r * Math.sin(endAngle);
                
                // 繪製圓弧路徑
                if (stringLength === 'full') {
                  // 全圓使用更可靠的路徑命令，稍微偏移終點避免起點終點相同
                  const endAngleOffset = startAngle + (2 * Math.PI) - 0.001;
                  const endXOffset = cx + r * Math.cos(endAngleOffset);
                  const endYOffset = cy + r * Math.sin(endAngleOffset);
                  return `M ${startX} ${startY} A ${r} ${r} 0 1 1 ${endXOffset} ${endYOffset}`;
                } else {
                  // 半圓和4/3圓使用 path 元素
                  const largeArcFlag = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
                  return `M ${startX} ${startY} A ${r} ${r} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
                }
              })()}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={stringWidth === 'thin' ? '2' : stringWidth === 'medium' ? '3' : '5'}
              opacity="0.8"
            />
          </svg>
          
          {/* 顯示珠子（如果有） */}
          {selectedBeads.length > 0 && (
            <div className="bead-string">
              {selectedBeads.map((bead, index) => {
                const position = calculateBeadPosition(index, selectedBeads.length, bead.type, selectedBeads);
                return (
                  <div 
                    key={bead.id}
                    className="stringed-bead"
                    data-type={bead.type}
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      left: position.left,
                      top: position.top,
                      transform: 'translate(-50%, -50%)',
                      width: (bead.type === '過渡珠') ? '15px' : 
                             (bead.type === '米珠' || bead.type === '珍珠') ? '21px' : 
                             (bead.type === '米珠' ? '40px' : '60px'),
                      height: (bead.type === '過渡珠') ? '15px' : 
                              (bead.type === '米珠' || bead.type === '珍珠') ? '21px' : 
                              (bead.type === '米珠' ? '60px' : '60px'),
                      position: 'absolute',
                      zIndex: 2
                    }}
                    onClick={() => removeBead(bead.id)}
                    title={`點擊移除 ${bead.name}`}
                  >
                    <img 
                      src={bead.image} 
                      alt={`${bead.name}${bead.type}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius: '50%',
                        outline: 'none',
                        border: 'none',
                        filter: 'none',
                        boxShadow: 'none',
                        textShadow: 'none'
                      }}
                      onError={(e) => {
                        console.error(`${bead.name}珠子圖片載入失敗:`, e);
                        // 如果圖片載入失敗，回退到原有樣式
                        e.target.style.display = 'none';
                        // 顯示備用的顏色珠子
                        const fallbackBead = document.createElement('div');
                        fallbackBead.style.cssText = `
                          width: 100%;
                          height: 100%;
                          background-color: ${bead.color};
                          border-radius: 50%;
                        `;
                        e.target.parentNode.appendChild(fallbackBead);
                      }}
                      onLoad={() => {
                        console.log(`${bead.name}珠子圖片載入成功`);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* 串珠統計 */}
      <div className="stringing-stats">
        <div className="stat-item">
          <span className="stat-label">已串珠子:</span>
          <span className="stat-value">
            {(() => {
              const bigBeads = selectedBeads.filter(bead => !(bead.type === '米珠' || bead.type === '珍珠' || bead.type === '過渡珠')).length;
              const smallBeads = selectedBeads.filter(bead => bead.type === '米珠' || bead.type === '珍珠' || bead.type === '過渡珠').length;
              const totalCount = bigBeads + (smallBeads * 0.5);
              return totalCount.toFixed(1);
            })()}/{(() => {
              switch (stringLength) {
                case 'half': return '10';
                case 'four-thirds': return '13';
                case 'full': return '16';
                default: return '16';
              }
            })()}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">串珠長度:</span>
          <span className="stat-value">{selectedBeads.length * 60}px</span>
        </div>
      </div>
      
      {/* 操作按鈕 */}
      <div className="tray-controls">
        <button 
          className="tray-btn clear-btn"
          onClick={() => setSelectedBeads([])}
          disabled={selectedBeads.length === 0}
        >
          清空串珠
        </button>
        <button 
          className="tray-btn save-btn"
          onClick={() => {
            if (selectedBeads.length > 0) {
              // 保存串珠設計到localStorage
              const designData = {
                beads: selectedBeads,
                timestamp: Date.now(),
                designName: `串珠設計_${new Date().toLocaleString()}`
              };
              localStorage.setItem('savedBeadDesign', JSON.stringify(designData));
              
              const beadNames = selectedBeads.map(bead => bead.name).join(', ');
              alert(`已保存串珠設計：${beadNames}\n現在可以到串珠評分區查看您的設計！`);
            }
          }}
          disabled={selectedBeads.length === 0}
        >
          保存設計
        </button>
      </div>
    </div>
  );
};

const BeadCabinet = () => {
  const [openDrawers, setOpenDrawers] = useState({});
  const [selectedDrawer, setSelectedDrawer] = useState(null);
  const [draggedBead, setDraggedBead] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [extractingBead, setExtractingBead] = useState(null);
  const [extractedBeads, setExtractedBeads] = useState([]);
  const [showExtractionAnimation, setShowExtractionAnimation] = useState(false);
  const [floatingBeads, setFloatingBeads] = useState({});
  const [showHintText, setShowHintText] = useState(true);
  const [selectedBeads, setSelectedBeads] = useState([]);

  // 調試浮空狀態變化
  useEffect(() => {
    console.log('浮空狀態變化:', floatingBeads);
    console.log('浮空狀態鍵值:', Object.keys(floatingBeads));
  }, [floatingBeads]);

  // 重置浮空狀態（清除錯誤的數字鍵值）
  useEffect(() => {
    // 檢查是否有數字鍵值，如果有則清除
    const hasNumericKeys = Object.keys(floatingBeads).some(key => !isNaN(key));
    if (hasNumericKeys) {
      console.log('檢測到數字鍵值，清除浮空狀態');
      setFloatingBeads({});
    }
  }, []);

  const toggleDrawer = (drawerId) => {
    console.log('點擊抽屜:', drawerId);
    console.log('抽屜ID類型:', typeof drawerId);
    console.log('當前抽屜狀態:', openDrawers);
    console.log('當前浮空狀態:', floatingBeads);
    
    // 如果抽屜已經打開，則觸發浮空展示
    if (openDrawers[drawerId]) {
      console.log('抽屜已打開，觸發浮空展示');
      setFloatingBeads(prev => {
        const newFloatingState = {
          ...prev,
          [drawerId]: !prev[drawerId]
        };
        console.log('新的浮空狀態:', newFloatingState);
        return newFloatingState;
      });
      return;
    }
    
    // 否則打開抽屜
    console.log('打開抽屜');
    setOpenDrawers(prev => {
      const newDrawerState = {
        ...prev,
        [drawerId]: true
      };
      console.log('新的抽屜狀態:', newDrawerState);
      return newDrawerState;
    });
    setSelectedDrawer(drawerId);
    // 隱藏提示文字
    setShowHintText(false);
  };

  // 關閉抽屜
  const closeDrawer = (drawerId, event) => {
    event.stopPropagation();
    console.log('關閉抽屜:', drawerId);
    setOpenDrawers(prev => {
      const newDrawerState = {
        ...prev,
        [drawerId]: false
      };
      
      // 檢查是否所有抽屜都已關閉
      const allDrawers = [...glassBeads, ...crystalBeads, ...woodBeads, ...smallBeads];
      const hasOpenDrawers = allDrawers.some(drawer => newDrawerState[drawer.id]);
      
      // 如果沒有開啟的抽屜，顯示提示文字
      if (!hasOpenDrawers) {
        setShowHintText(true);
      }
      
      return newDrawerState;
    });
    // 同時關閉浮空展示
    setFloatingBeads(prev => ({
      ...prev,
      [drawerId]: false
    }));
  };

  // 點擊珠子添加到串珠盤
  const onClickToTray = (bead) => {
    console.log('=== 主組件 onClickToTray 函數被調用 ===');
    console.log('接收到的珠子數據:', bead);
    console.log('當前 selectedBeads:', selectedBeads);
    
    setSelectedBeads(prev => {
      const newBeads = [...prev, { ...bead, id: Date.now() }];
      console.log('更新後的珠子陣列:', newBeads.map((b, i) => `${i + 1}. ${b.name}`));
      return newBeads;
    });
    
    console.log('珠子添加完成，新的 selectedBeads 長度:', selectedBeads.length + 1);
  };

  // 定義珠子的顏色和類型，以及對應的內部頁面
  const beadColors = [
    { id: 1, color: '#FF6B9D', name: '米色', type: '玻璃珠', page: '/tutorial', shine: '#FFB6C1', image: '/light-pink-bead-ID1.png' },
    { id: 2, color: '#4ECDC4', name: '薄荷綠', type: '玻璃珠', page: '/patterns', shine: '#98FB98', image: '/mint-green-bead-ID2.png' },
    { id: 3, color: '#FFE66D', name: '橘色', type: '玻璃珠', page: '/tutorial', shine: '#FFFFE0', image: '/orange-bead-ID3.png' },
    { id: 4, color: '#FF6B6B', name: '金棕', type: '玻璃珠', page: '/patterns', shine: '#FFB6C1', image: '/gold-brown-bead-ID4.png' },
    { id: 5, color: '#4ECDC4', name: '紅色', type: '玻璃珠', page: '/tutorial', shine: '#87CEEB', image: '/red-bead-ID5.png' },
    { id: 6, color: '#FFD700', name: '黃粉色', type: '玻璃珠', page: '/tutorial', shine: '#FFFACD', image: '/yellow-pink-bead-ID6.png' },
    { id: 7, color: '#87CEEB', name: '粉色', type: '玻璃珠', page: '/tutorial', shine: '#F0F8FF', image: '/pink-bead-ID7.png' },
    { id: 8, color: '#98FB98', name: '深紫色', type: '水晶珠', page: '/patterns', shine: '#F0FFF0', image: '/dark-purple-bead-ID8.png' },
    { id: 9, color: '#FFA07A', name: '金棕', type: '水晶珠', page: '/patterns', shine: '#FFD700', image: '/gold-brown-bead-ID9.png' },
    { id: 10, color: '#FFB6C1', name: '紅色', type: '水晶珠', page: '/patterns', shine: '#FFF0F5', image: '/red-bead-ID10.png' },
    { id: 11, color: '#F0E68C', name: '粉色', type: '水晶珠', page: '/tutorial', shine: '#FFF8DC', image: '/pink-bead-ID11.png' },
    { id: 12, color: '#DC143C', name: '淡紫色', type: '水晶珠', page: '/patterns', shine: '#FFF0F5', image: '/light-purple-bead-ID12.png' },
    { id: 13, color: '#40E0D0', name: '靛色', type: '水晶珠', page: '/tutorial', shine: '#F0FFFF', image: '/indigo-bead-ID13.png' },
    { id: 14, color: '#98FB98', name: '天空藍', type: '水晶珠', page: '/patterns', shine: '#F0FFF0', image: '/sky-blue-bead-ID14.png' },
    { id: 15, color: '#DDA0DD', name: '淺藍', type: '水晶珠', page: '/tutorial', shine: '#E6E6FA', image: '/light-blue-bead-ID15.png' },
    { id: 16, color: '#DDA0DD', name: '紅棕', type: '水晶珠', page: '/patterns', shine: '#F8F8FF', image: '/red-brown-bead-ID16.png' },
    { id: 17, color: '#F0E68C', name: '深棕', type: '木珠', page: '/tutorial', shine: '#FFFACD', image: '/dark-brown-bead-ID17.png' },
    { id: 18, color: '#4682B4', name: '淺棕', type: '木珠', page: '/patterns', shine: '#F0F8FF', image: '/light-brown-bead-ID18.png' },
    { id: 19, color: '#228B22', name: '黑色', type: '木珠', page: '/tutorial', shine: '#F0FFF0', image: '/black-bead-ID19.png' },
    { id: 20, color: '#FF69B4', name: '白色', type: '珍珠', page: '/patterns', shine: '#FFF0F5', image: '/white-pearl-ID20.png' },
    { id: 21, color: '#00CED1', name: '金色', type: '過渡珠', page: '/tutorial', shine: '#F0FFFF', image: '/gold-bead-ID21.png' },
    { id: 22, color: '#FF4500', name: '銀色', type: '過渡珠', page: '/tutorial', shine: '#FFF5EE', image: '/silver-bead-ID22.png' },
    { id: 23, color: '#32CD32', name: '黑色', type: '米珠', page: '/tutorial', shine: '#F0FFF0', image: '/black-bead-ID23.png' },
    { id: 24, color: '#9370DB', name: '白色', type: '米珠', page: '/patterns', shine: '#F8F8FF', image: '/white-bead-ID24.png' },
    { id: 25, color: '#FF6347', name: '酒紅', type: '米珠', page: '/patterns', shine: '#FFF5EE', image: '/tomato-red-bead-ID25.png' }
  ];
  // 保留原有的四個櫃子分類系統

  // 處理內部頁面導航
  const handleInternalNavigation = (page, event) => {
    event.stopPropagation();
    window.location.href = page;
  };

  // 處理詳細資訊
  const handleDetailInfo = (drawerId, event) => {
    event.stopPropagation();
    console.log(`查看抽屜 ${drawerId} 的詳細資訊`);
  };

  // 開始拖曳珠子
  const handleDragStart = (bead, event) => {
    console.log('開始拖曳珠子:', bead);
    console.log('拖曳事件:', event);
    console.log('事件目標:', event.target);
    
    setDraggedBead(bead);
    setIsDragging(true);
    event.dataTransfer.effectAllowed = 'copy';
    
    // 設置拖曳數據
    const beadData = JSON.stringify(bead);
    console.log('準備設置的珠子數據:', beadData);
    
    try {
      event.dataTransfer.setData('text/plain', beadData);
      event.dataTransfer.setData('application/json', beadData);
      console.log('拖曳數據已設置成功');
      console.log('設置的數據類型:', event.dataTransfer.types);
    } catch (error) {
      console.error('設置拖曳數據失敗:', error);
    }
    
    // 設置拖曳圖像
    if (event.target) {
      try {
        event.dataTransfer.setDragImage(event.target, 30, 30);
        console.log('拖曳圖像已設置');
      } catch (error) {
        console.error('設置拖曳圖像失敗:', error);
      }
    }
  };

  // 拖曳結束
  const handleDragEnd = () => {
    console.log('拖曳結束');
    setIsDragging(false);
    setDraggedBead(null);
  };

  // 取出珠子動畫
  const extractBead = (bead, event) => {
    event.stopPropagation();
    setExtractingBead(bead);
    setShowExtractionAnimation(true);
    
    // 創建取出動畫
    setTimeout(() => {
      setExtractedBeads(prev => [...prev, { ...bead, id: Date.now(), extractedAt: Date.now() }]);
      setShowExtractionAnimation(false);
      setExtractingBead(null);
    }, 1500);
  };

  // 清理過期的取出珠子
  useEffect(() => {
    const interval = setInterval(() => {
      setExtractedBeads(prev => 
        prev.filter(bead => Date.now() - bead.extractedAt < 5000)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 保存設計到推薦搭配展示區
  const handleSaveDesign = (stringWidth, stringLength) => {
    if (selectedBeads.length === 0) {
      alert('請先串一些珠子再保存設計！');
      return;
    }

    // 創建設計對象
    const design = {
      id: Date.now(),
      name: `設計 ${new Date().toLocaleDateString('zh-TW')}`,
      beads: selectedBeads.map(bead => ({
        name: bead.name,
        type: bead.type,
        color: bead.color,
        image: bead.image
      })),
      stringWidth: stringWidth,
      stringLength: stringLength,
      createdAt: new Date().toISOString()
    };

    // 從 localStorage 獲取現有設計
    const existingDesigns = JSON.parse(localStorage.getItem('beadDesigns') || '[]');
    
    // 添加新設計
    const updatedDesigns = [...existingDesigns, design];
    
    // 保存到 localStorage
    localStorage.setItem('beadDesigns', JSON.stringify(updatedDesigns));

    alert(`設計已保存！\n\n設計名稱: ${design.name}\n珠子數量: ${design.beads.length} 顆\n\n您可以在珠子指南的「💡 推薦搭配」分頁中查看。`);
  };

  // 保存浮空動畫中的串珠樣式到推薦搭配展示區
  const handleSaveFloatingDesign = (stringWidth, stringLength) => {
    if (selectedBeads.length === 0) {
      alert('請先串一些珠子再保存設計！');
      return;
    }

    // 檢查是否有浮空動畫的串珠樣式
    let stringingStyle = null;
    // 直接檢查 DOM 元素是否存在，不依賴 showFloatingAnimation 變數
    const stringingLine = document.querySelector('.stringing-line');
    if (stringingLine) {
      stringingStyle = {
        hasStringingLine: true,
        stringWidth: stringWidth,
        stringLength: stringLength
      };
    }

    // 檢查是否有圓形手鍊
    let braceletStyle = null;
    const braceletContainer = document.querySelector('.bracelet-container');
    if (braceletContainer) {
      // 獲取圓形手鍊的樣式
      const svg = braceletContainer.querySelector('svg');
      if (svg) {
        const circle = svg.querySelector('circle');
        if (circle) {
          braceletStyle = {
            hasBracelet: true,
            radius: parseInt(circle.getAttribute('r')),
            strokeWidth: parseInt(circle.getAttribute('stroke-width')),
            strokeColor: circle.getAttribute('stroke')
          };
        }
      }
    }

    // 創建設計對象
    const design = {
      id: Date.now(),
      name: `浮空動畫設計 ${new Date().toLocaleDateString('zh-TW')}`,
      beads: selectedBeads.map(bead => ({
        name: bead.name,
        type: bead.type,
        color: bead.color,
        image: bead.image
      })),
      stringWidth: stringWidth,
      stringLength: stringLength,
      stringingStyle: stringingStyle, // 串珠線樣式
      braceletStyle: braceletStyle,   // 圓形手鍊樣式
      isFloatingDesign: true,         // 標記為浮空動畫設計
      createdAt: new Date().toISOString()
    };

    // 從 localStorage 獲取現有設計
    const existingDesigns = JSON.parse(localStorage.getItem('beadDesigns') || '[]');
    
    // 添加新設計
    const updatedDesigns = [...existingDesigns, design];
    
    // 保存到 localStorage
    localStorage.setItem('beadDesigns', JSON.stringify(updatedDesigns));

    // 構建保存訊息
    let saveMessage = `浮空動畫設計已保存！\n\n設計名稱: ${design.name}\n珠子數量: ${design.beads.length} 顆`;
    
    if (stringingStyle) {
      saveMessage += `\n串珠線樣式: ${stringWidth === 'thin' ? '細線' : stringWidth === 'medium' ? '中等線' : '粗線'}`;
    }
    
    if (braceletStyle) {
      saveMessage += `\n圓形手鍊: 半徑${braceletStyle.radius}px, 線寬${braceletStyle.strokeWidth}px`;
    }
    
    saveMessage += `\n\n您可以在珠子指南的「💡 推薦搭配」分頁中查看。`;

    alert(saveMessage);
  };

  // 創建抽屜陣列 - 按類型分類
  const glassBeads = [];      // 玻璃珠 (7個)
  const crystalBeads = [];    // 水晶珠 (9個)
  const woodBeads = [];       // 木珠 (3個)
  const smallBeads = [];      // 小珠子：米珠、珍珠、過渡珠 (6個)

  // 分類珠子
  beadColors.forEach((bead, index) => {
    const { id, ...beadData } = bead; // 移除原始的id屬性
    
    if (bead.type === '玻璃珠') {
      glassBeads.push({
        id: `glass-${index}`,
        ...beadData
      });
    } else if (bead.type === '水晶珠') {
      crystalBeads.push({
        id: `crystal-${index}`,
        ...beadData
      });
    } else if (bead.type === '木珠') {
      woodBeads.push({
        id: `wood-${index}`,
        ...beadData
      });
    } else if (['米珠', '珍珠', '過渡珠'].includes(bead.type)) {
      smallBeads.push({
        id: `small-${index}`,
        ...beadData
      });
    }
  });

  console.log('玻璃珠數量:', glassBeads.length);
  console.log('水晶珠數量:', crystalBeads.length);
  console.log('木珠數量:', woodBeads.length);
  console.log('小珠子數量:', smallBeads.length);

  return (
    <div className="bead-cabinet-container">
      <div className="cabinet-title">
        <div className="title-header">
          <div className="row align-items-center">
            <div className="col-auto">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => {
                  console.log('返回首頁按鈕被點擊');
                  window.open('http://127.0.0.1:5500/index.html', '_self');
                }}
                title="返回首頁"
              >
                🏠 返回首頁
              </button>
            </div>
            <div className="col text-center">
              <h1 className="h2 mb-0">✨ 珠子收納櫃 ✨</h1>
            </div>
            <div className="col-auto">
              <div className="btn-group btn-group-sm" role="group">
                <button
                  className="btn btn-outline-info"
                  onClick={() => {
                    console.log('珠子指南按鈕被點擊');
                    window.location.href = '/guide';
                  }}
                  title="珠子介紹指南"
                >
                  📚 珠子指南
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => window.location.href = '/rating'}
                  title="串珠評分"
                >
                  🔮 串珠評分
                </button>
              </div>
            </div>
          </div>
        </div>
        {showHintText && <p className="text-center text-muted mt-2">點擊抽屜查看珠子</p>}
      </div>
      
      <div className="main-content">
        {/* 手機版：使用 Swiper 滑動櫃子 */}
        <div className="d-block d-lg-none mobile-cabinet-section">
          <div className="cabinet-instructions mb-3">
            <h3 className="h5 text-center">📚 櫃子操作說明</h3>
            <div className="instruction-content">
              <p className="mb-2"><strong>🔍 查看珠子：</strong>點擊抽屜即可打開查看珠子詳情</p>
              <p className="mb-2"><strong>🧵 選擇珠子：</strong>點擊珠子即可選擇，選中的珠子會顯示在下方串珠盤</p>
              <p className="mb-2"><strong>📝 珠子資訊：</strong>每個抽屜顯示珠子名稱、類型和顏色</p>
              <p className="mb-2"><strong>🎯 快速操作：</strong>使用下方按鈕可快速關閉或打開所有抽屜</p>
              <p className="mb-2"><strong>📱 手機操作：</strong>點擊浮空珠子即可添加到串珠盤，無需拖曳</p>
            </div>
          </div>
          
          {/* 簡化的手機版櫃子佈局 */}
          <div className="mobile-cabinet-grid">
            {/* 玻璃珠櫃子 */}
            <div className="cabinet-unit glass-unit mb-4">
              <div className="cabinet-frame">
                {glassBeads.map((drawer) => (
                  <div key={drawer.id} className="drawer-container">
                    <div 
                      className={`drawer ${openDrawers[drawer.id] ? 'open' : ''}`}
                      onClick={() => toggleDrawer(drawer.id)}
                      style={{ cursor: 'pointer' }}
                      data-drawer-id={drawer.id}
                    >
                      <div className="drawer-front">
                        <div className="drawer-handle"></div>
                      </div>
                      <div className="drawer-content">
                        <div className="bead-info">
                          <div className="drawer-header">
                            <h3>{drawer.name}</h3>
                            <button 
                              className="close-drawer-btn"
                              onClick={(e) => closeDrawer(drawer.id, e)}
                            >
                              ✕
                            </button>
                          </div>
                          <p><strong>類型：</strong>{drawer.type}</p>
                          <p><strong>顏色：</strong>{drawer.color}</p>
                          <div className="bead-pile" data-type={drawer.type}>
                            {[...Array(25)].map((_, i) => {
                              const row = Math.floor(i / 5);
                              const col = i % 5;
                              const left = 20 + (col * 12);
                              const top = 60 + (row * 8);
                              
                              return (
                                <div 
                                  key={i}
                                  className="bead"
                                  data-type={drawer.type}
                                  style={{ 
                                    left: `${left}%`,
                                    top: `${top}%`
                                  }}
                                >
                                  <img 
                                    src={drawer.image} 
                                    alt={`${drawer.name}${drawer.type}`}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'contain',
                                      borderRadius: '50%'
                                    }}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      const fallback = document.createElement('div');
                                      fallback.style.cssText = `
                                        width: 100%;
                                        height: 100%;
                                        background-color: ${drawer.color};
                                        border-radius: 50%;
                                      `;
                                      e.target.parentNode.appendChild(fallback);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <div className="drawer-links">
                            <div className="row g-2">
                              <div className="col-6">
                                <button 
                                  className="btn btn-outline-secondary btn-sm w-100"
                                  onClick={() => window.open(drawer.page, '_blank')}
                                >
                                  📖 查看詳情
                                </button>
                              </div>
                              <div className="col-6">
                                <button 
                                  className="btn btn-primary btn-sm w-100"
                                  onClick={() => onClickToTray(drawer)}
                                  draggable
                                  onDragStart={(e) => {
                                    e.dataTransfer.setData('text/plain', JSON.stringify(drawer));
                                    setDraggedBead(drawer);
                                    setIsDragging(true);
                                  }}
                                >
                                  ✨ 取出珠子
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cabinet-type-label glass-label">
                <span>玻</span>
                <span>璃</span>
                <span>珠</span>
              </div>
            </div>

            {/* 水晶珠櫃子 */}
            <div className="cabinet-unit crystal-unit mb-4">
              <div className="cabinet-frame">
                {crystalBeads.map((drawer) => (
                  <div key={drawer.id} className="drawer-container">
                    <div 
                      className={`drawer ${openDrawers[drawer.id] ? 'open' : ''}`}
                      onClick={() => toggleDrawer(drawer.id)}
                      style={{ cursor: 'pointer' }}
                      data-drawer-id={drawer.id}
                    >
                      <div className="drawer-front">
                        <div className="drawer-handle"></div>
                      </div>
                      <div className="drawer-content">
                        <div className="bead-info">
                          <div className="drawer-header">
                            <h3>{drawer.name}</h3>
                            <button 
                              className="close-drawer-btn"
                              onClick={(e) => closeDrawer(drawer.id, e)}
                            >
                              ✕
                            </button>
                          </div>
                          <p><strong>類型：</strong>{drawer.type}</p>
                          <p><strong>顏色：</strong>{drawer.color}</p>
                          <div className="bead-pile" data-type={drawer.type}>
                            {[...Array(25)].map((_, i) => {
                              const row = Math.floor(i / 5);
                              const col = i % 5;
                              const left = 20 + (col * 12);
                              const top = 60 + (row * 8);
                              
                              return (
                                <div 
                                  key={i}
                                  className="bead"
                                  data-type={drawer.type}
                                  style={{ 
                                    left: `${left}%`,
                                    top: `${top}%`
                                  }}
                                >
                                  <img 
                                    src={drawer.image} 
                                    alt={`${drawer.name}${drawer.type}`}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'contain',
                                      borderRadius: '50%'
                                    }}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      const fallback = document.createElement('div');
                                      fallback.style.cssText = `
                                        width: 100%;
                                        height: 100%;
                                        background-color: ${drawer.color};
                                        border-radius: 50%;
                                      `;
                                      e.target.parentNode.appendChild(fallback);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <div className="drawer-links">
                            <div className="row g-2">
                              <div className="col-6">
                                <button 
                                  className="btn btn-outline-secondary btn-sm w-100"
                                  onClick={() => window.open(drawer.page, '_blank')}
                                >
                                  📖 查看詳情
                                </button>
                              </div>
                              <div className="col-6">
                                <button 
                                  className="btn btn-primary btn-sm w-100"
                                  onClick={() => onClickToTray(drawer)}
                                  draggable
                                  onDragStart={(e) => {
                                    e.dataTransfer.setData('text/plain', JSON.stringify(drawer));
                                    setDraggedBead(drawer);
                                    setIsDragging(true);
                                  }}
                                >
                                  ✨ 取出珠子
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cabinet-type-label crystal-label">
                <span>水</span>
                <span>晶</span>
                <span>珠</span>
              </div>
            </div>

            {/* 木珠櫃子 */}
            <div className="cabinet-unit wood-unit mb-4">
              <div className="cabinet-frame">
                {woodBeads.map((drawer) => (
                  <div key={drawer.id} className="drawer-container">
                    <div 
                      className={`drawer ${openDrawers[drawer.id] ? 'open' : ''}`}
                      onClick={() => toggleDrawer(drawer.id)}
                      style={{ cursor: 'pointer' }}
                      data-drawer-id={drawer.id}
                    >
                      <div className="drawer-front">
                        <div className="drawer-handle"></div>
                      </div>
                      <div className="drawer-content">
                        <div className="bead-info">
                          <div className="drawer-header">
                            <h3>{drawer.name}</h3>
                            <button 
                              className="close-drawer-btn"
                              onClick={(e) => closeDrawer(drawer.id, e)}
                            >
                              ✕
                            </button>
                          </div>
                          <p><strong>類型：</strong>{drawer.type}</p>
                          <p><strong>顏色：</strong>{drawer.color}</p>
                          <div className="bead-pile" data-type={drawer.type}>
                            {[...Array(25)].map((_, i) => {
                              const row = Math.floor(i / 5);
                              const col = i % 5;
                              const left = 20 + (col * 12);
                              const top = 60 + (row * 8);
                              
                              return (
                                <div 
                                  key={i}
                                  className="bead"
                                  data-type={drawer.type}
                                  style={{ 
                                    left: `${left}%`,
                                    top: `${top}%`
                                  }}
                                >
                                  <img 
                                    src={drawer.image} 
                                    alt={`${drawer.name}${drawer.type}`}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'contain',
                                      borderRadius: '50%'
                                    }}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      const fallback = document.createElement('div');
                                      fallback.style.cssText = `
                                        width: 100%;
                                        height: 100%;
                                        background-color: ${drawer.color};
                                        border-radius: 50%;
                                      `;
                                      e.target.parentNode.appendChild(fallback);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <div className="drawer-links">
                            <div className="row g-2">
                              <div className="col-6">
                                <button 
                                  className="btn btn-outline-secondary btn-sm w-100"
                                  onClick={() => window.open(drawer.page, '_blank')}
                                >
                                  📖 查看詳情
                                </button>
                              </div>
                              <div className="col-6">
                                <button 
                                  className="btn btn-primary btn-sm w-100"
                                  onClick={() => onClickToTray(drawer)}
                                  draggable
                                  onDragStart={(e) => {
                                    e.dataTransfer.setData('text/plain', JSON.stringify(drawer));
                                    setDraggedBead(drawer);
                                    setIsDragging(true);
                                  }}
                                >
                                  ✨ 取出珠子
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cabinet-type-label wood-label">
                <span>木</span>
                <span>珠</span>
                <span>子</span>
              </div>
            </div>

            {/* 小珠子櫃子 */}
            <div className="cabinet-unit small-unit mb-4">
              <div className="cabinet-frame">
                {smallBeads.map((drawer) => (
                  <div key={drawer.id} className="drawer-container">
                    <div 
                      className={`drawer ${openDrawers[drawer.id] ? 'open' : ''}`}
                      onClick={() => toggleDrawer(drawer.id)}
                      style={{ cursor: 'pointer' }}
                      data-drawer-id={drawer.id}
                    >
                      <div className="drawer-front">
                        <div className="drawer-handle"></div>
                      </div>
                      <div className="drawer-content">
                        <div className="bead-info">
                          <div className="drawer-header">
                            <h3>{drawer.name}</h3>
                            <button 
                              className="close-drawer-btn"
                              onClick={(e) => closeDrawer(drawer.id, e)}
                            >
                              ✕
                            </button>
                          </div>
                          <p><strong>類型：</strong>{drawer.type}</p>
                          <p><strong>顏色：</strong>{drawer.color}</p>
                          <div className="bead-pile" data-type={drawer.type}>
                            {[...Array(25)].map((_, i) => {
                              const row = Math.floor(i / 5);
                              const col = i % 5;
                              const left = 20 + (col * 12);
                              const top = 60 + (row * 8);
                              
                              return (
                                <div 
                                  key={i}
                                  className="bead"
                                  data-type={drawer.type}
                                  style={{ 
                                    left: `${left}%`,
                                    top: `${top}%`
                                  }}
                                >
                                  <img 
                                    src={drawer.image} 
                                    alt={`${drawer.name}${drawer.type}`}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'contain',
                                      borderRadius: '50%'
                                    }}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      const fallback = document.createElement('div');
                                      fallback.style.cssText = `
                                        width: 100%;
                                        height: 100%;
                                        background-color: ${drawer.color};
                                        border-radius: 50%;
                                      `;
                                      e.target.parentNode.appendChild(fallback);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <div className="drawer-links">
                            <div className="row g-2">
                              <div className="col-6">
                                <button 
                                  className="btn btn-outline-secondary btn-sm w-100"
                                  onClick={() => window.open(drawer.page, '_blank')}
                                >
                                  📖 查看詳情
                                </button>
                              </div>
                              <div className="col-6">
                                <button 
                                  className="btn btn-primary btn-sm w-100"
                                  onClick={() => onClickToTray(drawer)}
                                  draggable
                                  onDragStart={(e) => {
                                    e.dataTransfer.setData('text/plain', JSON.stringify(drawer));
                                    setDraggedBead(drawer);
                                    setIsDragging(true);
                                  }}
                                >
                                  ✨ 取出珠子
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cabinet-type-label small-label">
                <span>小</span>
                <span>珠</span>
                <span>子</span>
              </div>
            </div>
          </div>
        </div>

        {/* 桌面版：原有的收納櫃佈局 */}
        <div className="d-none d-lg-block cabinet-section">
          {/* 櫃子操作說明 */}
          <div className="cabinet-instructions">
            <h3>📚 櫃子操作說明</h3>
            <div className="instruction-content">
              <p><strong>🔍 查看珠子：</strong>點擊抽屜即可打開查看珠子詳情</p>
              <p><strong>🧵 選擇珠子：</strong>點擊珠子即可選擇，選中的珠子會顯示在右側串珠盤</p>
              <p><strong>📝 珠子資訊：</strong>每個抽屜顯示珠子名稱、類型和顏色</p>
              <p><strong>🎯 快速操作：</strong>使用下方按鈕可快速關閉或打開所有抽屜</p>
              <p><strong>📱 手機操作：</strong>點擊浮空珠子即可添加到串珠盤，無需拖曳</p>
            </div>
          </div>
          
          <div className="bead-cabinet">
            {/* 櫃子上半部分 */}
            <div className="cabinet-upper-section">
              {/* 第一個櫃子：玻璃珠 */}
              <div className="cabinet-unit glass-unit">
                <div className="cabinet-frame">
                  {glassBeads.map((drawer) => (
                    <div key={drawer.id} className="drawer-container">
                      <div 
                        className={`drawer ${openDrawers[drawer.id] ? 'open' : ''}`}
                        onClick={() => toggleDrawer(drawer.id)}
                        style={{ cursor: 'pointer' }}
                        data-drawer-id={drawer.id}
                      >
                        <div className="drawer-front">
                          <div className="drawer-handle"></div>
                        </div>
                        <div className="drawer-content">
                          <div className="bead-info">
                            <div className="drawer-header">
                              <h3>{drawer.name}</h3>
                              <button 
                                className="close-drawer-btn"
                                onClick={(e) => closeDrawer(drawer.id, e)}
                              >
                                ✕
                              </button>
                            </div>
                            <p><strong>類型：</strong>{drawer.type}</p>
                            <p><strong>顏色：</strong>{drawer.color}</p>
                            <div className="bead-pile" data-type={drawer.type}>
                              {[...Array(25)].map((_, i) => {
                                const row = Math.floor(i / 5);
                                const col = i % 5;
                                const left = 20 + (col * 12);
                                const top = 60 + (row * 8);
                                
                                return (
                                  <div 
                                    key={i}
                                    className="bead"
                                    data-type={drawer.type}
                                    style={{ 
                                      left: `${left}%`,
                                      top: `${top}%`
                                    }}
                                  >
                                    <img 
                                      src={drawer.image} 
                                      alt={`${drawer.name}${drawer.type}`}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        borderRadius: '50%'
                                      }}
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                        const fallback = document.createElement('div');
                                        fallback.style.cssText = `
                                          width: 100%;
                                          height: 100%;
                                          background-color: ${drawer.color};
                                          border-radius: 50%;
                                        `;
                                        e.target.parentNode.appendChild(fallback);
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            <div className="drawer-links">
                              <button 
                                className="link-btn external-link"
                                onClick={() => window.open(drawer.page, '_blank')}
                              >
                                查看詳情
                              </button>
                              <button 
                                className="draggable-bead"
                                onClick={() => onClickToTray(drawer)}
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData('text/plain', JSON.stringify(drawer));
                                  setDraggedBead(drawer);
                                  setIsDragging(true);
                                }}
                              >
                                取出珠子
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cabinet-type-label glass-label">
                  <span>玻</span>
                  <span>璃</span>
                  <span>珠</span>
                </div>
              </div>

              {/* 第二個櫃子：水晶珠 */}
              <div className="cabinet-unit crystal-unit">
                <div className="cabinet-frame">
                  {crystalBeads.map((drawer) => (
                    <div key={drawer.id} className="drawer-container">
                      <div 
                        className={`drawer ${openDrawers[drawer.id] ? 'open' : ''}`}
                        onClick={() => toggleDrawer(drawer.id)}
                        style={{ cursor: 'pointer' }}
                        data-drawer-id={drawer.id}
                      >
                        <div className="drawer-front">
                          <div className="drawer-handle"></div>
                        </div>
                        <div className="drawer-content">
                          <div className="bead-info">
                            <div className="drawer-header">
                              <h3>{drawer.name}</h3>
                              <button 
                                className="close-drawer-btn"
                                onClick={(e) => closeDrawer(drawer.id, e)}
                              >
                                ✕
                              </button>
                            </div>
                            <p><strong>類型：</strong>{drawer.type}</p>
                            <p><strong>顏色：</strong>{drawer.color}</p>
                            <div className="bead-pile" data-type={drawer.type}>
                              {[...Array(25)].map((_, i) => {
                                const row = Math.floor(i / 5);
                                const col = i % 5;
                                const left = 20 + (col * 12);
                                const top = 60 + (row * 8);
                                
                                return (
                                  <div 
                                    key={i}
                                    className="bead"
                                    data-type={drawer.type}
                                    style={{ 
                                      left: `${left}%`,
                                      top: `${top}%`
                                    }}
                                  >
                                    <img 
                                      src={drawer.image} 
                                      alt={`${drawer.name}${drawer.type}`}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        borderRadius: '50%'
                                      }}
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                        const fallback = document.createElement('div');
                                        fallback.style.cssText = `
                                          width: 100%;
                                          height: 100%;
                                          background-color: ${drawer.color};
                                          border-radius: 50%;
                                        `;
                                        e.target.parentNode.appendChild(fallback);
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            <div className="drawer-links">
                              <button 
                                className="link-btn external-link"
                                onClick={() => window.open(drawer.page, '_blank')}
                              >
                                查看詳情
                              </button>
                              <button 
                                className="draggable-bead"
                                onClick={() => onClickToTray(drawer)}
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData('text/plain', JSON.stringify(drawer));
                                  setDraggedBead(drawer);
                                  setIsDragging(true);
                                }}
                              >
                                取出珠子
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cabinet-type-label crystal-label">
                  <span>水</span>
                  <span>晶</span>
                  <span>珠</span>
                </div>
              </div>
            </div>

            {/* 櫃子下半部分 */}
            <div className="cabinet-lower-section">
              {/* 第三個櫃子：木珠 */}
              <div className="cabinet-unit wood-unit">
                <div className="cabinet-frame">
                  {woodBeads.map((drawer) => (
                    <div key={drawer.id} className="drawer-container">
                      <div 
                        className={`drawer ${openDrawers[drawer.id] ? 'open' : ''}`}
                        onClick={() => toggleDrawer(drawer.id)}
                        style={{ cursor: 'pointer' }}
                        data-drawer-id={drawer.id}
                      >
                        <div className="drawer-front">
                          <div className="drawer-handle"></div>
                        </div>
                        <div className="drawer-content">
                          <div className="bead-info">
                            <div className="drawer-header">
                              <h3>{drawer.name}</h3>
                              <button 
                                className="close-drawer-btn"
                                onClick={(e) => closeDrawer(drawer.id, e)}
                              >
                                ✕
                              </button>
                            </div>
                            <p><strong>類型：</strong>{drawer.type}</p>
                            <p><strong>顏色：</strong>{drawer.color}</p>
                            <div className="bead-pile" data-type={drawer.type}>
                              {[...Array(25)].map((_, i) => {
                                const row = Math.floor(i / 5);
                                const col = i % 5;
                                const left = 20 + (col * 12);
                                const top = 60 + (row * 8);
                                
                                return (
                                  <div 
                                    key={i}
                                    className="bead"
                                    data-type={drawer.type}
                                    style={{ 
                                      left: `${left}%`,
                                      top: `${top}%`
                                    }}
                                  >
                                    <img 
                                      src={drawer.image} 
                                      alt={`${drawer.name}${drawer.type}`}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        borderRadius: '50%'
                                      }}
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                        const fallback = document.createElement('div');
                                        fallback.style.cssText = `
                                          width: 100%;
                                          height: 100%;
                                          background-color: ${drawer.color};
                                          border-radius: 50%;
                                        `;
                                        e.target.parentNode.appendChild(fallback);
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            <div className="drawer-links">
                              <button 
                                className="link-btn external-link"
                                onClick={() => window.open(drawer.page, '_blank')}
                              >
                                查看詳情
                              </button>
                              <button 
                                className="draggable-bead"
                                onClick={() => onClickToTray(drawer)}
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData('text/plain', JSON.stringify(drawer));
                                  setDraggedBead(drawer);
                                  setIsDragging(true);
                                }}
                              >
                                取出珠子
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cabinet-type-label wood-label">
                  <span>木</span>
                  <span>珠</span>
                </div>
              </div>

              {/* 第四個櫃子：小珠子 */}
              <div className="cabinet-unit small-unit">
                <div className="cabinet-frame">
                  {smallBeads.map((drawer) => (
                    <div key={drawer.id} className="drawer-container">
                      <div 
                        className={`drawer ${openDrawers[drawer.id] ? 'open' : ''}`}
                        onClick={() => toggleDrawer(drawer.id)}
                        style={{ cursor: 'pointer' }}
                        data-drawer-id={drawer.id}
                      >
                        <div className="drawer-front">
                          <div className="drawer-handle"></div>
                        </div>
                        <div className="drawer-content">
                          <div className="bead-info">
                            <div className="drawer-header">
                              <h3>{drawer.name}</h3>
                              <button 
                                className="close-drawer-btn"
                                onClick={(e) => closeDrawer(drawer.id, e)}
                              >
                                ✕
                              </button>
                            </div>
                            <p><strong>類型：</strong>{drawer.type}</p>
                            <p><strong>顏色：</strong>{drawer.color}</p>
                            <div className="bead-pile" data-type={drawer.type}>
                              {[...Array(25)].map((_, i) => {
                                const row = Math.floor(i / 5);
                                const col = i % 5;
                                const left = 20 + (col * 12);
                                const top = 60 + (row * 8);
                                
                                return (
                                  <div 
                                    key={i}
                                    className="bead"
                                    data-type={drawer.type}
                                    style={{ 
                                      left: `${left}%`,
                                      top: `${top}%`
                                    }}
                                  >
                                    <img 
                                      src={drawer.image} 
                                      alt={`${drawer.name}${drawer.type}`}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        borderRadius: '50%'
                                      }}
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                        const fallback = document.createElement('div');
                                        fallback.style.cssText = `
                                          width: 100%;
                                          height: 100%;
                                          background-color: ${drawer.color};
                                          border-radius: 50%;
                                        `;
                                        e.target.parentNode.appendChild(fallback);
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            <div className="drawer-links">
                              <button 
                                className="link-btn external-link"
                                onClick={() => window.open(drawer.page, '_blank')}
                              >
                                查看詳情
                              </button>
                              <button 
                                className="draggable-bead"
                                onClick={() => onClickToTray(drawer)}
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData('text/plain', JSON.stringify(drawer));
                                  setDraggedBead(drawer);
                                  setIsDragging(true);
                                }}
                              >
                                取出珠子
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cabinet-type-label small-label">
                  <span>小</span>
                  <span>珠</span>
                  <span>子</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cabinet-controls">
            <div className="row g-2">
              <div className="col-6">
                <button 
                  className="btn btn-outline-danger w-100"
                  onClick={() => {
                    setOpenDrawers({});
                    setShowHintText(true);
                    setFloatingBeads({}); // 關閉所有浮空珠子
                  }}
                >
                  <i className="bi bi-x-circle"></i> 關閉所有抽屜
                </button>
              </div>
              <div className="col-6">
                <button 
                  className="btn btn-outline-success w-100"
                  onClick={() => {
                    const allDrawers = {};
                    [...glassBeads, ...crystalBeads, ...woodBeads, ...smallBeads].forEach(drawer => {
                      allDrawers[drawer.id] = true;
                    });
                    setOpenDrawers(allDrawers);
                  }}
                >
                  <i className="bi bi-arrow-up-circle"></i> 打開所有抽屜
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 手機版：下方木質串珠盤區域 */}
        <div className="d-block d-lg-none mobile-tray-section">
          <WoodenBeadTray 
            selectedBeads={selectedBeads}
            setSelectedBeads={setSelectedBeads}
            onSaveDesign={(stringWidth, stringLength) => handleSaveDesign(stringWidth, stringLength)}
            onSaveFloatingDesign={handleSaveFloatingDesign}
          />
        </div>

        {/* 桌面版：右側木質串珠盤區域 */}
        <div className="d-none d-lg-block tray-section">
          <WoodenBeadTray 
            selectedBeads={selectedBeads}
            setSelectedBeads={setSelectedBeads}
            onSaveDesign={(stringWidth, stringLength) => handleSaveDesign(stringWidth, stringLength)}
            onSaveFloatingDesign={handleSaveFloatingDesign}
          />
        </div>
      </div>

      {/* 取出珠子動畫 */}
      {showExtractionAnimation && extractingBead && (
        <div className="extraction-animation">
          <div className="extraction-bead" style={{ backgroundColor: extractingBead.color }}>
            <div className="bead-shine"></div>
            <div className="bead-reflection"></div>
          </div>
          <div className="extraction-sparkles">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="sparkle" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>
      )}

      {/* 取出的珠子顯示 */}
      {extractedBeads.map((bead) => (
        <div
          key={bead.id}
          className="extracted-bead"
          style={{ 
            backgroundColor: bead.color,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`
          }}
        >
          <div className="bead-shine"></div>
          <div className="bead-reflection"></div>
        </div>
      ))}

      {/* 浮空展示的珠子 */}
      {Object.entries(floatingBeads).map(([drawerId, isFloating]) => {
        console.log('渲染浮空珠子:', drawerId, isFloating);
        console.log('抽屜ID類型:', typeof drawerId);
        if (!isFloating) return null;
        
        const allDrawers = [...glassBeads, ...crystalBeads, ...woodBeads, ...smallBeads];
        console.log('所有抽屜ID:', allDrawers.map(d => d.id));
        const drawer = allDrawers.find(d => d.id === drawerId);
        console.log('找到抽屜:', drawer);
        if (!drawer) {
          console.log('未找到抽屜，drawerId:', drawerId);
          console.log('可用的抽屜ID:', allDrawers.map(d => d.id));
          return null;
        }
        
        return (
          <FloatingBead 
            key={drawerId}
            drawer={drawer}
            drawerId={drawerId}
            onClose={() => {
              console.log('關閉浮空展示:', drawerId);
              setFloatingBeads(prev => ({ ...prev, [drawerId]: false }));
              // 同時關閉對應的抽屜
              setOpenDrawers(prev => {
                const newDrawerState = { ...prev, [drawerId]: false };
                
                // 檢查是否所有抽屜都已關閉
                const allDrawers = [...glassBeads, ...crystalBeads, ...woodBeads, ...smallBeads];
                const hasOpenDrawers = allDrawers.some(drawer => newDrawerState[drawer.id]);
                
                // 如果沒有開啟的抽屜，顯示提示文字
                if (!hasOpenDrawers) {
                  setShowHintText(true);
                }
                
                return newDrawerState;
              });
            }}
            onClickToTray={(bead) => {
              console.log('=== 主組件 onClickToTray 函數被調用 ===');
              console.log('接收到的珠子數據:', bead);
              console.log('當前 selectedBeads:', selectedBeads);
              console.log('setSelectedBeads 函數:', setSelectedBeads);
              
              setSelectedBeads(prev => {
                const newBeads = [...prev, { ...bead, id: Date.now() }];
                console.log('更新後的珠子陣列:', newBeads.map((b, i) => `${i + 1}. ${b.name}`));
                return newBeads;
              });
              
              console.log('珠子添加完成，新的 selectedBeads 長度:', selectedBeads.length + 1);
            }}
          />
        );
      })}
    </div>
  );
};

export default BeadCabinet;
  /*
 * 版本記錄：
 * v2.0 - 2024-12-12: 版本2 - 完整串珠動畫系統完成
 *   - ✅ 第一顆珠子串珠動畫正常
 *   - ✅ 第二顆及後續珠子串珠動畫正常
 *   - ✅ 移除浮動效果
 *   - ✅ 珠子不會重疊
 *   - ✅ 終點位置計算正確
 *   - ✅ 使用 0.707 (cos45°) 計算45度旋轉終點
 *   - ✅ 間距規則：前大後小35px, 前小後小20px, 前大後大50px, 前小後大40px
 *   - ✅ 動畫速度：1.5秒滑動，無等待時間
 *   - ✅ 所有珠子參照第一顆終點位置計算
 * 
 * v1.0 - 2024-12-12: 版本1 - 第一顆珠子串珠動畫完成
 *   - ✅ 第一顆珠子串珠動畫正常
 *   - ✅ 移除浮動效果
 *   - ✅ 刪除第二顆之後的複雜邏輯
 *   - ✅ 珠子不會重疊
 *   - ✅ 終點位置計算正確
 *   - ✅ 使用 0.707 (cos45°) 計算45度旋轉終點
 */

