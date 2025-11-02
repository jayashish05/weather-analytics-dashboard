import React from 'react';
import { useSelector } from 'react-redux';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getTemperatureValue } from '../../utils/unitConversion';
import { formatDate } from '../../utils/dateFormat';

const DailyForecastChart = ({ data, title = '7-Day Forecast' }) => {
  const temperatureUnit = useSelector((state) => state.settings.temperatureUnit);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-gray-500 text-center py-8">No data available</p>
      </div>
    );
  }

  // Group data by day and calculate min/max temperatures
  const dailyData = {};
  data.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = {
        date: formatDate(item.dt),
        temps: [],
        humidity: [],
        pressure: [],
      };
    }
    dailyData[date].temps.push(item.main.temp);
    dailyData[date].humidity.push(item.main.humidity);
    dailyData[date].pressure.push(item.main.pressure);
  });

  const chartData = Object.values(dailyData).map((day) => ({
    date: day.date,
    min: Math.round(getTemperatureValue(Math.min(...day.temps), temperatureUnit)),
    max: Math.round(getTemperatureValue(Math.max(...day.temps), temperatureUnit)),
    avg: Math.round(getTemperatureValue(
      day.temps.reduce((a, b) => a + b, 0) / day.temps.length,
      temperatureUnit
    )),
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
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
          <Legend
            wrapperStyle={{ fontSize: '14px' }}
          />
          <Area
            type="monotone"
            dataKey="max"
            stroke="#EF4444"
            fillOpacity={1}
            fill="url(#colorMax)"
            name="Max Temp"
          />
          <Area
            type="monotone"
            dataKey="min"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorMin)"
            name="Min Temp"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyForecastChart;
