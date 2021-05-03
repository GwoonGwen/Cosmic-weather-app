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
    document.querySelector("#humidity").innerHTML = Math.round(response.date.main.humidity);
    document.querySelector("#wind").innerHTML = Math.round(response.date.main.humidity);
    document.querySelector("#sky").innerHTML = Math.round(response.date.main.humidity);
    document.querySelector("#humidity").innerHTML = Math.round(response.date.main.humidity);
}

function cityUserInput(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-bar").nodeValue.trim();
    let apikey = "b6ea7199b1cb9aca54197fcbaab59e85";
    let units = "metric";
    let mainUrl = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${mainUrl}q=${cityInput}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(cityInputWeather)
}

let now = new Date();
let dateToday = document.querySelector("#date").innerHTML = currentDate(now);
let timeToday = document.querySelector("#time").innerHTML = currentTime(now);

let cityInput = document.querySelector("#search-bar");
cityInput.addEventListener("submit", cityUserInput);

let pinpoint = document.querySelector("#pinpoint");
pinpoint.addEventListener("click", pinpointCity);