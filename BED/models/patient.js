const Sequelize = require('sequelize');
const sequelize = require('../dbConnector');


const Patient = sequelize.define('patient', {
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthdate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  }
});

Patient.findOneById = id => {
  return Patient.findOne({ where: { id } });
}

const populateTable = async () => {
  const patientCount = (await Patient.findAll()).length;
  console.log(`patientCount: ${patientCount}`);
  if (patientCount === 0) {
    try {
      Patient.bulkCreate([
      {
        fullName: "patient name",
        birthdate: new Date(Date.now())
      },
      {
        fullName: "פיישנט ניים",
        birthdate: new Date(Date.UTC(1990, 2, 21))
      }
      ]);
      console.log("added 2 patients to db");
    } catch (err) {
      console.error(err.message);
    }
  }
}

sequelize.sync().then(() => {
  populateTable();
}).catch(err => console.error(err));

module.exports = Patient;