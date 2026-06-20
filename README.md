# vata — лендинг бренда сумок

Одностраничный сайт под телефон. **React + TypeScript** (Vite) на фронте.
Бэкенд — простой **Node.js + Express**, который только раздаёт собранный фронт
в проде. Никакого API: все данные коллекций живут во фронтенде.

## Запуск (разработка)

```bash
npm install      # ставит зависимости root + client + server
npm run dev      # фронт :5173 (+ сервер :4000, но в dev он не нужен)
```

Открой **http://localhost:5173**.

> Открыть с телефона в той же сети: адрес `Network` из вывода Vite
> (например `http://192.168.x.x:5173`).

## Прод-сборка

```bash
npm run build    # собирает client -> client/dist и компилирует server
npm start        # сервер на :4000 отдаёт API и готовый фронт
```

## Картинки

Все материалы кладутся в **`client/public/assets/`** — подробности и список
имён файлов в [`client/public/assets/README.md`](client/public/assets/README.md).
Сейчас стоит заглушка логотипа и плейсхолдеры для двух сумок; нужно положить
как минимум `bag-fluffy.png`.

## Что где

| Что                                   | Файл |
| ------------------------------------- | ---- |
| Данные коллекций (палитры, фото)      | `client/src/data/collections.ts` |
| Интро-анимация и оркестрация          | `client/src/App.tsx` |
| Анимированный градиентный фон         | `client/src/components/Background.tsx` + `global.css` (блоки `.bg`) |
| Логотип (центр → шапка)               | `client/src/components/Brand.tsx` + `global.css` (`.brand`) |
| Карусель сумок + свайп                | `client/src/components/Carousel.tsx`, `hooks/useSwipe.ts` |
| Боковые стрелки/свечение              | `client/src/components/EdgeArrows.tsx` |
| Разделитель-нитка                     | `client/src/components/Divider.tsx` |
| Все стили и анимации                  | `client/src/styles/global.css` |

## Коллекции и свайп

Порядок слева направо: **Metallic ← Fluffy → Standard**.
При заходе по центру — Fluffy. Свайп/стрелка влево → Standard, вправо → Metallic.
Палитра фона, боковых свечений и нитки-разделителя меняется под каждую коллекцию.
