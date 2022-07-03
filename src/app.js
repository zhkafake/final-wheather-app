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
  celsiusTemperature = Math.round(response.data.main.temp);
  let iconData = response.data.weather[0].icon;
  pictureElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconData}@2x.png`
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
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#tempo");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#tempo");
  temperature.innerHTML = celsiusTemperature;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row"/>`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2 forecast-style">
            <div class="weather-forecast-day">${day}</div>
            <img
              src="http://openweathermap.org/img/wn/01d@2x.png"
              alt="clear"
              class="icon"
            />
            <div class="weather-forecats-temperatures">
              <span class="weather-forecats-temperature-max">18° </span>
              <span class="weather-forecats-temperature-min"> 12°</span>
            </div>
          </div>
        `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
let celsiusTemperature = null;
let searchForm = document.querySelector("#searchEngine");
searchForm.addEventListener("submit", handleSubmit);
let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
celsiusLink.addEventListener("click", showCelsiusTemperature);
search("Kyiv");
displayForecast();
