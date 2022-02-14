const jwt = require('jsonwebtoken');
const accessToken = process.env.ACCESS_TOKEN_SECRET;

module.exports = (req, res, next) => {
  // const token = req.header('x-auth-token');
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ error: 'Access denied. No Token' });
  }
  try {
    const payload = jwt.verify(token, accessToken);
    console.log(payload);
    next();
  } catch (error) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};
