const welcome = (request, response) => {
  response.status(200).send("Welcome to the Movies API!");
};

module.exports = { welcome };
