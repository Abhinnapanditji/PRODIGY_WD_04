const apiKey = '2305493215a24362ad4133218251001';

function getWeather() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        alert('Please enter a location.');
        return;
    }

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
}

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
    }
}

function get3DayForecast() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        alert('Please enter a location for the forecast.');
        return;
    }

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
                forecastHTML += `
                    <div>
                        <h4>${day.date}</h4>
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
