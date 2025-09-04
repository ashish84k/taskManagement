const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");

const Login = asyncHandler(async (req, res, next) => {

  
  const { email, password} = req.body;

  if (!email || !password) {
    const error = new Error("Email and password are required!");
    error.status = 400;
    throw error;
  }

  const user = await Users.findOne({ where: { email } });
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid password");
    error.status = 401;
    throw error;
  }

  const { password: userPassword, ...payload } = user.toJSON();

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "15m",
    subject: payload.id.toString(),
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "7d",
    subject: payload.id.toString(),
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.COOKIE_HTTP === "true",
    signed: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "Strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.COOKIE_HTTP === "true",
    signed: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "Strict",
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
  });
});

const Register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = new Error("Full name, email, and password are required!");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await Users.create({
    fullName: name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
  });
});

const TokenRefresh = asyncHandler(async (req, res, next) => {
  const token = req.signedCookies.refreshToken;
  if (!token) {
    const error = new Error("Unauthorized - No refresh token");
    error.status = 401;
    throw error;
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
  if (!decoded) {
    const error = new Error("Invalid refresh token");
    error.status = 401;
    throw error;
  }

  const user = await Users.findOne({ where: { email: decoded.email } });
  if (!user) {
    const error = new Error("Unauthorized user");
    error.status = 401;
    throw error;
  }

  const { password: userPassword, ...payload } = user.toJSON();

  const newAccessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "15m",
    subject: payload.id.toString(),
  });

  const newRefreshToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "15m",
    subject: payload.id.toString(),
  });

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "Strict",
    secure: process.env.COOKIE_HTTP === "true",
    signed: true,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "Strict",
    secure: process.env.COOKIE_HTTP === "true",
    signed: true,
  });

  res.json({ success: true, message: "Access token refreshed" });
});

const Logout = asyncHandler(async (req, res, next) => {
  
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.COOKIE_HTTP === "production",
    signed: true,
    sameSite: "Strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.COOKIE_HTTP === "production",
    signed: true,
    sameSite: "Strict",
  });

  const userId = req.user?.id;
  if (userId) {
    console.log(`User logout: ID ${userId} at ${new Date().toISOString()}`);
  }

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

const ChangePassword = asyncHandler(async (req, res, next) => {
  
  const email = req.user?.email; 
  const { oldPassword, newPassword } = req.body;
  
  if (!oldPassword || !newPassword) {
    const error = new Error("Old password and new password are required!");
    error.status = 400;
    throw error;
  }

  

  const user = await Users.findOne({where:{email}});

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    const error = new Error("Old password is incorrect");
    error.status = 401;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

 
  await user.update({ password: hashedPassword });

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

module.exports = { Login, Register, TokenRefresh, Logout, ChangePassword };
