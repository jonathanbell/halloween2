import React from 'react';
import type { StatsData } from '../types';
import './StatsDisplay.css';

interface StatsDisplayProps {
  stats: StatsData;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  return (
    <div className="stats-container">
      <h3 className="stats-title">📊 Spooky Stats 📊</h3>

      <div className="stat-item">
        <span className="stat-icon">👻</span>
        <span className="stat-label">Per Hour:</span>
        <span className="stat-value">{stats.trickOrTreatersPerHour}</span>
      </div>

      <div className="stat-item">
        <span className="stat-icon">⏱️</span>
        <span className="stat-label">Avg Wait:</span>
        <span className="stat-value">
          {stats.averageTimeBetween > 0 ? `${stats.averageTimeBetween} min` : 'N/A'}
        </span>
      </div>

      <div className="stat-item">
        <span className="stat-icon">🍬</span>
        <span className="stat-label">Depletion Rate:</span>
        <span className="stat-value">{stats.candyDepletionRate}/hr</span>
      </div>

      <div className="stat-item">
        <span className="stat-icon">⏰</span>
        <span className="stat-label">Time Left:</span>
        <span className="stat-value highlight">{stats.estimatedCandyDepletion}</span>
      </div>
    </div>
  );
};
