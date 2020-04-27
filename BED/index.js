const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

app.use(logger);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));