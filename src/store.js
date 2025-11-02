import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './features/weatherSlice';
import favoritesReducer from './features/favoritesSlice';
import settingsReducer from './features/settingsSlice';
import authReducer from './features/authSlice';
import recentSearchesReducer from './features/recentSearchesSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    settings: settingsReducer,
    auth: authReducer,
    recentSearches: recentSearchesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
