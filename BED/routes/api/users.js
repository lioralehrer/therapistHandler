const express = require('express');
const router = express.Router();
const pool = require('../../dbConnector');


// Create user
router.post('/', async (req, res) => {
  try {
    const reqData = new Map();
    reqData.set('full_name', req.body.full_name);
    reqData.set('email', req.body.email);
    reqData.set('password', req.body.password);
    reqData.set('role', req.body.role);
    const newUser = await pool.query("INSERT INTO testusers (full_name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *", Array.from(reqData.values()));
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

// Get all users
router.get('/', async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM testusers");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);;
  }
})

// Get single user
router.get('/:id', async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM testusers WHERE id = $1", [req.params.id]);
    if (user.rows[0]) {
      res.json(user.rows[0]);
    } else {
      res.status(400).json({message: `Unable to find user with ID ${req.params.id}`});
    }
  } catch (err) {
    console.error(err.message);
  }
})


// Update a user
router.put('/:id', async (req, res) => {
  try {
    const reqData = new Map();
    reqData.set('full_name', req.body.full_name);
    reqData.set('email', req.body.email);
    reqData.set('password', req.body.password);
    reqData.set('role', req.body.role);
    const upUser = await pool.query("UPDATE testusers SET full_name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *", [...Array.from(reqData.values()), req.params.id]);
    res.json(upUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

// Delete a user
router.delete('/:id', async (req, res) => {
  await pool.query("DELETE FROM testusers WHERE id = $1", [req.params.id]);
  res.json({message: `User with ID ${req.params.id} deleted successfully.`});
})

// TODO: Create models and implement validation etc.

module.exports = router;