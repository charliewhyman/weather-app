'use strict';

//PARAMETERS
//get the user input from the search bar
let searchBox = document.getElementById('locationSearch');
let searchForm = document.getElementById('form');

//set an initial location to search
let searchLocation = 'London';
searchBox.value = searchLocation;

//set the units
let units = 'metric';
let temperatureUnits = '°C';
let speedUnits = 'kph';

const unitSelect = document.getElementById('unitSelect');

//set units depending on user selection
function setUnits() {
  if (unitSelect.options[unitSelect.selectedIndex].value === 'metric') {
    units = 'metric';
    temperatureUnits = '°C';
    speedUnits = 'kph';
  } else {
    units = 'imperial';
    temperatureUnits = '°F';
    speedUnits = 'mph';
  }
}

setUnits();

//LOGIC FUNCTIONS

//create a function to get the user input from the search box
function searchWeather() {
  searchLocation = searchBox.value;
  fetchForecast(searchLocation, units);
}

//create a function to call the openweathermap api for a specified location, and return the json response
function fetchForecast(searchLocation, units) {
  fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=' +
      searchLocation +
      '&APPID=5c143252ea13f0491b20a257f49ac149' +
      '&units=' +
      units,
    { mode: 'cors' }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      processForecast(response);
    })
    .catch(function (err) {
      console.log(err);
    });
}

//create a function to take the json response and create an object containing the data to be displayed in the app
function processForecast(forecast) {
  let forecastObject = {
    searchLocation: forecast.name,
    currentTemp: Math.round(forecast.main.temp * 10) / 10,
    feelsLike: Math.round(forecast.main.feels_like * 10) / 10,
    maxTemp: Math.round(forecast.main.temp_max * 10) / 10,
    minTemp: Math.round(forecast.main.temp_min * 10) / 10,
    weatherShort: forecast.weather[0].main,
    weatherLong: forecast.weather[0].description,
    windSpeed: Math.round(forecast.wind.speed * 10) / 10,
    sunrise: convertTimestamp(forecast.sys.sunrise, forecast.timezone),
    sunset: convertTimestamp(forecast.sys.sunset, forecast.timezone),
  };
  console.log(forecastObject);
  populateUserInterface(forecastObject);

  return forecastObject;
}

//function to convert unix timestamps to js times

function convertTimestamp(timestamp, timezoneOffset) {
  console.log(timestamp);
  console.log(timezoneOffset);
  let localTimestamp = timestamp + timezoneOffset;
  let date = new Date(localTimestamp * 1000);

  date
    .toLocaleTimeString('en-GB', {
      timeZoneName: 'short',
    })
    .replace(',', '');

  return date;
}

//UI
function populateUserInterface(returnedForecastObject) {
  maxTempText.textContent = returnedForecastObject.maxTemp + temperatureUnits;
  minTempText.textContent = returnedForecastObject.minTemp + temperatureUnits;
  mainTempText.textContent =
    returnedForecastObject.currentTemp + temperatureUnits;
  feelsLikeText.textContent =
    'Feels like ' + returnedForecastObject.feelsLike + temperatureUnits;

  descriptionText.textContent = returnedForecastObject.weatherLong;
  windText.textContent = returnedForecastObject.windSpeed + speedUnits;

  sunriseTime.textContent = returnedForecastObject.sunrise;
  sunsetTime.textContent = returnedForecastObject.sunset;
}

//EVENT LISTENERS
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  searchWeather();
});

//re-process on unit change

searchWeather();
