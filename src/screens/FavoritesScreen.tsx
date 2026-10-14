import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <Text style={styles.subtitle}>Pantalla de favoritos (Fase 1 - Placeholder)</Text>
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
    textAlign: 'center',
  },
});
