import { useState, useEffect, useCallback } from 'react';
import type { StatsData } from '../types';

export const useStats = (currentCount: number, candyRemaining: number, initialCandyCount: number) => {
  const [stats, setStats] = useState<StatsData>({
    trickOrTreatersPerHour: 0,
    averageTimeBetween: 0,
    estimatedCandyDepletion: 'N/A',
    candyDepletionRate: 0,
    startTime: Date.now(),
    timestamps: [],
  });

  const updateStats = useCallback(() => {
    const now = Date.now();
    const elapsedHours = (now - stats.startTime) / (1000 * 60 * 60);
    
    if (elapsedHours > 0) {
      const trickOrTreatersPerHour = currentCount / elapsedHours;
      
      const averageTimeBetween = stats.timestamps.length > 1
        ? stats.timestamps.reduce((acc, time, i) => {
            if (i === 0) return acc;
            return acc + (time - stats.timestamps[i - 1]);
          }, 0) / (stats.timestamps.length - 1) / 1000 / 60
        : 0;

      const candyUsed = initialCandyCount - candyRemaining;
      const candyDepletionRate = candyUsed / elapsedHours;
      
      let estimatedCandyDepletion = 'N/A';
      if (candyDepletionRate > 0 && candyRemaining > 0) {
        const hoursRemaining = candyRemaining / candyDepletionRate;
        const minutesRemaining = Math.round(hoursRemaining * 60);
        
        if (minutesRemaining < 60) {
          estimatedCandyDepletion = `${minutesRemaining} minutes`;
        } else {
          const hours = Math.floor(minutesRemaining / 60);
          const minutes = minutesRemaining % 60;
          estimatedCandyDepletion = `${hours}h ${minutes}m`;
        }
      } else if (candyRemaining === 0) {
        estimatedCandyDepletion = 'Out of candy! 🎃';
      }

      setStats(prev => ({
        ...prev,
        trickOrTreatersPerHour: Math.round(trickOrTreatersPerHour * 10) / 10,
        averageTimeBetween: Math.round(averageTimeBetween * 10) / 10,
        estimatedCandyDepletion,
        candyDepletionRate: Math.round(candyDepletionRate * 10) / 10,
      }));
    }
  }, [currentCount, candyRemaining, initialCandyCount, stats.startTime, stats.timestamps]);

  useEffect(() => {
    if (currentCount > stats.timestamps.length) {
      setStats(prev => ({
        ...prev,
        timestamps: [...prev.timestamps, Date.now()],
      }));
    }
  }, [currentCount, stats.timestamps.length]);

  useEffect(() => {
    updateStats();
    const interval = setInterval(updateStats, 5000);
    return () => clearInterval(interval);
  }, [updateStats]);

  return stats;
};