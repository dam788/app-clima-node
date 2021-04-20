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
        description: res.data.weather[0].description,
        main: res.data.weather[0].main,
        city: res.data.name,
      });
    })
    .catch((err) => {
      callback("Escribi bien la ciudad", err);
      console.log(err);
    });
};

module.exports = weatherData;
