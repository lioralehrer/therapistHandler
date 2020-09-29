const Sequelize = require('sequelize');
const sequelize = require('./dbConnector');
const fs = require('fs');
const colorObjs = fs.readFileSync('/media/hillash/Media/dev/DATA_SPECTRACKER/colors/Color_objs.json');
const skillTypeObjs = fs.readFileSync('/media/hillash/Media/dev/DATA_SPECTRACKER/skillTypes/skillTypeObjs.json');


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
    allowNull: false,
    validate: {
      isBefore: new Date(Date.now()).toISOString().split('T')[0]
    }
  }
});

// getGoals: fetches the Goals by Patient ID

const User_Patient = sequelize.define('user_patient', {});

User.belongsToMany(Patient, {through: User_Patient});
Patient.belongsToMany(User, {through: User_Patient});

const SkillType = sequelize.define('skillType', {
  title: {
    type:Sequelize.STRING,
    allowNull: false
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
  indexes: [{
    unique: true,
    fields: ['title', 'level']
  }]
});

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
  skillTypeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    model: 'skillTypes',
    key: 'id'
  },
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
});

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
      const nextColorCode = (await Color.findOne({where: {
        id: lastColorId+1
      }})).hexaCode;
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
},
{
  tableName: 'assistances',
  name: {
    singular: 'assistance',
    plural: 'assistances'
  }
});

const Activity_Assistance = sequelize.define('activity_assistance', {
  priority: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  }
});

Assistance.belongsToMany(Activity, {through: Activity_Assistance});
Activity.belongsToMany(Assistance, {through: Activity_Assistance});

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
  duration: {
    type: Sequelize.INTEGER, // in minutes; i.e. 2 hours are 120
    defaultValue: 120,
    allowNull: false
  },
  sessionPlanMessage: Sequelize.TEXT,
  sessionSummaryMessage: Sequelize.TEXT
});

Patient.hasMany(Session);
User.hasMany(Session, {foreignKey: 'therapistId'});

const Session_Activity = sequelize.define('session_activity', {
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
  recommended: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  indexes: [{
    unique: true,
    fields: ['sessionId', 'activityId']
  }]
});

Session.belongsToMany(Activity, {through: Session_Activity});
Activity.belongsToMany(Session, {through: Session_Activity});

const Attempt = sequelize.define('attempt', {
  sessionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    model: 'sessions',
    key: 'id'
  },
  subgoalId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    model: 'subGoals',
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
  successful: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

const Attempt_Assistance = sequelize.define('attempt_assistance', {});

Attempt.belongsToMany(Assistance, {through: Attempt_Assistance});
Assistance.belongsToMany(Attempt, {through: Attempt_Assistance});

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
});

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
});

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
});

const Patient_Word = sequelize.define('patient_word', {});

Patient.belongsToMany(Word, {through: Patient_Word});
Word.belongsToMany(Patient, {through: Patient_Word});

const Goal_Word = sequelize.define('goal_word', {});

Word.belongsToMany(Goal, {through: Goal_Word});
Goal.belongsToMany(Word, {through: Goal_Word});

const Skill = sequelize.define('skill', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  patientId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    model: 'patients',
    key: 'id'
  },
  skillTypeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    model: 'skillTypes',
    key: 'id'
  }
}, {
  indexes: [{
    unique: true,
    fields: ['title', 'patientId']
  }]
});

const Goal_Skill = sequelize.define('goal_skill', {});

Skill.belongsToMany(Goal, {through: Goal_Skill});
Goal.belongsToMany(Skill, {through: Goal_Skill});

