function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#change-city").value;
  let apiKey = "e5bb208507c0c4c97d696df0a3444983";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
}
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", showCity);

function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "e5bb208507c0c4c97d696df0a3444983";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(forcastTemp);
}

function showTemp(response) {
  let temperature = document.querySelector("#temperature");
  let currentTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${currentTemp}`;
  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;
  let wind = document.querySelector("#wind");
  let currentWind = Math.round(response.data.wind.speed);
  wind.innerHTML = `${currentWind} km/h`;
  let currentDescription = response.data.weather[0].description;
  description.innerHTML = `${currentDescription}`;
  let currentIcon = document.querySelector("#icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].icon);
  celsiusTemp = response.data.main.temp;
  getForcast(response.data.coord);
}

function displayTemp(response) {
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
  let currentPlace = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentPlace}`;
  let currentDescription = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = `${currentDescription}`;
  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;
  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${currentWind}km/h`;
  let currentIcon = document.querySelector("#icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].icon);
  celsiusTemp = response.data.main.temp;
  forcastTemp();
  getForcast(response.data.coord);
}
let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", getPosition);

//Bonus homework

function showCoord(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "e5bb208507c0c4c97d696df0a3444983";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}
function getPosition(position) {
  navigator.geolocation.getCurrentPosition(showCoord);
}

//feature 1
let currentDate = new Date();

let date = document.querySelector(".new-day");

let hour = currentDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];

date.innerHTML = `${day} ${hour}:${minutes}`;

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function forcastTemp(response) {
  let forcastDays = response.data.daily;
  let forcast = document.querySelector("#weekdays");
  let forcastHTML = `<div class="row align-items-start">`;

  forcastDays.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `<div class="col">
            <div class="forcast-weather-date">${formateDay(forcastDay.dt)}</div>
            <img
            src = "http://openweathermap.org/img/wn/${
              forcastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
            />
            </br>
            <span class ="forcast-weather-temp-max">${Math.round(
              forcastDay.temp.max
            )}°</span>
             <span class ="forcast-weather-temp-min">${Math.round(
               forcastDay.temp.min
             )}°</span>
            
          </div>`;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forcast.innerHTML = forcastHTML;
}

//feature 2
function city(event) {
  event.preventDefault();
  let change = document.querySelector("#change-city");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = change.value;
}
function converttofarenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(farenheitTemp);
}
function converttocelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = "null";
let form = document.querySelector("#city-form");
form.addEventListener("submit", city);

//feature 3

let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", converttofarenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", converttocelsius);
