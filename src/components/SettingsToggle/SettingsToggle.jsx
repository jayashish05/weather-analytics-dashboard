import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureUnit } from '../../features/settingsSlice';

const SettingsToggle = () => {
  const dispatch = useDispatch();
  const temperatureUnit = useSelector((state) => state.settings.temperatureUnit);

  const handleToggle = () => {
    dispatch(toggleTemperatureUnit());
  };

  return (
    <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow-sm">
      <span className={`text-sm font-medium ${temperatureUnit === 'celsius' ? 'text-blue-600' : 'text-gray-500'}`}>
        °C
      </span>
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          temperatureUnit === 'fahrenheit' ? 'bg-blue-600' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={temperatureUnit === 'fahrenheit'}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            temperatureUnit === 'fahrenheit' ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${temperatureUnit === 'fahrenheit' ? 'text-blue-600' : 'text-gray-500'}`}>
        °F
      </span>
    </div>
  );
};

export default SettingsToggle;
