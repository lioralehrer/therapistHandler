const Sequelize = require('sequelize');
const sequelize = require('../dbConnector');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCSALT);
const User = require('./user');


const Patient = sequelize.define('patient', {
  personalId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  careProfessionalId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},
{
  indexes: [
    {
      unique: true,
      fields: ['personalId', 'careProfessionalId']
    }
  ]
});

Patient.hasMany(User, {as: 'careProfessional'});

const populateDB = async () => {
  const patientCount = await Patient.findAll();
  if (patientCount == 0) {
    Patient.bulkCreate([
    {
      personalId: "720184743",
      fullName: "patient name",
      careProfessionalId: 1
    },
    {
      personalId: "537293749",
      fullName: "פיישנט ניים",
      careProfessionalId: 1
    },
    {
      personalId: "293837463",
      fullName: "איז מיי ניים",
      careProfessionalId: 2
    },
    {
      personalId: "720184743",
      fullName: "patient name",
      careProfessionalId: 2
    }
    ])
  }
}

sequelize.sync().then(() => {
  populateDB();
}).catch(err => console.error(err));

module.exports = Patient;