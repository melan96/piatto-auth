const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const https = require("https");
const { json } = require("express");
const request = require("request");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/auth", (req, res) => {
  console.log(req.body);

  //TODO : Auth implementations should be there
});

app.listen(process.env.PORT, () => {
  console.log("Application Listen on PORT " + process.env.PORT);
});
