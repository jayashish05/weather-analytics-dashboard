import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Log API key status (without exposing the full key)
if (!API_KEY) {
  console.error('⚠️ REACT_APP_OPENWEATHER_API_KEY is not set in .env file');
} else {
  console.log('✅ API Key loaded:', API_KEY.substring(0, 8) + '...');
}

// Cache configuration
const CACHE_DURATION = 60 * 1000; // 60 seconds
const cache = {};

// Helper function to check if cache is valid
const isCacheValid = (cacheKey) => {
  if (!cache[cacheKey]) return false;
  const { timestamp } = cache[cacheKey];
  return Date.now() - timestamp < CACHE_DURATION;
};

// Helper function to get from cache
const getFromCache = (cacheKey) => {
  if (isCacheValid(cacheKey)) {
    return cache[cacheKey].data;
  }
  return null;
};

// Helper function to set cache
const setCache = (cacheKey, data) => {
  cache[cacheKey] = {
    data,
    timestamp: Date.now(),
  };
};

// Get current weather for a city or coordinates
export const getCurrentWeather = async (cityOrCoords) => {
  // Determine if input is coordinates or city name
  const isCoordinates = typeof cityOrCoords === 'object' && cityOrCoords.lat && cityOrCoords.lon;
  const cacheKey = isCoordinates 
    ? `current_${cityOrCoords.lat}_${cityOrCoords.lon}`
    : `current_${cityOrCoords}`;
  
  const cachedData = getFromCache(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  // Check if API key is valid
  if (!API_KEY || API_KEY === 'your_api_key_here' || API_KEY === '') {
    console.error('❌ API key is not configured properly');
    throw new Error('API key not configured. Please add your OpenWeatherMap API key to .env file');
  }

  try {
    const params = {
      appid: API_KEY,
      units: 'metric',
    };

    // Add appropriate query parameters
    if (isCoordinates) {
      params.lat = cityOrCoords.lat;
      params.lon = cityOrCoords.lon;
      console.log(`📡 Fetching weather for coordinates: ${cityOrCoords.lat}, ${cityOrCoords.lon}`);
    } else {
      params.q = cityOrCoords;
      console.log(`📡 Fetching weather for: ${cityOrCoords}`);
    }

    const response = await axios.get(`${BASE_URL}/weather`, { params });
    
    console.log(`✅ Weather data received for: ${isCoordinates ? 'coordinates' : cityOrCoords}`);
    setCache(cacheKey, response.data);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    const identifier = isCoordinates ? 'coordinates' : cityOrCoords;
    console.error(`❌ Error fetching weather for ${identifier}:`, errorMsg);
    
    // Provide helpful error messages
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Wait 10-15 minutes for new keys to activate, then restart the app.');
    } else if (error.response?.status === 404) {
      throw new Error(`Location not found`);
    } else if (error.response?.status === 429) {
      throw new Error('Too many requests. Please wait a moment.');
    }
    
    throw new Error(errorMsg || 'Failed to fetch weather data');
  }
};

// Get 5-day forecast
export const getForecast = async (city) => {
  const cacheKey = `forecast_${city}`;
  const cachedData = getFromCache(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    
    setCache(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
  }
};

// Get hourly forecast (using 5-day/3-hour forecast)
export const getHourlyForecast = async (city) => {
  const cacheKey = `hourly_${city}`;
  const cachedData = getFromCache(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    
    // Return first 24 hours (8 data points with 3-hour intervals)
    const hourlyData = {
      ...response.data,
      list: response.data.list.slice(0, 8),
    };
    
    setCache(cacheKey, hourlyData);
    return hourlyData;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch hourly forecast');
  }
};

// Search cities by name (autocomplete)
export const searchCities = async (query) => {
  if (!query || query.length < 2) {
    return [];
  }

  const cacheKey = `search_${query}`;
  const cachedData = getFromCache(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${GEO_URL}/direct`, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY,
      },
    });
    
    const results = response.data.map(city => ({
      name: city.name,
      country: city.country,
      state: city.state,
      lat: city.lat,
      lon: city.lon,
      displayName: `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`,
    }));
    
    setCache(cacheKey, results);
    return results;
  } catch (error) {
    throw new Error('Failed to search cities');
  }
};

// Get weather by coordinates (for more accurate data)
export const getWeatherByCoords = async (lat, lon) => {
  const cacheKey = `coords_${lat}_${lon}`;
  const cachedData = getFromCache(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    
    setCache(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather by coordinates');
  }
};

// Clear expired cache entries
export const clearExpiredCache = () => {
  const now = Date.now();
  Object.keys(cache).forEach(key => {
    if (now - cache[key].timestamp >= CACHE_DURATION) {
      delete cache[key];
    }
  });
};

// Clear all cache
export const clearAllCache = () => {
  Object.keys(cache).forEach(key => delete cache[key]);
};
