const path = require("path");
const express = require("express");
const hbs = require("hbs");

require("dotenv").config(); /*envirement en toda la app.*/

const app = express(); /* metodo de express*/
const PORT = process.env.PORT || 8080; /* variable de puerto */

const weatherData = require("./utils/weatherData"); /*llamado API*/

app.use(
  express.static(path.join(__dirname, "public"))
); /* camino de estaticos */
// configuracion de rutas de vistas
const viewsRoute = path.join(__dirname, "public", "views");
const partialsRoute = path.join(__dirname, "public", "partials");

app.set("view engine", "hbs"); /*motor de vistas predeterminado"!*/
app.set("views", viewsRoute);
hbs.registerPartials(partialsRoute);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App / Node JS",
  });
});

app.get("/weather", (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.send({ message: "ingrese una ciudad válida." });
  }
  weatherData(city, (error, response) => {
    if (error) {
      return res.send({ error });
    }
    res.send(response);
  });
});

app.get("*", (req, res) => {
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`listen server on Port ${PORT}`);
}); /* levantar servidor */
