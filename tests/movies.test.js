const {
  it,
  expect,
  afterAll,
  describe,
} = require("@jest/globals");
const request = require("supertest");
const app = require("../source/app");
const database = require("../database");

describe("GET /", () => {
  it("should check the content type of the response", async () => {
    const response = await request(app).get("/");
    expect(response.headers["content-type"]).toMatch(/text/);
  });

  it("should return a 200 status code", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  it("should return a welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.text).toEqual("Welcome to the Movies API!");
  });
});

describe("GET /api/movies", () => {
  it("should check the content type of the response", async () => {
    const response = await request(app).get("/api/movies");
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  it("should return a 200 status code", async () => {
    const response = await request(app).get("/api/movies");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /api/movies/:id", () => {
  it("should return a single movie", async () => {
    const response = await request(app).get("/api/movies/1");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
  });

  it("should return a 404 error if the movie id is not found", async () => {
    const response = await request(app).get("/api/movies/999999");
    expect(response.statusCode).toBe(404);
  });
});

describe("POST /api/movies", () => {
  it("should check the content type of the response", async () => {
    const newMovie = {
      title: "Batman: The Dark Knight",
      director: "Christopher Nolan",
      year: "2008",
      studio: "Warner Bros. Pictures",
      duration: 134,
    };

    const response = await request(app).post("/api/movies").send(newMovie);

    expect(response.headers["content-type"]).toMatch(/json/);
  });

  it("should return a 201 status code", async () => {
    const newMovie = {
      title: "Batman Begins",
      director: "Christopher Nolan",
      year: "2005",
      studio: "Warner Bros. Pictures",
      duration: 140,
    };

    const response = await request(app).post("/api/movies").send(newMovie);

    expect(response.statusCode).toBe(201);
  });

  it("should check the existence of all required fields", async () => {
    const newMovie = {
      title: "Batman v Superman: Dawn of Justice",
      director: "Zack Snyder",
      year: "2016",
      studio: "Warner Bros. Pictures",
      duration: 151,
    };

    const response = await request(app).post("/api/movies").send(newMovie);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("director");
    expect(response.body).toHaveProperty("year");
    expect(response.body).toHaveProperty("studio");
    expect(response.body).toHaveProperty("duration");

    const [result] = await database.query(
      "SELECT * FROM `movies` WHERE `id` = ?",
      [response.body.id],
    );

    const [inserterMovieRetrievedFromDatabase] = result;

    expect(inserterMovieRetrievedFromDatabase).toHaveProperty("id");
    expect(inserterMovieRetrievedFromDatabase).toHaveProperty("title");
    expect(inserterMovieRetrievedFromDatabase).toHaveProperty("director");
    expect(inserterMovieRetrievedFromDatabase).toHaveProperty("year");
    expect(inserterMovieRetrievedFromDatabase).toHaveProperty("studio");
    expect(inserterMovieRetrievedFromDatabase).toHaveProperty("duration");
  });

  it("should check the type of all fields", async () => {
    const newMovie = {
      title: "The Dark Knight Rises",
      director: "Christopher Nolan",
      year: "2012",
      studio: "Warner Bros. Pictures",
      duration: 165,
    };

    const response = await request(app).post("/api/movies").send(newMovie);

    expect(typeof response.body.id).toBe("number");
    expect(typeof response.body.title).toBe("string");
    expect(typeof response.body.director).toBe("string");
    expect(typeof response.body.year).toBe("string");
    expect(typeof response.body.studio).toBe("string");
    expect(typeof response.body.duration).toBe("number");

    const [result] = await database.query(
      "SELECT * FROM `movies` WHERE `id` = ?",
      [response.body.id],
    );

    const [inserterMovieRetrievedFromDatabase] = result;

    expect(inserterMovieRetrievedFromDatabase.title).toStrictEqual(newMovie.title);
    expect(inserterMovieRetrievedFromDatabase.director).toStrictEqual(newMovie.director);
    expect(inserterMovieRetrievedFromDatabase.year).toStrictEqual(newMovie.year);
    expect(inserterMovieRetrievedFromDatabase.studio).toStrictEqual(newMovie.studio);
    expect(inserterMovieRetrievedFromDatabase.duration).toStrictEqual(newMovie.duration);
  });

  it("should return a 400 error if the movie is invalid", async () => {
    const response = await request(app).post("/api/movies").send({
      title: "Man of Steel",
      director: "Zack Snyder",
      year: "2013",
      studio: "Warner Bros. Pictures",
    });
    expect(response.statusCode).toBe(400);
  });
});

describe("PUT /api/movies/:id", () => {
  it("should check the content type of the response", async () => {
    const id = 8;

    const updatedMovie = {
      title: "Wonder Woman",
      director: "Patty Jenkins",
      year: "2017",
      studio: "Warner Bros. Pictures",
      duration: 141,
    };

    const response = await request(app).put(`/api/movies/${id}`).send(updatedMovie);

    expect(response.headers["content-type"]).toMatch(/text/);
  });

  it("should return a 200 status code", async () => {
    const id = 8;

    const updatedMovie = {
      title: "Wonder Woman",
      director: "Patty Jenkins",
      year: "2017",
      studio: "Warner Bros. Pictures",
      duration: 141,
    };

    const response = await request(app).put(`/api/movies/${id}`).send(updatedMovie);

    expect(response.statusCode).toBe(200);
  });

  it("should check if the updated movie has all required fields", async () => {
    const id = 8;

    const [updatedMovieFromDatabase] = await database.query(
      "SELECT * FROM `movies` WHERE `id` = ?",
      [id],
    );

    const [updatedMovieFromDatabaseResult] = updatedMovieFromDatabase;

    expect(updatedMovieFromDatabaseResult).toHaveProperty("id");
    expect(updatedMovieFromDatabaseResult).toHaveProperty("title");
    expect(updatedMovieFromDatabaseResult).toHaveProperty("director");
    expect(updatedMovieFromDatabaseResult).toHaveProperty("year");
    expect(updatedMovieFromDatabaseResult).toHaveProperty("studio");
    expect(updatedMovieFromDatabaseResult).toHaveProperty("duration");
  });

  it("should check if the modifications have been updated properly", async () => {
    const id = 8;

    const updatedMovie = {
      title: "Wonder Woman",
      director: "Patty Jenkins",
      year: "2017",
      studio: "Warner Bros. Pictures",
      duration: 141,
    };

    const [updatedMovieFromDatabase] = await database.query(
      "SELECT * FROM `movies` WHERE `id` = ?",
      [id],
    );

    const [updatedMovieFromDatabaseResult] = updatedMovieFromDatabase;

    expect(updatedMovieFromDatabaseResult.title).toStrictEqual(updatedMovie.title);
    expect(updatedMovieFromDatabaseResult.director).toStrictEqual(updatedMovie.director);
    expect(updatedMovieFromDatabaseResult.year).toStrictEqual(updatedMovie.year);
    expect(updatedMovieFromDatabaseResult.studio).toStrictEqual(updatedMovie.studio);
    expect(updatedMovieFromDatabaseResult.duration).toStrictEqual(updatedMovie.duration);
  });

  it("should return a 400 error if the movie is invalid", async () => {
    const movieWithMissingFields = {
      title: "Wonder Woman",
      director: "Patty Jenkins",
      year: "2017",
      studio: "Warner Bros. Pictures",
    };

    const response = await request(app).put("/api/movies/8").send(movieWithMissingFields);
    expect(response.statusCode).toBe(400);
  });

  it("should return a 404 error if the movie is not found", async () => {
    const newMovie = {
      title: "Wonder Woman",
      director: "Patty Jenkins",
      year: "2017",
      studio: "Warner Bros. Pictures",
      duration: 123,
    };
    const response = await request(app).put("/api/movies/999999").send(newMovie);
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /api/movies/:id", () => {
  it("should check the content type of the response", async () => {
    const movieToDelete = {
      title: "Birds of Prey",
      director: "Cathy Yan",
      year: "2020",
      studio: "Warner Bros. Pictures",
      duration: 109,
    };

    const [insertedMovie] = await database.query(
      "INSERT INTO `movies` (`title`, `director`, `year`, `studio`, `duration`) VALUES (?, ?, ?, ?, ?)",
      [
        movieToDelete.title,
        movieToDelete.director,
        movieToDelete.year,
        movieToDelete.studio,
        movieToDelete.duration,
      ],
    );

    const id = insertedMovie.insertId;

    const response = await request(app).delete(`/api/movies/${id}`);

    expect(response.headers["content-type"]).toMatch(/text/);
  });

  it("should return a 200 status code if the movie is deleted", async () => {
    const movieToDelete = {
      title: "Birds of Prey",
      director: "Cathy Yan",
      year: "2020",
      studio: "Warner Bros. Pictures",
      duration: 109,
    };

    const [insertedMovie] = await database.query(
      "INSERT INTO `movies` (`title`, `director`, `year`, `studio`, `duration`) VALUES (?, ?, ?, ?, ?)",
      [
        movieToDelete.title,
        movieToDelete.director,
        movieToDelete.year,
        movieToDelete.studio,
        movieToDelete.duration,
      ],
    );

    const id = insertedMovie.insertId;

    const response = await request(app).delete(`/api/movies/${id}`);

    expect(response.statusCode).toBe(200);
  });

  it("should delete a movie", async () => {
    const movieToDelete = {
      title: "Birds of Prey",
      director: "Cathy Yan",
      year: "2020",
      studio: "Warner Bros. Pictures",
      duration: 109,
    };

    const [insertedMovie] = await database.query(
      "INSERT INTO `movies` (`title`, `director`, `year`, `studio`, `duration`) VALUES (?, ?, ?, ?, ?)",
      [
        movieToDelete.title,
        movieToDelete.director,
        movieToDelete.year,
        movieToDelete.studio,
        movieToDelete.duration,
      ],
    );

    const id = insertedMovie.insertId;

    await request(app).delete(`/api/movies/${id}`);

    const [deletedMovie] = await database.query(
      "SELECT * FROM `movies` WHERE `id` = ?",
      [id],
    );

    expect(deletedMovie.length).toBe(0);
  });

  it("should return a 404 error if the movie is not found", async () => {
    const response = await request(app).delete("/api/movies/999999");
    expect(response.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await database.end((error) => {
    if (error) console.error(error.message);
    else console.log("Database connection closed");
  });
});
