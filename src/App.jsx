import React from 'react';
import BeadCabinet from './BeadCabinet';
import BeadGuide from './BeadGuide';
import BeadRating from './BeadRating';
import BeadStores from './BeadStores';
import DebugFloatingBeads from './DebugFloatingBeads';
import HomePage from './HomePage';
import './App.css';

function App() {
  // 檢查URL路徑來決定顯示哪個組件
  const path = window.location.pathname;
  
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
  
  return (
    <div className="App">
      <BeadCabinet />
    </div>
  );
}

export default App;
