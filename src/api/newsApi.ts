import { Article, NewsCategory } from '../types';

// Clave de API leída desde variables de entorno de Expo (.env)
const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;

// URL base de NewsAPI
const BASE_URL = 'https://newsapi.org/v2';

// País por defecto para las noticias (fácilmente modificable según el SDD)
export const DEFAULT_COUNTRY = 'us';

// Respuesta esperada desde NewsAPI
interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
  message?: string;
}

/**
 * Obtiene los titulares destacados de una categoría dada desde NewsAPI
 * @param category Categoría seleccionada (ej: 'general', 'technology', etc.)
 * @returns Promesa con el array de artículos
 */
export async function getTopHeadlines(category: NewsCategory = 'general'): Promise<Article[]> {
  if (!API_KEY) {
    throw new Error('No se encontró la API key. Verificá tu archivo .env (EXPO_PUBLIC_NEWS_API_KEY).');
  }

  // Armamos la URL con los parámetros del endpoint top-headlines
  const url = `${BASE_URL}/top-headlines?country=${DEFAULT_COUNTRY}&category=${category}&pageSize=20&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data: NewsApiResponse = await response.json();

    if (!response.ok || data.status !== 'ok') {
      const errorMsg = data.message || `Error al consultar la API (${response.status})`;
      throw new Error(errorMsg);
    }

    return data.articles;
  } catch (error) {
    // Si ya es un Error lanzado previamente, lo propagamos
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error de conexión o de red al consultar las noticias.');
  }
}
