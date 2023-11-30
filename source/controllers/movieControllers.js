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
    studio,
    duration,
  } = request.body;
  database
    .query(
      "INSERT INTO `movies` (`title`, `director`, `year`, `studio`, `duration`) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, studio, duration],
    )
    .then((result) => {
      const id = result[0].insertId;
      const insertedMovie = {
        id,
        title,
        director,
        year,
        studio,
        duration,
      };
      return response.status(201).json(insertedMovie);
    })
    .catch((error) => {
      if (!title || !director || !year || !studio || !duration) {
        return response.status(400).send("Missing required fields");
      }
      console.error("Error creating movie in database: ", error);
      return response.status(500).send("Error creating movie in database");
    });
};

const putMovie = (request, response) => {
  const { id } = request.params;
  const {
    title,
    director,
    year,
    studio,
    duration,
  } = request.body;

  database
    .query(
      "UPDATE `movies` SET `title` = ?, `director` = ?, `year` = ?, `studio` = ?, `duration` = ? WHERE `id` = ?",
      [title, director, year, studio, duration, id],
    )
    .then((result) => {
      if (result[0].affectedRows === 0) {
        return response.status(404).send("Movie not found");
      }
      return response.status(200).send("Movie updated");
    })
    .catch((error) => {
      if (!title || !director || !year || !studio || !duration) {
        return response.status(400).send("Missing required fields");
      }
      console.error("Error updating movie in database: ", error);
      return response.status(500).send("Error updating movie in database");
    });
};

const deleteMovie = (request, response) => {
  const { id } = request.params;
  database
    .query("DELETE FROM `movies` WHERE `id` = ?", [id])
    .then((result) => {
      if (result[0].affectedRows === 0) {
        return response.status(404).send("Movie not found");
      }
      return response.status(200).send("Movie deleted");
    })
    .catch((error) => {
      console.error("Error deleting movie from database: ", error);
      return response.status(500).send("Error deleting movie from database");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  putMovie,
  deleteMovie,
};
