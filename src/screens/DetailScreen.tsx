import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

// Tipado de props usando el RootStackParamList para la pantalla Detalle
type Props = NativeStackScreenProps<RootStackParamList, 'Detalle'>;

export default function DetailScreen({ route }: Props) {
  // Extraemos el artículo pasado por parámetros de navegación
  const { article } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de Noticia</Text>
      <Text style={styles.subtitle}>Pantalla de detalle (Fase 1 - Placeholder)</Text>
      
      <View style={styles.card}>
        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.sourceText}>Fuente: {article.source.name}</Text>
        <Text style={styles.descText}>{article.description || 'Sin descripción'}</Text>
      </View>
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
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 6,
  },
  sourceText: {
    fontSize: 13,
    color: '#0D6EFD',
    marginBottom: 8,
  },
  descText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
});
