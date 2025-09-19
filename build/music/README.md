# 音樂檔案放置說明

請將您的音樂檔案放在此資料夾中，支援的格式：
- MP3
- WAV
- OGG
- M4A

## 建議的音樂檔案：

1. **meditation1.mp3** - 冥想音樂 1
2. **meditation2.mp3** - 冥想音樂 2  
3. **nature.mp3** - 自然音效

## 檔案命名規則：

- 使用英文檔名，避免特殊字元
- 建議使用小寫字母和數字
- 檔案大小建議不超過 10MB

## 如何添加新音樂：

1. 將音樂檔案放入 `public/music/` 資料夾
2. 修改 `src/MusicPlayer.jsx` 中的 `playlist` 陣列
3. 添加新的音樂項目到播放清單中

## 範例：

```javascript
const playlist = [
  {
    id: 1,
    name: '冥想音樂 1',
    file: '/music/meditation1.mp3',
    artist: '靈性音樂'
  },
  {
    id: 2,
    name: '冥想音樂 2', 
    file: '/music/meditation2.mp3',
    artist: '靈性音樂'
  },
  {
    id: 3,
    name: '自然音效',
    file: '/music/nature.mp3',
    artist: '自然音樂'
  },
  // 添加新音樂
  {
    id: 4,
    name: '新音樂',
    file: '/music/new_music.mp3',
    artist: '藝術家名稱'
  }
];
```
