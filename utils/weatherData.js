const axios = require("axios");

const weatherData = (city, callback) => {
  const apiUrl = `
  ${process.env.WEATHER_URL}
  ${encodeURIComponent(city)}
  &units=metric&appid=${process.env.SECRET_KEY}
  `;

  axios(apiUrl)
    .then((res) => {
      callback(undefined, {
        temp: res.data.main.temp /* res.data es de axios*/,
        min: res.data.main.temp_min,
        max: res.data.main.temp_max,
        main: res.data.weather[0].main,
        city: res.data.name,
        description: res.data.weather[0].description,
        feels: res.data.main.feels_like,
        humidity: res.data.main.humidity,
      });
    })
    .catch((err) => {
      callback("Escribi bien la ciudad", err);
    });
};

module.exports = weatherData;
