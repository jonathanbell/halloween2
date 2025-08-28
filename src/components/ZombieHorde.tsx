import React, { useEffect, useState } from 'react';
import { useRive } from '@rive-app/react-canvas';
import type { ZombieInstance } from '../types';
import './ZombieHorde.css';

interface ZombieHordeProps {
  triggerAnimation: boolean;
  currentCount: number;
}

export const ZombieHorde: React.FC<ZombieHordeProps> = ({ triggerAnimation, currentCount }) => {
  const [zombies, setZombies] = useState<ZombieInstance[]>([]);

  useEffect(() => {
    // Sync zombies with current count + 1
    setZombies(prev => {
      const newZombies: ZombieInstance[] = [];
      const targetCount = currentCount + 1; // Always have one more zombie than the count

      for (let i = 0; i < targetCount; i++) {
        const existingZombie = prev.find(z => z.id === `zombie-${i}`);

        if (existingZombie) {
          // Keep existing zombie with its current position
          newZombies.push(existingZombie);
        } else {
          // Create new zombie appearing from left side
          newZombies.push({
            id: `zombie-${i}`,
            position: -20 - Math.random() * 10, // Start from left side
            speed: 0.06 + Math.random() * 0.03, // Good shambling pace
            scale: 0.8 + Math.random() * 0.4, // Varied sizes
            yOffset: Math.random() * 10 - 5, // Slight vertical variation
          });
        }
      }

      return newZombies;
    });
  }, [currentCount]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number | null = null;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = (timestamp - lastTimestamp) / 16.67; // Normalize to 60fps
      lastTimestamp = timestamp;

      setZombies(prev => prev.map(zombie => {
        let newPosition = zombie.position + (zombie.speed * deltaTime);

        // Reset zombie when it reaches the candy (right side)
        // Using 105 to reset before going fully off-screen
        if (newPosition > 105) {
          // Reset far enough off-screen to avoid flashing
          newPosition = -35 - Math.random() * 40;
        }

        return { ...zombie, position: newPosition };
      }));

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="zombie-horde-container">
      {zombies.map(zombie => (
        <ZombieWalker
          key={zombie.id}
          zombie={zombie}
        />
      ))}

      {/* Candy target */}
      <div className="candy-target">
        <span className="candy-pile">🍬🍭🍫🍬🍭</span>
      </div>
    </div>
  );
};

interface ZombieWalkerProps {
  zombie: ZombieInstance;
}

const ZombieWalker: React.FC<ZombieWalkerProps> = ({ zombie }) => {
  const { RiveComponent } = useRive({
    src: '/rive/zombie.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
  });

  // Fade out when approaching right edge, fade in when starting from left
  const opacity = zombie.position > 100 ? 0 : zombie.position < -15 ? 0 : 1;

  return (
    <div
      className="zombie-instance"
      style={{
        transform: `translateX(${zombie.position}vw) translateY(${zombie.yOffset}vh) scale(${zombie.scale})`,
        zIndex: Math.floor(zombie.scale * 10),
        opacity,
        transition: 'opacity 0.3s ease',
      }}
    >
      <RiveComponent />
    </div>
  );
};
