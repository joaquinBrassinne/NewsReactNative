# 📰 App de Noticias de Última Hora

Aplicación móvil desarrollada con **React Native**, **Expo** y **TypeScript** para Android. Consume la API pública de **NewsAPI** para mostrar noticias destacadas en tiempo real, filtrar por diversas categorías temáticas, ver el detalle de cada noticia y guardar favoritos con persistencia en el dispositivo.

---

## 📱 Capturas de la Aplicación

| Noticias Destacadas | Filtrado por Categorías |
| :---: | :---: |
| ![Destacadas](images/destacados.png) | ![Categorías](images/filtro-tecnologia.png) |

| Detalle de Noticia | Favoritos Guardados |
| :---: | :---: |
| ![Detalle](images/detalles-noticia.png) | ![Favoritos](images/favoritos.png) |

---

## 🚀 Características Principales

- **Noticias Destacadas (`HomeScreen`)**:
  - Consulta los titulares más recientes de la categoría general.
  - Implementa *Pull to Refresh* para actualizar las noticias deslizando hacia abajo.
  - Manejo de estados de carga (`ActivityIndicator`), error con botón de reintento y lista vacía.
- **Categorías (`CategoriesScreen`)**:
  - Selector horizontal con chips estilizados: *Tecnología, Deportes, Negocios, Salud, Ciencia y Entretenimiento*.
  - Carga reactiva de noticias según la categoría seleccionada.
- **Detalle de la Noticia (`DetailScreen`)**:
  - Imagen en alta resolución con manejo de fallos y placeholder visual.
  - Metadatos del artículo: fuente periodística, autor y fecha formateada (`DD/MM/AAAA HH:mm`).
  - Botón para **Guardar o Quitar de Favoritos** con cambio de estado e icono en tiempo real.
  - Botón **"Leer nota completa"** que abre el enlace original en el navegador mediante `Linking.openURL`.
- **Favoritos con Persistencia Local (`FavoritesScreen`)**:
  - Gestión de favoritos mediante **React Context** (`FavoritesContext`).
  - Persistencia de datos en el almacenamiento interno del dispositivo usando `@react-native-async-storage/async-storage`.
  - Los favoritos se mantienen guardados incluso tras cerrar la aplicación.
- **Manejo de Respuestas Nulas**:
  - Si un artículo no tiene imagen, descripción o autor, la interfaz responde con placeholders y textos amigables sin interrumpir la ejecución.

---

## 🛠️ Tecnologías y Librerías

- **Framework**: [React Native](https://reactnative.dev/) con [Expo](https://expo.dev/) (SDK 57)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (modo `strict` activado, sin `any`)
- **Navegación**: [React Navigation](https://reactnavigation.org/)
  - `@react-navigation/bottom-tabs` (Navegación inferior por pestañas)
  - `@react-navigation/native-stack` (Pila nativa para pantalla de detalle)
- **Almacenamiento Local**: `@react-native-async-storage/async-storage`
- **Iconos**: `@expo/vector-icons` (Ionicons)
- **Fuente de Datos**: [NewsAPI](https://newsapi.org/)

---

## 📁 Estructura del Proyecto

```text
noticias-app/
├── App.tsx                     # Punto de entrada (NavigationContainer + FavoritesProvider)
├── .env                        # Clave de API local (no versionada en Git)
├── .env.example                # Plantilla de variables de entorno
├── app.json                    # Configuración de Expo
├── tsconfig.json               # Configuración de TypeScript en modo estricto
├── images/                     # Capturas de pantalla de la aplicación
└── src/
    ├── api/
    │   └── newsApi.ts          # Servicio de consumo de NewsAPI (top-headlines)
    ├── components/
    │   ├── CategoryChips.tsx   # Selector horizontal de categorías
    │   ├── ErrorView.tsx       # Vista de error con botón de reintento
    │   ├── LoadingView.tsx     # Spinner y mensaje de carga
    │   └── NewsCard.tsx        # Tarjeta reutilizable de noticia
    ├── context/
    │   └── FavoritesContext.tsx # Contexto y persistencia en AsyncStorage
    ├── navigation/
    │   └── AppNavigator.tsx    # Bottom Tabs + Native Stack
    ├── screens/
    │   ├── CategoriesScreen.tsx
    │   ├── DetailScreen.tsx
    │   ├── FavoritesScreen.tsx
    │   └── HomeScreen.tsx
    ├── types/
    │   └── index.ts            # Interfaces y tipos TypeScript (Article, RootStackParamList, etc.)
    └── utils/
        └── formatDate.ts       # Formateador de fechas ISO a español
```

---

## ⚙️ Instalación y Puesta en Marcha

### 1. Clonar o descargar el repositorio
```bash
git clone <url-del-repositorio>
cd act-programacion
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar la API Key de NewsAPI
1. Obtené una clave gratuita en [newsapi.org](https://newsapi.org/).
2. Creá un archivo `.env` en la raíz del proyecto tomando como guía `.env.example`:
```env
EXPO_PUBLIC_NEWS_API_KEY=tu_clave_de_newsapi_aqui
```

### 4. Iniciar el servidor de desarrollo
```bash
npx expo start
```

### 5. Probar en un dispositivo o emulador
- **En tu teléfono celular (Recomendado)**: Instalá la aplicación **Expo Go** (Android/iOS) y escaneá el código QR mostrado en la terminal.
- **En emulador Android**: Con Android Studio iniciado, presioná la tecla `a` en la terminal.
