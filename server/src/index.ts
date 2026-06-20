import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Минимальный сервер: просто отдаёт собранный фронт (client/dist).
// Никакого API — все данные живут во фронтенде.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 4000;

const clientDist = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDist));

// SPA-фолбэк: любой путь отдаёт index.html
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) res.status(200).send('Фронт не собран. Запусти `npm run build`.');
  });
});

app.listen(PORT, () => {
  console.log(`[vata] http://localhost:${PORT}`);
});
