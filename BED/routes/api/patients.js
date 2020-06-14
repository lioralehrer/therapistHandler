const express = require('express');
const router = express.Router();
const Patient = require('../../models').Patient;

// Create patient
router.post('/', async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.json(newPatient);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg: err.message});
  }
})

// Get single patient
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findOne({where: {id: req.params.id}});
    if (patient) {
      res.json(patient);
    } else {
      res.status(400).json({message: `Unable to find patient with ID ${req.params.id}`});
    }
  } catch (err) {
    console.error(err.message);
  }
});


// Update a patient
router.patch('/:id', async (req, res) => {
  try {
    const patient = await Patient.findOne({where: {id: req.params.id}})
    if (patient) {
      await patient.update(req.body);
      res.json({msg: `Patient with ID ${req.params.id} updated successfully.`});
    } else {
      res.status(400).json({msg: `Unable to find user with ID ${req.params.id}`})
    }
    } catch (err) {
      console.error(err)
    }
});

// Delete a patient
router.delete('/:id', async (req, res) => {
  try {
    const delRows = await Patient.destroy({where: {id: req.params.id}});
    if (delRows == 1) {
      res.json({msg: `Patient with ID ${req.params.id} deleted successfully.`});
    } else {
      res.status(400).json({msg: `Unable to find patient with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

// Get all goals by patient
router.get('/:id/goals', async (req, res) => {
  try {
    const patient = await Patient.findOne({where: {id: req.params.id}});
    if (patient) {
      const goals = await patient.getGoals();
      res.json(goals)
    } else {
      res.status(400).json({msg: `Unable to find patient with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

// Get all sessions by patient
router.get('/:id/sessions', async (req, res) => {
  try {
    const patient = await Patient.findOne({where: {id: req.params.id}});
    if (patient) {
      const sessions = await patient.getSessions();
      res.json(sessions)
    } else {
      res.status(400).json({msg: `Unable to find patient with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

// Get all activities by patient
router.get('/:id/activities', async (req, res) => {
  try {
    const patient = await Patient.findOne({where: {id: req.params.id}});
    if (patient) {
      const activities = await patient.getActivities();
      res.json(activities)
    } else {
      res.status(400).json({msg: `Unable to find patient with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

// Get all items by patient
router.get('/:id/items', async (req, res) => {
  try {
    const patient = await Patient.findOne({where: {id: req.params.id}});
    if (patient) {
      const items = await patient.getItems();
      res.json(items)
    } else {
      res.status(400).json({msg: `Unable to find patient with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

// Get all words by patient
router.get('/:id/words', async (req, res) => {
  try {
    const patient = await Patient.findOne({where: {id: req.params.id}});
    if (patient) {
      const words = await patient.getWords();
      res.json(words)
    } else {
      res.status(400).json({msg: `Unable to find patient with ID ${req.params.id}`})
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;