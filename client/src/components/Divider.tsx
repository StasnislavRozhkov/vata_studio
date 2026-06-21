import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  /** Вариант изгиба нитки, чтобы разделители не были одинаковыми */
  variant?: 1 | 2;
}

// Разделитель блоков в виде «нитки» сумки. Цвет — акцент текущей коллекции.
// При попадании в зону видимости нитка «прорисовывается», бусины проявляются.
export function Divider({ variant = 1 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const d =
    variant === 1
      ? 'M0,20 C150,5 300,35 450,20 S750,5 900,22 S1100,30 1200,18'
      : 'M0,22 C150,32 300,8 450,20 S750,34 900,16 S1100,10 1200,22';

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const path = el.querySelector<SVGPathElement>('.divider__thread path');
    const beads = el.querySelectorAll<SVGCircleElement>('.divider__bead');
    if (!path) return;

    const len = path.getTotalLength();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(path, { strokeDasharray: 'none', strokeDashoffset: 0 });
      gsap.set(beads, { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(beads, { autoAlpha: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
      tl.to(path, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' })
        .to(beads, { autoAlpha: 1, duration: 0.4, stagger: 0.1 }, '-=0.3');
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="divider" ref={ref} aria-hidden="true">
      <svg className="divider__thread" viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle className="divider__bead" cx="20" cy={variant === 1 ? 20 : 22} r="4" fill="currentColor" />
        <circle className="divider__bead" cx="1180" cy={variant === 1 ? 18 : 22} r="4" fill="currentColor" />
      </svg>
    </div>
  );
}
