const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');

// Authenticate user
router.post('/auth', async (req, res) => {
  try {
    const user = await User.findOneByEmail(req.body.email);
    if (user) {
      const userAuthenticated = bcrypt.compareSync(req.body.password, user.password);
      if (userAuthenticated) {
        res.json({authenticated: true})
      } else {
        res.json({authenticated: false})
      }
    } else {
      res.status(400).json({msg: `Unable to find user with email address ${req.params.email}`})
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({msg: err.message});
  }
})


// Create user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg: err.message});
  }
})

// Get all users
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg: err.message});
  }
})

// Get single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({where: {id: req.params.id}});
    if (user) {
      res.json(user);
    } else {
      res.status(400).json({message: `Unable to find user with ID ${req.params.id}`});
    }
  } catch (err) {
    console.error(err.message);
  }
});


// Update a user
router.patch('/:id', async (req, res) => {
  const user = await User.findOne({where: {id: req.params.id}})
  if (user) {
    try {
      await user.update(req.body);
      res.json({msg: `User with ID ${req.params.id} updated successfully.`});
    } catch (err) {
      console.error(err)
    }
  } else {
    res.status(400).json({msg: `Unable to find user with ID ${req.params.id}`})
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const delRows = await User.destroy({where: {id: req.params.id}});
    if (delRows == 1) {
      res.json({msg: `User with ID ${req.params.id} deleted successfully.`});
    } else {
      res.status(400).json({msg: `Unable to find user with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;