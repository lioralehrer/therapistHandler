require('dotenv/config');
const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const pool = require('./dbConnector');
const cors = require('cors');

const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());

app.use('/api/users', require('./routes/api/users')); // users

// connecting to DB
pool.connect(err => {
  if (err) {
    console.error('DB connection error', err.stack)
  } else {
    console.log('DB connected')
  }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));