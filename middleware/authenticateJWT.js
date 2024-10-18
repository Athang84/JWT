// middleware/authenticateJWT.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, 'your-secret-key', (err, user) => {
      if (err) {
        return res.sendStatus(403); // Invalid token
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // No token provided
  }
};

module.exports = authenticateJWT;
