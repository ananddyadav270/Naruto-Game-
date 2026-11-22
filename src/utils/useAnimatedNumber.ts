import { useEffect, useRef, useState } from 'react';

export function useAnimatedNumber(target: number, durationMs = 550): number {
  const [display, setDisplay] = useState(target);
  const previousRef = useRef(target);

  useEffect(() => {
    const startVal = previousRef.current;
    if (startVal === target) {
      setDisplay(target);
      return;
    }

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      previousRef.current = target;
      setDisplay(target);
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(startVal + (target - startVal) * eased);
      setDisplay(current);

      if (t < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        previousRef.current = target;
      }
    };

    frameId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frameId);
      previousRef.current = target;
    };
  }, [target, durationMs]);

  return display;
}
