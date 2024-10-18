// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected route
router.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}. Welcome to the protected route!` });
});

module.exports = router;
