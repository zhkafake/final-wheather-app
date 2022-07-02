function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
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
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let units = "metric";
  let city = document.querySelector("#picked-city");
  let apiKey = "f9dcd16921b5c743196e0ded07686e68";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let temperature = document.querySelector("#tempo");
  let actualtemp = Math.round(response.data.main.temp);
  let windData = Math.round(response.data.wind.speed);
  let humidData = Math.round(response.data.main.humidity);
  let wheatherConditions = document.querySelector("#condition");
  let wheatherData = response.data.weather[0].description;
  let countryElement = document.querySelector("#country");
  let dateElement = document.querySelector("#date");
  let pictureElement = document.querySelector("#picture");
  pictureElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  pictureElement.setAttribute("alt", response.data.weather[0].description);
  city.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  wheatherConditions.innerHTML = wheatherData;
  humidity.innerHTML = humidData;
  windSpeed.innerHTML = windData;
  temperature.innerHTML = actualtemp;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
function search(city) {
  let apiKey = "f9dcd16921b5c743196e0ded07686e68";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityTyped");
  search(cityInputElement.value);
}
search("Kyiv");
let searchForm = document.querySelector("#searchEngine");
searchForm.addEventListener("submit", handleSubmit);
