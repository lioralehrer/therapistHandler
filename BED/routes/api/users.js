const express = require('express');
const router = express.Router();
const User = require('../../models').User;

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
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(400).json({msg: `Unable to find user with ID ${req.params.id}`});
    }
  } catch (err) {
    console.error(err.message);
  }
});


// Update a user
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json({msg: `User with ID ${req.params.id} updated successfully.`});
    } else {
      res.status(400).json({msg: `Unable to find user with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err)
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

// Get all sessions by user
router.get('/:id/sessions', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const sessions = await user.getSessions();
      res.json(sessions);
    } else {
      res.status(400).json({msg: `Unable to find user with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
})

// Get all patients by user
router.get('/:id/patients', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const patients = await user.getPatients();
      res.json(patients);
    } else {
      res.status(400).json({msg: `Unable to find user with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
})

module.exports = router;