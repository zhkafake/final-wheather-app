function displayTemperature(response) {
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let units = "metric";
  let temperature = document.querySelector("#tempo");
  let temperatureData = response.data.main.temp;
  let actualtemp = Math.round(response.data.main.temp);
  let windData = Math.round(response.data.wind.speed);
  let humidData = Math.round(response.data.main.humidity);
  humidity.innerHTML = humidData;
  windSpeed.innerHTML = windData;
  temperature.innerHTML = actualtemp;
  axios.get(apiUrl).then(displayTemperature);
}
let city = "New York";
let apiKey = "46ded6c2ff1abcc5f9d00793c7ce4966";
let units = "metric";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
