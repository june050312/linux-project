require("dotenv").config();
const jwt = require("jsonwebtoken");

const loginVerify = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Token is empty" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token isn't exists" });
  }
};

module.exports = loginVerify;