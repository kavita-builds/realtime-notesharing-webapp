const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token" });
    }

    // ✅ Expect: Bearer TOKEN
    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded; // { id, role }

    next();

  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Token failed" });
  }
};

module.exports = authMiddleware;