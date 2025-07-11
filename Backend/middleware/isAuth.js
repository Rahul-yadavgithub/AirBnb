const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token provided. Please log in." });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken || !verifyToken.userId) {
      return res.status(403).json({ message: "Invalid token. Access denied." });
    }

    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    res.status(500).json({ message: `isAuth Error: ${error.message}` });
  }
};

module.exports = isAuth;
