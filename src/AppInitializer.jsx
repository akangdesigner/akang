import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

const AppInitializer = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCordovaReady, setIsCordovaReady] = useState(false);

  // 檢查是否在 Cordova 環境中
  const isCordova = () => {
    return window.cordova !== undefined;
  };

  // 處理初始化完成
  const handleInitializationComplete = () => {
    setIsInitialized(true);
    
    // 如果在 Cordova 環境中，隱藏啟動畫面
    if (isCordova() && window.navigator && window.navigator.splashscreen) {
      window.navigator.splashscreen.hide();
    }
  };

  useEffect(() => {
    let initializationTimer;
    
    const initializeApp = () => {
      console.log('開始應用程式初始化...');
      
      // 初始化任務陣列
      const tasks = [
        // 1. 預載入關鍵資源
        () => new Promise(resolve => {
          console.log('預載入關鍵資源...');
          const images = [
            '/74559e4c-3a36-4268-8486-ed99ce2a1abf.png',
            '/wooden-tray.png',
            '/blackpaper.jpeg'
          ];
          
          const imagePromises = images.map(src => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => {
                console.log(`圖片載入完成: ${src}`);
                resolve();
              };
              img.onerror = () => {
                console.warn(`圖片載入失敗: ${src}`);
                resolve(); // 即使載入失敗也繼續
              };
              img.src = src;
            });
          });
          
          Promise.all(imagePromises).then(() => {
            console.log('所有圖片載入完成');
            setTimeout(resolve, 300);
          });
        }),
        
        // 2. 等待 Cordova 準備就緒（如果適用）
        () => new Promise(resolve => {
          if (isCordova()) {
            console.log('檢測到 Cordova 環境，等待準備就緒...');
            
            // 檢查是否已經準備就緒
            if (window.cordova && window.cordova.platformId) {
              console.log('Cordova 已經準備就緒');
              resolve();
            } else {
              // 等待 deviceready 事件
              const handleDeviceReady = () => {
                console.log('Cordova deviceready 事件觸發');
                document.removeEventListener('deviceready', handleDeviceReady);
                resolve();
              };
              
              document.addEventListener('deviceready', handleDeviceReady);
              
              // 設定超時，避免永遠等待
              setTimeout(() => {
                console.log('Cordova 準備超時，繼續初始化');
                document.removeEventListener('deviceready', handleDeviceReady);
                resolve();
              }, 2000);
            }
          } else {
            console.log('非 Cordova 環境，跳過 Cordova 初始化');
            resolve();
          }
        }),
        
        // 3. 其他初始化任務
        () => new Promise(resolve => {
          console.log('執行其他初始化任務...');
          // 初始化本地儲存、設定等
          try {
            // 檢查 localStorage 是否可用
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            console.log('本地儲存初始化完成');
          } catch (e) {
            console.warn('本地儲存不可用:', e);
          }
          
          setTimeout(resolve, 200);
        })
      ];
      
      // 依序執行初始化任務
      const runTasks = async () => {
        try {
          for (let i = 0; i < tasks.length; i++) {
            console.log(`執行初始化任務 ${i + 1}/${tasks.length}`);
            await tasks[i]();
          }
          
          console.log('所有初始化任務完成');
          
          // 所有初始化完成，延遲一點時間讓用戶看到載入動畫
          setTimeout(() => {
            console.log('初始化完成，進入應用程式');
            handleInitializationComplete();
          }, 600);
          
        } catch (error) {
          console.error('初始化過程中發生錯誤:', error);
          // 即使發生錯誤也要繼續
          setTimeout(() => {
            handleInitializationComplete();
          }, 1000);
        }
      };
      
      runTasks();
    };

    // 開始初始化（短暫延遲確保 DOM 準備就緒）
    initializationTimer = setTimeout(initializeApp, 50);

    return () => {
      if (initializationTimer) {
        clearTimeout(initializationTimer);
      }
    };
  }, []);

  // 如果還在初始化中，顯示載入畫面
  if (!isInitialized) {
    return <LoadingScreen onLoadingComplete={() => {}} isInitialized={false} />;
  }

  // 初始化完成，渲染應用程式內容
  return children;
};

export default AppInitializer;
