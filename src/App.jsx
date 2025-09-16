import React from 'react';
import BeadCabinet from './BeadCabinet';
import BeadGuide from './BeadGuide';
import BeadRating from './BeadRating';
import BeadStores from './BeadStores';
import DebugFloatingBeads from './DebugFloatingBeads';
import HomePage from './HomePage';
import DailyFortune from './DailyFortune';
import MusicPlayer from './MusicPlayer';
import './App.css';

function App() {
  // 檢查URL路徑來決定顯示哪個組件
  const path = window.location.pathname;
  
  const renderPage = () => {
    if (path === '/debug') {
      return <DebugFloatingBeads />;
    }
    
    if (path === '/guide') {
      return <BeadGuide />;
    }
    
    if (path === '/rating') {
      return <BeadRating />;
    }
    
    if (path === '/stores') {
      return <BeadStores />;
    }
    
    if (path === '/home') {
      return <HomePage />;
    }
    
    if (path === '/fortune') {
      return <DailyFortune />;
    }
    
    return <BeadCabinet />;
  };
  
  return (
    <div className="App">
      <MusicPlayer />
      <div className="page-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
