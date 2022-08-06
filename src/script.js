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
  "01d": "svg/clearsky.svg",
  "01n": "svg/clearsky.svg",
  "02d": "svg/fewclouds.svg",
  "02n": "svg/fewclouds.svg",
  "03d": "svg/scatteredclouds.svg",
  "03n": "svg/scatteredclouds.svg",
  "04d": "svg/brokenclouds.svg",
  "04n": "svg/brokenclouds.svg",
  "09d": "svg/showerrain.svg",
  "09n": "svg/showerrain.svg",
  "10d": "svg/rain.svg",
  "10n": "svg/rain.svg",
  "11d": "svg/thunderstorm.svg",
  "11n": "svg/thunderstorm.svg",
  "13d": "svg/snow.svg",
  "13n": "svg/snow.svg",
  "50d": "svg/mist.svg",
  "50n": "svg/mist.svg",
};

//Next five days
let shortdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

let day1 = document.querySelector("#day-1");
if ([now.getDay() + 1] > 6) {
  day1.innerHTML = `${shortdays[now.getDay() + 1 - 7]}`;
} else {
  day1.innerHTML = `${shortdays[now.getDay() + 1]}`;
}
let day2 = document.querySelector("#day-2");
if ([now.getDay() + 2] > 6) {
  day2.innerHTML = `${shortdays[now.getDay() + 2 - 7]}`;
} else {
  day2.innerHTML = `${shortdays[now.getDay() + 2]}`;
}
let day3 = document.querySelector("#day-3");
if ([now.getDay() + 3] > 6) {
  day3.innerHTML = `${shortdays[now.getDay() + 3 - 7]}`;
} else {
  day3.innerHTML = `${shortdays[now.getDay() + 3]}`;
}
let day4 = document.querySelector("#day-4");
if ([now.getDay() + 4] > 6) {
  day4.innerHTML = `${shortdays[now.getDay() + 4 - 7]}`;
} else {
  day4.innerHTML = `${shortdays[now.getDay() + 4]}`;
}
let day5 = document.querySelector("#day-5");
if ([now.getDay() + 5] > 6) {
  day5.innerHTML = `${shortdays[now.getDay() + 5 - 7]}`;
} else {
  day5.innerHTML = `${shortdays[now.getDay() + 5]}`;
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
  iconElement.setAttribute("src", iconConvert[response.data.weather[0].icon]);
  iconElement.setAttribute("alt", `response.data.weather[0].description`);
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
