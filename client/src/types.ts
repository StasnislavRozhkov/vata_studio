export interface Palette {
  bg: string;
  blobA: string;
  blobB: string;
  blobC: string;
  edge: string;
  accent: string;
  text: string;
}

export interface Feature {
  title: string;
  text: string;
}

export interface Spec {
  label: string;
  value: string;
}

/** Контент-история конкретной сумки (нижние блоки страницы) */
export interface Story {
  eyebrow: string;
  heading: string; // можно с \n для переноса
  description: string;
  features: Feature[];
  specs: Spec[];
}

export interface Collection {
  id: string;
  name: string;
  image: string; // путь к фото сумки
  palette: Palette;
  story: Story;
}
