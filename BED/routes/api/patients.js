const express = require('express');
const router = express.Router();
const DB = require('../../tempDB');
const patients = DB.patients;


// Get all patients
router.get('/', (req, res) => res.json(patients));

// Get patient by ID
router.get('/:id', (req, res) => {
  if (patientFound(req.params.id)) {
    res.json(patients.filter(patient => patient.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({msg: `Couldn't find patient with ID ${req.params.id}`});
  }
});

// Get sessions by patient ID
router.get('/:id/sessions', (req, res) => {
  if (patientFound(req.params.id)) {
    const sessions = DB.sessions.filter(session => session.patient_id === parseInt(req.params.id));
    res.json(sessions)
  } else {
    res.status(400).json({msg: `Couldn't find patient with ID ${req.params.id}`});
  }
})

// Get goals by patient ID
router.get('/:id/goals', (req, res) => {
  if (patientFound(req.params.id)) {
    const goals = DB.goals.filter(goal => goal.patient_id === parseInt(req.params.id));
    res.json(goals)
  } else {
    res.status(400).json({msg: `Couldn't find patient with ID ${req.params.id}`});
  }
})

// Create patient
router.post('/', (req,res) => {
  const newPatient = {
    id: patients.length + 1,
    personal_id: req.body.personal_id,
    full_name: req.body.full_name,
    care_manager_id: req.body.care_manager_id
  };

  const validateParams = checkCParams(newPatient);
  
  if (validateParams.valid) {
    patients.push(newPatient);
    res.json(patients);
  } else {
    const reason = errorHandler(validateParams.code);
    const jsonResponse = {
      msg: `Unable to create patient. ${reason}`
    };
    return res.status(400).json(jsonResponse);
  }
})

// Update patient
router.put('/:id', (req, res) => {
  const found = patientFound(req.params.id);
  if (found) {
    const upPatient = req.body;
    patients.forEach(patient => {
      if (patient.id === parseInt(req.params.id)) {
        patient.personal_id = upPatient.personal_id ? upPatient.personal_id : patient.personal_id;
        patient.full_name = upPatient.full_name ? upPatient.full_name : patient.full_name;
        patient.care_manager_id = upPatient.care_manager_id ? upPatient.care_manager_id : patient.care_manager_id;
        
        const validateParams = checkUParams(patient);
        if (validateParams.valid) {
          res.json({msg: 'Patient was updated', patient})
        } else {
          const reason = errorHandler(validateParams.code);
          const jsonResponse = {
            msg: `Unable to update patient. ${reason}`
          };
          return res.status(400).json(jsonResponse);
        }
      }
    });
  } else {
    res.status(400).json({msg: `Unable to find patient with ID ${req.params.id}`});
  }
});

// Delete patient
router.delete('/:id', (req, res) => {
  const found = patientFound(req.params.id);
  if (found) {
    res.json({msg: 'User deleted', patients: patients.filter(patient => patient.id !== parseInt(req.params.id))});
  } else {
    res.status(400).json({msg: `Unable to find patient with ID ${req.params.id}`});
  }
});


// Helper methods
const patientFound = (id) => {
  return patients.some(patient => patient.id === parseInt(id));
}

const validateCareManagerID = (care_manager_id) => {
  return DB.users.filter(user => user.role === 'care manager').some(user => user.id === parseInt(care_manager_id));
}

const checkCParams = (patient) => {
  const validator = {
    valid: false
  };

  if (!(patient.full_name && patient.personal_id && patient.care_manager_id)) {
    validator.code = 'missing_info';
    return validator;
  }
  return checkUParams(patient);
}

const checkUParams = (patient) => {
  const validator = {
    valid: false
  };
  const personalIDArray = patients.filter(existing_patient => existing_patient.id != parseInt(patient.id)).map(patient => patient.personal_id);
  if (personalIDArray.includes(patient.personal_id)) {
    validator.code = 'duplicate_personal_id'
  } else if (!validateCareManagerID(patient.care_manager_id)) {
    validator.code = 'invalid_care_manager_id'
  } else {
    validator.valid = true;
  }
  return validator;
}

const errorHandler = (code) => {
  switch (code) {
    case 'missing_info':
      return 'Missing information';
    case 'duplicate_personal_id':
      return 'Personal ID has been used for another patient';
    case 'invalid_care_manager_id':
      return 'Invalid care manager ID';
  }
}

module.exports = router;