const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
      
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, 
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

     
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token // Send token to client
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
      
      // Set cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, 
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const getUserProfile = async (req, res) => {
  try {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email
    };
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { authUser, registerUser, logoutUser, getUserProfile };