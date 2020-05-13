const Sequelize = require('sequelize');
const sequelize = require('../dbConnector');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCSALT);
const User = require('./user');


const Patient = sequelize.define('patient', {
  personalId: {
    type: Sequelize.TEXT('tiny'),
    unique: true,
    allowNull: false
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  carePersonId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Patient.hasMany(User, {as: 'carePerson'});

const populateDB = async () => {
  const patientCount = await Patient.findAll();
  if (patientCount == 0) {
    Patient.bulkCreate([
    {
      personalId: "720184743",
      fullName: "patient name",
      carePersonId: 1
    },
    {
      personalId: "537293749",
      fullName: "פיישנט ניים",
      carePersonId: 1
    },
    {
      personalId: "293837463",
      fullName: "איז מיי ניים",
      carePersonId: 2
    },
    {
      personalId: "720184743",
      fullName: "patient name",
      carePersonId: 2
    }
    ])
  }
}

sequelize.sync().then(() => {
  populateDB();
}).catch(err => console.error(err));

module.exports = Patient;