function currentDate(date) {
let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Oct",
    "Nov",
    "Dec"
];

let today = days[date.getDay()];
let dateNr = date.getDate();
let thisMonth = months[date.getMonth()];

return `${today} ${dateNr} ${thisMonth}`;
}

function currentTime(time) {
    let hour = time.getHours();
    let minutes = time.getMinutes();

    return `${hour}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];
    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML = forecastHTML +
                `
                    <div class="col-2">
                    <div class="forecastDate">
                    ${formatDay(forecastDay.dt)}
                    </div>
                    <img class="forecastIcon"
                    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                    alt=""
                    width="60"
                    />
                    <div 
                    class="forecastTemp" 
                    id="forecast-temp">
                    <span
                    class="forecastTempMax"
                    id="forecast-temp-max">
                    ${Math.round(forecastDay.temp.max)}º</span> 
                    <span 
                    class="forecastTempMin"
                    id="forecast-temp-min">
                    ${Math.round(forecastDay.temp.min)}º
                    </span>
                    </div>
                </div>
            `;
        }
    })
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "b6ea7199b1cb9aca54197fcbaab59e85";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#humidity-value").innerHTML = Math.round(response.data.main.humidity);
    document.querySelector("#km").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#sky").innerHTML = response.data.weather[0].description;
    document.querySelector("#temp-main").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#icon-today").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    celsiusTemp = response.data.main.temp;

    getForecast(response.data.coord);
}

function searchPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "bea03abc048987ac9ed7fb290ead5af5";
    let units = "metric";
    let mainUrl = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${mainUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayWeather);
}

function pinpointCity(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchPosition);
}

function cityUserInput(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-bar").value.trim();
    let apiKey = "b6ea7199b1cb9aca54197fcbaab59e85";
    let units = "metric";
    let mainUrl = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${mainUrl}q=${cityInput}&appid=${apiKey}&units=${units}`;
    
    axios.get(apiUrl).then(displayWeather);
}

let now = new Date();
let dateToday = document.querySelector("#date").innerHTML = currentDate(now);
let timeToday = document.querySelector("#time").innerHTML = currentTime(now);

let pinpoint = document.querySelector("#pinpoint");
pinpoint.addEventListener("click", pinpointCity);

let cityInput = document.querySelector("#user-input");
cityInput.addEventListener("submit", cityUserInput);

let celsiusTemp = null;

