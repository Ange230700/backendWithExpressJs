require("dotenv").config(); // eslint-disable-line
const app = require("./source/app");

const port = process.env.APP_PORT;

app
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
  .on("error", (error) => {
    console.error("Error: ", error.message);
  });
