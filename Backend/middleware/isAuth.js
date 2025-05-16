const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const header = req.get("Authorization");
  if (!header) return next();
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.isAuth = true;
    req.userId = decoded.userId;
    req.role = decoded.role;
  } catch (_) {
    req.isAuth = false;
  }
  next();
};
