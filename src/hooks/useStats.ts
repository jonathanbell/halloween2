import { useState, useEffect, useMemo, useRef } from 'react';
import type { StatsData } from '../types';

export const useStats = (currentCount: number, candyRemaining: number, initialCandyCount: number) => {
  const startTimeRef = useRef(Date.now());
  const [timestamps, setTimestamps] = useState<number[]>([]);

  // Track when a new visitor arrives
  useEffect(() => {
    if (currentCount > timestamps.length) {
      setTimestamps(prev => [...prev, Date.now()]);
    }
  }, [currentCount, timestamps.length]);

  // Calculate all stats in a memoized way
  const stats = useMemo<StatsData>(() => {
    const now = Date.now();
    const elapsedHours = (now - startTimeRef.current) / (1000 * 60 * 60);
    
    let trickOrTreatersPerHour = 0;
    let averageTimeBetween = 0;
    let candyDepletionRate = 0;

    if (elapsedHours > 0) {
      trickOrTreatersPerHour = Math.round((currentCount / elapsedHours) * 10) / 10;
      
      if (timestamps.length > 1) {
        const totalTime = timestamps.reduce((acc, time, i) => {
          if (i === 0) return acc;
          return acc + (time - timestamps[i - 1]);
        }, 0);
        averageTimeBetween = Math.round(totalTime / (timestamps.length - 1) / 1000 / 60 * 10) / 10;
      }

      const candyUsed = initialCandyCount - candyRemaining;
      candyDepletionRate = Math.round((candyUsed / elapsedHours) * 10) / 10;
    }

    return {
      trickOrTreatersPerHour,
      averageTimeBetween,
      candyDepletionRate,
      startTime: startTimeRef.current,
      timestamps,
    };
  }, [currentCount, candyRemaining, initialCandyCount, timestamps]);

  // Update stats periodically without causing re-renders
  const [, forceUpdate] = useState({});
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({});
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return stats;
};