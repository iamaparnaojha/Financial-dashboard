import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export function TransactionAnimationOverlay() {
  const { state } = useApp();
  const [lastTxId, setLastTxId] = useState<string | null>(null);

  useEffect(() => {
    // If we have transactions
    if (state.transactions.length > 0) {
      const latest = state.transactions[0]; // assuming sorted by newest first
      
      if (lastTxId && latest.id !== lastTxId) {
        // A new transaction was added!
        if (latest.type === 'income') {
          triggerIncomeAnimation();
        } else if (latest.type === 'expense') {
          triggerExpenseAnimation();
        }
      }
      setLastTxId(latest.id);
    }
  }, [state.transactions, lastTxId]);

  const triggerIncomeAnimation = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFA500', '#10B981'],
        shapes: ['circle', 'square'],
        scalar: 1.2
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFA500', '#10B981'],
        shapes: ['circle', 'square'],
        scalar: 1.2
      });
      
      // Also shoot some party emojis
      confetti({
        ...defaults,
        particleCount: particleCount / 3,
        origin: { x: randomInRange(0.3, 0.7), y: Math.random() - 0.2 },
        shapeOptions: {
            text: {
                value: ['🎉', '💰', '🤑', '✨']
            }
        },
        scalar: 2
      } as any);

    }, 250);
  };

  const triggerExpenseAnimation = () => {
    // Fire/sad animation
    const duration = 1.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 20, spread: 100, ticks: 100, zIndex: 100, gravity: 2 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        angle: 270,
        origin: { x: randomInRange(0.4, 0.6), y: 0 },
        colors: ['#EF4444', '#DC2626', '#991B1B'],
        shapes: ['circle'],
        scalar: 0.8
      });
      
      confetti({
        ...defaults,
        particleCount: particleCount / 5,
        angle: 270,
        origin: { x: randomInRange(0.4, 0.6), y: 0 },
        shapeOptions: {
            text: {
                value: ['💸', '📉', '🔥']
            }
        },
        scalar: 2
      } as any);
      
    }, 250);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]" />
  );
}
