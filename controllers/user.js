const express = require('express');
const router = express.Router();

const io = require('../app');
const User = require('../models/user');
const userSeeds = require('../models/userSeeds');
const authenticate = require('../middleware/authenticate');

//read all users
router.get('/all', authenticate, async (req, res) => {
  try {
    const allUsers = await User.find({ caseClosed: false });
    res.status(200).send(allUsers);
  } catch (error) {
    res.send(error);
  }
});

// Update single user
router.put('/edit', async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  try {
    const foundUser = await User.findOne({ id });
    if (!foundUser) {
      res.status(404).send({ message: 'User ID not found!' });
      return;
    } else {
      const updateUser = await User.findOneAndUpdate(
        { id },
        {
          name: req.body.name,
          id,
          gender: req.body.gender,
          age: req.body.age,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          safety: req.body.safety,
          emotion: req.body.emotion,
          situation: req.body.situation,
          perpetrator: req.body.perpetrator,
          companion: req.body.companion,
        }
      );
      res.status(200).send({ message: 'User details updated successfully!' });
      return;
    }
  } catch {
    return res.status(500).send({ message: 'Unexpected Error' });
  }
});

//update user to close case
router.patch('/closecase/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    const foundUser = await User.findOne({ id });
    if (!foundUser)
      return res.status(404).send({ message: 'User ID not found.' });
    const updateUser = await User.findOneAndUpdate(
      { id },
      { caseClosed: true },
      { new: true }
    );
    res.status(200).send({ message: 'Case closed.' });
  } catch (error) {
    return res.status(500).send({ message: 'Unexpected Error' });
  }
});

//read single user
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.find({ id });
    if (!user[0]) return res.status(404).send({ message: 'User not found' });
    res.status(200).send(user[0]);
  } catch (error) {
    res.send(error);
  }
});

//post single user
router.post('/', async (req, res) => {
  try {
    const idExist = await User.findOne({ id: req.body.id, caseClosed: false });
    if (!idExist) {
      const newUser = await User.create(req.body);
      res.status(201).send({ id: newUser.id });
      console.log(newUser.id);
    } else {
      res.status(406).send({ message: 'User ID exists and case is open' });
    }
  } catch (error) {
    res.send(error);
  }
});

//delete all users
router.delete('/delete/all', async (req, res) => {
  await User.deleteMany();
  res.send('User database deleted');
});

//seed users
router.post('/seed', async (req, res) => {
  const seededUsers = await User.create(userSeeds);
  res.send(seededUsers);
});

module.exports = router;
