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

function showTemp(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let weather = document.querySelector("#display");
  weather.innerHTML = `${temperature}℃`;
}

let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);