const Sequelize = require('sequelize');
const sequelize = require('../dbConnector');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCSALT);


const User = sequelize.define('user', {
  full_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM('admin', 'care_manager', 'therapist')
  }}, {
  hooks: {
    beforeSave: (user) => {
      user.password = bcrypt.hashSync(user.password, saltRounds);
    }
  }
});

User.findOneByEmail = email => {
  return User.findOne({ where: { email } });
}

sequelize.sync().then().catch(err => console.error(err));

module.exports = User;