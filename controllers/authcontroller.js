const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

class AuthController {
  generateToken(username) {
    dotenv.config();
    //This function generate a usertoken
    console.log(process.env.TOKEN_SECRET);
    return jwt.sign(username, process.env.TOKEN_SECRET);
  }
}

module.exports = AuthController;
