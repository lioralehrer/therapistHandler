const Sequelize = require('sequelize');
const sequelize = require('./dbConnector');
const fs = require('fs');
const colorObjs = fs.readFileSync('../../colors_for_therapistHandler/Color_objs.json');

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
      type: Sequelize.ENUM('admin', 'case_manager', 'therapist', 'parent')
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

const User_Patient = sequelize.define('user_patient', {});

User.belongsToMany(Patient, {through: User_Patient});
Patient.belongsToMany(User, {through: User_Patient});

const Goal = sequelize.define('goal', {
  serialNum: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  patientId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    model: 'patients',
    key: 'id'
  },
  skillType: Sequelize.ENUM('receptive_comm', 'expressive_comm'),
  minTherapists: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  minConsecutiveDays: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  archived: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  indexes: [{
    unique: true,
    fields: ['serialNum', 'patientId']
  }]
});

Patient.hasMany(Goal);

const SubGoal = sequelize.define('subGoal', {
  serialNum: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  attempts: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
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
    allowNull: false,
    model: 'goals',
    key: 'id'
  },
  doneAt: Sequelize.DATEONLY
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

const Activity = sequelize.define('activity', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  patientId: {
    type: Sequelize.INTEGER,
    model: 'patients',
    key: 'id'
  },
  colorCode: {
    type: Sequelize.STRING,
    model: 'colors',
    key: 'hexaCode',
  }
}, {
  hooks: {
    beforeCreate: async (instance) => {
      const lastColorId = (await Activity.findAll({where: {
        patientId: instance.patientId
      }})).length;
      const nextColorCode = (await Color.findOne({where: {id: lastColorId+1}})).hexaCode;
      instance.colorCode = nextColorCode;
    }
  }
}
);

Patient.hasMany(Activity);

const Activity_Environment = sequelize.define('activity_environment', {
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

const Assistance = sequelize.define('assistance', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

const SubGoal_Assistance = sequelize.define('subGoal_assistance', {});

Assistance.belongsToMany(SubGoal, {through: SubGoal_Assistance});
SubGoal.belongsToMany(Assistance, {through: SubGoal_Assistance});

const Goal_Activity = sequelize.define('goal_activity', {});

Activity.belongsToMany(Goal, {through: Goal_Activity});
Goal.belongsToMany(Activity, {through: Goal_Activity});

const Session = sequelize.define('session', {
  patientId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    model: 'patients',
    key: 'id'
  },
  therapistId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    model: 'users',
    key: 'id'
  },
  scheduledAt: Sequelize.DATE,
  sessionPlanMessage: Sequelize.TEXT,
  sessionSummaryMessage: Sequelize.TEXT
})

Patient.hasMany(Session);
User.hasMany(Session, {foreignKey: 'therapistId'});

const Attempt = sequelize.define('attempt', {
  sessionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    model: 'sessions',
    key: 'id'
  },
  activityId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    model: 'activities',
    key: 'id'
  },
  environmentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    model: 'environments',
    key: 'id'
  },
  assistanceId: {
    type: Sequelize.INTEGER,
    model: 'assistances',
    key: 'id'
  },
  successful: Sequelize.BOOLEAN
})

const Session_Goal = sequelize.define('session_goal', {
  priority: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
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

const Item = sequelize.define('item', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  patientId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    model: 'patients',
    key: 'id'
  }
}, {
  indexes: [{
    unique: true,
    fields: ['title', 'patientId']
  }]
})

Patient.hasMany(Item);

const Activity_Item = sequelize.define('activity_item', {});

Item.belongsToMany(Activity, {through: Activity_Item});
Activity.belongsToMany(Item, {through: Activity_Item});

