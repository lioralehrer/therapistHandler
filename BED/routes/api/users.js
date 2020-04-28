const express = require('express');
const router = express.Router();
const DB = require('../../tempDB');
const users = DB.users;

const roles = [
  'care manager',
  'therapist'
]

// Get all users
router.get('/', (req, res) => res.json(users));

// Get user by ID
router.get('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));
  if (found) {
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({msg: `Couldn't find member with ID ${req.params.id}`});
  }
});

// Create user
router.post('/', (req,res) => {
  const newUser = {
    id: users.length + 1,
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };

  const paramsValidation = checkParams(newUser);
  

  if (paramsValidation.valid) {
    users.push(newUser);
    res.json(users);
  } else {
    const jsonResponse = {
      msg: 'Unable to create user. '
    };
    switch (paramsValidation.code) {
      case 'missing_info':
        jsonResponse.msg += 'Missing information'
        break;
      case 'duplicate_email':
        jsonResponse.msg += 'Email address has been used for another account'
        break;
      case 'invalid_role':
        jsonResponse.msg += 'Invalid role'
        break;
      case 'invalid_password':
        jsonResponse.msg += 'Invalid password'
        break;
    }
    return res.status(400).json(jsonResponse);
  }
})



// Helper methods
const checkParams = (user) => {
  const validator = {
    valid: false
  };
  const emailsArray = users.map(user => user.email);

  if (!(user.full_name && user.email && user.password && user.role)) {
    validator.code = 'missing_info';
  } else if (!(roles.includes(user.role))) {
    validator.code = 'invalid_role';
  } else if (user.password.length < 6) {
    validator.code = 'invalid_password'
  } else if (emailsArray.includes(user.email)) {
    validator.code = 'duplicate_email'
  } else {
    validator.valid = true;
  }
  return validator;
}

module.exports = router;