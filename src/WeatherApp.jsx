// Import required dependencies
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Define the main WeatherApp component
const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city.trim()) {
      alert('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const response = await axios.get(
        'https://api.weatherapi.com/v1/current.json',
        {
          params: {
            key: 'ee48c906527044d7b6674616250401', // Replace with your actual API key
            q: city,
          },
        }
      );

      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather Application</h1>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Loading message */}
      {loading && <p>Loading data…</p>}

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Weather data display */}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c} °C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;