import {
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** сдвиг снизу, px */
  y?: number;
  delay?: number;
  /** если задан — анимировать прямых детей со стаггером (каскад) */
  stagger?: number;
  /** анимировать сразу, без ожидания скролла */
  immediate?: boolean;
}

// Универсальное «дорогое» появление блока (или его детей каскадом)
// при попадании в зону видимости. Уважает prefers-reduced-motion.
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  y = 26,
  delay = 0,
  stagger,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets =
      stagger != null ? (Array.from(el.children) as HTMLElement[]) : [el];
    if (!targets.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(targets, { autoAlpha: 1, y: 0, filter: 'blur(0px)' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y, filter: 'blur(7px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          ease: 'power3.out',
          delay,
          stagger: stagger ?? 0,
          scrollTrigger: immediate
            ? undefined
            : { trigger: el, start: 'top 85%', once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [y, delay, stagger, immediate]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
