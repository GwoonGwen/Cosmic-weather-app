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

function pintpointCity(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchPosition);
}

let now = new Date();
let dateToday = document.querySelector("#date").innerHTML = currentDate(now);
let timeToday = document.querySelector("#time").innerHTML = currentTime(now);

let cityInput = document.querySelector("#user-input");
cityInput.addEventListener("submit", cityUserInput);

let pinpoint = document.querySelector("#pinpoint");
pinpoint.addEventListener("click", pinpointCity);