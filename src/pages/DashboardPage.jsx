import React from 'react';
import { useSelector } from 'react-redux';
import Dashboard from '../components/Dashboard/Dashboard';
import SearchBar from '../components/SearchBar/SearchBar';
import SettingsToggle from '../components/SettingsToggle/SettingsToggle';
import AuthButton from '../components/AuthButton/AuthButton';
import LocationWeather from '../components/LocationWeather/LocationWeather';

const DashboardPage = () => {
  const recentSearches = useSelector((state) => state.recentSearches.searches);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Weather Analytics Dashboard
              </h1>
              <p className="text-gray-600">
                Real-time weather data and forecasts for your favorite cities
              </p>
            </div>
            <div className="flex items-center gap-4">
              <SettingsToggle />
              <AuthButton />
            </div>
          </div>
          
          <SearchBar />
        </div>

        {/* Current Location Weather */}
        <div className="mb-8">
          <LocationWeather />
        </div>

        {/* Dashboard Content with Recent Searches */}
        <Dashboard recentSearches={recentSearches} />
      </div>
    </div>
  );
};

export default DashboardPage;
