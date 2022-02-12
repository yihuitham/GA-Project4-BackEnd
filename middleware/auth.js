const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_PRIVATE_KEY;

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send({ error: 'Access denied. No Token' });
  }
  try {
    const payload = jwt.verify(token, privateKey);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};
