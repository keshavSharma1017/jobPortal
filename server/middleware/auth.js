import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader);
    
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Extracted token:', token ? 'Token present' : 'No token');

    if (!token) {
      return res.status(401).json({ message: 'No authentication token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded successfully:', decoded);
      req.user = { userId: decoded.userId };
      next();
    } catch (err) {
      console.error('Token verification failed:', err.message);
      res.status(401).json({ message: 'Token is not valid' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error in auth middleware' });
  }
};

export default auth;