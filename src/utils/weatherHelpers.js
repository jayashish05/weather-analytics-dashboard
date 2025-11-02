// Get weather icon based on weather condition
export const getWeatherIcon = (weatherCode, iconCode) => {
  // OpenWeatherMap icon codes
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return iconUrl;
};

// Get emoji icon based on weather condition
export const getWeatherEmoji = (main) => {
  const emojiMap = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️',
    'Smoke': '🌫️',
    'Dust': '🌫️',
    'Sand': '🌫️',
    'Ash': '🌫️',
    'Squall': '💨',
    'Tornado': '🌪️',
  };
  
  return emojiMap[main] || '🌤️';
};

// Get background gradient based on weather
export const getWeatherGradient = (main) => {
  const gradientMap = {
    'Clear': 'from-blue-400 to-blue-600',
    'Clouds': 'from-gray-400 to-gray-600',
    'Rain': 'from-blue-700 to-gray-700',
    'Drizzle': 'from-blue-500 to-gray-500',
    'Thunderstorm': 'from-purple-700 to-gray-900',
    'Snow': 'from-blue-100 to-gray-300',
    'Mist': 'from-gray-300 to-gray-500',
    'Fog': 'from-gray-300 to-gray-500',
  };
  
  return gradientMap[main] || 'from-blue-400 to-blue-500';
};
