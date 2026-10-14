import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TabParamList, RootStackParamList, Article } from '../types';
import { getTopHeadlines } from '../api/newsApi';
import NewsCard from '../components/NewsCard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';

// Tipado compuesto para HomeScreen: BottomTab 'Destacadas' + NativeStack 'Detalle'
type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Destacadas'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  // Estado para la lista de noticias
  const [articles, setArticles] = useState<Article[]>([]);
  // Estado de carga inicial
  const [loading, setLoading] = useState<boolean>(true);
  // Estado para el pull-to-refresh
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // Estado de error con mensaje
  const [error, setError] = useState<string | null>(null);

  // Función para obtener las noticias destacadas
  const fetchNews = async () => {
    try {
      setError(null);
      const data = await getTopHeadlines('general');
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

  // Carga inicial al montar el componente
  useEffect(() => {
    fetchNews();
  }, []);

  // Manejo de pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews();
  }, []);

  // Navegar a la pantalla Detalle enviando el artículo seleccionado
  const handleSelectArticle = (article: Article) => {
    navigation.navigate('Detalle', { article });
  };

  // 1. Vista de carga inicial
  if (loading) {
    return <LoadingView message="Cargando noticias destacadas..." />;
  }

  // 2. Vista de error con botón de reintentar
  if (error) {
    return <ErrorView message={error} onRetry={fetchNews} />;
  }

  return (
    <View style={styles.container}>
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
            <Text style={styles.emptyText}>No hay noticias destacadas disponibles en este momento.</Text>
          </View>
        }
      />
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
