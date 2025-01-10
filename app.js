const apiKey = '2305493215a24362ad4133218251001';

function getWeather() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        alert('Please enter a location.');
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

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

            document.getElementById('city-name').textContent = cityName;
            document.getElementById('description').textContent = description;
            document.getElementById('temperature').textContent = temperature;
            document.getElementById('humidity').textContent = humidity;
            document.getElementById('windspeed').textContent = windSpeed;
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
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const cityName = data.location.name;
                    const description = data.current.condition.text;
                    const temperature = `${data.current.temp_c}°C`;
                    const humidity = `Humidity: ${data.current.humidity}%`;
                    const windSpeed = `Wind Speed: ${data.current.wind_kph} km/h`;

                    document.getElementById('city-name').textContent = cityName;
                    document.getElementById('description').textContent = description;
                    document.getElementById('temperature').textContent = temperature;
                    document.getElementById('humidity').textContent = humidity;
                    document.getElementById('windspeed').textContent = windSpeed;
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

getWeatherByLocation();
