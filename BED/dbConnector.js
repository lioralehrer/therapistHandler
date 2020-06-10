const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: 'postgres'
  },
);

sequelize.authenticate()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(err => {
    console.log('Error connecting to db:', err)
  })

module.exports = sequelize;