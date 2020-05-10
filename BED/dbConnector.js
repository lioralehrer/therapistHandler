const {Pool} = require('pg');


const pool = new Pool({
  host: process.env.PGHOST,
  database: "postgres"
})


module.exports = pool;