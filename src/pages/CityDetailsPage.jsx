import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchHourlyForecast,
} from '../features/weatherSlice';
import { addFavorite, removeFavorite } from '../features/favoritesSlice';
import { getTemperatureValue } from '../utils/unitConversion';
import { getWeatherIcon } from '../utils/weatherHelpers';
import { formatDate } from '../utils/dateFormat';
import TemperatureChart from '../components/WeatherChart/TemperatureChart';
import PrecipitationChart from '../components/WeatherChart/PrecipitationChart';
import WindChart from '../components/WeatherChart/WindChart';
import DailyForecastChart from '../components/WeatherChart/DailyForecastChart';
import HistoricalTrends from '../components/HistoricalTrends/HistoricalTrends';

const CityDetailsPage = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const decodedCityName = decodeURIComponent(cityName);
  const temperatureUnit = useSelector((state) => state.settings.temperatureUnit);
  const currentWeather = useSelector((state) => state.weather.currentWeather[decodedCityName]);
  const forecast = useSelector((state) => state.weather.forecasts[decodedCityName]);
  const hourlyForecast = useSelector((state) => state.weather.hourlyForecasts[decodedCityName]);
  const loading = useSelector((state) => state.weather.loading);
  const favorites = useSelector((state) => state.favorites.cities);
  
  const isFavorite = favorites.some(city => city.name === decodedCityName);

  useEffect(() => {
    dispatch(fetchCurrentWeather(decodedCityName));
    dispatch(fetchForecast(decodedCityName));
    dispatch(fetchHourlyForecast(decodedCityName));

    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      dispatch(fetchCurrentWeather(decodedCityName));
      dispatch(fetchForecast(decodedCityName));
      dispatch(fetchHourlyForecast(decodedCityName));
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, decodedCityName]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(decodedCityName));
    } else if (currentWeather) {
      dispatch(addFavorite({
        name: decodedCityName,
        country: currentWeather.sys.country,
        lat: currentWeather.coord.lat,
        lon: currentWeather.coord.lon,
      }));
    }
  };

  if (loading && !currentWeather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Unable to load weather data</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const temperature = getTemperatureValue(currentWeather.main.temp, temperatureUnit);
  const feelsLike = getTemperatureValue(currentWeather.main.feels_like, temperatureUnit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        {/* Current Weather Header */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{decodedCityName}</h1>
              <p className="text-blue-100">{currentWeather.sys.country}</p>
              <p className="text-sm text-blue-100 mt-2">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={handleToggleFavorite}
              className={`mt-4 md:mt-0 p-3 rounded-full transition duration-200 ${
                isFavorite
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-white bg-opacity-20 hover:bg-opacity-30'
              }`}
            >
              <svg className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={getWeatherIcon(currentWeather.weather[0].id, currentWeather.weather[0].icon)}
                alt={currentWeather.weather[0].description}
                className="w-32 h-32"
              />
              <div>
                <div className="text-6xl font-bold mb-2">
                  {Math.round(temperature)}°
                </div>
                <div className="text-xl capitalize">
                  {currentWeather.weather[0].description}
                </div>
                <div className="text-blue-100 mt-1">
                  Feels like {Math.round(feelsLike)}°
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-blue-100 text-sm mb-1">Humidity</p>
                <p className="text-2xl font-semibold">{currentWeather.main.humidity}%</p>
              </div>
              <div className="text-center">
                <p className="text-blue-100 text-sm mb-1">Wind Speed</p>
                <p className="text-2xl font-semibold">{currentWeather.wind.speed} m/s</p>
              </div>
              <div className="text-center">
                <p className="text-blue-100 text-sm mb-1">Pressure</p>
                <p className="text-2xl font-semibold">{currentWeather.main.pressure} hPa</p>
              </div>
              <div className="text-center">
                <p className="text-blue-100 text-sm mb-1">Visibility</p>
                <p className="text-2xl font-semibold">{(currentWeather.visibility / 1000).toFixed(1)} km</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 text-sm mb-2">UV Index</p>
            <p className="text-3xl font-bold text-gray-800">
              {currentWeather.uvi || 'N/A'}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 text-sm mb-2">Dew Point</p>
            <p className="text-3xl font-bold text-gray-800">
              {Math.round(getTemperatureValue(currentWeather.main.temp - ((100 - currentWeather.main.humidity) / 5), temperatureUnit))}°
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 text-sm mb-2">Cloudiness</p>
            <p className="text-3xl font-bold text-gray-800">{currentWeather.clouds.all}%</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 text-sm mb-2">Wind Direction</p>
            <p className="text-3xl font-bold text-gray-800">{currentWeather.wind.deg}°</p>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {/* Hourly Forecast Chart */}
          {hourlyForecast && hourlyForecast.list && (
            <TemperatureChart 
              data={hourlyForecast.list} 
              title="24-Hour Temperature Forecast"
            />
          )}

          {/* Daily Forecast Chart */}
          {forecast && forecast.list && (
            <DailyForecastChart 
              data={forecast.list}
              title="5-Day Temperature Forecast"
            />
          )}

          {/* Two-column layout for smaller charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {forecast && forecast.list && (
              <>
                <PrecipitationChart 
                  data={forecast.list.slice(0, 8)}
                  title="Precipitation & Humidity"
                />
                <WindChart 
                  data={forecast.list.slice(0, 8)}
                  title="Wind Forecast"
                />
              </>
            )}
          </div>
        </div>

        {/* Historical Trends Analysis */}
        {forecast && <HistoricalTrends forecast={forecast} />}

        {/* Detailed Forecast List */}
        {forecast && forecast.list && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Detailed 5-Day Forecast</h3>
            <div className="grid gap-4">
              {forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5).map((item) => (
                <div
                  key={item.dt}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={getWeatherIcon(item.weather[0].id, item.weather[0].icon)}
                      alt={item.weather[0].description}
                      className="w-16 h-16"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{formatDate(item.dt)}</p>
                      <p className="text-sm text-gray-600 capitalize">{item.weather[0].description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">
                      {Math.round(getTemperatureValue(item.main.temp, temperatureUnit))}°
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.main.humidity}% humidity
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityDetailsPage;
