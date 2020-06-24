import React, {useState}  from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Button, FlatList } from 'react-native';
import { initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import {uuid} from 'uuidv4';
import Goal from '../components/Goal';
import ActivityButtonGroup from '../components/ActivityButtonGroup';
import {Picker} from '@react-native-community/picker';


const ActivitySelection = ({ navigation }) => {

//   const getSessionGoals = () => {
//     const sessionGoals = [ 
//         { id: 1,
//           serialNum: 1,
//           title:  "1.תני לי x",
//           description: "במהלך משחק משותף בחפצים או בפעילות אכילה \ הלבשה, כשירדן תקבל הוראה מילולית של 'תני לי X' עבור 8-10 אובייקטים ספציפיים, ירדן תיתן את האובייקט בליווי מבט. ירדן תיתן את האובייקטים בפעילויות עם שני מבוגרים שונים, לאורך 3 ימים עוקבים",
//           skillType: "שפה רצפטיבית",
//           subgoals: [
//             {   id: 1.1,
//                 serialNum: 1.1,
//                 title: "1.1",
//                 description: "ירדן נותנת 3-4 אובייקטים ללא מבט, עם סיוע של הושטת יד",
//                 doneAt: "",
//               },
//             {   id: 1.2,
//                 serialNum: 1.2,
//                 title: "1.2",
//                 description: "ירדן נותנת 3-4 אובייקטים בליווי מבט, עם סיוע של הושטת יד + כניסה לטווח הראייה של המטפל",
//                 doneAt: "",
//               }
//           ],
//           activities: [
//             {   id: 1,
//                 title: "soap bubbles",
//                 description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
//             },
//             {   id: 2,
//                 title: "old toy",
//                 description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
//             },
//           ]
//         },
//         { id: 2,
//           serialNum: 2,
//           title:  "2. חפשי ותני לי את X",
//           description: "במהלך משחק משותף בחפצים או בפעילות אכילה \ הלבשה, כשירדן תקבל הוראה מילולית של 'תני לי X' עבור 8-10 אובייקטים ספציפיים, ירדן תיתן את האובייקט בליווי מבט. ירדן תיתן את האובייקטים בפעילויות עם שני מבוגרים שונים, לאורך 3 ימים עוקבים",
//           skillType: "שפה רצפטיבית",
//           subgoals: [
//               {   id: 2.1,
//                   serialNum: 2.1,
//                   title: "2.1",
//                   description: "ירדן נותנת 3-4 אובייקטים ללא מבט, עם סיוע של הושטת יד",
//                   doneAt: "",
//               },
//             //   {   id: 2.4,
//             //       serialNum: 2.4,
//             //       title: "2.4",
//             //       description: "ירדן נותנת 3-4 אובייקטים בליווי מבט, עם סיוע של הושטת יד + כניסה לטווח הראייה של המטפל",
//             //       doneAt: "",
//             //   }
//           ],
//           activities: [
//             {   id: 1,
//               title: "soap bubbles",
//                 description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
//             },
//             {   id: 2,
//                 title: "new toy",
//                 description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
//             },
//           ]
//         },
//         { id: 3,
//           serialNum: 3,
//           title:  "3. שיתוף בפעילות",
//           description: "במהלך משחק משותף בחפצים או בפעילות אכילה \ הלבשה, כשירדן תקבל הוראה מילולית של 'תני לי X' עבור 8-10 אובייקטים ספציפיים, ירדן תיתן את האובייקט בליווי מבט. ירדן תיתן את האובייקטים בפעילויות עם שני מבוגרים שונים, לאורך 3 ימים עוקבים",
//           skillType: "שפה רצפטיבית",
//           subgoals: [
//               {   id: 3.1,
//                   serialNum: 3.1,
//                   title: "2.1",
//                   description: "ירדן נותנת 3-4 אובייקטים ללא מבט, עם סיוע של הושטת יד",
//                   doneAt: "",
//               },
//             //   {   id: 3.2,
//             //       serialNum: 3.2,
//             //       title: "2.2",
//             //       description: "ירדן נותנת 3-4 אובייקטים בליווי מבט, עם סיוע של הושטת יד + כניסה לטווח הראייה של המטפל",
//             //       doneAt: "",
//             //   }
//           ],
//           activities: [
//             {   id: 1,
//                 title: "soap bubbles",
//                 description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
//             },
//             {   id: 2,
//                 title: "new toy",
//                 description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
//             },
//           ],
//         },
//     ];
//     return (sessionGoals);
// };
    const getSessionGoals = () => {
        const sessionGoals = [ 
            { id: 1,
              serialNum: 1,
              title:  "1.תני לי x",
              description: "במהלך משחק משותף בחפצים או בפעילות אכילה \ הלבשה, כשירדן תקבל הוראה מילולית של 'תני לי X' עבור 8-10 אובייקטים ספציפיים, ירדן תיתן את האובייקט בליווי מבט. ירדן תיתן את האובייקטים בפעילויות עם שני מבוגרים שונים, לאורך 3 ימים עוקבים",
              skillType: "שפה רצפטיבית",
              subgoals: [
                {   id: 1.1,
                    serialNum: 1.1,
                    title: "1.1",
                    description: "ירדן נותנת 3-4 אובייקטים ללא מבט, עם סיוע של הושטת יד",
                    doneAt: "",
                  },
                {   id: 1.2,
                    serialNum: 1.2,
                    title: "1.2",
                    description: "ירדן נותנת 3-4 אובייקטים בליווי מבט, עם סיוע של הושטת יד + כניסה לטווח הראייה של המטפל",
                    doneAt: "",
                  }
              ],
              activities: [
                {   id: 1,
                    title: "בועות סבון",
                    description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן",
                    color: '#3333',
                },
                {   id: 2,
                    title: "צעצוע ישן",
                    description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
                },
                { id: 9,
                  title: "בנייה בקוביות",
                  description: " חומה ומגדל חומה ומגדל חומה ומגדל לה. מריה מגדלנה יור דה קריצ'ר אוף דה נייט"
                },
              ]
            },
            { id: 2,
              serialNum: 2,
              title:  "2. חפשי ותני לי את X",
              description: "במהלך משחק משותף בחפצים או בפעילות אכילה \ הלבשה, כשירדן תקבל הוראה מילולית של 'תני לי X' עבור 8-10 אובייקטים ספציפיים, ירדן תיתן את האובייקט בליווי מבט. ירדן תיתן את האובייקטים בפעילויות עם שני מבוגרים שונים, לאורך 3 ימים עוקבים",
              skillType: "שפה רצפטיבית",
              subgoals: [
                  {   id: 2.1,
                      serialNum: 2.1,
                      title: "2.1",
                      description: "ירדן נותנת 3-4 אובייקטים ללא מבט, עם סיוע של הושטת יד",
                      doneAt: "",
                  },
              ],
              activities: [
                {   id: 1,
                    title: "בועות סבון",
                    description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן",
                    color: '#F5DBEC',
                },
                {   id: 4,
                    title: "צעצוע חדש",
                    description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
                },
                { id: 6,
                  title: "ציור",
                  description: "  כנסי כבר לבאטמוביל וניסע...קורונה ג'ננה שלום שלום ",
                },
                {   id: 8,
                    title: "השחלת חרוזים",
                    description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן",
                    color: '#F5DBEC',
                },
                {   id: 12,
                    title: "הכנת עוגיות",
                    description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
                },
                { id: 10,
                  title: "ריקוד",
                  description: "  כנסי כבר לבאטמוביל וניסע...קורונה ג'ננה שלום שלום ",
                },
                {   id: 13,
                    title: "קריאת סיפור",
                    description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן",
                    color: '#F5DBEC',
                },
              ]
            },
            { id: 3,
              serialNum: 3,
              title:  "3. שיתוף בפעילות",
              description: "במהלך משחק משותף בחפצים או בפעילות אכילה \ הלבשה, כשירדן תקבל הוראה מילולית של 'תני לי X' עבור 8-10 אובייקטים ספציפיים, ירדן תיתן את האובייקט בליווי מבט. ירדן תיתן את האובייקטים בפעילויות עם שני מבוגרים שונים, לאורך 3 ימים עוקבים",
              skillType: "שפה רצפטיבית",
              subgoals: [
                  {   id: 3.1,
                      serialNum: 3.1,
                      title: "2.1",
                      description: "ירדן נותנת 3-4 אובייקטים ללא מבט, עם סיוע של הושטת יד",
                      doneAt: "",
                  },
                //   {   id: 3.2,
                //       serialNum: 3.2,
                //       title: "2.2",
                //       description: "ירדן נותנת 3-4 אובייקטים בליווי מבט, עם סיוע של הושטת יד + כניסה לטווח הראייה של המטפל",
                //       doneAt: "",
                //   }
              ],
              activities: [
                {   id: 1,
                    title: "בועות סבון",
                    // title: "אמא",
                    description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
                },
                { id: 3,
                  title: "הרכבת פאזל",
                  // title: "אמא",
                  description: "מציאת החלק המתאים של פאזל מגנטי",
                },
                {   id: 5,
                    title: "משחק בבובות",
                    description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
                },
                {   id: 4,
                  title: "צעצוע חדש",
                  description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
                },
                { id: 9,
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
          { id: 1,
            // title: "הפרחת בועות סבון",
            title: "בועות סבון",
            // title: "אבא",
            description: "פוף!' ירדן תפוצץ בועה עם האצבע'"
          },
          { id: 3,
            title: "הרכבת פאזל",
            // title: "אמא",
            description: "מציאת החלק המתאים של פאזל מגנטי",
          },
          { id: 4,
            // title: "הצגת צעצוע חדש",
            title: "צעצוע חדש",
            description: "משחק עם צעצוע חדש  פקפקפקפקפקפקפפקפקהההה"
          },
          { id: 5,
            title: "משחק בבובות",
            description: "עייפה בובה זהבה ועייף מאוד הדובבבבב",
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
          { id: 9,
            title: "בנייה בקוביות",
            description: " חומה ומגדל חומה ומגדל חומה ומגדל לה. מריה מגדלנה יור דה קריצ'ר אוף דה נייט"
          },
          { id: 6,
            title: "ציור",
            description: "  כנסי כבר לבאטמוביל וניסע...קורונה ג'ננה שלום שלום ",
          },
        ];
        return restOfSessionActivities;
    };

    var sessionGoals = getSessionGoals();
    console.log(sessionGoals);
    var recommendedActivities = getRecommendedActivities();
    // const [goals, setGoals] = useState(sessionGoals);
    const [goals, setGoals] = useState(getSessionGoals());

    console.log("goals length =" + goals.length);
    


    // const selectGoals = (activity) => {
    const selectGoals = (id) => {
      console.log(id);
      setGoals(sessionGoals);
      setGoals(prevGoals => { 
        return (prevGoals.filter(goal => goal.activities.map(goalActivity => goalActivity.id).includes(id)));
        // return (prevGoals.filter(goal => ((goal.activities.map(gAct => gAct.title).includes(reversedActivity)))) || (goal.activities.map(gAct => gAct.title).includes(activity)));
      });
    };

    console.log("goals length later =" + goals.length);

    return (
      <View style={styles.container}>
        {/* <View styles={styles.activityButtons}> */}
          <ActivityButtonGroup recommendedActivities={getRecommendedActivities()} restOfActivities={getRestOfSessionActivities()} selectGoals={selectGoals} />
        {/* </View> */}
        <View style={styles.goalsList}>
          <FlatList 
          // data={getSessionGoals()}
          data={goals}
          renderItem={({item}) => <Goal goal={item} />}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 8,
    },
    activityButtons: {
      // flex: 1,
      // width: 350,
      borderColor: 'green',
      borderWidth: 3,
      alignItems: "flex-end",
      justifyContent: "flex-end",
      backgroundColor: 'blue',
    },
    goalsList: {
        flex: 8,
        backgroundColor: 'wheat',
        paddingTop: 2,
    },

    

})

export default ActivitySelection;