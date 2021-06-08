const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const http = require("http");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Rpit = express.Router();
Rpit.get("/", (req, res) => {
  http.get(
    "https://batterybroadcaster.herokuapp.com/batteryinfo/getlatest/60adc87c1ccc1e055979ff25",
    (resp, incM) => {
      res.json(resp).sendStatus(200);
      console.log(incM);
    }
  );
});
app.use("/", Rpit);
app.listen(process.env.PORT, () => {
  console.log("Application Listen on PORT " + process.env.PORT);
});
