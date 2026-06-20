import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// В dev фронт ходит на бэкенд через прокси /api -> http://localhost:4000
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // доступ с телефона по локальной сети
  },
});
