const Sequelize = require('sequelize');
const sequelize = require('./dbConnector');

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

const User_Patient = sequelize.define('user_patient', {
});

User.belongsToMany(Patient, {through: User_Patient});
Patient.belongsToMany(User, {through: User_Patient});

const populateTables = async () => {
  const userCount = (await User.findAll()).length;
  console.log(`userCount: ${userCount}`);
  if (userCount === 0) {
    try {
      await User.bulkCreate([
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
  const patientCount = (await Patient.findAll()).length;
  console.log(`patientCount: ${patientCount}`);
  if (patientCount === 0) {
    try {
      await Patient.bulkCreate([
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
  const userPatientCount = (await User_Patient.findAll()).length;
  console.log(`userPatientCount: ${userPatientCount}`);
  if (userPatientCount === 0) {
    try {
      const user = await User.findOne({where: {id: 1}});
      const patient = await Patient.findOne({where: {id: 1}});
      await user.addPatient(patient);
      console.log("linked user 1 to patient 1");
    } catch (err) {
      console.error(err.message);
    }
  }
}

sequelize.sync().then(() => {
  populateTables();
}).catch(err => console.error(err));

module.exports = {
  User,
  Patient,
  User_Patient
};