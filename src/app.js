function showTemperature(response) {
  console.log(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  console.log(response);
  cityElement.innerHTML = response.data.name;
  let descriptElement = document.querySelector("#description");
  descriptElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
let apiKey = "c6b24904ab14ebc2fc4d82be19770cb4";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=c6b24904ab14ebc2fc4d82be19770cb4&units=metric";
axios.get(apiUrl).then(showTemperature);
