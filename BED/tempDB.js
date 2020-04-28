const DB = {
  users: [
    {
      id: 1,
      full_name: "מגי סימפסון",
      email: "mag.sim@gmail.com",
      password: "123456",
      role: "care manager"
    },
    {
      id: 2,
      full_name: "ליסה סימפסון",
      email: "lis.sim@gmail.com",
      password: "123456",
      role: "care manager"
    },
    {
      id: 3,
      full_name: "בארט סימפסון",
      email: "bar.sim@gamil.com",
      password: "123456",
      role: "therapist"
    },
    {
      id: 4,
      full_name: "מארג' סימפסון",
      email: "mar.sim@gmail.com",
      password: "123456",
      role: "therapist"
    }
  ],
  patients: [
    {
      id: 1,
      full_name: "קנט ברוקמן",
      care_manager_id: 2
    },
    {
      id: 2,
      full_name: "נד פלנדרס",
      care_manager_id: 2
    },
    {
      id: 3,
      full_name: "טוד פלנדרס",
      care_manager_id: 1
    }
  ],
  sessions: [
    {
      id: 1,
      patient_id: 2,
      therapist_id: 3,
      started_at: 20200427132432
    },
    {
      id: 2,
      patient_id: 2,
      therapist_id: 4,
      started_at: 20200428091208
    }
  ],
  goals: [
    {
      id: 1,
      description: "לרקוד את ריקוד הציפורים",
      child_id: 1
    },
    {
      id: 2,
      description: "לאכול סלט בטטה",
      child_id: 1,
    },
    {
      id: 3,
      description: "לצייר טווס",
      child_id: 2
    }
  ],
  missions: [
    {
      id: 1,
      description: "לעשות תנועה של פאקמן עם הידיים",
      goal_id: 1,
      tries: 3,
      successes: 2
    },
    {
      id: 2,
      description: "לנענע את הכנפיים",
      goal_id: 1,
      tries: 5,
      successes: 2
    },
    {
      id: 3,
      description: "לנענע את הישבן",
      goal_id: 1,
      tries: 3,
      successes: 3
    },
    {
      id: 4,
      description: "למחוא כפיים",
      goal_id: 1,
      tries: 1,
      successes: 0
    },
    {
      id: 5,
      description: "לקחת דף",
      goal_id: 3,
      tries: 4,
      successes: 4
    },
    {
      id: 6,
      description: "לקחת טושים",
      goal_id: 3,
      tries: 2,
      successes: 0
    },
    {
      id: 7,
      description: "לצייר את קווי המתאר",
      goal_id: 3,
      tries: 8,
      successes: 4
    }
  ]
}

module.exports = DB;