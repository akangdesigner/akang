import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppInitializer from './AppInitializer';
import AppRouter from './AppRouter';
import MusicPlayer from './MusicPlayer';
import './App.css';

function App() {
  return (
    <AppInitializer>
      <Router>
        <div className="App">
          <MusicPlayer />
          <AppRouter />
        </div>
      </Router>
    </AppInitializer>
  );
}

export default App;