const Patient_Skill = sequelize.define('patient_skill', {
  acquired: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

Skill.belongsToMany(Patient, {through: Patient_Skill});
Patient.belongsToMany(Skill, {through: Patient_Skill});

SkillType.hasMany(Skill);

const Color = sequelize.define('color', {
  hexaCode: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});



// -----------------------------------------------

const bulkCreateTableRows = async (Model, objs_arr) => {
  const rowCount = (await Model.findAll()).length;
  console.log(`${Model.name} rowCount: ${rowCount}`);
  if (rowCount === 0) {
    try {
      await Model.bulkCreate(
        objs_arr, {
        validate: true,
        individualHooks: true
      }).then().catch(err => console.error(err));
      console.log(`added ${objs_arr.length} ${Model.name} rows to db`);
    } catch (err) {
      console.error(err.message);
    }
  }
};

const users = [
  {
    fullName: "full name",
    email: "e@ma.il",
    role: "case_manager"
  }, {
    fullName: "פול ניים",
    email: "h@p.kl",
    role: "therapist"
  }
];

const patients = [
  {
    fullName: "patient name",
    birthdate: new Date(Date.UTC(2009, 5, 3))
  }, {
    fullName: "פיישנט ניים",
    birthdate: new Date(Date.UTC(1990, 2, 21))
  }, {
    fullName: "שמה של הפציינטית",
    birthdate: new Date(Date.UTC(2012, 2, 13))
  }
];

const goals = [
  {
    serialNum: 3,
    description: 'description',
    patientId: 2,
    skillTypeId: 1,
    minTherapists: 1,
    minConsecutiveDays: 3
  }, {
    serialNum: 2,
    description: 'discreepshen',
    patientId: 2,
    skillTypeId: 1,
    minTherapists: 10,
    minConsecutiveDays: 9,
    archived: true
  }, {
    serialNum: 1,
    description: 'דיסקריפשן',
    patientId: 1,
    skillTypeId: 3,
    minTherapists: 0,
    minConsecutiveDays: 12
  }
];

const subGoals = [
  {
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
  }
];

const environments = [
  {
    title: 'toilet'
  }, {
    title: 'living room'
  }, {
    title: 'מטבח'
  }
];

const activities = [
  {
    title: 'paint',
    description: 'peint',
    patientId: 1
  }, {
    title: 'dance',
    description: 'dens',
    patientId: 1
  }, {
    title: 'לרדד בצק',
    description: 'leraded',
    patientId: 2
  }
];

const assistances = [
  {
    title: "יד על יד"
  }, {
    title: "הצבעה"
  }, {
    title: "רמז מילולי"
  }
]

const sessions = [
  {
    patientId: 2,
    therapistId: 1,
    scheduledAt: new Date(Date.now()),
    sessionPlanMessage: "lorem ipsum",
    sessionSummaryMessage: "ipsum lorem"
  }, {
    patientId: 2,
    therapistId: 1,
    scheduledAt: new Date(Date.now()),
    duration: 180,
    sessionPlanMessage: "לורם איפסום",
    sessionSummaryMessage: "איפסום לורם"
  }
];

const attempts = [
  {
    sessionId: 1,
    subgoalId: 2,
    activityId: 1,
    environmentId: 3,
    successful: true
  }, {
    sessionId: 2,
    subgoalId: 2,
    activityId: 2,
    environmentId: 1,
    assistanceId: 2,
    successful: false
  }, {
    sessionId: 2,
    subgoalId: 2,
    activityId: 2,
    environmentId: 1,
    successful: true
  }
];

const items = [
  {
    title: "toy pony",
    patientId: 2
  }, {
    title: "פוני צעצוע",
    patientId: 2
  }, {
    title: "rainbow puzzle",
    patientId: 1
  }
];

const words = [
  {
    title: "cooking"
  }, {
    title: "לבשל"
  }, {
    title: "לקפל"
  }
];

const skills = [
  {
    title: "לנגן בפסנתר",
    patientId: 2,
    skillTypeId: 1
  }, {
    title: "לנגן בחלילית",
    patientId: 2,
    skillTypeId: 3
  }, {
    title: "play the drums",
    patientId: 1,
    skillTypeId: 3
  }
];

const populateTables = async () => {
  bulkCreateTableRows(User, users);
  bulkCreateTableRows(Patient, patients);
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
  bulkCreateTableRows(Goal, goals);
  bulkCreateTableRows(SubGoal, subGoals);
  bulkCreateTableRows(Environment, environments);
  bulkCreateTableRows(Activity, activities);
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
  bulkCreateTableRows(Assistance, assistances);
  const activityAssistanceCount = (await Activity_Assistance.findAll()).length;
  console.log(`activityAssistanceCount: ${activityAssistanceCount}`);
  if (activityAssistanceCount === 0) {
    try {
      let activity = await Activity.findOne({where: {id: 3}});
      let assistance = await Assistance.findOne({where: {id: 1}});
      await activity.addAssistance(assistance, {through: {priority: 3}, validate: true}).then().catch(err => console.error(err));
      assistance = await Assistance.findOne({where: {id: 2}});
      await activity.addAssistance(assistance, {through: {priority: 1}}, {validate: true}).then().catch(err => console.error(err));
      console.log("linked activity 3 to assistance 1");
      console.log("linked activity 3 to assistance 2");
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
  bulkCreateTableRows(Session, sessions);
  const sessionActivityCount = (await Session_Activity.findAll()).length;
  console.log(`sessionActivityCount: ${sessionActivityCount}`)
  if (sessionActivityCount === 0) {
    try {
      let session = await Session.findOne({where: {id: 2}});
      let activity = await Activity.findOne({where: {id: 2}});
      await session.addActivity(activity, {through: {recommended: true}, validate: true}).then().catch(err => console.error(err));
      activity = await Activity.findOne({where: {id: 1}});
      await session.addActivity(activity, {validate: true}).then().catch(err => console.error(err));
      session = await Session.findOne({where: {id: 1}});
      activity = await Activity.findOne({where: {id: 3}});
      await session.addActivity(activity, {validate: true}).then().catch(err => console.error(err));
    } catch (err) {
      console.error(err.message);
    }
  }
  bulkCreateTableRows(Attempt, attempts);
  const attemptAssistanceCount = (await Attempt_Assistance.findAll()).length;
  console.log(`attemptAssistanceCount: ${attemptAssistanceCount}`);
  if (attemptAssistanceCount === 0) {
    try {
      let attempt = await Attempt.findOne({where: {id: 1}});
      let assistance = await Assistance.findOne({where: {id: 1}});
      await attempt.addAssistance(assistance).then().catch(err => console.error(err));
      assistance = await Assistance.findOne({where: {id: 2}});
      await attempt.addAssistance(assistance).then().catch(err => console.error(err));
      console.log("linked attempt 1 to assistance 1");
      console.log("linked attempt 1 to assistance 2");
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
  bulkCreateTableRows(Item, items);
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
  bulkCreateTableRows(Word, words);
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
  bulkCreateTableRows(Skill, skills);
  const goalSkillCount = (await Goal_Skill.findAll()).length;
  console.log(`goalSkillCount: ${goalSkillCount}`);
  if (goalSkillCount === 0) {
    try {
      let goal = await Goal.findOne({where: {id: 3}});
      let skill = await Skill.findOne({where: {id: 1}});
      await goal.addSkill(skill).then().catch(err => console.error(err));
      skill = await Skill.findOne({where: {id: 2}});
      await goal.addSkill(skill).then().catch(err => console.error(err));
      console.log("linked goal 3 to skill 1");
      console.log("linked goal 3 to skill 2");
    } catch (err) {
      console.error(err.message);
    }
  }
  const patientSkillCount = (await Patient_Skill.findAll()).length;
  console.log(`patientSkillCount: ${patientSkillCount}`);
  if (patientSkillCount === 0) {
    try {
      let patient = await Patient.findOne({where: {id: 3}});
      let skill = await Skill.findOne({where: {id: 1}});
      await patient.addSkill(skill, {through: {acquired: true}}).then().catch(err => console.error(err));
      skill = await Skill.findOne({where: {id: 2}});
      await patient.addSkill(skill).then().catch(err => console.error(err));
      console.log("linked patient 3 to skill 1");
      console.log("linked patient 3 to skill 2");
    } catch (err) {
      console.error(err.message);
    }
  }
  const skillTypeCount = (await SkillType.findAll()).length;
  console.log(`skillTypeCount: ${skillTypeCount}`);
  if (skillTypeCount === 0) {
    allSkillTypes = JSON.parse(skillTypeObjs);
    try {
      skillTypes = [];
      for (let level in allSkillTypes) {
        allSkillTypes[level].forEach(title => skillTypes.push({title, level: parseInt(level)}));
      }
      SkillType.bulkCreate(skillTypes, {
        validate: true,
        individualHooks: true
      }).then().catch(err => console.error(err));
      console.log("added all skill types to table");
    } catch (err) {
      console.error(err)
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
  SkillType,
  Goal,
  Assistance,
  Activity_Assistance,
  Goal_Activity,
  Session,
  Session_Activity,
  Attempt,
  Attempt_Assistance,
  Session_Goal,
  Item,
  Activity_Item,
  Word,
  Patient_Word,
  Goal_Word,
  Skill,
  Goal_Skill,
  Patient_Skill,
  Color
};