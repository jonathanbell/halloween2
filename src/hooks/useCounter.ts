import { useState, useCallback } from 'react';
import type { CounterState } from '../types';
import { updateURLParam } from './useQueryParams';

interface UseCounterProps {
  initialCount?: number;
  initialCandyCount?: number;
}

export const useCounter = ({ initialCount = 0, initialCandyCount = 100 }: UseCounterProps) => {
  const [state, setState] = useState<CounterState>({
    currentCount: initialCount,
    candyRemaining: initialCandyCount - (initialCount * 1), // Adjust candy remaining based on current count
    initialCandyCount: initialCandyCount,
    candyPerChild: 1,
  });

  const [isAnimating, setIsAnimating] = useState(false);

  const increment = useCallback(() => {
    setState(prev => {
      const newCount = prev.currentCount + 1;
      const newCandyRemaining = Math.max(0, prev.candyRemaining - prev.candyPerChild);
      
      updateURLParam('currentCount', newCount);
      
      return {
        ...prev,
        currentCount: newCount,
        candyRemaining: newCandyRemaining,
      };
    });

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  }, []);


  const reset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset the counter?')) {
      setState(prev => ({
        ...prev,
        currentCount: 0,
        candyRemaining: prev.initialCandyCount,
      }));
      updateURLParam('currentCount', 0);
    }
  }, []);

  return {
    ...state,
    increment,
    reset,
    isAnimating,
  };
};