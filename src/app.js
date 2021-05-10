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

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    let days = ["Tue", "Wed", "Thu", "Fri"];
    days.forEach(function (day) {
        forecastHTML = forecastHTML +
            `
                    <div class="col-2">
                    <div class="forecastDay">
                    ${day}
                    </div>
                    <img class="forecastEmo"
                    src="http://openweathermap.org/img/wn/04d@2x.png"
                    alt=""
                    width="60"
                    />
                    <div 
                    class="forecastTemp" 
                    id="forecast-temp">
                    <span
                    class="forecastTempDay"
                    id="forecast-temp-day-max">
                    18º</span> 
                    <span 
                    class="forecastTempNight"
                    id="forecast-temp-night-min">
                    12º
                    </span>
                    </div>
                </div>
            `;
    })
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;

}

function currentTime(time) {
    let hour = time.getHours();
    let minutes = time.getMinutes();

    return `${hour}:${minutes}`;
}

function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#humidity-value").innerHTML = Math.round(response.data.main.humidity);
    document.querySelector("#km").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#sky").innerHTML = response.data.weather[0].description;
    document.querySelector("#temp-main").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#icon-today").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    celsiusTemp = response.data.main.temp;
}

function cityUserInput(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-bar").value.trim();
    let apiKey = "bea03abc048987ac9ed7fb290ead5af5";
    let units = "metric";
    let mainUrl = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${mainUrl}q=${cityInput}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather)
}

function searchPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "bea03abc048987ac9ed7fb290ead5af5";
    let units = "metric";
    let mainUrl = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${mainUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayWeather)
}

function pinpointCity(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchPosition);
}

function showFahrenheit(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#temp-main");

    celsiusLink.classList.remove("active");
    fahnrenheitLink.classList.add("active");

    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    tempElement.innerHTML = Math.round (fahrenheitTemp);
}

function showCelsius(event) {
    event.preventDefault();

    celsiusLink.classList.add("active");
    fahnrenheitLink.classList.remove("active");

    let tempElement = document.querySelector("#temp-main");
    tempElement.innerHTML = Math.round(celsiusTemp);
}

let now = new Date();
let dateToday = document.querySelector("#date").innerHTML = currentDate(now);
let timeToday = document.querySelector("#time").innerHTML = currentTime(now);

let pinpoint = document.querySelector("#pinpoint");
pinpoint.addEventListener("click", pinpointCity);

let cityInput = document.querySelector("#user-input");
cityInput.addEventListener("submit", displayWeather);

let celsiusTemp = null;

let fahnrenheitLink = document.querySelector("#fahrenheit");
fahnrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

displayForecast();