function displayTemperature(response) {
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let temperature = document.querySelector("#tempo");
  let actualtemp = Math.round(response.data.main.temp);
  let windData = Math.round(response.data.wind.speed);
  let humidData = Math.round(response.data.main.humidity);
  let wheatherConditions = document.querySelector("#condition");
  let wheatherData = response.data.weather[0].description;
  let city = document.querySelector("#picked-city");
  let countryElement = document.querySelector("#country");
  city.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  wheatherConditions.innerHTML = wheatherData;
  humidity.innerHTML = humidData;
  windSpeed.innerHTML = windData;
  temperature.innerHTML = actualtemp;
  axios.get(apiUrl).then(displayTemperature);
}
let city = "Kyiv";
let apiKey = "f9dcd16921b5c743196e0ded07686e68";
let units = "metric";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
