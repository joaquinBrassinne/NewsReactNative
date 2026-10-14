import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NewsCategory } from '../types';

// Definición de las categorías con su etiqueta en español y valor técnico para la API
interface CategoryItem {
  id: NewsCategory;
  label: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'technology', label: 'Tecnología' },
  { id: 'sports', label: 'Deportes' },
  { id: 'business', label: 'Negocios' },
  { id: 'health', label: 'Salud' },
  { id: 'science', label: 'Ciencia' },
  { id: 'entertainment', label: 'Entretenimiento' },
];

interface CategoryChipsProps {
  selectedCategory: NewsCategory;
  onSelectCategory: (category: NewsCategory) => void;
}

export default function CategoryChips({
  selectedCategory,
  onSelectCategory,
}: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map((cat) => {
        const isSelected = cat.id === selectedCategory;

        return (
          <TouchableOpacity
            key={cat.id}
            style={[styles.chip, isSelected && styles.chipActive]}
            onPress={() => onSelectCategory(cat.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F3F5',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  chipActive: {
    backgroundColor: '#0D6EFD',
    borderColor: '#0D6EFD',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
});
