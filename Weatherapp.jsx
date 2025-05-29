import React, { useState } from 'react';
import { Sun, CloudRain, Snowflake, Cloud } from 'lucide-react';

const API_KEY = '3b6dc7a05a14ee468ab96ee4240701a9';

const Weatherapp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
    setLoading(false);
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clear':
        return <Sun className="text-yellow-400 w-12 h-12" />;
      case 'Rain':
        return <CloudRain className="text-blue-400 w-12 h-12" />;
      case 'Snow':
        return <Snowflake className="text-blue-200 w-12 h-12" />;
      default:
        return <Cloud className="text-gray-400 w-12 h-12" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Weather App</h1>
        <div className="flex items-center gap-2 mb-4">
          <input
            className="flex-1 px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={city}
            placeholder="Enter city name"
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            onClick={fetchWeather}
          >
            Search
          </button>
        </div>

        {loading && <p className="text-blue-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {weather && (
          <div className="mt-6 space-y-3">
            {getWeatherIcon(weather.weather[0].main)}
            <h2 className="text-2xl font-semibold">{weather.name}</h2>
            <p className="text-lg capitalize text-gray-700">
              {weather.weather[0].description}
            </p>
            <p className="text-4xl font-bold text-blue-700">
              {Math.round(weather.main.temp)}°C
            </p>
            <div className="text-gray-600">
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weatherapp;
