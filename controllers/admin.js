require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_PRIVATE_KEY;

router.get('/', auth, (req, res) => {
  const token = req.header('x-auth-token');
  const payload = jwt.verify(token, privateKey);
  //   res.send(userDatabase.getUser());
  res.send(payload);
});

router.post('/', (req, res) => {
  const userInfo = req.body;
  const signedJwt = jwt.sign(userInfo, privateKey);
  res.send(signedJwt);
});

module.exports = router;
