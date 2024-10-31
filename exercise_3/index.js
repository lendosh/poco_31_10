const API_KEY = 'f51fb8c4f3a146039264f8b35715bb73';
const API_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
const API_GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?appid=${API_KEY}&limit=1`;

async function fetchWeather() {
    const cityEl = document.getElementById('city')
    const cityValue = cityEl.value;
    const weatherListEl = document.getElementById('weather-list');
    const geoResponse = await fetch(`${API_GEO_URL}&q=${cityValue}`)
        .then(response => response.json())
        .catch(error => console.log(error));

    const fetchTemp = await fetch(`${API_WEATHER_URL}&lat=${geoResponse[0].lat}&lon=${geoResponse[0].lon}`)
        .then(response => response.json())
        .catch(error => console.log(error));

    const weatherCard = `
        <div class="flex flex-col gap-y-2 border border-black py-2 px-4 rounded-md">
        <h2>Weather at ${fetchTemp.name}</h2>
        <div>Min: ${fetchTemp.main.temp_min}°C, Max: ${fetchTemp.main.temp_max}°C, Feels like: ${fetchTemp.main.feels_like}°C</div>
        </div>
    `
    const weatherDiv = document.createElement('div');
    weatherDiv.innerHTML = weatherCard;

    weatherListEl.appendChild(weatherDiv);

    cityEl.value = '';
}

