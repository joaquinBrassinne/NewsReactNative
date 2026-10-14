import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList, RootStackParamList, Article } from '../types';

// Tipado compuesto: combina las pestañas con el stack para poder navegar a Detalle
type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Destacadas'>,
  NativeStackScreenProps<RootStackParamList>
>;

// Artículo de ejemplo para probar la navegación al Detalle
const dummyArticle: Article = {
  source: { name: 'Diario Demo' },
  author: 'Autor Ejemplo',
  title: 'Noticia de prueba para verificar navegación',
  description: 'Esta es una descripción breve de la noticia de prueba.',
  url: 'https://newsapi.org',
  urlToImage: null,
  publishedAt: new Date().toISOString(),
  content: 'Contenido completo de prueba de la noticia...',
};

export default function HomeScreen({ navigation }: Props) {
  // Función para probar el paso de parámetros a la pantalla Detalle
  const handleIrADetalle = () => {
    navigation.navigate('Detalle', { article: dummyArticle });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Noticias Destacadas</Text>
      <Text style={styles.subtitle}>Pantalla principal (Fase 1 - Placeholder)</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleIrADetalle}>
        <Text style={styles.buttonText}>Probar navegación a Detalle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0D6EFD',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
