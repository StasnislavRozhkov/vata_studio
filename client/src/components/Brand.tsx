// Логотип vata. Стартует крупным по центру экрана и одним непрерывным
// CSS-transform уезжает в шапку (управляется классами is-entered / is-ready на корне).
export function Brand() {
  return (
    <header className="brand">
      <img className="brand__logo" src="/assets/logo.svg" alt="vata" draggable={false} />
    </header>
  );
}
