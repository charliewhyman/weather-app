'use strict';

//PARAMETERS
//get the user input from the search bar
let searchBox = document.getElementById('locationSearch');
let searchForm = document.getElementById('form');

//set an initial location to search
let searchLocation = searchBox.value;

//set the units
let units = 'metric';

//LOGIC FUNCTIONS

//create a function to get the user input from the search box
function getSearchValue() {
  searchLocation = searchBox.value;
  console.log(searchLocation);
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
      console.log('Location not found!');
    });
}

//create a function to take the json response and create an object containing the data to be displayed in the app
function processForecast(forecast) {
  let forecastObject = {
    searchLocation: forecast.name,
    currentTemp: forecast.main.temp,
    feelsLike: forecast.main.feels_like,
    maxTemp: forecast.main.temp_max,
    minTemp: forecast.main.temp_min,
    weatherShort: forecast.weather[0].main,
    weatherLong: forecast.weather[0].description,
    windSpeed: forecast.wind.speed,
    sunrise: forecast.sys.sunrise,
    sunset: forecast.sys.sunset,
  };
  console.log(forecastObject);
  return forecastObject;
}

//UI

//EVENT LISTENERS
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getSearchValue();
});
