import type { Collection } from '../types';

// Данные коллекций. Чтобы добавить/поменять сумку — правишь только этот файл.
// Порядок слева направо: metallic <- fluffy -> standard.
// Свайп влево (next) -> standard, свайп вправо (prev) -> metallic.
export const collections: Collection[] = [
  {
    id: 'metallic',
    name: 'Metallic',
    subtitle: 'Коллекция 03',
    // Цветовые варианты. Первый — основной. Замени image на реальные фото.
    variants: [
      { id: 'silver', name: 'Серебро', swatch: '#c7cdd6', image: '/assets/bag-metallic.png' },
      { id: 'graphite', name: 'Графит', swatch: '#3f444c', image: '/assets/bag-metallic-graphite.png' },
      { id: 'gold', name: 'Золото', swatch: '#cdb06a', image: '/assets/bag-metallic-gold.png' },
    ],
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
    subtitle: 'Коллекция 01',
    variants: [
      {
        id: 'black',
        name: 'Чёрный',
        swatch: '#1c1c1f',
        image: '/assets/bag-fluffy.png',
        palette: { bg: '#f4f2f8', blobA: '#e8e3f2', blobB: '#d6cfeb', blobC: '#bdb4df', edge: '#a79ed1', accent: '#5f5a8e', text: '#1f1d28' },
      },
      {
        id: 'gray',
        name: 'Серый',
        swatch: '#8a8a96',
        image: '/assets/bag-fluffy-gray.png',
        palette: { bg: '#f3f3f5', blobA: '#e6e6ea', blobB: '#d3d3da', blobC: '#b9b9c4', edge: '#a3a3b0', accent: '#5a5a66', text: '#20202a' },
      },
      {
        id: 'blue',
        name: 'Синий',
        swatch: '#1f3360',
        image: '/assets/bag-fluffy-blue.png',
        palette: { bg: '#eef2f8', blobA: '#dce6f4', blobB: '#c2d4ef', blobC: '#9fbce6', edge: '#7ea3da', accent: '#2f4d86', text: '#16203a' },
      },
      {
        id: 'green',
        name: 'Зелёный',
        swatch: '#7c8c2a',
        image: '/assets/bag-fluffy-green.png',
        palette: { bg: '#f3f5ea', blobA: '#e7edcf', blobB: '#d4e0a8', blobC: '#b7c977', edge: '#9bb24e', accent: '#5c6d1f', text: '#23280f' },
      },
      {
        id: 'pink',
        name: 'Розовый',
        swatch: '#e487ad',
        image: '/assets/bag-fluffy-pink.png',
        palette: { bg: '#fbf0f4', blobA: '#f6dde8', blobB: '#f0c4d7', blobC: '#e89fbd', edge: '#e07ea3', accent: '#b24470', text: '#3a1f2a' },
      },
      {
        id: 'red',
        name: 'Красный',
        swatch: '#a5141b',
        image: '/assets/bag-fluffy-red.png',
        palette: { bg: '#faf0ef', blobA: '#f4dad8', blobB: '#ecbab6', blobC: '#df8e88', edge: '#d06a63', accent: '#9e2a26', text: '#341312' },
      },
    ],
    // Палитра коллекции по умолчанию (используется, если у варианта нет своей)
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
    subtitle: 'Коллекция 02',
    variants: [
      { id: 'beige', name: 'Бежевый', swatch: '#c9ad84', image: '/assets/bag-standard.png' },
      { id: 'brown', name: 'Коричневый', swatch: '#6b4f34', image: '/assets/bag-standard-brown.png' },
      { id: 'sand', name: 'Песочный', swatch: '#ddc9a6', image: '/assets/bag-standard-sand.png' },
    ],
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
