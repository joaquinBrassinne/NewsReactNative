import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Propiedades tipadas para LoadingView
interface LoadingViewProps {
  message?: string;
}

export default function LoadingView({ message = 'Cargando noticias...' }: LoadingViewProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0D6EFD" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  text: {
    marginTop: 12,
    fontSize: 15,
    color: '#6C757D',
  },
});
