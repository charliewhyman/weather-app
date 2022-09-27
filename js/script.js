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
    currentTemp: Math.round(forecast.main.temp),
    feelsLike: Math.round(forecast.main.feels_like),
    maxTemp: Math.round(forecast.main.temp_max),
    minTemp: Math.round(forecast.main.temp_min),
    weatherShort: forecast.weather[0].main,
    weatherLong: forecast.weather[0].description,
    windSpeed: Math.round(forecast.wind.speed),
    sunrise: convertTimestamp(forecast.sys.sunrise, forecast.timezone),
    sunset: convertTimestamp(forecast.sys.sunset, forecast.timezone),
  };
  console.log(forecastObject);
  populateUserInterface(forecastObject);

  return forecastObject;
}

//function to convert unix timestamps to js times

function convertTimestamp(timestamp, timezoneOffset) {
  let localTimestamp = (timestamp + timezoneOffset) * 1000;
  let date = new Date(localTimestamp);

  let hours = String(date.getUTCHours()).padStart(2, '0');
  let minutes = String(date.getUTCMinutes()).padStart(2, '0');

  let shortTime = hours + ':' + minutes;

  return shortTime;
}

//UI
function populateUserInterface(returnedForecastObject) {
  maxTempText.textContent = 'High: '+returnedForecastObject.maxTemp + temperatureUnits;
  minTempText.textContent = 'Low: '+returnedForecastObject.minTemp + temperatureUnits;
  
  feelsLikeText.textContent =
    'Feels like ' + returnedForecastObject.feelsLike + temperatureUnits;

  descriptionText.textContent = returnedForecastObject.currentTemp + temperatureUnits + ', '+ returnedForecastObject.weatherLong;

  sunriseTime.textContent = 'Sunrise: '+returnedForecastObject.sunrise;
  sunsetTime.textContent = 'Sunset: '+returnedForecastObject.sunset;
  setTextColor(returnedForecastObject.currentTemp, units);
}

//set text color based on temperature

function setTextColor(temperature, units) {
  let mainTempText = document.getElementById('mainTempText');
  let textColor = 'black';
  //if the units are fahrenheit, convert to metric
  if (units === 'imperial') {
    temperature = (temperature - 32) * (5 / 9);
  } else {
    // do nothing
  }

  // change the color scale based on the main temperature
  switch (textColor) {
    case temperature < 0:
      textColor = '#2166ac';
      break;
    case temperature < 5:
      textColor = '#67a9cf';
      break;
    case temperature < 10:
      textColor = '#d1e5f0';
      break;
    case temperature < 15:
      textColor = '#f7f7f7';
      break;
    case temperature < 20:
      textColor = 'fddbc7';
      break;
    case temperature < 25:
      textColor = '#ef8a62';
      break;
    default:
      textColor = '#b2182b';
      break;
  }
  //change the text colour of the main div
  mainTempText.style.color = textColor;
}

//EVENT LISTENERS
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  searchWeather();
});

//re-process on unit change

searchWeather();
