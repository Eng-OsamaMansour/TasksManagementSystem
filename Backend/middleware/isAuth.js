const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, _res, next) => {
  const header = req.get('Authorization');
  if (!header) {
    req.isAuth = false;
    return next();
  }
  const token = header.replace(/^Bearer\s+/i, '').trim();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.isAuth = true;
    req.userId = decoded.userId;
    req.role   = decoded.role;
  } catch (err) {
    req.isAuth = false;
  }

  next();
};
