const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorization = (req, res, next) => {
  const token = req.header("x-auth-token") || req.query.token;
  console.log("the token is :", token);
  if (!token)
    return res.status(401).json({ msg: "Access denied. No token provided." });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token." });
  }
};

module.exports = authorization;
