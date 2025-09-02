import React, { useEffect, useState } from 'react';
import './CandyRain.css';

interface FallingCandy {
  id: number;
  emoji: string;
  left: number;
  animationDuration: number;
  rotationSpeed: number;
  delay: number;
}

interface CandyRainProps {
  triggerCount: number;
}

const candyEmojis = ['🍬', '🍭', '🍫', '🍪', '🧁', '🍩', '🍰'];

export const CandyRain: React.FC<CandyRainProps> = ({ triggerCount }) => {
  const [fallingCandies, setFallingCandies] = useState<FallingCandy[]>([]);

  useEffect(() => {
    if (triggerCount > 0) {
      const candyCount = Math.floor(Math.random() * 5) + 5;
      const newCandies: FallingCandy[] = [];
      
      for (let i = 0; i < candyCount; i++) {
        newCandies.push({
          id: Date.now() + i,
          emoji: candyEmojis[Math.floor(Math.random() * candyEmojis.length)],
          left: Math.random() * 100,
          animationDuration: (4 + Math.random() * 3) / 1.5,
          rotationSpeed: 1 + Math.random() * 2,
          delay: Math.random() * 0.3
        });
      }
      
      setFallingCandies(prev => [...prev, ...newCandies]);
      
      const longestAnimation = Math.max(...newCandies.map(c => c.animationDuration + c.delay));
      setTimeout(() => {
        setFallingCandies(prev => prev.filter(c => !newCandies.some(nc => nc.id === c.id)));
      }, longestAnimation * 1000);
    }
  }, [triggerCount]);

  return (
    <div className="candy-rain-container">
      {fallingCandies.map(candy => (
        <div
          key={candy.id}
          className="falling-candy"
          style={{
            left: `${candy.left}%`,
            animationDelay: `${candy.delay}s`,
            '--fall-duration': `${candy.animationDuration}s`,
            '--rotation-speed': `${candy.rotationSpeed}s`
          } as React.CSSProperties}
        >
          {candy.emoji}
        </div>
      ))}
    </div>
  );
};