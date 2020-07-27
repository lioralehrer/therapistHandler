import React, { useState } from 'react';
// import React, {useState, useContext}  from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Button, FlatList } from 'react-native';
import Goal from './goal/Goal';
import ActivityButtonGroup from '../components/ActivityButtonGroup';
import DropdownListButton from '../components/DropdownListButton';

// import { SessionContext } from '../context/SessionState';

const ActivitySelection = ({ navigation }) => {

  const getSessionGoals = () => {
    const sessionGoals = [
      {
        id: 1,
        serialNum: 1,
        title: "1.תני לי x",
        description: "במהלך משחק משותף בחפצים או בפעילות אכילה \ הלבשה, כשירדן תקבל הוראה מילולית של 'תני לי X' עבור 8-10 אובייקטים ספציפיים, ירדן תיתן את האובייקט בליווי מבט. ירדן תיתן את האובייקטים בפעילויות עם שני מבוגרים שונים, לאורך 3 ימים עוקבים",
        skillType: "שפה רצפטיבית",
        subgoals: [
          {
            id: 1.1,
            serialNum: 1.1,
            title: "1.1",
            description: "ירדן נותנת 3-4 אובייקטים ללא מבט, עם סיוע של הושטת יד",
            doneAt: "",
          },
          {
            id: 1.2,
            serialNum: 1.2,
            title: "1.2",
            description: "ירדן נותנת 3-4 אובייקטים בליווי מבט, עם סיוע של הושטת יד + כניסה לטווח הראייה של המטפל",
            doneAt: "",
          }
        ],
        activities: [
          {
            id: 1,
            title: "בועות סבון",
            description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן",
            color: '#3333',
          },
          {
            id: 2,
            title: "צעצוע ישן",
            description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
          },
          {
            id: 9,
            title: "בנייה בקוביות",
            description: " חומה ומגדל חומה ומגדל חומה ומגדל לה. מריה מגדלנה יור דה קריצ'ר אוף דה נייט"
          },
        ]
      },
      {
        id: 2,
        serialNum: 2,
        title: "2. חפשי ותני לי את X",
        description: "במהלך משחק משותף בחפצים או בפעילות אכילה \ הלבשה, כשירדן תקבל הוראה מילולית של 'תני לי X' עבור 8-10 אובייקטים ספציפיים, ירדן תיתן את האובייקט בליווי מבט. ירדן תיתן את האובייקטים בפעילויות עם שני מבוגרים שונים, לאורך 3 ימים עוקבים",
        skillType: "שפה רצפטיבית",
        subgoals: [
          {
            id: 2.1,
            serialNum: 2.1,
            title: "2.1",
            description: "ירדן נותנת 3-4 אובייקטים ללא מבט, עם סיוע של הושטת יד",
            doneAt: "",
          },
        ],
        activities: [
          {
            id: 1,
            title: "בועות סבון",
            description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן",
            color: '#F5DBEC',
          },
          {
            id: 4,
            title: "צעצוע חדש",
            description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
          },
          {
            id: 6,
            title: "ציור",
            description: "  כנסי כבר לבאטמוביל וניסע...קורונה ג'ננה שלום שלום ",
          },
          {
            id: 8,
            title: "השחלת חרוזים",
            description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן",
            color: '#F5DBEC',
          },
          {
            id: 12,
            title: "הכנת עוגיות",
            description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
          },
          {
            id: 10,
            title: "ריקוד",
            description: "  כנסי כבר לבאטמוביל וניסע...קורונה ג'ננה שלום שלום ",
          },
          {
            id: 13,
            title: "קריאת סיפור",
            description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן",
            color: '#F5DBEC',
          },
        ]
      },
      {
        id: 3,
        serialNum: 3,
        title: "3. שיתוף בפעילות",
        description: "במהלך משחק משותף בחפצים או בפעילות אכילה \ הלבשה, כשירדן תקבל הוראה מילולית של 'תני לי X' עבור 8-10 אובייקטים ספציפיים, ירדן תיתן את האובייקט בליווי מבט. ירדן תיתן את האובייקטים בפעילויות עם שני מבוגרים שונים, לאורך 3 ימים עוקבים",
        skillType: "שפה רצפטיבית",
        subgoals: [
          {
            id: 3.1,
            serialNum: 3.1,
            title: "2.1",
            description: "ירדן נותנת 3-4 אובייקטים ללא מבט, עם סיוע של הושטת יד",
            doneAt: "",
          },
        ],
        activities: [
          {
            id: 1,
            title: "בועות סבון",
            description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
          },
          {
            id: 3,
            title: "הרכבת פאזל",
            description: "מציאת החלק המתאים של פאזל מגנטי",
          },
          {
            id: 5,
            title: "משחק בבובות",
            description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
          },
          {
            id: 4,
            title: "צעצוע חדש",
            description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
          },
          {
            id: 9,
            title: "בנייה בקוביות",
            description: " חומה ומגדל חומה ומגדל חומה ומגדל לה. מריה מגדלנה יור דה קריצ'ר אוף דה נייט"
          },
        ],
      },
    ];
    return (sessionGoals);
  };
  const getRecommendedActivities = () => {
    const recommendedActivities = [
      {
        id: 1,
        // title: "הפרחת בועות סבון",
        title: "בועות סבון",
        // title: "אבא",
        description: "פוף!' ירדן תפוצץ בועה עם האצבע'",
        environments: [
          {
            id: 1,
            title: "חדר טיפול",
            default: false,
          },
          {
            id: 2,
            title: "סלון ילדים",
            default: false,
          },
          {
            id: 4,
            title: "חדר אמבטיה",
            default: false,
          },
          {
            id: 3,
            title: "חצר",
            default: true,
          },
        ],
      },
      {
        id: 3,
        title: "הרכבת פאזל",
        description: "מציאת החלק המתאים של פאזל מגנטי",
        environments: [
          {
            id: 1,
            title: "חדר טיפול",
            default: true,
          },
          {
            id: 2,
            title: "סלון ילדים",
            default: false,
          },
          {
            id: 3,
            title: "חצר",
            default: false,
          },
          {
            id: 5,
            title: "מטבח",
            default: false,
          },
        ],
      },
      {
        id: 4,
        title: "צעצוע חדש",
        description: "משחק עם צעצוע חדש  פקפקפקפקפקפקפפקפקהההה",
        environments: [
          {
            id: 1,
            title: "חדר טיפול",
            default: false,
          },
          {
            id: 2,
            title: "סלון ילדים",
            default: true,
          },
          {
            id: 3,
            title: "חצר",
            default: false,
          },
          {
            id: 6,
            title: "חדר שינה",
            default: false,
          },
        ],
      },
      {
        id: 5,
        title: "משחק בבובות",
        description: "עייפה בובה זהבה ועייף מאוד הדובבבבב",
        environments: [
          {
            id: 1,
            title: "חדר טיפול",
            default: true,
          },
          {
            id: 2,
            title: "סלון ילדים",
            default: false,
          },
          {
            id: 3,
            title: "חצר",
            default: false,
          },
        ],
      }
    ];
    return recommendedActivities.reverse();
  };
  const getRestOfSessionActivities = () => {
    const restOfSessionActivities = [
      // { id: 11,
      //   title: "building blocks",
      //   description: " חומה ומגדל חומה ומגדל חומה ומגדל לה. מריה מגדלנה יור דה קריצ'ר אוף דה נייט"
      // },
      {
        id: 9,
        title: "בנייה בקוביות",
        description: " חומה ומגדל חומה ומגדל חומה ומגדל לה. מריה מגדלנה יור דה קריצ'ר אוף דה נייט",
        environments: [
          {
            id: 1,
            title: "חדר טיפול",
            default: true,
          },
          {
            id: 2,
            title: "סלון ילדים",
            default: false,
          },
          {
            id: 3,
            title: "חצר",
            default: false,
          },
        ],
      },
      {
        id: 6,
        title: "ציור",
        description: "  כנסי כבר לבאטמוביל וניסע...קורונה ג'ננה שלום שלום ",
        environments: [
          {
            id: 1,
            title: "חדר טיפול",
            default: false,
          },
          {
            id: 2,
            title: "סלון ילדים",
            default: true,
          },
          {
            id: 3,
            title: "חצר",
            default: false,
          },
          {
            id: 7,
            title: "פינת אוכל",
            default: false,
          },
        ],
      },
    ];
    return restOfSessionActivities;
  };

  // const { updateSession } = useContext(SessionContext);

  var sessionGoals = getSessionGoals();
  var recommendedActivities = getRecommendedActivities();
  var restOfActivities = getRestOfSessionActivities();
  const [goals, setGoals] = useState(getSessionGoals());
  const [environments, setEnvironments] = useState([]);
  const [defaultEnvironment, setDefaultEnvironment] = useState('');
  const [isSelectionVisible, setIsSelectionVisible] = useState(false);

  const showSelection = () => {
    if (isSelectionVisible) {
      return (
        <View style={styles.goalsList}>
          <DropdownListButton arrayListItems={environments} defaultValue={defaultEnvironment} onSelect={(environment) => console.log("inside onSelect (in ActivitySelection).  environment.id = " + environment.id)} />
          <View style={styles.goalsList}>
            <FlatList
              data={goals}
               renderItem={({ item }) => <Goal goal={item} />}
              // renderItem={({ item }) => <Text>blabla</Text>}
            />
          </View>
        </View>
      );
    };
  };

  const updateGoals = (activity) => {
    setIsSelectionVisible(true);
    setGoals(sessionGoals);
    setGoals(prevGoals => {
      return (prevGoals.filter(goal => goal.activities.map(goalActivity => goalActivity.id).includes(activity.id)));
    });
    updateEnvironments(activity);
  };

  const updateEnvironments = (activity) => {
    setEnvironments(activity.environments);
    var defEnv = activity.environments?.filter((environment) => environment.default == true)[0] || { title: 'no environments', id: 444 };
    setDefaultEnvironment(defEnv.title);
  };

  return (
    <View style={isSelectionVisible ? { ...styles.container, flex: 1, } : { ...styles.container, paddingBottom: 20, }}>
      <View style={styles.textWrapper}>
        <Text style={styles.instructText}>להתחלת הטיפול, בבקשה בחרי פעילות:</Text>
      </View>
      <ActivityButtonGroup recommendedActivities={recommendedActivities} restOfActivities={restOfActivities} updateGoals={updateGoals} />
      {showSelection()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.755)',
  },
  goalsList: {
    flex: 9,
    backgroundColor: 'wheat',
    paddingTop: 2,
  },
  textWrapper: {
    color: '#fff',
    paddingRight: 11,
    fontSize: 24,
    paddingTop: 30,
    paddingBottom: 10,
  },
  instructText: {
    color: '#47595e',
  },

})

export default ActivitySelection;