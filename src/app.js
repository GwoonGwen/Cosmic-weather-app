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

function cityInputWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#humidity-value").innerHTML = Math.round(response.data.main.humidity);
    document.querySelector("#km").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#sky").innerHTML = response.data.weather[0].description;
    document.querySelector("#temp-main").innerHTML = Math.round(response.data.main.temp);

    celsiusTemp = response.data.main.temp;
}

function cityUserInput(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-bar").value.trim();
    let apiKey = "bea03abc048987ac9ed7fb290ead5af5";
    let units = "metric";
    let mainUrl = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${mainUrl}q=${cityInput}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(cityInputWeather)

}

function searchPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "bea03abc048987ac9ed7fb290ead5af5";
    let units = "metric";
    let mainUrl = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${mainUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(cityInputWeather)
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

let cityInput = document.querySelector("#user-input");
cityInput.addEventListener("submit", cityUserInput);

let pinpoint = document.querySelector("#pinpoint");
pinpoint.addEventListener("click", pinpointCity);

let celsiusTemp = null;

let fahnrenheitLink = document.querySelector("#fahrenheit");
fahnrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);