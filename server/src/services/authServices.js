const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");
const RefreshToken = require("../models/refreshToken.model");
const { calculateExpirationDate } = require("../utils/date");

const generateAccessToken = (id) => {
  return jwt.sign({ id }, config.secretKey, {
    expiresIn: config.tokenExpiration,
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiration,
  });
};

async function updateRefreshToken(employeeId) {
  const newAccessToken = generateAccessToken(employeeId);
  const newRefreshToken = generateRefreshToken(employeeId);
  const expires_at = calculateExpirationDate(config.refreshTokenExpiration);

  let storedToken = await RefreshToken.findOne({
    where: { employee_id: employeeId },
  });

  if (storedToken) {
    await storedToken.update({
      token: newRefreshToken,
      expires_at: calculateExpirationDate(config.refreshTokenExpiration),
    });
  } else {
    await RefreshToken.create({
      employee_id: employeeId,
      token: newRefreshToken,
      expires_at: calculateExpirationDate(config.refreshTokenExpiration),
    });
  }

  return { newAccessToken, newRefreshToken, expires_at };
}

module.exports = updateRefreshToken;
