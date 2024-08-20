const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('cityName');
const countryState = document.getElementById('countryState');
const countryFlag = document.getElementById('countryFlag');
const countryCode = document.getElementById('countryCode');
const weatherCondition = document.getElementById('weatherCondition');
const temperature = document.getElementById('temperature');
const time = document.getElementById('time');
const darkModeSwitch = document.getElementById('darkModeSwitch');
const errorMessage = document.getElementById('errorMessage');

const apiKey = '8c28dbd41bc1aeca9aee6c99d7ebfe05';

searchButton.addEventListener('click', fetchWeatherData);
darkModeSwitch.addEventListener('change', toggleDarkMode);

async function fetchWeatherData() {
    const city = cityInput.value.trim();

    if (!city) {
        errorMessage.textContent = 'Please enter a city name.';
        return;
    }

    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={apiKey}&units=metric`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check your spelling.');
            } else {
                throw new Error('An error occurred while fetching weather data.');
            }
        }

        const data = await response.json();

        cityName.textContent = data.name;
        countryState.textContent = data.sys.country;
        countryFlag.src = `https://flagcdn.com/w320/${data.sys.country.toLowerCase()}.png`;
        countryCode.textContent = data.sys.country;
        weatherCondition.textContent = data.weather[0].description;
        temperature.textContent = `${data.main.temp}°C`;

        const timezoneOffset = data.timezone;
        const currentTime = new Date();
        const localTime = new Date(currentTime.getTime() + timezoneOffset * 1000);
        time.textContent = localTime.toLocaleTimeString();

        errorMessage.textContent = ''; // Clear any previous error messages

    } catch (error) {
        errorMessage.textContent = error.message;
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}