const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/gentoken", (req, res) => {
  request.post(
    "localhost:3100/auth",
    { username: "melgo" },
    (err, res, body) => {
      console.log(body);

      //TODO; Store cookie persistance
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

//Auth Implementation next
const authEndpoint = (req, res, next) => {
  request.post(
    "http://localhost:3100/authme",
    { headers: { authorization: req.headers.authorization } },

    (err, resp) => {
      resp = JSON.parse(resp.body);
      if (resp.access) {
        next();
      } else {
        res.sendStatus(403);
      }
    }
  );
};

app.post("/securedemo", authEndpoint, (req, res) => {
  res.json({ message: "true" });
});

app.listen(3000, () => {
  console.log("listen on port 3000s");
});
