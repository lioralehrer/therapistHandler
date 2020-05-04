require('dotenv/config');
const express = require('express');
const logger = require('./middleware/logger');
const mongoose = require('mongoose');
const URL = "mongodb+srv://" + process.env.MONGO_ATLAS_CRED.toString() + "@spectracker-et0au.mongodb.net/spectracker?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// API routes
app.use('/api/users', require('./routes/api/users')); // users
app.use('/api/patients', require('./routes/api/patients')); // patients

// DB connection
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log("Error connecting to DB: " + err)
  } else {
    console.log("Connected to DB!")
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));