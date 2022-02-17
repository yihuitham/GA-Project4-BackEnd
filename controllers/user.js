const express = require('express');
const router = express.Router();

const User = require('../models/user');
const userSeeds = require('../models/userSeeds');
const authenticate = require('../middleware/authenticate');

router.get('/all', authenticate, async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser._id);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/delete/all', async (req, res) => {
  await User.deleteMany();
  res.send('User database deleted');
});

router.post('/seed', async (req, res) => {
  const seededUsers = await User.create(userSeeds);
  res.send(seededUsers);
});

module.exports = router;
