import ReactDOM from 'react-dom/client';
import App from './App';
import { DesktopBlock } from './components/DesktopBlock';
import { useIsDesktop } from './hooks/useIsDesktop';
import './styles/global.css';

// Сайт mobile-first: на широких экранах вместо сайта показываем заглушку.
// Реактивно: сузил окно -> сайт, расширил -> заглушка.
function Root() {
  return useIsDesktop() ? <DesktopBlock /> : <App />;
}

// StrictMode отключён намеренно: его двойной вызов эффектов в dev
// дважды инициализирует WebGL mesh-градиент (whatamesh) на одном canvas.
ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
