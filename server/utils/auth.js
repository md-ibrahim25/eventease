const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