const Word = sequelize.define('words', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

const Patient_Word = sequelize.define('patient_word', {});

Patient.belongsToMany(Word, {through: Patient_Word});
Word.belongsToMany(Patient, {through: Patient_Word});

const Goal_Word = sequelize.define('goal_word', {});

Word.belongsToMany(Goal, {through: Goal_Word});
Goal.belongsToMany(Word, {through: Goal_Word});

const Color = sequelize.define('color', {
  hexaCode: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

// -----------------------------------------------
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
        validate: true,
        individualHooks: true
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
      },
      {
        fullName: "שמה של הפציינטית",
        birthdate: new Date(Date.UTC(2012, 2, 13))
      }], {
        validate: true,
        individualHooks: true
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
      let user = await User.findOne({where: {id: 1}});
      let patient = await Patient.findOne({where: {id: 1}});
      await user.addPatient(patient);
      console.log("linked user 1 to patient 1");
      patient = await Patient.findOne({where: {id: 2}});
      await user.addPatient(patient);
      console.log("linked user 1 to patient 2");
      user = await User.findOne({where: {id: 2}});
      patient = await Patient.findOne({where: {id: 3}});
      await user.addPatient(patient);
      console.log("linked user 2 to patient 3");
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
        description: 'description',
        patientId: 2,
        skillType: 'expressive_comm',
        minTherapists: 1,
        minConsecutiveDays: 3
      }, {
        serialNum: 2,
        description: 'discreepshen',
        patientId: 2,
        skillType: 'expressive_comm',
        minTherapists: 10,
        minConsecutiveDays: 9,
        archived: true
      }, {
        serialNum: 1,
        description: 'דיסקריפשן',
        patientId: 1,
        skillType: 'receptive_comm',
        minTherapists: 0,
        minConsecutiveDays: 12
      }], {
        validate: true,
        individualHooks: true
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
        description: 'description',
        goalId: 2,
        attempts: 2,
        successes: 2
      }, {
        serialNum: 2,
        description: 'discreepshen',
        goalId: 2,
        attempts: 2,
        successes: 1
      }, {
        serialNum: 1,
        description: 'דיסקריפשן',
        goalId: 1,
        attempts: 1,
        successes: 1
      }], {
        validate: true,
        individualHooks: true
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
        validate: true,
        individualHooks: true
      }).then().catch(err => console.error(err));
    } catch (err) {
      console.error(err.message);
    }
  }
  const activityCount = (await Activity.findAll()).length;
  console.log(`activityCount: ${activityCount}`);
  if (activityCount === 0) {
    try {
      await Activity.create({
        title: 'paint',
        description: 'peint',
        patientId: 1
      }).then().catch(err => console.error(err));
      await Activity.create({
        title: 'dance',
        description: 'dens',
        patientId: 1
      }).then().catch(err => console.error(err));
      await Activity.create({
        title: 'לרדד בצק',
        description: 'leraded',
        patientId: 2
      }).then().catch(err => console.error(err));
    } catch (err) {
      console.error(err.message);
    }
  }
  const activityEnvironmentCount = (await Activity_Environment.findAll()).length;
  console.log(`activityEnvironmentCount: ${activityEnvironmentCount}`);
  if (activityEnvironmentCount === 0) {
    try {
      let activity = await Activity.findOne({where: {id: 3}});
      let environment = await Environment.findOne({where: {id: 1}});
      await activity.addEnvironment(environment, {through: {default: true}, validate: true}).then().catch(err => console.error(err));
      environment = await Environment.findOne({where: {id: 2}});
      await activity.addEnvironment(environment, {validate: true}).then().catch(err => console.error(err));
      console.log("linked activity 3 to environment 1");
      console.log("linked activity 3 to environment 2");
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
        validate: true,
        individualHooks: true
      })
    } catch (err) {
      console.error(err.message);
    }
  }
  const sessionGoalCount = (await Session_Goal.findAll()).length;
  console.log(`sessionGoalCount: ${sessionGoalCount}`);
  if (sessionGoalCount === 0) {
    try {
      let session = await Session.findOne({where: {id: 1}});
      let goal = await Goal.findOne({where: {id: 1}});
      await session.addGoal(goal, {through: {priority: 2}}).then().catch(err => console.error(err));
      goal = await Goal.findOne({where: {id: 2}});
      await session.addGoal(goal, {through: {priority: 1}}).then().catch(err => console.error(err));
      console.log("linked session 1 to goal 1");
      console.log("linked session 1 to goal 2");
    } catch (err) {
      console.error(err.message);
    }
  }
  const itemCount = (await Item.findAll()).length;
  console.log(`itemCount: ${itemCount}`);
  if (itemCount === 0) {
    try {
      await Item.bulkCreate([
        {
          title: "toy pony",
          patientId: 2
        },
        {
          title: "פוני צעצוע",
          patientId: 2
        },
        {
          title: "rainbow puzzle",
          patientId: 1
        }
      ], {
        validate: true,
        individualHooks: true
      })
    } catch (err) {
      console.error(err.message);
    }
  }
  const activityItemCount = (await Activity_Item.findAll()).length;
  console.log(`activityItemCount: ${activityItemCount}`);
  if (activityItemCount === 0) {
    try {
      let activity = await Activity.findOne({where: {id: 3}});
      let item = await Item.findOne({where: {id: 1}});
      await activity.addItem(item).then().catch(err => console.error(err));
      item = await Item.findOne({where: {id: 2}});
      await activity.addItem(item).then().catch(err => console.error(err));
      console.log("linked activity 3 to item 1");
      console.log("linked activity 3 to item 2");
    } catch (err) {
      console.error(err.message);
    }
  }
  const wordCount = (await Word.findAll()).length;
  console.log(`wordCount: ${wordCount}`);
  if (wordCount === 0) {
    try {
      await Word.bulkCreate([
        {
          title: "cooking"
        },
        {
          title: "לבשל"
        },
        {
          title: "לקפל",
          patientId: 1
        }
      ], {
        validate: true,
        individualHooks: true
      })
    } catch (err) {
      console.error(err.message);
    }
  }
  const patientWordCount = (await Patient_Word.findAll()).length;
  console.log(`patientWordCount: ${patientWordCount}`);
  if (patientWordCount === 0) {
    try {
      let patient = await Patient.findOne({where: {id: 1}});
      let word = await Word.findOne({where: {id: 1}});
      await patient.addWord(word).then().catch(err => console.error(err));
      word = await Word.findOne({where: {id: 2}});
      await patient.addWord(word).then().catch(err => console.error(err));
      console.log("linked patient 1 to word 1");
      console.log("linked patient 1 to word 2");
    } catch (err) {
      console.error(err.message);
    }
  }
  const goalWordCount = (await Goal_Word.findAll()).length;
  console.log(`goalWordCount: ${goalWordCount}`);
  if (goalWordCount === 0) {
    try {
      let goal = await Goal.findOne({where: {id: 3}});
      let word = await Word.findOne({where: {id: 1}});
      await goal.addWord(word).then().catch(err => console.error(err));
      word = await Word.findOne({where: {id: 2}});
      await goal.addWord(word).then().catch(err => console.error(err));
      console.log("linked goal 3 to word 1");
      console.log("linked goal 3 to word 2");
    } catch (err) {
      console.error(err.message);
    }
  }
  const colorCount = (await Color.findAll()).length;
  console.log(`colorCount: ${colorCount}`);
  if (colorCount === 0) {
    try {
      Color.bulkCreate(JSON.parse(colorObjs), {
        validate: true,
        individualHooks: true
      }).then().catch(err => console.error(err));
      console.log("added all 150 colors to table");
    } catch (err) {
      console.error(err)
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
  Session_Goal,
  Item,
  Activity_Item,
  Word,
  Patient_Word,
  Goal_Word,
  Assistance,
  SubGoal_Assistance,
  Attempt,
  Color
};