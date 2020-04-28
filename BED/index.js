const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

// Middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// API routes
app.use('/api/users', require('./routes/api/users')); // users
app.use('/api/patients', require('./routes/api/patients')); // patients

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));