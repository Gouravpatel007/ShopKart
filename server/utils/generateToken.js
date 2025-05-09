import jwt from 'jsonwebtoken';

// Generate JWT token for authentication
const generateToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET || 'default_secret', 
    { expiresIn: '30d' }
  );
};

export default generateToken;