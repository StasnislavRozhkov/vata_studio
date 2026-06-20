import { useRef, type PointerEvent as ReactPointerEvent } from 'react';

interface SwipeHandlers {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  /** Текущее смещение пальца в px (для живого drag), -1..1 нормализуется снаружи */
  onDrag?: (dx: number) => void;
}

const THRESHOLD = 60; // px, после которого свайп засчитывается

// Лёгкий свайп/драг на pointer-событиях (мышь + тач).
export function useSwipe({ onSwipeLeft, onSwipeRight, onDrag }: SwipeHandlers) {
  const startX = useRef(0);
  const startY = useRef(0);
  const active = useRef(false);
  const locked = useRef<'h' | 'v' | null>(null);

  const onPointerDown = (e: ReactPointerEvent) => {
    active.current = true;
    locked.current = null;
    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!active.current) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    // Определяем направление жеста один раз
    if (locked.current === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      locked.current = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
    }
    if (locked.current === 'h') {
      onDrag?.(dx);
    }
  };

  const finish = (e: ReactPointerEvent) => {
    if (!active.current) return;
    active.current = false;
    const dx = e.clientX - startX.current;
    if (locked.current === 'h') {
      if (dx <= -THRESHOLD) onSwipeLeft();
      else if (dx >= THRESHOLD) onSwipeRight();
    }
    onDrag?.(0);
    locked.current = null;
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: finish,
    onPointerCancel: finish,
    onPointerLeave: finish,
  };
}
