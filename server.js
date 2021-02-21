const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

// parse requests of content-type: application/json`
app.use(bodyParser.json());

// parse requets of content-type: application/x-www-form-uriencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get(`/`, (req, res) => {
  res.json({ message: `Welcome to jarquafelmu application.` });
});

require("./app/routes/customer.routes.js")(app);

// set port, listen for request
// change port to 8080 before uploading to Elastic Beanstalk
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
``;
