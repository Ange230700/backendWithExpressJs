const express = require("express");

const app = express();
app.use(express.json());

const welcome = (request, response) => {
  response.status(200).send("Welcome to the Movies API!");
};

const movieControllers = require("./controllers/movieControllers");

app.get("/", welcome);
app.get("/api/movies", movieControllers.getMovies);

module.exports = app;
