const express = require("express");
const bodyParser = require("body-parser");
const AuthController = require("./controllers/authcontroller");
const cors = require("cors");
const request = require("request");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/token", (req, res) => {
  request.post(
    "localhost:3100/auth",
    { username: "melgo" },
    (err, res, body) => {
      console.log(body);
    }
  );

  request.post(
    "http://localhost:3100/auth",
    { json: { username: req.body.username } },
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res.body.accessToken);
    }
  );
});

app.post(
  "/secure",

  (req, res) => {
    request.post(
      "http://localhost:3100/authme",
      { json: { token: req.headers.authorization } },
      (err, res) => {
        console.log(res.body);
      }
    );
  }
);

app.listen(3000, () => {
  console.log("listen on port 3000s");
});
