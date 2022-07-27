function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    (minutes = "0"), minutes;
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
  tempElement.innerHTML = Math.round(response.data.main.temp);
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
}
let city = "New York";
let apiKey = "c6b24904ab14ebc2fc4d82be19770cb4";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=c6b24904ab14ebc2fc4d82be19770cb4&units=metric";
axios.get(apiUrl).then(showTemperature);
