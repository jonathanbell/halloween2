import { useEffect } from 'react';
import { Counter } from './components/Counter';
import { CandyProgress } from './components/CandyProgress';
import { StatsDisplay } from './components/StatsDisplay';
import { ZombieHorde } from './components/ZombieHorde';
import { CandyRain } from './components/CandyRain';
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

  // Unified keyboard shortcuts handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+R: Reset counter
      if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        counter.reset();
      }
      // Ctrl+F: Toggle fullscreen
      if (e.key === 'f' && e.ctrlKey) {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      // Space: Increment counter
      if (e.code === 'Space') {
        e.preventDefault();
        counter.increment();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keypress', handleKeyPress);
    };
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

        <CandyRain triggerCount={counter.currentCount} />

        <ZombieHorde
          triggerAnimation={counter.isAnimating}
          currentCount={counter.currentCount}
          candyRemaining={counter.candyRemaining}
        />
      </div>

    </div>
  );
}

export default App;
