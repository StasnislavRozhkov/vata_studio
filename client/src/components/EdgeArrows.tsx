interface Props {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

// Боковые "зелёные зоны" из макета: мягкое цветное свечение + стрелки.
export function EdgeArrows({ canPrev, canNext, onPrev, onNext }: Props) {
  return (
    <>
      <button
        className="edge edge--left"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Предыдущая коллекция"
      >
        <span className="edge__glow" />
        <svg className="edge__arrow" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 5l-7 7 7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        className="edge edge--right"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Следующая коллекция"
      >
        <span className="edge__glow" />
        <svg className="edge__arrow" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
