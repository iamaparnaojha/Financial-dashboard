const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

const generateToken = (userId, username, role) => {
  return jwt.sign(
    { userId, username, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { username, adminPassword, viewerPassword } = req.body;

    if (!username || !adminPassword || !viewerPassword) {
      return res.status(400).json({ message: 'Username, admin password, and viewer password are all required.' });
    }

    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters.' });
    }

    if (adminPassword.length < 6) {
      return res.status(400).json({ message: 'Admin password must be at least 6 characters.' });
    }

    if (viewerPassword.length < 6) {
      return res.status(400).json({ message: 'Viewer password must be at least 6 characters.' });
    }

    if (adminPassword === viewerPassword) {
      return res.status(400).json({ message: 'Admin password and viewer password must be different.' });
    }

    const existingUser = await User.findOne({ username: username.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken. Please choose another.' });
    }

    const user = new User({
      username: username.toLowerCase().trim(),
      adminPassword,
      viewerPassword
    });

    await user.save();

    // Sign in as admin after signup
    const token = generateToken(user._id, user.username, 'admin');

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: 'admin'
      },
      message: 'Account created successfully!'
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup. Please try again.' });
  }
});

// POST /api/auth/signin
router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = await User.findOne({ username: username.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const role = await user.comparePasswords(password);
    if (!role) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const token = generateToken(user._id, user.username, role);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role
      },
      message: `Signed in as ${role}`
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Server error during sign in. Please try again.' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-adminPassword -viewerPassword');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({
      user: {
        id: user._id,
        username: user.username,
        role: req.user.role
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
