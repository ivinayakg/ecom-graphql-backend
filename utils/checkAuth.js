const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, admin: user.admin ?? false },
    process.env.SECURITY_KEY,
    { expiresIn: process.env.JWT_LIFETIME ?? "2 days" }
  );
};

const checkToken = (req) => {
  const token = req.headers.authorization.trim().split("Bearer ")[1];
  return jwt.verify(token, process.env.SECURITY_KEY);
};

module.exports = { checkToken, createToken };
