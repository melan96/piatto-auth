const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const https = require("https");
const { json } = require("express");
const request = require("request");
const jwt = require("jsonwebtoken");
const AuthController = require("./controllers/authcontroller");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/auth", (req, res) => {
  console.log(req.body);

  //TODO : Auth implementations should be there
  //TODO : Generate Token secret
  //require('crypto').randomBytes(64).toString('hex')

  let authSign = new AuthController().generateToken(req.body.username);
  res.send({ auth: authSign }).sendStatus(200);
});

app.listen(process.env.PORT, () => {
  console.log("Application Listen on PORT " + process.env.PORT);
});
