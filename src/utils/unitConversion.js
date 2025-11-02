// Temperature conversion utilities

export const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9/5) + 32;
};

export const fahrenheitToCelsius = (fahrenheit) => {
  return (fahrenheit - 32) * 5/9;
};

export const convertTemperature = (temp, toUnit) => {
  if (toUnit === 'fahrenheit') {
    return celsiusToFahrenheit(temp);
  }
  return temp; // Already in celsius
};

export const formatTemperature = (temp, unit) => {
  const rounded = Math.round(temp);
  return `${rounded}°${unit === 'celsius' ? 'C' : 'F'}`;
};

// Get appropriate temperature value based on unit
export const getTemperatureValue = (tempCelsius, unit) => {
  if (unit === 'fahrenheit') {
    return celsiusToFahrenheit(tempCelsius);
  }
  return tempCelsius;
};
