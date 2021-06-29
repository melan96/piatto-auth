const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { json } = require("body-parser");

class AuthController {
  generateToken(username) {
    dotenv.config();
    //This function generate a usertoken
    console.log(process.env.TOKEN_SECRET);
    var authObject = {
      accessToken: jwt.sign(username, process.env.TOKEN_SECRET),
    };
    return authObject;
  }

  authenticateJwtRequest(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log("Auth Taken as TokenID: " + token);

      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }

        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }
}

module.exports = AuthController;
