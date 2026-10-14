import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList, TabParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import DetailScreen from '../screens/DetailScreen';

// Instanciamos los navegadores de Tabs y Stack tipados
const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Navegador de pestañas inferiores (Bottom Tabs)
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: '#0D6EFD',
        tabBarInactiveTintColor: '#6C757D',
        tabBarIcon: ({ color, size }) => {
          // Asignamos un ícono representativo a cada pestaña
          let iconName: keyof typeof Ionicons.glyphMap = 'newspaper-outline';

          if (route.name === 'Destacadas') {
            iconName = 'newspaper-outline';
          } else if (route.name === 'Categorías') {
            iconName = 'grid-outline';
          } else if (route.name === 'Favoritos') {
            iconName = 'heart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Destacadas"
        component={HomeScreen}
        options={{ title: 'Destacadas' }}
      />
      <Tab.Screen
        name="Categorías"
        component={CategoriesScreen}
        options={{ title: 'Categorías' }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{ title: 'Favoritos' }}
      />
    </Tab.Navigator>
  );
}

// Navegador principal de la aplicación (Native Stack)
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* Las pestañas inferiores son la pantalla principal del Stack */}
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* Pantalla de detalle de la noticia que se apila sobre las pestañas */}
      <Stack.Screen
        name="Detalle"
        component={DetailScreen}
        options={{
          title: 'Detalle de Noticia',
          headerBackTitle: 'Volver',
        }}
      />
    </Stack.Navigator>
  );
}
