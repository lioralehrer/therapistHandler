const express = require('express');
const router = express.Router();
const User = require('./models/user');

const ROLES = [
  'care manager',
  'therapist'
]

// Get all users
router.get('/', async (req,res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({msg: err});
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({msg: `Unable to find user with ID ${req.params.id}`});
    }
  } catch (err) {
    res.status(400).json({msg: err});
  }
});

// Create user
router.post('/', async (req,res) => {
  const newUser = new User({
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  });

  const validateParams = checkCParams(newUser);

  if (validateParams.valid) {
    try {
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      res.status(500).json({msg: err});
    }
  } else {
    const reason = errorMsgHandler(validateParams.errCode)
    const jsonResponse = {
      msg: `Unable to create user. ${reason}`
    };
    return res.status(400).json(jsonResponse);
  }
});

// Update user
router.patch('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {$set: req.body.data},
      {new: true, useFindAndModify: false});
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({msg: err});
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const removedUser = await User.findByIdAndDelete(req.params.id);
    if (removedUser) {
      res.json(removedUser);
    } else {
      res.status(404).json({msg: `Unable to find user with ID ${req.params.id}`});
    }
  } catch (err) {
    res.status(500).json({msg: err});
  }
});

// Helper methods

const checkCParams = (user) => {
  const validator = {
    valid: false
  };

  if (!(user.full_name && user.email && user.password && user.role)) {
    validator.errCode = 'missing_info';
    return validator;
  }
  return checkUParams(user);
}

const checkUParams = (user) => {
  const validator = {
    valid: false
  };

  if (user.role && !ROLES.includes(user.role)) {
    validator.errCode = 'invalid_role';
  } else if (user.password && user.password.length < 6) {
    validator.errCode = 'invalid_password'
  } else {
    validator.valid = true;
  }
  return validator;
}

const errorMsgHandler = (code) => {
  switch (code) {
    case 'missing_info':
      return 'Missing information';
    case 'invalid_role':
      return 'Invalid role';
    case 'invalid_password':
      return 'Invalid password';
  }
}

module.exports = router;