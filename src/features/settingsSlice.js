import { createSlice } from '@reduxjs/toolkit';

// Load settings from localStorage
const loadSettings = () => {
  try {
    const serialized = localStorage.getItem('settings');
    if (serialized === null) {
      return { temperatureUnit: 'celsius' };
    }
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Error loading settings:', err);
    return { temperatureUnit: 'celsius' };
  }
};

// Save settings to localStorage
const saveSettings = (settings) => {
  try {
    const serialized = JSON.stringify(settings);
    localStorage.setItem('settings', serialized);
  } catch (err) {
    console.error('Error saving settings:', err);
  }
};

const initialState = loadSettings();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTemperatureUnit: (state) => {
      state.temperatureUnit = state.temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius';
      saveSettings(state);
    },
    setTemperatureUnit: (state, action) => {
      state.temperatureUnit = action.payload;
      saveSettings(state);
    },
  },
});

export const { toggleTemperatureUnit, setTemperatureUnit } = settingsSlice.actions;
export default settingsSlice.reducer;
