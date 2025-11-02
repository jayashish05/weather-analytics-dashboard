import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeather } from '../../features/weatherSlice';
import { convertTemperature } from '../../utils/unitConversion';

const LocationWeather = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.weather);
  const { unit } = useSelector((state) => state.settings);
  
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [locationWeather, setLocationWeather] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Fallback: Get location using IP address
  const getLocationByIP = async () => {
    console.log('� Trying IP-based location as fallback...');
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.latitude && data.longitude) {
        console.log('✅ IP location received:', data);
        const coords = {
          lat: data.latitude,
          lon: data.longitude,
        };
        
        setCoordinates(coords);
        setLocationEnabled(true);
        setLocationError(null);
        
        console.log('📡 Fetching weather for IP location:', coords);
        
        try {
          const result = await dispatch(fetchCurrentWeather({
            lat: coords.lat,
            lon: coords.lon,
          })).unwrap();
          
          console.log('✅ Weather data received:', result.data);
          setLocationWeather(result.data);
          setIsGettingLocation(false);
        } catch (error) {
          console.error('❌ Weather fetch error:', error);
          setLocationError('Unable to fetch weather data. Please try again.');
          setIsGettingLocation(false);
        }
      } else {
        throw new Error('Invalid IP location data');
      }
    } catch (error) {
      console.error('❌ IP location failed:', error);
      setLocationError('Unable to determine location. Please search for your city manually.');
      setIsGettingLocation(false);
      setLocationEnabled(false);
    }
  };

  const getCurrentLocation = () => {
    console.log('🌍 Button clicked - requesting location...');
    setLocationError(null);
    setIsGettingLocation(true);
    
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      console.error('❌ Geolocation not supported, trying IP location...');
      getLocationByIP();
      return;
    }

    console.log('✅ Geolocation is supported, requesting position...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log('✅ Location received:', position.coords);
        
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        
        setCoordinates(coords);
        setLocationEnabled(true);
        setLocationError(null);
        
        console.log('📡 Fetching weather for:', coords);
        
        // Fetch weather for current location
        try {
          const result = await dispatch(fetchCurrentWeather({
            lat: coords.lat,
            lon: coords.lon,
          })).unwrap();
          
          console.log('✅ Weather data received:', result.data);
          setLocationWeather(result.data);
          setIsGettingLocation(false);
        } catch (error) {
          console.error('❌ Weather fetch error:', error);
          setLocationError('Unable to fetch weather data. Please try again.');
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error('❌ Browser geolocation failed:', error);
        console.log('🔄 Falling back to IP-based location...');
        
        // Automatically fallback to IP-based location
        getLocationByIP();
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
    
    console.log('⏳ Waiting for geolocation response...');
  };

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (locationEnabled && coordinates) {
      const interval = setInterval(async () => {
        try {
          const result = await dispatch(fetchCurrentWeather({
            lat: coordinates.lat,
            lon: coordinates.lon,
          })).unwrap();
          setLocationWeather(result.data);
        } catch (error) {
          console.error('Error refreshing location weather:', error);
        }
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [locationEnabled, coordinates, dispatch]);

  if (!locationEnabled) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">My Location Weather</h3>
              <p className="text-blue-100 text-sm">Get weather for your current location</p>
            </div>
          </div>
        </div>

        {locationError && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-300/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">⚠️ {locationError}</p>
            <div className="text-xs space-y-1 text-blue-100">
              <p>• Make sure location services are enabled on your device</p>
              <p>• Check browser permissions for this site</p>
              <p>• Try using a different browser (Chrome/Firefox recommended)</p>
              <p>• If using mobile, ensure GPS is turned on</p>
            </div>
          </div>
        )}

        <button
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          className="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGettingLocation ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              Getting Location...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Enable Location
            </>
          )}
        </button>
      </div>
    );
  }

  if (loading || (isGettingLocation && locationEnabled)) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-full w-12 h-12"></div>
          <div className="flex-1">
            <div className="h-6 bg-white/20 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-white/20 rounded w-1/2"></div>
          </div>
        </div>
        <div className="h-16 bg-white/20 rounded"></div>
        <p className="text-center text-sm text-blue-100 mt-2">Loading weather data...</p>
      </div>
    );
  }

  if (!locationWeather) {
    return null;
  }

  const temp = convertTemperature(locationWeather.main.temp, unit);
  const feelsLike = convertTemperature(locationWeather.main.feels_like, unit);

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">{locationWeather.name}</h3>
              <p className="text-blue-100 text-sm">{locationWeather.sys.country}</p>
            </div>
          </div>
          <button
            onClick={getCurrentLocation}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
            title="Refresh location"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        {/* Weather Info */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">{Math.round(temp)}°</span>
              <span className="text-2xl">{unit === 'celsius' ? 'C' : 'F'}</span>
            </div>
            <p className="text-blue-100 mt-1">
              Feels like {Math.round(feelsLike)}°
            </p>
            <p className="text-lg mt-2 capitalize">
              {locationWeather.weather[0].description}
            </p>
          </div>

          <img
            src={`https://openweathermap.org/img/wn/${locationWeather.weather[0].icon}@4x.png`}
            alt={locationWeather.weather[0].description}
            className="w-32 h-32 drop-shadow-lg"
          />
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
              </svg>
              <span className="text-xs text-blue-100">Humidity</span>
            </div>
            <p className="text-lg font-semibold">{locationWeather.main.humidity}%</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <span className="text-xs text-blue-100">Wind</span>
            </div>
            <p className="text-lg font-semibold">{locationWeather.wind.speed} m/s</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-xs text-blue-100">Pressure</span>
            </div>
            <p className="text-lg font-semibold">{locationWeather.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationWeather;
