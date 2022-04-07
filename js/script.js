'use strict';

//create a function to call the openweathermap api for a specified location, and return the json response
function fetchForecast(location) {
  fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=' +
      location +
      '&APPID=5c143252ea13f0491b20a257f49ac149',
    { mode: 'cors' }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      processForecast(response);
    });
}

//test the function with a location of 'London'
fetchForecast('London');

//create a function to take the json response and create an object containing the data to be displayed in the app
function processForecast(forecast) {
  console.log(forecast.main);
}
