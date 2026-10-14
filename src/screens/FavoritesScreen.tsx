import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { TabParamList, RootStackParamList, Article } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import NewsCard from '../components/NewsCard';

// Tipado compuesto para FavoritesScreen: BottomTab 'Favoritos' + NativeStack 'Detalle'
type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Favoritos'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function FavoritesScreen({ navigation }: Props) {
  // Obtenemos los artículos guardados desde el contexto
  const { favorites } = useFavorites();

  // Navegar al detalle del artículo seleccionado
  const handleSelectArticle = (article: Article) => {
    navigation.navigate('Detalle', { article });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => item.url || index.toString()}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            onPress={() => handleSelectArticle(item)}
          />
        )}
        contentContainerStyle={
          favorites.length === 0 ? styles.emptyContainer : styles.listContent
        }
        ListEmptyComponent={
          <View style={styles.emptyView}>
            <Ionicons name="heart-dislike-outline" size={60} color="#ADB5BD" />
            <Text style={styles.emptyTitle}>Sin favoritos guardados</Text>
            <Text style={styles.emptySubtitle}>
              Las noticias que marques como favoritas aparecerán aquí para que puedas leerlas cuando quieras.
            </Text>
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
    padding: 24,
  },
  emptyView: {
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginTop: 14,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
});
