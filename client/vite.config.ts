import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// На GitHub Pages сайт лежит в подпапке /vata_studio/.
// DEPLOY_TARGET=gh-pages (в CI) включает этот base; локально base = '/'.
const base = process.env.DEPLOY_TARGET === 'gh-pages' ? '/vata_studio/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // доступ с телефона по локальной сети
  },
});
