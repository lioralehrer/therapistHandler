const Sequelize = require('sequelize');
const sequelize = require('../dbConnector');
const Patient = require('./patient');

const User = sequelize.define('user', {
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  role: {
    type: Sequelize.ENUM('admin', 'case_manager', 'therapist')
  }
});

User.findOneById = id => {
  return User.findOne({ where: { id } });
}

const populateTable = async () => {
  const userCount = (await User.findAll()).length;
  console.log(`userCount: ${userCount}`);
  if (userCount === 0) {
    try {
      User.bulkCreate([
      {
        fullName: "full name",
        email: "e@ma.il",
        role: "case_manager"
      },
      {
        fullName: "פול ניים",
        email: "h@p.kl",
        role: "therapist"
      }
      ]);
      console.log("added 2 users to db");
    } catch (err) {
      console.error(err.message);
    }
  }
}

// For futue reference - table relationships between user and patient
// User.belongsToMany(Patient, {through: 'PatientCareProfessionals', as: 'careProfessional'});
// Patient.belongsToMany(User, {through: 'PatientCareProfessionals'});

sequelize.sync().then(() => {
  populateTable();
}).catch(err => console.error(err));

module.exports = User;