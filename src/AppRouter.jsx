import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BeadCabinet from './BeadCabinet';
import BeadGuide from './BeadGuide';
import BeadRating from './BeadRating';
import BeadStores from './BeadStores';
import DebugFloatingBeads from './DebugFloatingBeads';
import HomePage from './HomePage';
import DailyFortune from './DailyFortune';

const AppRouter = () => {
  return (
    <div className="page-content">
      <Routes>
        {/* 預設路由重定向到 /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* 各個頁面路由 */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/cabinet" element={<BeadCabinet />} />
        <Route path="/guide" element={<BeadGuide />} />
        <Route path="/rating" element={<BeadRating />} />
        <Route path="/stores" element={<BeadStores />} />
        <Route path="/fortune" element={<DailyFortune />} />
        <Route path="/debug" element={<DebugFloatingBeads />} />
        
        {/* 預設路由，如果沒有匹配到任何路由則顯示 BeadCabinet */}
        <Route path="*" element={<BeadCabinet />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
