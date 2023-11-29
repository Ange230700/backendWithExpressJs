require("dotenv").config(); // eslint-disable-line
const mysql = require("mysql2/promise"); // eslint-disable-line

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

database
  .getConnection()
  .then(() => {
    console.log("Database connection established");
  })
  .catch((error) => {
    console.error("Database connection failed: ", error);
  });

module.exports = { database };
