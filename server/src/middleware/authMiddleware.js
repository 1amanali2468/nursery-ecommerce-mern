import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'greennest_secret_key_123');

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        const error = new Error('Not authorized, user not found');
        error.statusCode = 401;
        return next(error);
      }

      return next();
    } catch (err) {
      const error = new Error('Not authorized, token failed');
      error.statusCode = 401;
      return next(error);
    }
  }

  if (!token) {
    const error = new Error('Not authorized, no token');
    error.statusCode = 401;
    return next(error);
  }
};
