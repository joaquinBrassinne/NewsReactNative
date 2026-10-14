// Definición de tipos principales de la aplicación

// Modelo de un artículo de noticias devuelto por NewsAPI
export interface Article {
  source: { name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// Categorías válidas soportadas por la API
export type NewsCategory =
  | 'general'
  | 'technology'
  | 'sports'
  | 'business'
  | 'health'
  | 'science'
  | 'entertainment';

// Parámetros del Stack principal de pantallas
export type RootStackParamList = {
  Tabs: undefined;
  Detalle: { article: Article };
};

// Parámetros de las pestañas inferiores (Bottom Tabs)
export type TabParamList = {
  Destacadas: undefined;
  Categorías: undefined;
  Favoritos: undefined;
};
