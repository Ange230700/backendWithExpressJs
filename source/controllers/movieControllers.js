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

module.exports = {
  getMovies,
  getMovieById,
};
