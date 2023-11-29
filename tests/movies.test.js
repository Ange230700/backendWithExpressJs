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
    const response = await request(app).post("/api/movies").send({
      title: "Dr. Strange",
      director: "Scott Derrickson",
      year: "2016",
      color: "1",
      duration: 99,
    });
    expect(response.statusCode).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({
      id: expect.any(Number),
      title: "Dr. Strange",
      director: "Scott Derrickson",
      year: "2016",
      color: "1",
      duration: 99,
    });
  });

  it("should return a 400 error if the movie is invalid", async () => {
    const response = await request(app).post("/api/movies").send({
      title: "Dr. Strange",
      director: "Scott Derrickson",
      year: "2016",
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
