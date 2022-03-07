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

//feature 2
function city(event) {
  event.preventDefault();
  let change = document.querySelector("#change-city");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = change.value;
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", city);

//feature 3
function converttofarenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 63;
}
let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", converttofarenheit);

function tocelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 17;
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", tocelsius);

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#change-city").value;
  let apiKey = "e5bb208507c0c4c97d696df0a3444983";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
  console.log(apiUrl);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
}
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", showCity);

function showTemp(response) {
  let temperature = document.querySelector("#temperature");
  let currentTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${currentTemp}`;
  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;
  let wind = document.querySelector("#wind");
  let currentWind = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${currentWind} km/h`;
}
//Bonus homework

function showCoord(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "e5bb208507c0c4c97d696df0a3444983";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}
function getPosition(position) {
  navigator.geolocation.getCurrentPosition(showCoord);
}

function displayTemp(response) {
  console.log(response.data);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
  let currentPlace = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentPlace}`;
  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;
  let wind = document.querySelector("#wind");
  let currentWind = Math.round(response.data.wind.speed);
  wind.innerHTML = `${currentWind}km/h`;
}

let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", getPosition);
