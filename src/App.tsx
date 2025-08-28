import React, { useEffect } from 'react';
import { Counter } from './components/Counter';
import { CandyProgress } from './components/CandyProgress';
import { StatsDisplay } from './components/StatsDisplay';
import { ZombieHorde } from './components/ZombieHorde';
import { useCounter } from './hooks/useCounter';
import { useQueryParams } from './hooks/useQueryParams';
import { useStats } from './hooks/useStats';
import './App.css';

function App() {
  const queryParams = useQueryParams();
  const counter = useCounter({
    initialCount: queryParams.currentCount ?? 0,
    initialCandyCount: queryParams.initialCandyCount ?? 100,
  });
  
  const stats = useStats(
    counter.currentCount, 
    counter.candyRemaining, 
    counter.initialCandyCount
  );

  // Keyboard shortcuts for testing
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        counter.reset();
      }
      if (e.key === 'f' && e.ctrlKey) {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [counter]);

  return (
    <div className="app">
      <div className="main-content">
        <Counter 
          count={counter.currentCount} 
          isAnimating={counter.isAnimating}
        />
        
        <CandyProgress 
          candyRemaining={counter.candyRemaining}
          initialCandyCount={counter.initialCandyCount}
        />
        
        <StatsDisplay stats={stats} />
        
        <ZombieHorde 
          triggerAnimation={counter.isAnimating} 
          currentCount={counter.currentCount}
          candyRemaining={counter.candyRemaining}
        />
      </div>

      <div className="instructions">
        <span>Press SPACE to increment • Ctrl+R to reset • Ctrl+F for fullscreen</span>
      </div>
    </div>
  );
}

export default App;