const {
  describe, it, expect, afterAll,
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

afterAll(async () => {
  await database.end((error) => {
    if (error) console.error(error.message);
    else console.log("Database connection closed");
  });
});
