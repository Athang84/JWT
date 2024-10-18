// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, findUser } = require('../models/users');

// Register a new user
const register = async (req, res) => {
  const { username, password } = req.body;

  if (findUser(username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = await createUser(username, password);
  res.status(201).json({ message: 'User registered', user: newUser.username });
};

// Login and generate JWT
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = jwt.sign({ username: user.username }, 'your-secret-key', {
    expiresIn: '1h',
  });

  res.json({ token });
};

module.exports = { register, login };
