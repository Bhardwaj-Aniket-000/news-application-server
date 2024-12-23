const jwt = require("jsonwebtoken");
require("dotenv").config();

const GenerateToken = (userData) => {
  try {
    const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
      expiresIn: 7200,
    });
    return token;
  } catch (error) {
    console.log("error fetched dyuring generate token", error);
  }
};

const VerifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
        if (err) {
          res.json({ jwtExpires: "token is expires" });
          return;
        }
        req.user = decode;
        next();
      });
    } else {
      res.json({ jwtEmpty: "not any token" });
      return;
    }
  } catch (error) {
    console.log("jwt verify error is ", error);
    res.json({ error: "please , login once ." });
  }
};

module.exports = { GenerateToken, VerifyToken };
