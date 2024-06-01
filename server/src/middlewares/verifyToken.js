// middlewares/verifyToken.js
const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");

function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token is required." });
  }

  jwt.verify(token.split(" ")[1], config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.user = decoded.user;
    next();
  });
}

module.exports = verifyToken;
