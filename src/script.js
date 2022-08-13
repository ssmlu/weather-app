//Main date & time update
let now = new Date();
let h4 = document.querySelector("h4");
let date = now.getDate();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "Februrary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let hour = now.getHours();
let minutes = now.getMinutes();

if (now.getMinutes() < 10) {
  minutes = `0${minutes}`;
} else {
  minutes = minutes;
}

h4.innerHTML = `${day}, ${date} ${month} ${year}, ${hour}:${minutes}`;

//Update weather icons
let iconConvert = {
  "01d": "clearsky",
  "01n": "clearsky",
  "02d": "fewclouds",
  "02n": "fewclouds",
  "03d": "scatteredclouds",
  "03n": "scatteredclouds",
  "04d": "brokenclouds",
  "04n": "brokenclouds",
  "09d": "showerrain",
  "09n": "showerrain",
  "10d": "rain",
  "10n": "rain",
  "11d": "thunderstorm",
  "11n": "thunderstorm",
  "13d": "snow",
  "13n": "snow",
  "50d": "mist",
  "50n": "mist",
};

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col" id="sm-summary">
        <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
        <img class="forecast-icon" src="svg/${
          iconConvert[forecastDay.weather[0].icon]
        }.svg" alt="" width="52" />
        <div id="forecast-temp" >${Math.round(forecastDay.temp.day)}°</div>
        </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "e53e54a43247d25856afdd76e66e6441";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let h1 = document.querySelector("h1");
  let temperatureElement = document.querySelector("#lg-temp");
  let descriptionElement = document.querySelector("#descript");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  h1.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}% `;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}KM/H `;
  let iconPath = iconConvert[response.data.weather[0].icon];
  iconElement.setAttribute("src", `svg/${iconPath}.svg`);
  iconElement.setAttribute("alt", `response.data.weather[0].description`);

  // Add the active class
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let cityName = document.querySelector("#inputCity");
  let h1 = document.querySelector("h1");
  if (cityName.value) {
    h1.innerHTML = `${cityName.value}`;
  } else {
    h1.innerHTML = ` `;
    alert("Please enter a city");
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayTemperature);
}

function positionInfo(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayTemperature);
}

function findUserPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(positionInfo);
}

function displayFahrenheittemp(event) {
  event.preventDefault();
  let tempFahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  // Add the active class
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let elementTemperature = document.querySelector("h2");
  elementTemperature.innerHTML = `${tempFahrenheit}`;
}
function displayCelsiustemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let elementTemperature = document.querySelector("h2");
  elementTemperature.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let findUserButton = document.querySelector("#findUser");
findUserButton.addEventListener("click", findUserPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheittemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiustemp);

let celsiusTemperature = null;

let apiKey = "e53e54a43247d25856afdd76e66e6441";
let cityName = "Sydney";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
