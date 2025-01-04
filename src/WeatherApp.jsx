import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

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

    // Set loading state before the API call
    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      // Add artificial delay to ensure loading state is visible
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const response = await axios.get(
        'https://api.weatherapi.com/v1/current.json',
        {
          params: {
            key: 'ee48c906527044d7b6674616250401',
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
    <div className="weather-app" data-testid="weather-app">
      <h1>Weather Application</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          data-testid="city-input"
        />
        <button 
          className="btn" 
          onClick={handleSearch}
          data-testid="search-button"
        >
          Search
        </button>
      </div>

      {/* Loading state with test id */}
      {loading && (
        <div className="loading-state" data-testid="loading-state">
          <p>Loading weather data...</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="error-message" data-testid="error-message">
          {error}
        </p>
      )}

      {/* Weather data display */}
      {weatherData && (
        <div className="weather-cards" data-testid="weather-data">
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