import type { Collection } from '../types';

// Данные коллекций. Чтобы поменять контент сумки — правишь только этот файл.
// Сейчас на странице показывается только коллекция с индексом INITIAL_INDEX (fluffy).
export const collections: Collection[] = [
  {
    id: 'metallic',
    name: 'Metallic',
    image: '/assets/bags/metallic/silver.png',
    // Светлая тема: bg почти белый, blob* — пастельные оттенки сумки,
    // accent — насыщенный цвет для нитки/акцентов, text — тёмный.
    palette: {
      bg: '#f1f3f6',
      blobA: '#e4e8ee',
      blobB: '#cfd7e1',
      blobC: '#aeb9c8',
      edge: '#9aa7b8',
      accent: '#5a6675',
      text: '#1c2028',
    },
    story: {
      eyebrow: 'Коллекция 03 — Metallic',
      heading: 'Холодный\nблеск',
      description:
        'Архитектурная строгость и металлический отлив. Сумка с характером — для тех, кто ценит чистую геометрию и сдержанный шик.',
      features: [
        { title: 'Поверхность', text: 'Гладкий металлизированный материал с лёгким мерцанием.' },
        { title: 'Силуэт', text: 'Чёткие линии и собранная, устойчивая форма.' },
        { title: 'Детали', text: 'Минимум декора — только выверенная фурнитура.' },
      ],
      specs: [
        { label: 'Материал', value: 'Металлизированная эко-кожа' },
        { label: 'Размер', value: '26 × 22 × 9 см' },
        { label: 'Ручка', value: 'Короткая, на плечо' },
        { label: 'Цвет', value: 'Серебристый металлик' },
      ],
    },
  },
  {
    id: 'fluffy',
    name: 'Fluffy',
    image: '/assets/bags/fluffy/black.png',
    // Палитра фона/акцентов коллекции
    palette: {
      bg: '#f4f2f8',
      blobA: '#e8e3f2',
      blobB: '#d6cfeb',
      blobC: '#bdb4df',
      edge: '#a79ed1',
      accent: '#5f5a8e',
      text: '#1f1d28',
    },
    story: {
      eyebrow: 'Коллекция 01 — Fluffy',
      heading: 'Пушистая\nнежность',
      description:
        'Объёмный ворс и длинная бахрома, которые хочется трогать. Мягкий силуэт на плечо, который добавляет образу уюта и характера.',
      features: [
        { title: 'Фактура', text: 'Густой пушистый ворс с приятной мягкостью.' },
        { title: 'Бахрома', text: 'Длинные пряди, свободно спадающие по корпусу.' },
        { title: 'Форма', text: 'Округлый объёмный силуэт, держит форму.' },
      ],
      specs: [
        { label: 'Материал', value: 'Эко-мех / пряжа' },
        { label: 'Размер', value: '28 × 24 × 10 см' },
        { label: 'Ручка', value: 'На плечо' },
        { label: 'Цвет', value: 'Чёрный' },
      ],
    },
  },
  {
    id: 'standard',
    name: 'Standard',
    image: '/assets/bags/standard/pink.png',
    palette: {
      bg: '#f7f3ec',
      blobA: '#efe7d9',
      blobB: '#e2d2bb',
      blobC: '#cdb491',
      edge: '#bd9f72',
      accent: '#7e6238',
      text: '#2a2118',
    },
    story: {
      eyebrow: 'Коллекция 02 — Standard',
      heading: 'Чистая\nклассика',
      description:
        'Спокойная форма без лишних деталей — сумка на каждый день, которая подходит ко всему. Тёплый оттенок и мягкая фактура натурального материала.',
      features: [
        { title: 'Форма', text: 'Лаконичный силуэт, ничего лишнего.' },
        { title: 'Материал', text: 'Мягкая на ощупь поверхность тёплого тона.' },
        { title: 'Носка', text: 'Удобная посадка на плече, вместительный объём.' },
      ],
      specs: [
        { label: 'Материал', value: 'Эко-кожа' },
        { label: 'Размер', value: '27 × 23 × 10 см' },
        { label: 'Ручка', value: 'На плечо' },
        { label: 'Цвет', value: 'Тёплый бежевый' },
      ],
    },
  },
];

// Стартовая коллекция — "fluffy" (центр).
export const INITIAL_INDEX = 1;
