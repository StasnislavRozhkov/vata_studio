import { useEffect, useRef } from 'react';
import { Gradient } from 'whatamesh';

interface Props {
  /** 4 цвета градиента (hex) текущей коллекции, от светлого к насыщенному */
  colors: [string, string, string, string];
}

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const easeInOut = (k: number) =>
  k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;

// Минималистичный mesh-градиент в стиле Stripe (WebGL, один canvas).
// Цвета плавно перетекают при смене коллекции через анимацию uniform'ов шейдера.
export function Background({ colors }: Props) {
  // у whatamesh нет публичного типа для uniforms — работаем как с any
  const gradientRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

  // Инициализация один раз
  useEffect(() => {
    const canvas = document.getElementById('gradient-canvas');
    if (!canvas) return;
    // цвета должны быть на canvas ДО инициализации (whatamesh читает их из CSS-переменных)
    colors.forEach((c, i) => canvas.style.setProperty(`--gradient-color-${i + 1}`, c));

    const g = new Gradient();
    g.initGradient('#gradient-canvas');
    gradientRef.current = g;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      g.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Плавная перекраска при смене коллекции
  useEffect(() => {
    const g = gradientRef.current;
    if (!g || !g.uniforms) return;

    const target = colors.map(hexToRgb);
    const baseU = g.uniforms.u_baseColor;
    const layerU = g.uniforms.u_waveLayers.value as any[];

    const from: number[][] = [
      [...baseU.value],
      ...layerU.map((l) => [...l.value.color.value]),
    ];

    const t0 = performance.now();
    const dur = 750;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = (t: number) => {
      const e = easeInOut(Math.min(1, (t - t0) / dur));
      const lerp = (a: number, b: number) => a + (b - a) * e;
      baseU.value = from[0].map((c, j) => lerp(c, target[0][j]));
      layerU.forEach((l, i) => {
        const tgt = target[i + 1] ?? target[target.length - 1];
        l.value.color.value = from[i + 1].map((c, j) => lerp(c, tgt[j]));
      });
      if (e < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);

  return <canvas id="gradient-canvas" className="bg-gradient" aria-hidden="true" />;
}
