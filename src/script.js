//Main date & time update
let now = new Date();

let h2 = document.querySelector("h2");

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

h2.innerHTML = `${day}, ${date} ${month} ${year}, ${hour}:${minutes}`;

//Search location weather information
//Find user location weather information
let apiKey = "e53e54a43247d25856afdd76e66e6441";
function inputTemperature(response) {
  let mainTemp = Math.round(response.data.main.temp);
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${mainTemp}`;
  let searchHumidity = document.querySelector("#humidity");
  let newHumidity = response.data.main.humidity;
  searchHumidity.innerHTML = `Humidity: ${newHumidity}% `;
  let searchWind = document.querySelector("#wind");
  let newWind = Math.round(response.data.wind.speed);
  searchWind.innerHTML = `Wind: ${newWind}KM/H `;
  let weatherDescription = document.querySelector("#descript");
  weatherDescription.innerHTML = response.data.weather[0].description;
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

let findUserButton = document.querySelector("#use-my-location");
findUserButton.addEventListener("click", findPosition);

//Search Location name update
function search(event) {
  event.preventDefault();
  let searchLocation = document.querySelector("#inputLocation1");

  let h1 = document.querySelector("h1");
  if (searchLocation.value) {
    h1.innerHTML = `${searchLocation.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please enter a location");
  }

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(inputTemperature);
}

let input = document.querySelector("#location-form");
input.addEventListener("submit", search);

//Next five days
let shortdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

let day1 = document.querySelector("#day-1");
day1.innerHTML = `${shortdays[now.getDay() + 1]}`;
let day2 = document.querySelector("#day-2");
day2.innerHTML = `${shortdays[now.getDay() + 2]}`;
let day3 = document.querySelector("#day-3");
day3.innerHTML = `${shortdays[now.getDay() + 3]}`;
let day4 = document.querySelector("#day-4");
day4.innerHTML = `${shortdays[now.getDay() + 4]}`;
let day5 = document.querySelector("#day-5");
day5.innerHTML = `${shortdays[now.getDay() + 5]}`;

//Main unit change
//let tempFahrenheit = document.querySelector("h3");
//let mainCelsius = 16;
//let mainFahrenheit = Math.round(mainCelsius * 1.8 + 32);

//function convertToFahrenheit(event) {
//event.preventDefault();
//tempFahrenheit.innerHTML = `${mainFahrenheit}`;
//}

//let toFahrenheit = document.querySelector("#tempFahrenheit");
//toFahrenheit.addEventListener("click", convertToFahrenheit);

//function convertToCelsius(event) {
//event.preventDefault();
//h3.innerHTML = `${placeMainCelsius}`;
//}

//let toCelsius = document.querySelector("#tempCelsius");
//toCelsius.addEventListener("click", convertToCelsius);
