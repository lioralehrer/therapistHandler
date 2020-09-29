const express = require('express');
const router = express.Router();
const Session = require('../../models').Session;

// Create session
router.post('/', async (req, res) => {
  try {
    const newSession = await Session.create(req.body);
    res.json(newSession);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg: err.message});
  }
});

// Get single session
router.get('/:id', async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (session) {
      res.json(session);
    } else {
      res.status(400).json({msg: `Unable to find session with ID ${req.params.id}`});
    }
  } catch (err) {
    console.error(err.message);
  }
});


// Update a session
router.patch('/:id', async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (session) {
      await session.update(req.body);
      res.json({msg: `Session with ID ${req.params.id} updated successfully.`});
    } else {
      res.status(400).json({msg: `Unable to find session with ID ${req.params.id}`})
    }
    } catch (err) {
      console.error(err)
    }
});

// Delete a session
router.delete('/:id', async (req, res) => {
  try {
    const delRows = await Session.destroy({where: {id: req.params.id}});
    if (delRows == 1) {
      res.json({msg: `Session with ID ${req.params.id} deleted successfully.`});
    } else {
      res.status(400).json({msg: `Unable to find session with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

// Get all goals by session
router.get('/:id/goals', async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (session) {
      const goals = await session.getGoals();
      res.json(goals)
    } else {
      res.status(400).json({msg: `Unable to find session with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

// Get all activities by session
router.get('/:id/activities', async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (session) {
      const activities = await session.getActivities();
      res.json(activities)
    } else {
      res.status(400).json({msg: `Unable to find session with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;