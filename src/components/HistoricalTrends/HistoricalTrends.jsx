import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getTemperatureValue } from '../../utils/unitConversion';

const HistoricalTrends = ({ forecast }) => {
  const temperatureUnit = useSelector((state) => state.settings.temperatureUnit);
  const [selectedDays, setSelectedDays] = useState(5);

  if (!forecast || !forecast.list) {
    return null;
  }

  // Process forecast data to show historical trends
  const processedData = forecast.list.slice(0, selectedDays * 8).map((item) => {
    const date = new Date(item.dt * 1000);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit' }),
      temp: Math.round(getTemperatureValue(item.main.temp, temperatureUnit)),
      tempMin: Math.round(getTemperatureValue(item.main.temp_min, temperatureUnit)),
      tempMax: Math.round(getTemperatureValue(item.main.temp_max, temperatureUnit)),
      humidity: item.main.humidity,
      pressure: item.main.pressure,
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
              {entry.name.includes('Temp') || entry.name === 'Temperature' 
                ? `°${temperatureUnit === 'celsius' ? 'C' : 'F'}` 
                : entry.name === 'Humidity' ? '%' : ' hPa'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Historical Weather Trends</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedDays(3)}
            className={`px-4 py-2 rounded ${selectedDays === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            3 Days
          </button>
          <button
            onClick={() => setSelectedDays(5)}
            className={`px-4 py-2 rounded ${selectedDays === 5 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            5 Days
          </button>
        </div>
      </div>

      {/* Temperature Trends */}
      <div className="mb-8">
        <h4 className="text-lg font-medium text-gray-700 mb-4">Temperature Patterns</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              label={{
                value: `Temperature (°${temperatureUnit === 'celsius' ? 'C' : 'F'})`,
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: '12px', fill: '#6B7280' },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            <Line
              type="monotone"
              dataKey="tempMax"
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ fill: '#EF4444', r: 3 }}
              name="Max Temp"
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 3 }}
              name="Temperature"
            />
            <Line
              type="monotone"
              dataKey="tempMin"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={{ fill: '#60A5FA', r: 3 }}
              name="Min Temp"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Humidity & Pressure Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-4">Humidity Pattern</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                style={{ fontSize: '10px' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
                label={{
                  value: 'Humidity (%)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: '12px', fill: '#6B7280' },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981', r: 3 }}
                name="Humidity"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-4">Pressure Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                style={{ fontSize: '10px' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
                label={{
                  value: 'Pressure (hPa)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: '12px', fill: '#6B7280' },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="pressure"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ fill: '#F59E0B', r: 3 }}
                name="Pressure"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Avg Temperature</p>
          <p className="text-2xl font-bold text-blue-600">
            {Math.round(processedData.reduce((sum, d) => sum + d.temp, 0) / processedData.length)}°
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Max Temperature</p>
          <p className="text-2xl font-bold text-red-600">
            {Math.max(...processedData.map(d => d.tempMax))}°
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Avg Humidity</p>
          <p className="text-2xl font-bold text-green-600">
            {Math.round(processedData.reduce((sum, d) => sum + d.humidity, 0) / processedData.length)}%
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Avg Pressure</p>
          <p className="text-2xl font-bold text-yellow-600">
            {Math.round(processedData.reduce((sum, d) => sum + d.pressure, 0) / processedData.length)} hPa
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoricalTrends;
