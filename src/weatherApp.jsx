import { useState } from "react";
import './pageStyle.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const FetchWeather = async () => {
    const apiKey = "94e8121d78594d55b8e120332242711"; 
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found! Try another city.");
      }
      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const handleChange = (e) => setCity(e.target.value);

  return (
    <div className="weather-container text-center">
      <h1 className="weather-heading display-4 mb-3">Today's Weather</h1>
      <input
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Enter a city"
        className="weather-input form-control w-50 mx-auto"
      />
      <button onClick={FetchWeather} className="weather-button btn btn-primary mt-3">
        Get Weather
      </button>
      
      <h2 className="weather-heading my-3">{city} </h2>
      
      {error && <p className="error-message text-danger">{error}</p>}
      {weather && (
        <div className="weather-grid row justify-content-center">
          <div className="weather-box col-md-2 col-sm-4 mb-4">
            <h4>Temperature</h4> 
            <img src="/sun.png" alt="Sun Icon" />
            <h5>{weather.current.temp_c} °C</h5>
          </div>
          <div className="weather-box col-md-2 col-sm-4 mb-4">
            <h4>Condition</h4> 
            <img src="/nature.png" alt="Nature Icon" />
            <h5>{weather.current.condition.text}</h5>
          </div>
          <div className="weather-box col-md-2 col-sm-2 mb-4">
            <h4>Humidity</h4> 
            <img src="/humidity.png" alt="Humidity Icon" />
            <h5>{weather.current.humidity}%</h5>
          </div>
          <div className="weather-box col-md-2 col-sm-4 mb-4">
            <h4>Wind Speed</h4>
            <img src="/storm.png" alt="Storm Icon" />
            <h5>{weather.current.wind_kph} kph</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
