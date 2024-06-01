const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config/jwt.config");
const Login = require("../models/login.model");
const Employee = require("../models/employee.model");
const RefreshToken = require("../models/refreshToken.model");
const { calculateExpirationDate } = require("../utils/date");

const generateAccessToken = (emp) => {
  return jwt.sign({ id: emp.id }, config.secretKey, {
    expiresIn: config.tokenExpiration,
  });
};

const generateRefreshToken = (emp) => {
  return jwt.sign({ id: emp.id }, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiration,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const employee = await Employee.findOne({ where: { email } });

  if (!employee) {
    return res.status(401).json({ message: "Invalid email" });
  }

  let login = await Login.findOne({ where: { employee_id: employee.id } });

  if (login) {
    const isPasswordMatch = await bcrypt.compare(password, login.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    login = await Login.create({
      employee_id: employee.id,
      password: hashedPassword,
    });
  }

  const accessToken = generateAccessToken(employee);
  const refreshToken = generateRefreshToken(employee);

  // Store the refresh token in the database
  await RefreshToken.create({
    employee_id: employee.id,
    token: refreshToken,
    expires_at: calculateExpirationDate(config.refreshTokenExpiration),
  });

  return res.status(200).json({ accessToken, refreshToken });
};

const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Access token is required" });
  }

  const decoded = jwt.verify(token, config.refreshTokenSecret);

  try {
    // Check if the token exists in the database
    const storedToken = await RefreshToken.findOne({
      where: { token, employee_id: decoded.id },
    });

    if (!storedToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await Employee.findByPk(decoded.id);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    const expiresAt = calculateExpirationDate(config.refreshTokenExpiration);

    // Store the new refresh token in the database
    await RefreshToken.create({
      employee_id: user.id,
      token: newRefreshToken,
      expires_at: expiresAt,
    });

    // Optionally, revoke the old refresh token
    await storedToken.destroy();

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expires_at: expiresAt,
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

module.exports = { login, refreshToken };
