import { createSlice } from '@reduxjs/toolkit';

// Load favorites from localStorage
const loadFavorites = () => {
  try {
    const serialized = localStorage.getItem('favorites');
    if (serialized === null) {
      // Default cities if none saved
      return [
        { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
        { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
        { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 }
      ];
    }
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Error loading favorites:', err);
    return [];
  }
};

// Save favorites to localStorage
const saveFavorites = (favorites) => {
  try {
    const serialized = JSON.stringify(favorites);
    localStorage.setItem('favorites', serialized);
  } catch (err) {
    console.error('Error saving favorites:', err);
  }
};

const initialState = {
  cities: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const city = action.payload;
      if (!state.cities.find(c => c.name === city.name)) {
        state.cities.push(city);
        saveFavorites(state.cities);
      }
    },
    removeFavorite: (state, action) => {
      const cityName = action.payload;
      state.cities = state.cities.filter(c => c.name !== cityName);
      saveFavorites(state.cities);
    },
    clearFavorites: (state) => {
      state.cities = [];
      saveFavorites([]);
    },
    setFavorites: (state, action) => {
      state.cities = action.payload;
      saveFavorites(action.payload);
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
