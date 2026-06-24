import { useEffect, useState } from 'react';

// Сайт — mobile-first. Считаем «компьютером» окно шириной >= порога
// и реактивно переключаемся при ресайзе (сузил окно -> сайт, расширил -> заглушка).
const DESKTOP_QUERY = '(min-width: 900px)';

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    // синхронизируем на случай изменения до подписки
    setIsDesktop(mq.matches);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
}
