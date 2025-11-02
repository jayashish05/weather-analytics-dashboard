import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getCurrentWeather, 
  getForecast, 
  searchCities,
  getHourlyForecast 
} from '../services/weatherAPI';

// Async thunks
export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrent',
  async (city, { rejectWithValue }) => {
    try {
      const data = await getCurrentWeather(city);
      return { city, data, timestamp: Date.now() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (city, { rejectWithValue }) => {
    try {
      const data = await getForecast(city);
      return { city, data, timestamp: Date.now() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHourlyForecast = createAsyncThunk(
  'weather/fetchHourly',
  async (city, { rejectWithValue }) => {
    try {
      const data = await getHourlyForecast(city);
      return { city, data, timestamp: Date.now() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchCitiesThunk = createAsyncThunk(
  'weather/searchCities',
  async (query, { rejectWithValue }) => {
    try {
      const data = await searchCities(query);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentWeather: {},
  forecasts: {},
  hourlyForecasts: {},
  searchResults: [],
  loading: false,
  error: null,
  lastUpdated: {},
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Current weather
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        const { city, data, timestamp } = action.payload;
        state.currentWeather[city] = data;
        state.lastUpdated[city] = timestamp;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Forecast
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        const { city, data, timestamp } = action.payload;
        state.forecasts[city] = data;
        state.lastUpdated[`${city}_forecast`] = timestamp;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Hourly forecast
      .addCase(fetchHourlyForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
        state.loading = false;
        const { city, data, timestamp } = action.payload;
        state.hourlyForecasts[city] = data;
        state.lastUpdated[`${city}_hourly`] = timestamp;
      })
      .addCase(fetchHourlyForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search cities
      .addCase(searchCitiesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchCitiesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchCitiesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSearchResults } = weatherSlice.actions;
export default weatherSlice.reducer;
