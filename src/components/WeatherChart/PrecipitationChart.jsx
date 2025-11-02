import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatTime } from '../../utils/dateFormat';

const PrecipitationChart = ({ data, title = 'Precipitation Levels' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-gray-500 text-center py-8">No data available</p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    time: formatTime(item.dt),
    rain: item.rain ? item.rain['3h'] || 0 : 0,
    snow: item.snow ? item.snow['3h'] || 0 : 0,
    humidity: item.main.humidity,
    clouds: item.clouds.all,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
              {entry.name === 'Humidity' || entry.name === 'Clouds' ? '%' : 'mm'}
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
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="time"
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
            label={{
              value: 'Amount',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: '12px', fill: '#6B7280' },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '14px' }}
          />
          <Bar dataKey="rain" fill="#3B82F6" name="Rain (mm)" />
          <Bar dataKey="snow" fill="#60A5FA" name="Snow (mm)" />
          <Bar dataKey="humidity" fill="#10B981" name="Humidity" />
          <Bar dataKey="clouds" fill="#9CA3AF" name="Clouds" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrecipitationChart;
