const Sequelize = require('sequelize');
const sequelize = require('../dbConnector');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCSALT);


const User = sequelize.define('user', {
  fullName: {
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

const populateDB = async () => {
  const userCount = (await User.findAll()).length;
  if (userCount === 0) {
    User.bulkCreate([
    {
      fullName: "full name",
      email: "e@ma.il",
      password: "hashedpass",
      role: "care_manager"
    },
    {
      fullName: "פול ניים",
      email: "h@p.kl",
      password: "hashedpass",
      role: "therapist"
    }
    ])
  }
}

sequelize.sync().then(() => {
  populateDB();
}).catch(err => console.error(err));

module.exports = User;