function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
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
  let day = days[date.getDay()];
  return day + " " + hours + ":" + minutes;
}
function showTemperature(response) {
  let tempElement = document.querySelector("#temperature");
  celTemp = response.data.main.temp;
  tempElement.innerHTML = Math.round(celTemp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptElement = document.querySelector("#description");
  descriptElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" +
      response.data.weather[0].icon +
      "@2x.png"
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
let city = "kyiv";

function search(city) {
  let apiKey = "c6b24904ab14ebc2fc4d82be19770cb4";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=c6b24904ab14ebc2fc4d82be19770cb4&units=metric";
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showFahrTemp(event) {
  event.preventDefault();
  let fahrTemp = (celTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(fahrTemp);
}

function showCelTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celTemp);
}
let celTemp = "null";

let fahrenhLink = document.querySelector("#fahrenh-link");
fahrenhLink.addEventListener("click", showFahrTemp);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", showCelTemp);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c6b24904ab14ebc2fc4d82be19770cb4";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    coordinates.lat +
    "&lon=" +
    coordinates.lon +
    "&appid=" +
    apiKey +
    "&units=metric";
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

search("Kyiv");
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

  return days[day];
  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="36"
        />
        <div class="weather-forecast-temperatures">
          <span class="max-temp">${Math.round(forecastDay.temp.max)}° </span
          ><span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
        </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
