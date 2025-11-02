import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentWeather } from '../../features/weatherSlice';
import { removeFavorite, addFavorite } from '../../features/favoritesSlice';
import { getTemperatureValue } from '../../utils/unitConversion';
import { getWeatherIcon } from '../../utils/weatherHelpers';

const CityCard = ({ city, isFavorite = false, showFavoriteButton = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperatureUnit = useSelector((state) => state.settings.temperatureUnit);
  const weatherData = useSelector((state) => state.weather.currentWeather[city.name]);
  const lastUpdated = useSelector((state) => state.weather.lastUpdated[city.name]);
  const error = useSelector((state) => state.weather.error);
  const favorites = useSelector((state) => state.favorites.cities);
  const isInFavorites = favorites.some(fav => fav.name === city.name);

  useEffect(() => {
    // Fetch weather data on mount
    dispatch(fetchCurrentWeather(city.name));

    // Set up auto-refresh every 60 seconds
    const interval = setInterval(() => {
      dispatch(fetchCurrentWeather(city.name));
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, city.name]);

  // Check if data needs refresh (older than 60 seconds)
  useEffect(() => {
    if (lastUpdated && Date.now() - lastUpdated > 60000) {
      dispatch(fetchCurrentWeather(city.name));
    }
  }, [dispatch, city.name, lastUpdated]);

  const handleCardClick = () => {
    navigate(`/city/${encodeURIComponent(city.name)}`);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (isInFavorites) {
      dispatch(removeFavorite(city.name));
    } else {
      dispatch(addFavorite(city));
    }
  };

  // Show error state
  if (error && !weatherData) {
    return (
      <div className="bg-red-50 rounded-xl shadow-md p-6 border-2 border-red-200">
        <div className="text-red-600 mb-2">
          <h3 className="font-bold text-lg">{city.name}</h3>
          <p className="text-sm mt-2">{error}</p>
          <button 
            onClick={() => dispatch(fetchCurrentWeather(city.name))}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (!weatherData) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-16 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  const temperature = getTemperatureValue(weatherData.main.temp, temperatureUnit);
  const feelsLike = getTemperatureValue(weatherData.main.feels_like, temperatureUnit);

  return (
    <div
      onClick={handleCardClick}
      className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl text-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
            <p className="text-blue-100 text-sm">{weatherData.sys.country}</p>
          </div>
          {showFavoriteButton && (
            <button
              onClick={handleToggleFavorite}
              className={`transition duration-200 ${
                isInFavorites 
                  ? 'text-yellow-400 hover:text-yellow-300' 
                  : 'text-white hover:text-yellow-400'
              }`}
              title={isInFavorites ? "Remove from favorites" : "Add to favorites"}
            >
              <svg className="w-6 h-6" fill={isInFavorites ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img
              src={getWeatherIcon(weatherData.weather[0].id, weatherData.weather[0].icon)}
              alt={weatherData.weather[0].description}
              className="w-20 h-20"
            />
            <div className="ml-2">
              <div className="text-5xl font-bold">
                {Math.round(temperature)}°
              </div>
              <div className="text-blue-100 text-sm capitalize">
                {weatherData.weather[0].description}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-400">
          <div>
            <p className="text-blue-100 text-xs mb-1">Feels Like</p>
            <p className="text-lg font-semibold">{Math.round(feelsLike)}°</p>
          </div>
          <div>
            <p className="text-blue-100 text-xs mb-1">Humidity</p>
            <p className="text-lg font-semibold">{weatherData.main.humidity}%</p>
          </div>
          <div>
            <p className="text-blue-100 text-xs mb-1">Wind Speed</p>
            <p className="text-lg font-semibold">{weatherData.wind.speed} m/s</p>
          </div>
          <div>
            <p className="text-blue-100 text-xs mb-1">Pressure</p>
            <p className="text-lg font-semibold">{weatherData.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
