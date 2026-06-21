import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Background } from './components/Background';
import { Brand } from './components/Brand';
import { Carousel } from './components/Carousel';
import { Divider } from './components/Divider';
import { AnimatedText } from './components/AnimatedText';
import { Reveal } from './components/Reveal';
import { collections, INITIAL_INDEX } from './data/collections';

// Длительности интро (мс)
const LOGO_HOLD = 1900; // сколько логотип стоит по центру
const REVEAL = 1200; // переход логотипа наверх + появление сумки/фона
const COLOR_INTERVAL = 6000; // интервал автосмены цвета сумки

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [index, setIndex] = useState(INITIAL_INDEX);
  const [entered, setEntered] = useState(false); // логотип проявился по центру
  const [ready, setReady] = useState(false); // интерфейс раскрылся
  // выбранный вариант цвета для каждой коллекции (по id)
  const [variantByCol, setVariantByCol] = useState<Record<string, number>>({});
  const [pageVisible, setPageVisible] = useState(true);

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

  const active = collections[Math.min(index, collections.length - 1)];
  const activeVariant = Math.min(variantByCol[active.id] ?? 0, active.variants.length - 1);
  // Палитра выбранного цвета (или палитра коллекции, если у варианта своей нет)
  const activePalette = active.variants[activeVariant].palette ?? active.palette;

  // Палитра -> CSS-переменные на корне.
  // @property в CSS делает переходы цвета плавными при смене коллекции/цвета.
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

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(collections.length - 1, i + 1));

  const selectVariant = (v: number) =>
    setVariantByCol((m) => ({ ...m, [active.id]: v }));

  // Автоперебор цветов: каждые 4 c -> следующий вариант (по кругу).
  // Зависит от activeVariant, поэтому ручной выбор сбрасывает таймер.
  // Стоп при reduced-motion и когда вкладка не активна.
  useEffect(() => {
    if (!ready || !pageVisible || prefersReducedMotion()) return;
    if (active.variants.length < 2) return;
    const t = window.setTimeout(() => {
      setVariantByCol((m) => {
        const cur = m[active.id] ?? 0;
        return { ...m, [active.id]: (cur + 1) % active.variants.length };
      });
    }, COLOR_INTERVAL);
    return () => window.clearTimeout(t);
  }, [ready, pageVisible, active.id, activeVariant, active.variants.length]);

  // Отслеживаем видимость вкладки (для паузы автоперебора)
  useEffect(() => {
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Предзагрузка фото вариантов активной коллекции -> мгновенное переключение
  useEffect(() => {
    active.variants.forEach((v) => {
      const img = new Image();
      img.src = v.image;
    });
  }, [active]);

  // Клавиатура: ← / → переключают коллекции
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1));
      else if (e.key === 'ArrowRight')
        setIndex((i) => Math.min(collections.length - 1, i + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
            <Carousel
              collections={collections}
              index={index}
              ready={ready}
              variantByCol={variantByCol}
              onPrev={prev}
              onNext={next}
            />

            <div className="hero__meta">
              <AnimatedText
                as="h1"
                className="hero__title"
                text={active.name}
                immediate
                stagger={0.07}
              />

              {/* Образцы цвета — переключают фото текущей коллекции */}
              {active.variants.length > 1 && (
                <div className="swatches" role="group" aria-label="Цвет">
                  {active.variants.map((v, i) => (
                    <button
                      key={v.id}
                      className={`swatch ${i === activeVariant ? 'swatch--on' : ''}`}
                      style={{ ['--sw' as string]: v.swatch }}
                      onClick={() => selectVariant(i)}
                      aria-label={v.name}
                      aria-pressed={i === activeVariant}
                      title={v.name}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Навигатор коллекций — зафиксирован внизу, доступен с любой точки */}
            <nav className="navbar" aria-label="Коллекции">
              <button
                className="navbtn navbtn--prev"
                onClick={prev}
                disabled={index === 0}
                aria-label="Предыдущая коллекция"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="dots">
                {collections.map((c, i) => (
                  <button
                    key={c.id}
                    className={`dot ${i === index ? 'dot--on' : ''}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Коллекция ${c.name}`}
                  />
                ))}
              </div>

              <button
                className="navbtn navbtn--next"
                onClick={next}
                disabled={index === collections.length - 1}
                aria-label="Следующая коллекция"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </nav>
          </section>
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
