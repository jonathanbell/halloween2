import React from 'react';
import './Counter.css';

interface CounterProps {
  count: number;
  isAnimating: boolean;
}

export const Counter: React.FC<CounterProps> = ({ count, isAnimating }) => {
  const digits = count.toString().padStart(3, '0').split('');

  return (
    <div className="counter-container">
      <div className="counter-label">Now serving customer number:</div>
      <div className={`counter-display ${isAnimating ? 'animating' : ''}`}>
        {digits.map((digit, index) => (
          <div key={index} className="digit-container">
            <div className={`digit ${isAnimating ? 'flip' : ''}`}>
              {digit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};