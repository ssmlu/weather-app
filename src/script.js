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

//Search city weather information
//Find user location weather information
let apiKey = "e53e54a43247d25856afdd76e66e6441";
function inputTemperature(response) {
  let h2 = document.querySelector("h2");
  let elementDescription = document.querySelector("#descript");
  let elementHumidity = document.querySelector("#humidity");
  let elementWind = document.querySelector("#wind");
  let elementIcon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  h2.innerHTML = Math.round(celsiusTemperature);
  elementDescription.innerHTML = `${response.data.weather[0].description}`;
  elementHumidity.innerHTML = `Humidity: ${response.data.main.humidity}% `;
  elementWind.innerHTML = `Wind: ${response.data.wind.speed}KM/H `;
  elementIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  elementIcon.setAttribute("alt", `response.data.weather[0].description`);

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

function userPositionInfo(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(inputTemperature);
}

function findPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(userPositionInfo);
}

let findUserButton = document.querySelector("#findMe");
findUserButton.addEventListener("click", findPosition);

//Search Location name update
function search(event) {
  event.preventDefault();
  let searchLocation = document.querySelector("#inputCity");
  let h1 = document.querySelector("h1");
  if (searchLocation.value) {
    h1.innerHTML = `${searchLocation.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please enter a city");
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(inputTemperature);
}

let input = document.querySelector("#city-search");
input.addEventListener("submit", search);

//Main unit change
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

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheittemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiustemp);

let celsiusTemperature = null;

userPositionInfo("Fitzroy");
