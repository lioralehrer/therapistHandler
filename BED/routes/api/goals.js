const express = require('express');
const router = express.Router();
const Goal = require('../../models').Goal;

// Create goal
router.post('/', async (req, res) => {
  try {
    const newGoal = await Goal.create(req.body);
    res.json(newGoal);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg: err.message});
  }
})

// Get single goal
router.get('/:id', async (req, res) => {
  try {
    const goal = await Goal.findByPk(req.params.id);
    if (goal) {
      res.json(goal);
    } else {
      res.status(400).json({message: `Unable to find goal with ID ${req.params.id}`});
    }
  } catch (err) {
    console.error(err.message);
  }
});


// Update a goal
router.patch('/:id', async (req, res) => {
  try {
    const goal = await Goal.findByPk(req.params.id);
    if (goal) {
      await goal.update(req.body);
      res.json({msg: `Goal with ID ${req.params.id} updated successfully.`});
    } else {
      res.status(400).json({msg: `Unable to find goal with ID ${req.params.id}`})
    }
    } catch (err) {
      console.error(err)
    }
});

// Delete a goal
router.delete('/:id', async (req, res) => {
  try {
    const delRows = await Goal.destroy({where: {id: req.params.id}});
    if (delRows == 1) {
      res.json({msg: `Goal with ID ${req.params.id} deleted successfully.`});
    } else {
      res.status(400).json({msg: `Unable to find goal with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

// Get all subgoals by goal
router.get('/:id/subgoals', async (req, res) => {
  try {
    const goal = await Goal.findByPk(req.params.id);
    if (goal) {
      const subgoals = await goal.getSubGoals();
      res.json(subgoals)
    } else {
      res.status(400).json({msg: `Unable to find goal with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

// Get all sessions by goal
router.get('/:id/sessions', async (req, res) => {
  try {
    const goal = await Goal.findByPk(req.params.id);
    if (goal) {
      const sessions = await goal.getSessions();
      res.json(sessions)
    } else {
      res.status(400).json({msg: `Unable to find goal with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

// Get all activities by goal
router.get('/:id/activities', async (req, res) => {
  try {
    const goal = await Goal.findByPk(req.params.id);
    if (goal) {
      const activities = await goal.getActivities();
      res.json(activities)
    } else {
      res.status(400).json({msg: `Unable to find patient with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;