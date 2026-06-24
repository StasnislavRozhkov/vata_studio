import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Background } from './components/Background';
import { Brand } from './components/Brand';
import { Divider } from './components/Divider';
import { AnimatedText } from './components/AnimatedText';
import { Reveal } from './components/Reveal';
import { VideoBlock } from './components/VideoBlock';
import { collections, INITIAL_INDEX } from './data/collections';

// Длительности интро (мс)
const LOGO_HOLD = 1900; // сколько логотип стоит по центру
const REVEAL = 1200; // переход логотипа наверх + появление фона

export default function App() {
  const [entered, setEntered] = useState(false); // логотип проявился по центру
  const [ready, setReady] = useState(false); // интерфейс раскрылся

  // Запуск интро-таймлайна
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // следующий кадр -> запускаем появление логотипа (переход из opacity 0)
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setEntered(true)),
    );
    const t = window.setTimeout(() => setReady(true), reduce ? 250 : LOGO_HOLD);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, []);

  const active = collections[INITIAL_INDEX]; // центральная коллекция — Fluffy
  const activePalette = active.palette;
  // Соседние коллекции — выглядывают по бокам за центральной сумкой
  const sideLeft = collections[INITIAL_INDEX - 1]; // Metallic
  const sideRight = collections[INITIAL_INDEX + 1]; // Standard

  // Палитра -> CSS-переменные на корне.
  const paletteVars = useMemo<CSSProperties>(() => {
    const p = activePalette;
    return {
      ['--c-bg' as string]: p.bg,
      ['--c-blob-a' as string]: p.blobA,
      ['--c-blob-b' as string]: p.blobB,
      ['--c-blob-c' as string]: p.blobC,
      ['--c-edge' as string]: p.edge,
      ['--c-accent' as string]: p.accent,
      ['--c-text' as string]: p.text,
      ['--reveal-ms' as string]: `${REVEAL}ms`,
    };
  }, [activePalette]);

  // 4 цвета mesh-градиента из активной палитры (светлый -> насыщенный)
  const gradColors = useMemo<[string, string, string, string]>(
    () => [activePalette.bg, activePalette.blobA, activePalette.blobC, activePalette.edge],
    [activePalette],
  );

  return (
    <div
      className={`app ${entered ? 'is-entered' : ''} ${ready ? 'is-ready' : 'is-intro'}`}
      style={paletteVars}
    >
      <Background colors={gradColors} />

      <main className="stage">
        {/* Первый экран — на всю высоту телефона */}
        <section className="screen">
          <Brand />

          <section className="hero">
            <div className="hero__bag">
              {/* Цветное свечение-градиент за сумкой */}
              <span className="hero__glow" />

              {/* Соседние коллекции выглядывают по бокам, бледнее и за центром */}
              <img
                className="hero__side hero__side--left"
                src={sideLeft.image}
                alt=""
                aria-hidden="true"
                draggable={false}
                decoding="async"
                loading="lazy"
              />
              <img
                className="hero__side hero__side--right"
                src={sideRight.image}
                alt=""
                aria-hidden="true"
                draggable={false}
                decoding="async"
                loading="lazy"
              />

              <img
                className="hero__img"
                src={active.image}
                alt={`Сумка ${active.name}`}
                draggable={false}
                decoding="async"
              />
            </div>

            <div className="hero__meta">
              <AnimatedText
                as="h1"
                className="hero__title"
                text={active.name}
                immediate
                stagger={0.07}
              />
            </div>
          </section>
        </section>

        {/* Видео-анимация всех сумок — наверху, вне keyed .story (не рестартует) */}
        <Divider variant={1} />
        <section className="media">
          <AnimatedText as="p" className="block__eyebrow" text="На заказ" stagger={0.03} />
          <AnimatedText
            as="h2"
            className="block__h"
            text={'Любой цвет\nпод ваш запрос'}
            stagger={0.06}
          />
          <AnimatedText
            as="p"
            className="block__p"
            text="Не ограничивайтесь палитрой — сошьём сумку в любом цвете по вашему запросу. Напишите нам, и подберём оттенок и материал индивидуально."
            stagger={0.012}
          />
          <VideoBlock />
        </section>

        {/* Контент конкретной сумки — меняется вместе с коллекцией.
            key={active.id} перезапускает анимацию появления при свайпе. */}
        <div className="story" key={active.id}>
          <Divider variant={1} />

          <section className="block">
            <AnimatedText as="p" className="block__eyebrow" text={active.story.eyebrow} stagger={0.025} />
            <AnimatedText as="h2" className="block__h" text={active.story.heading} stagger={0.06} />
            <AnimatedText as="p" className="block__p" text={active.story.description} stagger={0.012} />
          </section>

          <Divider variant={2} />

          <Reveal as="section" className="block block--list" stagger={0.12}>
            {active.story.features.map((f, i) => (
              <Feature
                key={f.title}
                num={String(i + 1).padStart(2, '0')}
                title={f.title}
                text={f.text}
              />
            ))}
          </Reveal>

          <Divider variant={1} />

          <section className="block block--specs">
            <AnimatedText as="p" className="block__eyebrow" text="Характеристики" stagger={0.03} />
            <Reveal as="dl" className="specs" stagger={0.08}>
              {active.story.specs.map((s) => (
                <div className="specs__row" key={s.label}>
                  <dt className="specs__label">{s.label}</dt>
                  <dd className="specs__value">{s.value}</dd>
                </div>
              ))}
            </Reveal>
          </section>
        </div>

        <Reveal as="footer" className="foot" stagger={0.12}>
          <div className="foot__top">
            <span className="foot__mark">vata</span>
            <div className="foot__social">
              <a
                className="social"
                href="https://instagram.com/@vata__studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                </svg>
              </a>
              <a
                className="social"
                href="https://t.me/@Alisa182"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M21.2 4.3 2.9 11.4c-.9.36-.86 1.65.05 1.95l4.6 1.46 1.77 5.36c.22.66 1.06.84 1.53.32l2.56-2.78 4.6 3.4c.5.37 1.22.1 1.36-.5l3.2-15.1c.16-.78-.6-1.42-1.33-1.1Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path d="m8.1 14.8.3 4.2 2.2-3.3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  <path d="m8.4 14.9 8.6-6.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
          <span className="foot__copy">© 2026 — сделано вручную</span>
        </Reveal>
      </main>
    </div>
  );
}

function Feature({ num, title, text }: { num: string; title: string; text: string }) {
  return (
    <div className="feat">
      <span className="feat__num">{num}</span>
      <div>
        <h3 className="feat__h">{title}</h3>
        <p className="feat__p">{text}</p>
      </div>
    </div>
  );
}
