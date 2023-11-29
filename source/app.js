const express = require("express"); // eslint-disable-line

const app = express();
app.use(express.json());

const welcome = (request, response) => {
  response.send("Welcome to the Movies API!");
};

const movieControllers = require("./controllers/movieControllers");

app.get("/", welcome);
app.get("/api/movies", movieControllers.getMovies);

module.exports = app;
