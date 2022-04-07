'use strict';

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
    });
}

fetchForecast('London');
