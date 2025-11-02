import { createSlice } from '@reduxjs/toolkit';

const MAX_RECENT_SEARCHES = 5;

const loadRecentSearches = () => {
  try {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading recent searches:', error);
    return [];
  }
};

const saveRecentSearches = (searches) => {
  try {
    localStorage.setItem('recentSearches', JSON.stringify(searches));
  } catch (error) {
    console.error('Error saving recent searches:', error);
  }
};

const initialState = {
  searches: loadRecentSearches(),
};

const recentSearchesSlice = createSlice({
  name: 'recentSearches',
  initialState,
  reducers: {
    addRecentSearch: (state, action) => {
      const city = action.payload;
      
      // Remove duplicate if exists
      const filtered = state.searches.filter(
        (search) => search.name !== city.name
      );
      
      // Add to beginning of array
      const updated = [city, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      
      state.searches = updated;
      saveRecentSearches(updated);
    },
    clearRecentSearches: (state) => {
      state.searches = [];
      localStorage.removeItem('recentSearches');
    },
    setRecentSearches: (state, action) => {
      state.searches = action.payload;
      saveRecentSearches(action.payload);
    },
  },
});

export const { addRecentSearch, clearRecentSearches, setRecentSearches } = recentSearchesSlice.actions;
export default recentSearchesSlice.reducer;
