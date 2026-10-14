import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Article } from '../types';
import { formatDate } from '../utils/formatDate';

// Propiedades tipadas para NewsCard
interface NewsCardProps {
  article: Article;
  onPress: () => void;
}

export default function NewsCard({ article, onPress }: NewsCardProps) {
  // Manejo local de error al cargar la imagen remota
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(article.urlToImage) && !imageError;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Contenedor de la imagen o placeholder si viene null o da error */}
      {hasImage ? (
        <Image
          source={{ uri: article.urlToImage as string }}
          style={styles.image}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="newspaper-outline" size={38} color="#ADB5BD" />
          <Text style={styles.placeholderText}>Sin imagen disponible</Text>
        </View>
      )}

      {/* Contenido de la tarjeta */}
      <View style={styles.content}>
        {/* Fuente y fecha */}
        <View style={styles.metaRow}>
          <Text style={styles.source} numberOfLines={1}>
            {article.source?.name || 'Fuente desconocida'}
          </Text>
          <Text style={styles.date}>
            {formatDate(article.publishedAt)}
          </Text>
        </View>

        {/* Título de la noticia */}
        <Text style={styles.title} numberOfLines={3}>
          {article.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#E9ECEF',
  },
  imagePlaceholder: {
    width: '100%',
    height: 140,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 6,
    fontSize: 12,
    color: '#6C757D',
  },
  content: {
    padding: 14,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  source: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D6EFD',
    textTransform: 'uppercase',
    maxWidth: '55%',
  },
  date: {
    fontSize: 12,
    color: '#6C757D',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#212529',
    lineHeight: 21,
  },
});
