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

// getGoals: fetches the Goals by Patient ID

const User_Patient = sequelize.define('user_patient', {
});

User.belongsToMany(Patient, {through: User_Patient});
Patient.belongsToMany(User, {through: User_Patient});

const Goal = sequelize.define('goal', {
  serialNum: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.STRING,
  patientId: {
    type: Sequelize.INTEGER,
    model: 'patients',
    key: 'id'
  },
  skillType: Sequelize.ENUM('receptive_comm', 'expressive_comm'),
  archived: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Patient.hasMany(Goal);

const SubGoal = sequelize.define('subGoal', {
  serialNum: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.STRING,
  attempts: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  successes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isLteAttempts(value) {
        if (this.attempts < value) {
          throw new Error('Successes must be less than or equal to attempts');
        }
      }
    }
  },
  goalId: {
    type: Sequelize.INTEGER,
    model: 'goals',
    key: 'id'
  },
  doneAt: {
    type: Sequelize.DATEONLY
  }
}, {
  indexes: [{
    unique: true,
    fields: ['serialNum', 'goalId']
  }]
})

Goal.hasMany(SubGoal);

const Environment = sequelize.define('environments', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

const Activity = sequelize.define('activities', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING,
  }
});

const Activity_Environment = sequelize.define('activity_environments', {
  default: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      async oneDefaultEnvToAct(value) {
        if (value) {
          let records;
          try {
            records = await Activity_Environment.findAll({where: {activityId: this.activityId}});
          } catch (err) {
            console.error(err);
          }
          if (records.some(record => record.default)) {
            throw new Error('This activity already has a default environment');
          }
        }
      }
    }
  }
});

Activity.belongsToMany(Environment, {through: Activity_Environment});
Environment.belongsToMany(Activity, {through: Activity_Environment});

const Goal_Activity = sequelize.define('goal_activities', {});

Activity.belongsToMany(Goal, {through: Goal_Activity});
Goal.belongsToMany(Activity, {through: Goal_Activity});

const Session = sequelize.define('sessions', {
  patientId: {
    type: Sequelize.INTEGER,
    model: 'patients',
    key: 'id'
  },
  therapistId: {
    type: Sequelize.INTEGER,
    model: 'users',
    key: 'id'
  },
  scheduledAt: Sequelize.DATE,
  sessionPlanMessage: Sequelize.TEXT,
  sessionSummaryMessage: Sequelize.TEXT
})

Patient.hasMany(Session);
User.hasMany(Session);

const Session_Goal = sequelize.define('session_goals', {
  goalId: {
    type: Sequelize.INTEGER,
    model: 'goals',
    key: 'id'
  },
  priority: {
    type: Sequelize.INTEGER,
    validate: {
      async uniquePriorityPerSession(value) {
        if (value) {
          let records;
          try {
            records = await Session_Goal.findAll({where: {sessionId: this.sessionId}});
          } catch (err) {
            console.error(err);
          }
          if (records.some(record => record.priority === value)) {
            throw new Error(`This session already has a goal with this priority number. (${value})`);
          }
        }
      }
    }
  }
})

