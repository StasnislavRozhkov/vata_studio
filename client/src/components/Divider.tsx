interface Props {
  /** Вариант изгиба нитки, чтобы разделители не были одинаковыми */
  variant?: 1 | 2;
}

// Разделитель блоков в виде "нитки" сумки. Цвет — акцент текущей коллекции.
export function Divider({ variant = 1 }: Props) {
  const d =
    variant === 1
      ? 'M0,20 C150,5 300,35 450,20 S750,5 900,22 S1100,30 1200,18'
      : 'M0,22 C150,32 300,8 450,20 S750,34 900,16 S1100,10 1200,22';

  return (
    <div className="divider" aria-hidden="true">
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
