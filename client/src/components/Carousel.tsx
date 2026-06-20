import { useState } from 'react';
import type { Collection, Variant } from '../types';
import { useSwipe } from '../hooks/useSwipe';

interface Props {
  collections: Collection[];
  index: number;
  ready: boolean;
  /** выбранный вариант цвета для каждой коллекции (по id) */
  variantByCol: Record<string, number>;
  onPrev: () => void;
  onNext: () => void;
}

// Фото сумки с плейсхолдером, если файла ещё нет. key={variant.id} снаружи
// перезапускает компонент -> срабатывает fade-анимация при смене цвета.
function BagImage({
  variant,
  collectionName,
  eager,
}: {
  variant: Variant;
  collectionName: string;
  eager: boolean;
}) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="slide__media">
      {!errored ? (
        <img
          className="slide__img"
          src={variant.image}
          alt={`Сумка ${collectionName} — ${variant.name}`}
          draggable={false}
          decoding="async"
          loading={eager ? 'eager' : 'lazy'}
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="slide__ph" style={{ ['--sw' as string]: variant.swatch }}>
          <span className="slide__ph-name">{collectionName}</span>
          <span className="slide__ph-color">{variant.name}</span>
        </span>
      )}
    </div>
  );
}

// Карусель сумок со свайпом и живым перетягиванием.
export function Carousel({
  collections,
  index,
  ready,
  variantByCol,
  onPrev,
  onNext,
}: Props) {
  const [drag, setDrag] = useState(0);

  const swipe = useSwipe({
    onSwipeLeft: onNext, // палец влево -> следующая (standard)
    onSwipeRight: onPrev, // палец вправо -> предыдущая (metallic)
    onDrag: setDrag,
  });

  // Сопротивление на краях, чтобы не утаскивать в пустоту
  const atEdge =
    (index === 0 && drag > 0) || (index === collections.length - 1 && drag < 0);
  const dragAdj = atEdge ? drag * 0.3 : drag;

  const trackStyle = {
    transform: `translate3d(calc(${-index * 100}% + ${dragAdj}px), 0, 0)`,
    transition: drag === 0 ? 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
  };

  return (
    <div className="carousel" {...swipe}>
      <div className="carousel__track" style={trackStyle}>
        {collections.map((c, i) => {
          const vIdx = Math.min(variantByCol[c.id] ?? 0, c.variants.length - 1);
          const variant = c.variants[vIdx];
          return (
            <div className="slide" key={c.id} aria-hidden={i !== index}>
              <div className={`slide__bag ${ready ? 'slide__bag--in' : ''}`}>
                {/* Цветное свечение-градиент за сумкой (цвета коллекции) */}
                <span className="slide__glow" />
                <BagImage
                  key={variant.id}
                  variant={variant}
                  collectionName={c.name}
                  eager={i === index}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
