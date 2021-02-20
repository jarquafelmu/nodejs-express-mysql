const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json`
app.use(bodyParser.json());

// parse requets of content-type: application/x-www-form-uriencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get(`/`, (req, res) => {
  res.json({ message: `Welcome to jarquafelmu application.` });
});

// set port, listen for request
// change port to 8080 before uploading to Elastic Beanstalk
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
``;