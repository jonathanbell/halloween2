import React from 'react';
import type { StatsData } from '../types';
import './StatsDisplay.css';

interface StatsDisplayProps {
  stats: StatsData;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = React.memo(({ stats }) => {
  return (
    <div className="stats-container">
      <div className="stat-item">
        <span className="stat-icon">👻</span>
        {/* <span className="stat-icon">🧟‍♂️</span> */}
        <span className="stat-label">Candies Given (Past Hour):</span>
        <span className="stat-value">{stats.candiesGivenPastHour !== null ? stats.candiesGivenPastHour : 'N/A'}</span>
      </div>

      <div className="stat-item">
        <span className="stat-icon">⏱️</span>
        <span className="stat-label">Average Wait:</span>
        <span className="stat-value">
          {stats.averageTimeBetween > 0 ? `${stats.averageTimeBetween} min` : 'N/A'}
        </span>
      </div>

      <div className="stat-item">
        <span className="stat-icon">🍬</span>
        <span className="stat-label">Depletion Rate:</span>
        <span className="stat-value">{stats.candyDepletionRate}/hr</span>
      </div>
    </div>
  );
});
