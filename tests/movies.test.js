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
  it("should return a welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/text/);
    expect(response.text).toEqual("Welcome to the Movies API!");
  });
});

describe("GET /api/movies", () => {
  it("should return a list of movies", async () => {
    const response = await request(app).get("/api/movies");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /api/movies/:id", () => {
  it("should return a single movie", async () => {
    const response = await request(app).get("/api/movies/1");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
  });

  it("should return a 404 error if the movie is not found", async () => {
    const response = await request(app).get("/api/movies/999999");
    expect(response.statusCode).toBe(404);
  });
});

describe("POST /api/movies", () => {
  it("should create a new movie", async () => {
    const newMovie = {
      title: "Captain America: The First Avenger",
      director: "Joe Johnston",
      year: "2011",
      color: "1",
      duration: 124,
    };

    const response = await request(app).post("/api/movies").send(newMovie);

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("director");
    expect(response.body).toHaveProperty("year");
    expect(response.body).toHaveProperty("color");
    expect(response.body).toHaveProperty("duration");

    expect(typeof response.body.id).toBe("number");
    expect(typeof response.body.title).toBe("string");
    expect(typeof response.body.director).toBe("string");
    expect(typeof response.body.year).toBe("string");
    expect(typeof response.body.color).toBe("string");
    expect(typeof response.body.duration).toBe("number");

    const [result] = await database.query(
      "SELECT * FROM `movies` WHERE `id` = ?",
      [response.body.id],
    );

    const [inserterMovieRetrievedFromDatabase] = result;

    expect(inserterMovieRetrievedFromDatabase).toHaveProperty("id");
    expect(inserterMovieRetrievedFromDatabase).toHaveProperty("title");
    expect(inserterMovieRetrievedFromDatabase).toHaveProperty("director");
    expect(inserterMovieRetrievedFromDatabase).toHaveProperty("year");
    expect(inserterMovieRetrievedFromDatabase).toHaveProperty("color");
    expect(inserterMovieRetrievedFromDatabase).toHaveProperty("duration");

    expect(inserterMovieRetrievedFromDatabase.title).toStrictEqual(newMovie.title);
    expect(inserterMovieRetrievedFromDatabase.director).toStrictEqual(newMovie.director);
    expect(inserterMovieRetrievedFromDatabase.year).toStrictEqual(newMovie.year);
    expect(inserterMovieRetrievedFromDatabase.color).toStrictEqual(newMovie.color);
    expect(inserterMovieRetrievedFromDatabase.duration).toStrictEqual(newMovie.duration);
  });

  it("should return a 400 error if the movie is invalid", async () => {
    const response = await request(app).post("/api/movies").send({
      title: "Captain America: The First Avenger",
      director: "Joe Johnston",
      year: "2011",
      color: "1",
    });
    expect(response.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await database.end((error) => {
    if (error) console.error(error.message);
    else console.log("Database connection closed");
  });
});
