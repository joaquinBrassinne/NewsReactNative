import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../types';
import { formatDate } from '../utils/formatDate';
import { useFavorites } from '../context/FavoritesContext';

// Tipado de props de la pantalla Detalle dentro del NativeStack
type Props = NativeStackScreenProps<RootStackParamList, 'Detalle'>;

export default function DetailScreen({ route }: Props) {
  // Extraemos el artículo recibido por parámetros de navegación
  const { article } = route.params;

  // Estado local para capturar si falla la carga de la imagen remota
  const [imageError, setImageError] = useState<boolean>(false);

  // Funciones de favoritos desde el contexto
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(article.url);

  const hasImage = Boolean(article.urlToImage) && !imageError;

  // Función para alternar entre agregar y quitar de favoritos
  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(article.url);
    } else {
      addFavorite(article);
    }
  };

  // Función para abrir la nota original en el navegador del dispositivo
  const handleOpenOriginalUrl = async () => {
    if (!article.url) {
      Alert.alert('Aviso', 'El artículo no cuenta con un enlace web disponible.');
      return;
    }

    try {
      const canOpen = await Linking.canOpenURL(article.url);
      if (canOpen) {
        await Linking.openURL(article.url);
      } else {
        Alert.alert('Error', 'No se puede abrir este enlace en el dispositivo.');
      }
    } catch {
      Alert.alert('Error', 'Ocurrió un error al intentar abrir el navegador.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* 1. Imagen principal o fallback */}
      {hasImage ? (
        <Image
          source={{ uri: article.urlToImage as string }}
          style={styles.image}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="newspaper-outline" size={54} color="#ADB5BD" />
          <Text style={styles.placeholderText}>Sin imagen disponible</Text>
        </View>
      )}

      {/* 2. Cuerpo del detalle */}
      <View style={styles.body}>
        {/* Fila superior: Fuente, Autor y Botón de Favorito */}
        <View style={styles.topRow}>
          <View style={styles.metaCol}>
            <Text style={styles.source}>
              {article.source?.name || 'Fuente desconocida'}
            </Text>
            {Boolean(article.author) && (
              <Text style={styles.author} numberOfLines={1}>
                Por {article.author}
              </Text>
            )}
          </View>

          {/* Botón Guardar / Quitar Favorito */}
          <TouchableOpacity
            style={[styles.favoriteButton, favorite && styles.favoriteButtonActive]}
            onPress={handleToggleFavorite}
          >
            <Ionicons
              name={favorite ? 'heart' : 'heart-outline'}
              size={20}
              color={favorite ? '#DC3545' : '#6C757D'}
            />
            <Text style={[styles.favoriteText, favorite && styles.favoriteTextActive]}>
              {favorite ? 'Guardado' : 'Guardar'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Fecha de publicación */}
        <View style={styles.dateRow}>
          <Ionicons name="time-outline" size={14} color="#6C757D" style={styles.dateIcon} />
          <Text style={styles.dateText}>{formatDate(article.publishedAt)}</Text>
        </View>

        {/* Título de la noticia */}
        <Text style={styles.title}>{article.title}</Text>

        <View style={styles.divider} />

        {/* Descripción o contenido con valores por defecto si vienen en null */}
        <Text style={styles.description}>
          {article.description || article.content || 'Este artículo no incluye una descripción detallada.'}
        </Text>

        {/* Botón para abrir la nota completa en el navegador */}
        <TouchableOpacity style={styles.openUrlButton} onPress={handleOpenOriginalUrl}>
          <Ionicons name="globe-outline" size={18} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.openUrlText}>Leer nota completa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#E9ECEF',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 13,
    color: '#6C757D',
  },
  body: {
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaCol: {
    flex: 1,
    marginRight: 10,
  },
  source: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0D6EFD',
    textTransform: 'uppercase',
  },
  author: {
    fontSize: 12,
    color: '#6C757D',
    fontStyle: 'italic',
    marginTop: 2,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#CED4DA',
  },
  favoriteButtonActive: {
    backgroundColor: '#F8D7DA',
    borderColor: '#F5C2C7',
  },
  favoriteText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#495057',
    marginLeft: 6,
  },
  favoriteTextActive: {
    color: '#DC3545',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  dateIcon: {
    marginRight: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#6C757D',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    lineHeight: 28,
  },
  divider: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: 18,
  },
  description: {
    fontSize: 15,
    color: '#495057',
    lineHeight: 24,
    marginBottom: 28,
  },
  openUrlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D6EFD',
    paddingVertical: 14,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonIcon: {
    marginRight: 8,
  },
  openUrlText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
