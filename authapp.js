const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

let authapi = process.env.AUTH_API;
app.post("/gentoken", (req, res) => {
  request.post(
    authapi + "/auth",
    { username: req.body.username },
    (err, resp) => {
      console.log(resp.body);
      res.send(resp.body);

      //TODO; Store cookie persistance
    }
  );
});

//Auth Implementation next
const authEndpoint = (req, res, next) => {
  request.post(
    authapi + "/authme",
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
