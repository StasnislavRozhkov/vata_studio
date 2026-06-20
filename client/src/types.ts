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

/** Цветовой вариант сумки внутри коллекции */
export interface Variant {
  id: string;
  name: string; // название цвета, напр. «Чёрный»
  swatch: string; // hex для кружка-образца
  image: string; // путь к фото
  /** Своя палитра фона/акцентов под этот цвет (если нет — берётся палитра коллекции) */
  palette?: Palette;
}

export interface Collection {
  id: string;
  name: string;
  subtitle: string;
  variants: Variant[];
  palette: Palette;
  story: Story;
}
