const database = require("../../database");

const getMovies = (request, response) => {
  database
    .query("SELECT * FROM `movies`")
    .then((result) => {
      response.json(result[0]);
    })
    .catch((error) => {
      console.error("Error retrieving movies from database: ", error);
      response.status(500).send("Error retrieving movies from database");
    });
};

const getMovieById = (request, response) => {
  const { id } = request.params;
  database
    .query("SELECT * FROM `movies` WHERE `id` = ?", [id])
    .then((result) => {
      if (result[0].length === 0) {
        return response.status(404).send("Movie not found");
      }
      return response.json(result[0][0]);
    })
    .catch((error) => {
      console.error("Error retrieving movie from database: ", error);
      response.status(500).send("Error retrieving movie from database");
    });
};

const postMovie = (request, response) => {
  const {
    title,
    director,
    year,
    color,
    duration,
  } = request.body;
  database
    .query(
      "INSERT INTO `movies` (`title`, `director`, `year`, `color`, `duration`) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration],
    )
    .then((result) => {
      const id = result[0].insertId;
      return response.status(201).json({
        id,
        title,
        director,
        year,
        color,
        duration,
      });
    })
    .catch((error) => {
      if (!title || !director || !year || !color || !duration) {
        return response.status(400).send("Missing required fields");
      }
      console.error("Error creating movie in database: ", error);
      return response.status(500).send("Error creating movie in database");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
};
