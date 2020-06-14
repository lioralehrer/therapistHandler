const express = require('express');
const router = express.Router();
const Patient = require('../../models').Patient;

// Create patient
router.post('/', async (req, res) => {
  try {
    const newPatient = await User.create(req.body);
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
  const patient = await Patient.findOne({where: {id: req.params.id}})
  if (patient) {
    try {
      await patient.update(req.body);
      res.json({msg: `Patiwnt with ID ${req.params.id} updated successfully.`});
    } catch (err) {
      console.error(err)
    }
  } else {
    res.status(400).json({msg: `Unable to find user with ID ${req.params.id}`})
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

module.exports = router;