Goal.belongsToMany(Session, {through: Session_Goal});
Session.belongsToMany(Goal, {through: Session_Goal});

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
      ], {
        validate: true
      }).then().catch(err => console.error(err));
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
      }], {
        validate: true
      }).then().catch(err => console.error(err));
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
  const goalCount = (await Goal.findAll()).length;
  console.log(`goalCount: ${goalCount}`);
  if (goalCount === 0) {
    try {
      await Goal.bulkCreate([{
        serialNum: 3,
        title: 'title',
        description: 'description',
        patientId: 2,
        skillType: 'expressive_comm'
      }, {
        serialNum: 2,
        title: 'tightel',
        description: 'discreepshen',
        patientId: 2,
        skillType: 'expressive_comm'
      }, {
        serialNum: 1,
        title: 'טייטל',
        description: 'דיסקריפשן',
        patientId: 1,
        skillType: 'receptive_comm'
      }], {
        validate: true
      }).then().catch(err => console.error(err));
    } catch (err) {
      console.error(err.message);
    }
  }
  const subgoalCount = (await SubGoal.findAll()).length;
  console.log(`subgoalCount: ${subgoalCount}`);
  if (subgoalCount === 0) {
    try {
      await SubGoal.bulkCreate([{
        serialNum: 3,
        title: 'title',
        description: 'description',
        goalId: 2,
        attempts: 2,
        successes: 2
      }, {
        serialNum: 2,
        title: 'tightel',
        description: 'discreepshen',
        goalId: 2,
        attempts: 2,
        successes: 1
      }, {
        serialNum: 1,
        title: 'טייטל',
        description: 'דיסקריפשן',
        goalId: 1,
        attempts: 1,
        successes: 1
      }], {
        validate: true
      }).then().catch(err => console.error(err));
    } catch (err) {
      console.error(err.message);
    }
  }
  const environmentCount = (await Environment.findAll()).length;
  console.log(`environmentCount: ${environmentCount}`);
  if (environmentCount === 0) {
    try {
      await Environment.bulkCreate([{
        title: 'toilet'
      }, {
        title: 'living room'
      }, {
        title: 'מטבח'
      }], {
        validate: true
      }).then().catch(err => console.error(err));
    } catch (err) {
      console.error(err.message);
    }
  }
  const activityCount = (await Activity.findAll()).length;
  console.log(`activityCount: ${activityCount}`);
  if (activityCount === 0) {
    try {
      await Activity.bulkCreate([{
        title: 'paint'
      }, {
        title: 'dance'
      }, {
        title: 'לרדד בצק'
      }], {
        validate: true
      }).then().catch(err => console.error(err));
    } catch (err) {
      console.error(err.message);
      await t.rollback();
    }
  }
  const activityEnvironmentCount = (await Activity_Environment.findAll()).length;
  console.log(`activityEnvironmentCount: ${activityEnvironmentCount}`);
  if (activityEnvironmentCount === 0) {
    try {
      let activity = await Activity.findOne({where: {id: 3}});
      let environment = await Environment.findOne({where: {id: 7}});
      await activity.addEnvironment(environment, {through: {default: true}, validate: true}).then().catch(err => console.error(err));
      activity = await Activity.findOne({where: {id: 3}});
      environment = await Environment.findOne({where: {id: 5}});
      await activity.addEnvironment(environment, {validate: true}).then().catch(err => console.error(err));
      console.log("linked activity 3 to environment 5");
      console.log("linked activity 3 to environment 6");
    } catch (err) {
      console.error(err.message);
    }
  }
  const goalActivityCount = (await Goal_Activity.findAll()).length;
  console.log(`goalActivityCount: ${goalActivityCount}`);
  if (goalActivityCount === 0) {
    try {
      let activity = await Activity.findOne({where: {id: 3}});
      let goal = await Goal.findOne({where: {id: 1}});
      await activity.addGoal(goal).then().catch(err => console.error(err));
      activity = await Activity.findOne({where: {id: 3}});
      goal = await Goal.findOne({where: {id: 2}});
      await activity.addGoal(goal).then().catch(err => console.error(err));
      console.log("linked activity 3 to goal 1");
      console.log("linked activity 3 to goal 2");
    } catch (err) {
      console.error(err.message);
    }
  }
  const sessionCount = (await Session.findAll()).length;
  console.log(`sessionCount: ${sessionCount}`);
  if (sessionCount === 0) {
    try {
      await Session.bulkCreate([
        {
          patientId: 2,
          therapistId: 1,
          scheduledAt: new Date(Date.now()),
          sessionPlanMessage: "lorem ipsum",
          sessionSummaryMessage: "ipsum lorem"
        },
        {
          patientId: 2,
          therapistId: 1,
          scheduledAt: new Date(Date.now()),
          sessionPlanMessage: "לורם איפסום",
          sessionSummaryMessage: "איפסום לורם"
        }
      ], {
        validate: true
      })
    } catch (err) {
      console.error(err.message);
    }
  }
  const sessionGoalCount = (await Session_Goal.findAll()).length;
  console.log(`sessionGoalCount: ${sessionGoalCount}`);
  if (sessionGoalCount === 0) {
    try {
      let session = await Session.findOne({where: {id: 3}});
      let goal = await Goal.findOne({where: {id: 1}});
      await session.addGoal(goal, {through: {priority: 2}}).then().catch(err => console.error(err));
      goal = await Goal.findOne({where: {id: 2}});
      await session.addGoal(goal, {through: {priority: 1}}).then().catch(err => console.error(err));
      console.log("linked session 3 to goal 1");
      console.log("linked session 3 to goal 2");
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
  User_Patient,
  Goal,
  SubGoal,
  Environment,
  Activity,
  Activity_Environment,
  Goal_Activity,
  Session,
  Session_Goal
};