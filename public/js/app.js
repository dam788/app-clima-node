const fetchWeather = "/weather";

// formulario
const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
//temperatures
const weatherTemp = document.querySelector(".temp");
const weatherTempMin = document.querySelector(".min span");
const weatherTempMax = document.querySelector(".max span");
// icon and city - country
const weatherIcon = document.querySelector(".icon-weather i");
const weatherCity = document.querySelector(".city");
// information
const weatherCondition = document.querySelector(".description");
const weatherFellsLike = document.querySelector(".feels-like");
const weatherHumidity = document.querySelector(".humidity");

const fetchingData = (e) => {
  e.preventDefault();

  weatherCity.textContent = "Loading...";
  weatherTempMin.textContent = "...";
  weatherTempMax.textContent = "...";
  weatherCondition.textContent = "...";
  weatherFellsLike.textContent = "...";
  weatherHumidity.textContent = "...";

  const cityApi = `
   ${fetchWeather}?city=
   ${searchInput.value}
   `;

  weatherForm.reset();

  fetch(cityApi).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        weatherCity.textContent = "Your city not exist!";
        weatherTemp.textContent = "";
        weatherTempMin.textContent = "-";
        weatherTempMax.textContent = "-";
        weatherCondition.textContent = "Condition";
        weatherFellsLike.textContent = "Fells Like";
        weatherHumidity.textContent = "Humidity";
        weatherIcon.className = "wi wi-alien";
      } else {
        findIcon(data.main);
        weatherCity.textContent = data.city;
        weatherTemp.textContent = data.temp.toFixed();
        weatherTempMin.textContent = data.min.toFixed();
        weatherTempMax.textContent = data.max.toFixed();
        weatherCondition.textContent = data.description;
        weatherFellsLike.textContent = `${data.feels} °c`;
        weatherHumidity.textContent = `${data.humidity} %`;
      }
    });
  });
};

const findIcon = (icon) => {
  switch (icon) {
    case "Thunderstorm":
      weatherIcon.className = "wi wi-thunderstorm";
      break;
    case "Drizzle":
      weatherIcon.className = "wi wi-showers";
      break;
    case "Rain":
      weatherIcon.className = "wi wi-rain";
      break;
    case "Snow":
      weatherIcon.className = "wi wi-snow";
      break;
    case "Mist":
      weatherIcon.className = "wi wi-fog";
      break;
    case "Smoke":
      weatherIcon.className = "wi wi-smoke";
      break;
    case "Haze":
      weatherIcon.className = "wi wi-day-haze";
      break;
    case "Dust":
      weatherIcon.className = "wi wi-dust";
      break;
    case "Sand":
      weatherIcon.className = "wi wi-sandstorm";
      break;
    case "Ash":
      weatherIcon.className = "wi wi-sleet";
      break;
    case "Squall":
      weatherIcon.className = "wi wi-rain-wind";
      break;
    case "Tornado":
      weatherIcon.className = "wi wi-hurricane";
      break;
    case "Clear":
      weatherIcon.className = "wi wi-day-sunny";
      break;
    case "Clouds":
      weatherIcon.className = "wi wi-cloud";
      break;
    default:
      weatherIcon.className = "wi wi-alien";
      break;
  }
};

weatherForm.addEventListener("submit", fetchingData);
