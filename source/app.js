const express = require("express");

const app = express();
app.use(express.json());

const welcome = require("./welcome");
const movieControllers = require("./controllers/movieControllers");

app.get("/", welcome.welcome);
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

module.exports = app;
