import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// StrictMode отключён намеренно: его двойной вызов эффектов в dev
// дважды инициализирует WebGL mesh-градиент (whatamesh) на одном canvas.
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
