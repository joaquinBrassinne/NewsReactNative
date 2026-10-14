import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../types';

// Clave utilizada para persistir los favoritos en el almacenamiento del dispositivo
const STORAGE_KEY = 'favoritos';

// Tipo que describe las funciones y el estado expuesto por el contexto
export interface FavoritesContextType {
  favorites: Article[];
  addFavorite: (article: Article) => void;
  removeFavorite: (url: string) => void;
  isFavorite: (url: string) => boolean;
}

// Creamos el contexto tipado
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Article[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // 1. Cargar favoritos desde AsyncStorage al iniciar la app
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedFavorites: Article[] = JSON.parse(stored);
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error('Error al cargar favoritos desde AsyncStorage:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadFavorites();
  }, []);

  // 2. Guardar en AsyncStorage cada vez que cambien los favoritos (luego de la carga inicial)
  useEffect(() => {
    if (!isLoaded) return;

    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Error al guardar favoritos en AsyncStorage:', error);
      }
    };

    saveFavorites();
  }, [favorites, isLoaded]);

  // Agregar un artículo si aún no está guardado (usamos 'url' como clave única)
  const addFavorite = (article: Article) => {
    if (!article.url) return;
    setFavorites((prev) => {
      const exists = prev.some((item) => item.url === article.url);
      if (exists) return prev;
      return [article, ...prev];
    });
  };

  // Quitar un artículo por su url
  const removeFavorite = (url: string) => {
    setFavorites((prev) => prev.filter((item) => item.url !== url));
  };

  // Consultar si un artículo ya está en favoritos
  const isFavorite = (url: string): boolean => {
    return favorites.some((item) => item.url === url);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook personalizado simple para consumir el contexto fácilmente
export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe ser utilizado dentro de un FavoritesProvider');
  }
  return context;
}
