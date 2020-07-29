require('dotenv').config();
const request = require('request');

const ws = process.env.WEATHERSTACK_API;

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${ws}&query=${lat},${lon}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to retrieve data!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const data = body.current;
      callback(undefined, 'It is currently ' + data.weather_descriptions[0] + '. The temperature is ' + data.temperature + ' and the cloud cover is ' + data.cloudcover + '%');
    }
  });
}


module.exports = forecast;
