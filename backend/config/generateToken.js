const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "8h" });
};

module.exports = generateToken;
