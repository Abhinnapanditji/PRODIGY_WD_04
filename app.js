const apiKey = '2305493215a24362ad4133218251001';

function getWeatherIcon(condition) {
    const conditionLowerCase = condition.toLowerCase();

    if (conditionLowerCase.includes('sunny')) {
        return '☀️';
    } else if (conditionLowerCase.includes('cloudy')) {
        return '☁️';
    } else if (conditionLowerCase.includes('partly cloudy')) {
        return '⛅';
    } else if (conditionLowerCase.includes('rainy')) {
        return '🌧️';
    } else if (conditionLowerCase.includes('stormy') || conditionLowerCase.includes('thunderstorm')) {
        return '🌩️';
    } else if (conditionLowerCase.includes('snowy')) {
        return '❄️';
    } else if (conditionLowerCase.includes('foggy')) {
        return '🌫️';
    } else {
        return '🌍';
    }
}

function clearWeatherData() {
    document.getElementById('city-name').textContent = 'Weather Information';
    document.getElementById('description').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('windspeed').textContent = '';
    document.getElementById('aqi').textContent = '';
    document.getElementById('alerts').textContent = '';
    document.getElementById('forecast').innerHTML = '';
}

function getWeather() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        alert('Please enter a location.');
        return;
    }

<<<<<<< HEAD
    clearWeatherData();

=======
>>>>>>> 8528f221070a2527c3f2d75cdf476246a8c09d8b
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('City not found or invalid input');
                return;
            }

            const cityName = data.location.name;
            const description = data.current.condition.text;
            const temperature = `${data.current.temp_c}°C`;
            const humidity = `Humidity: ${data.current.humidity}%`;
            const windSpeed = `Wind Speed: ${data.current.wind_kph} km/h`;
            const aqi = `Air Quality: ${data.current.air_quality.pm10} PM10`;
<<<<<<< HEAD
            const weatherIcon = getWeatherIcon(description);
=======
>>>>>>> 8528f221070a2527c3f2d75cdf476246a8c09d8b

            document.getElementById('city-name').textContent = `${cityName} ${weatherIcon}`;
            document.getElementById('description').textContent = description;
            document.getElementById('temperature').textContent = temperature;
            document.getElementById('humidity').textContent = humidity;
            document.getElementById('windspeed').textContent = windSpeed;
            document.getElementById('aqi').textContent = aqi;

            if (data.alerts && data.alerts.length > 0) {
                const alerts = data.alerts.map(alert => `${alert.headline}: ${alert.description}`).join('\n');
                document.getElementById('alerts').textContent = alerts;
            } else {
                document.getElementById('alerts').textContent = 'No active weather alerts.';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

<<<<<<< HEAD
function get3DayForecast() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        alert('Please enter a location for the forecast.');
        return;
=======
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=yes`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const cityName = data.location.name;
                    const description = data.current.condition.text;
                    const temperature = `${data.current.temp_c}°C`;
                    const humidity = `Humidity: ${data.current.humidity}%`;
                    const windSpeed = `Wind Speed: ${data.current.wind_kph} km/h`;
                    const aqi = `Air Quality: ${data.current.air_quality.pm10} PM10`;

                    document.getElementById('city-name').textContent = cityName;
                    document.getElementById('description').textContent = description;
                    document.getElementById('temperature').textContent = temperature;
                    document.getElementById('humidity').textContent = humidity;
                    document.getElementById('windspeed').textContent = windSpeed;
                    document.getElementById('aqi').textContent = aqi;

                    if (data.alerts && data.alerts.length > 0) {
                        const alerts = data.alerts.map(alert => `${alert.headline}: ${alert.description}`).join('\n');
                        document.getElementById('alerts').textContent = alerts;
                    } else {
                        document.getElementById('alerts').textContent = 'No active weather alerts.';
                    }
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    alert('Error fetching weather data. Please try again.');
                });
        });
    } else {
        alert('Geolocation is not supported by this browser.');
>>>>>>> 8528f221070a2527c3f2d75cdf476246a8c09d8b
    }

<<<<<<< HEAD
    clearWeatherData();
=======
function get3DayForecast() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        alert('Please enter a location for the forecast.');
        return;
    }
>>>>>>> 8528f221070a2527c3f2d75cdf476246a8c09d8b

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('City not found or invalid input');
                return;
            }

            let forecastHTML = '<h3>3-Day Forecast</h3>';
            data.forecast.forecastday.forEach(day => {
<<<<<<< HEAD
                const forecastIcon = getWeatherIcon(day.day.condition.text);
                forecastHTML += `
                    <div>
                        <h4>${day.date} ${forecastIcon}</h4>
=======
                forecastHTML += `
                    <div>
                        <h4>${day.date}</h4>
>>>>>>> 8528f221070a2527c3f2d75cdf476246a8c09d8b
                        <p>Condition: ${day.day.condition.text}</p>
                        <p>Max Temp: ${day.day.maxtemp_c}°C</p>
                        <p>Min Temp: ${day.day.mintemp_c}°C</p>
                    </div>
                `;
            });

            document.getElementById('forecast').innerHTML = forecastHTML;
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Error fetching forecast data. Please try again.');
        });
}
<<<<<<< HEAD
=======

function getHistoricalWeather() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        alert('Please enter a location for historical weather.');
        return;
    }

    const url = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=2024-01-05`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('City not found or invalid input');
                return;
            }

            let historicalHTML = '<h3>Historical Weather (Last 7 Days)</h3>';
            data.forecast.forecastday.forEach(day => {
                historicalHTML += `
                    <div>
                        <h4>${day.date}</h4>
                        <p>Condition: ${day.day.condition.text}</p>
                        <p>Max Temp: ${day.day.maxtemp_c}°C</p>
                        <p>Min Temp: ${day.day.mintemp_c}°C</p>
                    </div>
                `;
            });

            document.getElementById('historical').innerHTML = historicalHTML;
        })
        .catch(error => {
            console.error('Error fetching historical weather data:', error);
            alert('Error fetching historical data. Please try again.');
        });
}

getWeatherByLocation();
get3DayForecast();
>>>>>>> 8528f221070a2527c3f2d75cdf476246a8c09d8b
