const jwt = require("jsonwebtoken");
const User = require("../models/User");

function userAuth(req, res, next, userType) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;

    if (decoded.user.userType !== userType) {
      return res.status(400).json({ errors: [{ msg: "Invalid User" }] });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

function adminAuth(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    if (token === process.env.adminPassword) next();
    else throw new Error("lol");
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

module.exports = {
  adminAuth,
  userAuth,
};
