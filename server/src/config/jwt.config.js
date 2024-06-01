// src/config/jwt.config.js
module.exports = {
  secretKey: process.env.JWT_SECRET_KEY,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  tokenExpiration: process.env.JWT_EXPIRATION,
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
};
