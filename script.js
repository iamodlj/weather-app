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

const apiKey = '8c28dbd41bc1aeca9aee6c99d7ebfe05'; //  API key
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather'; // Specified endpoint

searchButton.addEventListener('click', fetchWeatherData);
darkModeSwitch.addEventListener('change', toggleDarkMode);

let timeUpdateInterval;

searchButton.addEventListener('click', fetchWeatherData);
darkModeSwitch.addEventListener('change', toggleDarkMode);

async function fetchWeatherData() {
    const city = cityInput.value.trim();

    if (!city) {
        errorMessage.textContent = 'Please enter a city name.';
        return;
    }

    try {
        const response = await fetch(`${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check your spelling.');
            } else {
                throw new Error('An error occurred while fetching weather data.');
            }
        }

        const data = await response.json();

        cityName.textContent = data.name;

        // Display country and state/region if available
        if (data.sys.country && data.name) {
            countryState.textContent = `${data.sys.country}, ${data.name}`;
        } else if (data.sys.country) {
            countryState.textContent = data.sys.country;
        } else {
            countryState.textContent = ''; // Clear if no info available
        }

        countryFlag.src = `https://flagcdn.com/w320/${data.sys.country.toLowerCase()}.png`;
        countryCode.textContent = data.sys.country;
        weatherCondition.textContent = data.weather[0].description;
        temperature.textContent = `${data.main.temp}°C`;

        const timezoneOffset = data.timezone;

        // Function to update the time display
        function updateTime() {
            const currentTime = new Date();
            const localTime = new Date(currentTime.getTime() + timezoneOffset * 1000);
            time.textContent = localTime.toLocaleTimeString();
        }

        // Start updating the time
        clearInterval(timeUpdateInterval); // Clear any previous interval
        updateTime(); // Update immediately
        timeUpdateInterval = setInterval(updateTime, 1000); // Update every second

        errorMessage.textContent = '';

        // Update background based on weather condition (you'll need to implement this logic)
        updateBackground(data.weather[0].main);

    } catch (error) {
        errorMessage.textContent = error.message;
        clearInterval(timeUpdateInterval); // Stop updating time on error
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Function to update the background (placeholder, you'll need to implement this)
function updateBackground(weatherCondition) {
   
}