import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TabParamList, RootStackParamList, Article, NewsCategory } from '../types';
import { getTopHeadlines } from '../api/newsApi';
import CategoryChips from '../components/CategoryChips';
import NewsCard from '../components/NewsCard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';

// Tipado compuesto para CategoriesScreen: BottomTab 'Categorías' + NativeStack 'Detalle'
type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Categorías'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function CategoriesScreen({ navigation }: Props) {
  // Categoría seleccionada actualmente (por defecto 'technology')
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('technology');
  // Lista de noticias de la categoría
  const [articles, setArticles] = useState<Article[]>([]);
  // Estado de carga inicial
  const [loading, setLoading] = useState<boolean>(true);
  // Estado para pull-to-refresh
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // Estado de error
  const [error, setError] = useState<string | null>(null);

  // Obtener noticias de la categoría activa
  const fetchCategoryNews = async (category: NewsCategory) => {
    try {
      setError(null);
      const data = await getTopHeadlines(category);
      setArticles(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al cargar las noticias.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Carga al montar y cada vez que cambia la categoría seleccionada
  useEffect(() => {
    setLoading(true);
    fetchCategoryNews(selectedCategory);
  }, [selectedCategory]);

  // Manejo de pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCategoryNews(selectedCategory);
  }, [selectedCategory]);

  // Manejo de cambio de categoría
  const handleSelectCategory = (category: NewsCategory) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  };

  // Navegación al detalle
  const handleSelectArticle = (article: Article) => {
    navigation.navigate('Detalle', { article });
  };

  return (
    <View style={styles.container}>
      {/* Selector horizontal de categorías */}
      <CategoryChips
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Contenido condicional según el estado */}
      {loading ? (
        <LoadingView message="Cargando noticias de la categoría..." />
      ) : error ? (
        <ErrorView message={error} onRetry={() => fetchCategoryNews(selectedCategory)} />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => item.url || index.toString()}
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              onPress={() => handleSelectArticle(item)}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0D6EFD']}
              tintColor="#0D6EFD"
            />
          }
          contentContainerStyle={
            articles.length === 0 ? styles.emptyContainer : styles.listContent
          }
          ListEmptyComponent={
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>
                No se encontraron noticias en esta categoría.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyView: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#6C757D',
    textAlign: 'center',
  },
});
