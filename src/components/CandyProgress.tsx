import React from 'react';
import './CandyProgress.css';

interface CandyProgressProps {
  candyRemaining: number;
  initialCandyCount: number;
}

export const CandyProgress: React.FC<CandyProgressProps> = ({ candyRemaining, initialCandyCount }) => {
  const percentage = (candyRemaining / initialCandyCount) * 100;
  const isLow = percentage < 20;
  const isCritical = percentage < 10;
  const isEmpty = candyRemaining === 0;

  let colorClass = 'green';
  if (percentage <= 20) colorClass = 'red';
  else if (percentage <= 50) colorClass = 'yellow';

  return (
    <div className="candy-progress-container">
      <div className="candy-header">
        <span className="candy-title">🍬 Candy Supply 🍬</span>
        <span className="candy-count">{candyRemaining} / {initialCandyCount}</span>
      </div>
      
      <div className="progress-bar-outer">
        <div 
          className={`progress-bar-inner ${colorClass} ${isCritical ? 'critical' : ''} ${isEmpty ? 'empty' : ''}`}
          style={{ width: `${Math.max(0, percentage)}%` }}
        >
          <div className="progress-glow"></div>
        </div>
        
        {isEmpty && (
          <div className="empty-message">
            🎃 OUT OF CANDY! 🎃
          </div>
        )}
      </div>

      <div className="candy-icons">
        {Array.from({ length: 10 }).map((_, i) => (
          <span 
            key={i} 
            className={`candy-icon ${i * 10 >= percentage ? 'depleted' : ''}`}
          >
            {i % 3 === 0 ? '🍬' : i % 3 === 1 ? '🍭' : '🍫'}
          </span>
        ))}
      </div>
    </div>
  );
};