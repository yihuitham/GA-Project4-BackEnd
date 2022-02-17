require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username }).lean();
    if (!admin) {
      return res.status(403).json({ error: 'Invalid credentials' });
    }
    const validPassword = await bcrypt.compare(password, admin.password);
    if (validPassword) {
      const token = jwt.sign(
        { username, access: 'admin' },
        process.env.ACCESS_TOKEN_SECRET
      );
      const capUsername = username.charAt(0).toUpperCase() + username.slice(1);
      return res.json({ token, username: capUsername });
    } else {
      return res.status(403).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(400).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
