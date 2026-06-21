import { useEffect, useRef, useState } from 'react';

// Видео-анимация появления сумок. Стартует один раз при попадании в зону
// видимости и замирает на последнем кадре (loop отключён). Уважает reduced-motion.
//
// Белый фон убран на самом видео (прозрачная VP9-alpha WebM). Если браузер не
// поддерживает webm/vp9 (Safari) — играет mp4 с белым фоном, а .media__frame
// без класса --alpha прячет белое через mix-blend-mode (запасной путь).
export function VideoBlock() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const played = useRef(false);
  const [alpha, setAlpha] = useState(false);

  useEffect(() => {
    const test = document.createElement('video');
    setAlpha(test.canPlayType('video/webm; codecs="vp9"') !== '');
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      const toEnd = () => {
        try {
          v.currentTime = (v.duration || 0) - 0.05;
        } catch {
          /* ignore */
        }
      };
      if (v.readyState >= 1) toEnd();
      else v.addEventListener('loadedmetadata', toEnd, { once: true });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !played.current) {
            played.current = true;
            v.play().catch(() => {});
          }
        });
      },
      { threshold: 0.5 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`media__frame ${alpha ? 'media__frame--alpha' : ''}`}>
      <video
        ref={ref}
        className="media__video"
        muted
        playsInline
        preload="auto"
        poster="/assets/bags-poster.png"
      >
        <source src="/assets/bags-alpha.webm" type="video/webm" />
        <source src="/assets/bags.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
