import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

// 全局音樂狀態管理
const globalMusicState = {
  isPlaying: false,
  currentTrack: 0,
  volume: 0.5,
  audioElement: null
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(globalMusicState.isPlaying);
  const [currentTrack, setCurrentTrack] = useState(globalMusicState.currentTrack);
  const [volume, setVolume] = useState(globalMusicState.volume);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef(null);

  // 音樂播放列表
  const playlist = [
    {
      id: 1,
      name: '音樂 1',
      file: '/music-1.mp3',
      artist: '靈性音樂'
    },
    {
      id: 2,
      name: '音樂 2',
      file: '/music-2.mp3',
      artist: '靈性音樂'
    }
  ];

  // 同步全局狀態到本地狀態
  useEffect(() => {
    setIsPlaying(globalMusicState.isPlaying);
    setCurrentTrack(globalMusicState.currentTrack);
    setVolume(globalMusicState.volume);
  }, []);

  // 同步本地狀態到全局狀態
  useEffect(() => {
    globalMusicState.isPlaying = isPlaying;
    globalMusicState.currentTrack = currentTrack;
    globalMusicState.volume = volume;
    globalMusicState.audioElement = audioRef.current;
  }, [isPlaying, currentTrack, volume]);

  // 初始化音頻
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 自動開始播放音樂
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(console.log);
    }
  }, [isPlaying]);

  // 播放/暫停切換
  const togglePlayPause = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('播放被中斷，這是正常的');
        setIsPlaying(false);
      }
    }
  };

  // 切換到下一首歌
  const nextTrack = async () => {
    const nextIndex = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextIndex);
    if (isPlaying && audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.load();
        await audioRef.current.play();
      } catch (error) {
        console.log('播放被中斷，這是正常的');
        setIsPlaying(false);
      }
    }
  };

  // 切換到上一首歌
  const prevTrack = async () => {
    const prevIndex = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    if (isPlaying && audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.load();
        await audioRef.current.play();
      } catch (error) {
        console.log('播放被中斷，這是正常的');
        setIsPlaying(false);
      }
    }
  };

  // 選擇特定歌曲
  const selectTrack = async (index) => {
    setCurrentTrack(index);
    if (isPlaying && audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.load();
        await audioRef.current.play();
      } catch (error) {
        console.log('播放被中斷，這是正常的');
        setIsPlaying(false);
      }
    }
    setShowPlaylist(false);
  };

  // 音量控制
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // 當歌曲結束時自動播放下一首
  const handleEnded = () => {
    nextTrack();
  };

  // 處理音頻錯誤
  const handleError = (e) => {
    console.log('音頻載入錯誤:', e);
    setIsPlaying(false);
  };

  // 處理音頻載入完成
  const handleLoadedData = () => {
    console.log('音頻載入完成');
  };

  return (
    <div className="music-player">
      {/* 隱藏的音頻元素 */}
      <audio
        ref={audioRef}
        src={playlist[currentTrack].file}
        onEnded={handleEnded}
        onError={handleError}
        onLoadedData={handleLoadedData}
        preload="metadata"
      />

      {/* 主要音樂按鈕 */}
      <button 
        className={`main-music-btn ${isPlaying ? 'playing' : 'paused'}`}
        onClick={() => setShowPlaylist(!showPlaylist)}
        title={isPlaying ? '音樂播放中' : '音樂已暫停'}
      >
        {isPlaying ? '♪' : '♫'}
      </button>

      {/* 簡化選單 */}
      {showPlaylist && (
        <div className="music-sidebar">
          <div className="simple-controls">
            <button 
              className="simple-btn play-btn" 
              onClick={togglePlayPause}
              title={isPlaying ? '暫停' : '播放'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            
            <button 
              className="simple-btn next-btn" 
              onClick={nextTrack}
              title="切換歌曲"
            >
              ⏭
            </button>
            
            <button 
              className="simple-btn close-btn" 
              onClick={() => setShowPlaylist(false)}
              title="關閉選單"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
