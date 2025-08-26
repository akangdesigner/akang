# 共用繪製邏輯的串珠組件實現

## 概述

這個實現將「實際串珠盤」和「預覽圖」的繪製邏輯統一，通過共用同一個 `drawBeads()` 函數來確保兩個組件顯示完全一致的內容，只是縮放比例不同。

## 核心優勢

✅ **完全一致**：預覽和實際串珠盤使用相同的計算邏輯  
✅ **無需額外圖片**：所有內容都是動態生成的  
✅ **易於維護**：修改邏輯只需要改一個地方  
✅ **縮放靈活**：可以輕鬆調整預覽和實際的大小比例  

## 實現方式

### 1. 共用函數

```javascript
// 共用的珠子位置計算函數
const calculateBeadPositions = (beads, scale = 1) => { ... }

// 共用的繪製函數
const drawBeads = (beads, scale = 1, stringLength = 'full', stringWidth = 'medium') => { ... }
```

### 2. 組件使用

```jsx
// 預覽組件（縮放 0.4 倍）
<Preview scale={0.4} beads={beads} />

// 實際串珠盤組件（原始大小）
<ActualBoard scale={1} beads={beads} />
```

## 技術細節

### 縮放計算

- **基礎尺寸**：半徑 125px，圓心 (142, 140)
- **珠子大小**：小珠 15px，大珠 35px
- **間距**：統一 20px
- **縮放公式**：`實際尺寸 = 基礎尺寸 × scale`

### 位置計算

```javascript
// 從12點鐘方向開始，每顆珠子緊接著前一顆
let currentAngle = -Math.PI / 2;

beads.forEach((bead, index) => {
  if (index > 0) {
    const prevBead = beads[index - 1];
    const prevBeadSize = getBeadSize(prevBead.type);
    const gap = 20 * scale;
    const angleIncrement = (prevBeadSize + gap) / radius;
    currentAngle += angleIncrement;
  }
  
  const angle = currentAngle + (beadSize / 2) / radius;
  const x = centerX + Math.cos(angle) * radius;
  const y = centerY + Math.sin(angle) * radius;
});
```

## 使用示例

```jsx
import { Preview, ActualBoard } from './SharedBeadComponents';

const MyComponent = () => {
  const beads = [
    { id: 1, type: '米珠', image: 'light-pink-bead-ID1.png' },
    { id: 2, type: '大珠', image: 'orange-bead-ID3.png' },
    // ... 更多珠子
  ];

  return (
    <div>
      {/* 預覽圖 */}
      <Preview scale={0.4} beads={beads} />
      
      {/* 實際串珠盤 */}
      <ActualBoard scale={1} beads={beads} />
    </div>
  );
};
```

## 支持的參數

### 串珠長度 (stringLength)
- `'half'`：半圓（半徑 80px）
- `'four-thirds'`：4/3圓（半徑 100px）
- `'full'`：全圓（半徑 120px）

### 串珠線寬度 (stringWidth)
- `'thin'`：細線（2px）
- `'medium'`：中等（3px）
- `'thick'`：粗線（4px）

### 縮放比例 (scale)
- 預覽建議：`0.4`（40%）
- 實際大小：`1`（100%）
- 可自定義：任何正數值

## 視覺效果

### 預覽組件 (scale=0.4)
- 尺寸：96px × 96px（120px × 0.4 × 2）
- 珠子：小珠 6px，大珠 14px
- 間距：8px
- 邊框：2px，圓角 15px

### 實際串珠盤 (scale=1)
- 尺寸：240px × 240px（120px × 1 × 2）
- 珠子：小珠 15px，大珠 35px
- 間距：20px
- 邊框：3px，圓角 20px

## 響應式設計

組件會根據螢幕尺寸自動調整樣式：

```css
@media (max-width: 768px) {
  .bead-preview { border-width: 1px; border-radius: 10px; }
  .actual-bead-board { border-width: 2px; border-radius: 15px; }
}

@media (max-width: 480px) {
  .bead-preview { border-radius: 8px; }
  .actual-bead-board { border-radius: 12px; }
}
```

## 結論

這種實現方式確保了預覽串珠盤和實際串珠盤的完全一致性，用戶可以在預覽中看到與實際串珠盤完全相同的珠子排列、間距和整體效果，只是尺寸較小。這大大提升了用戶體驗，避免了預覽與實際不符的問題。
