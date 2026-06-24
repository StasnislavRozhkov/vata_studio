// Экран-заглушка для десктопа: сайт mobile-first, на широких экранах
// показываем шуточную «ошибку» с QR на этот же сайт.
export function DesktopBlock() {
  return (
    <div className="deskblock">
      <div className="deskblock__card">
        <p className="deskblock__code">// error 900 — viewport too big</p>

        <h1 className="deskblock__title">Упс…</h1>
        <p className="deskblock__text">
          Разработчик сшил сайт размером с телефон — на экране компьютера он
          не помещается. Откройте со смартфона: наведите камеру на QR.
        </p>

        <div className="deskblock__qr">
          <img
            src="/assets/qr_vata_studio.svg"
            alt="QR-код — открыть vata studio на телефоне"
            width={220}
            height={220}
          />
        </div>

        <div className="deskblock__social" aria-label="Соцсети">
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

        <span className="deskblock__mark">vata</span>
      </div>
    </div>
  );
}
