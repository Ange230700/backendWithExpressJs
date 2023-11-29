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

module.exports = { getMovies };
