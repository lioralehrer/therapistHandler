require('dotenv/config');
const express = require('express');
const logger = require('./middleware/logger');
const cors = require('cors');

const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());

app.use('/api/users', require('./routes/api/users')); // users
app.use('/api/patients', require('./routes/api/patients')); // patients
app.use('/api/goals', require('./routes/api/goals')); // goals

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));