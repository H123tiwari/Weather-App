const apiKey = 'c3d1520646cc3a575e312778bec6f043'; // Your API Key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherIcon = document.getElementById('weather-icon');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const loading = document.querySelector('.loading');
const weatherInfo = document.querySelector('.weather-info');

// Function to fetch weather data
async function getWeatherData(city) {
  try {
    loading.style.display = 'block'; // Show loading spinner
    weatherInfo.style.opacity = 0; // Hide weather info during load
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    
    if (data.cod === '404') {
      alert('City not found');
      return;
    }

    updateWeatherUI(data);
  } catch (error) {
    alert('Error fetching weather data');
  } finally {
    loading.style.display = 'none'; // Hide loading spinner
  }
}

// Function to update the UI with fetched weather data
function updateWeatherUI(data) {
  const iconCode = data.weather[0].icon;
  const temp = data.main.temp;
  const humid = data.main.humidity;
  const description = data.weather[0].description;
  const city = data.name;

  weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
  cityName.textContent = city;
  weatherDescription.textContent = description.charAt(0).toUpperCase() + description.slice(1);
  temperature.textContent = `Temperature: ${temp}°C`;
  humidity.textContent = `Humidity: ${humid}%`;

  weatherInfo.style.opacity = 1; // Show the weather info after load
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
  const city = cityInput.value;
  if (city.trim() !== '') {
    getWeatherData(city);
  }
});
