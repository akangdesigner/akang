# 🔮 掌上靈珠 PalmBeads - App Icon 設定指南

## ✅ 已完成的設定

### 1. config.xml 已更新
- ✅ 應用程式名稱：掌上靈珠 PalmBeads
- ✅ 描述：線上打造您的專屬能量手串，掌握每日個人運勢
- ✅ Android Icon 路徑已設定
- ✅ 新版 Android SplashScreen API 設定（符合 Android 12+ 規範）
PS D:\handmade\plambeads> cordova build android --debug
The "AndroidWindowSplashScreenAnimatedIcon" value does not exist. Cordova's default will be used.
"android:windowSplashScreenBrandingImage" is currently not supported by the splash screen compatibility library. https://issuetracker.google.com/issues/194301890
The "AndroidWindowSplashScreenBrandingImage" value does not exist. Cordova's default will be used.
Source path does not exist: res/icon/android/hdpi.png
### 2. 目錄結構已建立
```
plambeads/
└── res/
    └── icon/
        └── android/  ← 圖示檔案放置位置
```

## 📱 Android App Icon 規格

| 密度 | 尺寸 | 檔案名稱 |
|------|------|----------|
| ldpi | 36x36px | ldpi.png |
| mdpi | 48x48px | mdpi.png |
| hdpi | 72x72px | hdpi.png |
| xhdpi | 96x96px | xhdpi.png |
| xxhdpi | 144x144px | xxhdpi.png |
| xxxhdpi | 192x192px | xxxhdpi.png |

## 🛠️ 生成圖示步驟

### 方法一：快速生成（推薦）
1. 在瀏覽器中開啟 `plambeads/create-icons.html`
2. 點擊「🚀 一鍵生成所有 App Icons」按鈕
3. 系統會自動下載所有 6 個尺寸的檔案
4. 將下載的檔案放入 `plambeads/res/icon/android/` 目錄

### 方法二：使用詳細生成工具
1. 在瀏覽器中開啟 `plambeads/generate-icons.html`
2. 點擊每個尺寸的「下載」按鈕
3. 將下載的檔案放入 `plambeads/res/icon/android/` 目錄

### Splash Screen 設定（可選）
由於我們使用 React 的 LoadingScreen 動畫，Android 原生 Splash Screen 只需要一個簡單的圖片：
- 檔案位置：`plambeads/res/screen/android/splash.png`
- 建議尺寸：1080x1920px（9:16 比例）
- 背景色：深紫色 (#4a148c)
- 內容：您的 logo 居中顯示

### 方法二：手動製作
1. 使用您的 logo 圖片（`74559e4c-3a36-4268-8486-ed99ce2a1abf.png`）
2. 調整為上述 6 種尺寸
3. 確保圖示清晰且符合 Android 設計規範
4. 儲存為 PNG 格式

## 🚀 建置和測試

```bash
# 清理之前的建置
cordova clean android

# 建置 Android APK
cordova build android

# 安裝到裝置測試
cordova run android
```

## 📋 檢查清單

- [ ] 所有 6 個尺寸的圖示檔案已放入正確目錄
- [ ] 圖示檔案名稱正確（ldpi.png, mdpi.png, 等）
- [ ] 執行 `cordova build android`
- [ ] 安裝 APK 到裝置測試
- [ ] 確認桌面圖示顯示正確

## 🎨 設計建議

- 圖示應該是正方形，圓角由系統自動處理
- 使用品牌色彩：深紫色 (#4a148c) 到紫色 (#7b1fa2)
- 確保在小尺寸下依然清晰可見
- 避免過多細節，保持簡潔

## 🔧 故障排除

如果圖示沒有更新：
1. 確認檔案路徑正確
2. 執行 `cordova clean android` 清理快取
3. 重新建置：`cordova build android`
4. 完全卸載舊版本後重新安裝
5. 檢查 config.xml 中的路徑設定

---

**注意：** 我們已經有 Splash Screen 動畫，所以不需要設定啟動畫面圖片，只需要 App Icon 即可。
