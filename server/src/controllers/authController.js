import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

// Helper function to generate a JWT token
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'greennest_secret_key_123', {
    expiresIn: '30d'
  });
};

// Register a new user
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      const error = new Error('Please enter all fields');
      error.statusCode = 400;
      return next(error);
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      const error = new Error('User already exists');
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      const error = new Error('Invalid user data');
      error.statusCode = 400;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

// Login user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      const error = new Error('Please fill in all fields');
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

// Get user profile
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};
