require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const auth = require('../middleware/authenticate');
// const jwt = require('jsonwebtoken');

// const accessToken = process.env.ACCESS_TOKEN_SECRET;

// router.post('/', (req, res) => {
//   const token = req.headers['authorization'];
//   const body = req.body;
//   // const payload = jwt.verify(token, privateKey);
//   // res.send(payload);
//   res.json({ token, body });
// });

// router.post('/', (req, res) => {
//   const userInfo = req.body;
//   const signedJwt = jwt.sign(userInfo, accessToken);
//   res.send(signedJwt);
// });

const Admin = require('../models/admin');
const adminSeeds = require('../models/adminSeeds');

router.get('/', async (req, res) => {
  try {
    const allAdmin = await Admin.find({});
    res.send(allAdmin);
  } catch (error) {
    res.send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { username, emailAddress } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const newAdmin = await Admin.create({ username, password, emailAddress });
    res.status(201).send(newAdmin);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/delete/all', async (req, res) => {
  await Admin.deleteMany();
  res.send('Admin database deleted');
});

router.post('/seed', async (req, res) => {
  await Promise.all(
    adminSeeds.forEach(async (seed) => {
      seed.password = await bcrypt.hash(seed.password, 10);
    })
  );

  // const seededAdmins = await Admin.create(adminSeeds);
  res.send(adminSeeds);
});

module.exports = router;
