import { Fragment, useLayoutEffect, useRef, type ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  /** анимировать сразу при появлении (для контента над сгибом), а не по скроллу */
  immediate?: boolean;
  stagger?: number;
  delay?: number;
}

// Современное появление текста: слова поднимаются с лёгким blur, стаггером.
// Срабатывает при попадании блока в зону видимости (ScrollTrigger) либо сразу.
export function AnimatedText({
  text,
  as: Tag = 'div',
  className,
  immediate = false,
  stagger = 0.045,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>('.aw');
    if (!words.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(words, { autoAlpha: 1, y: 0, filter: 'blur(0px)' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 70, autoAlpha: 0, filter: 'blur(8px)' },
        {
          yPercent: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power3.out',
          stagger,
          delay,
          scrollTrigger: immediate
            ? undefined
            : { trigger: el, start: 'top 82%', once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [text, immediate, stagger, delay]);

  const lines = text.split('\n');
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.split(' ').map((word, wi) => (
            <Fragment key={wi}>
              <span className="aw">{word}</span>{' '}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </Tag>
  );
}
