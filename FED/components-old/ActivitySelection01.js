import React, {useState}  from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import { initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {uuid} from 'uuidv4';


const getSessionGoals = () => {
    sessionGoals = [ 
        { id: uuid(),
          serialNum: 1,
          title:  "1.תני לי x",
          description: "בהמלך משחק משותף בחפצים או בפעילות אכילה \ הלבשה, כשירדן תקבל הוראה מילולית של 'תני לי X' עבור 8-10 אובייקטים ספציפיים, ירדן תיתן את האובייקט בליווי מבט. ירדן תיתן את האובייקטים בפעילויות עם שני מבוגרים שונים, לאורך 3 ימים עוקבים",
          skillType: "שפה רצפטיבית",
          subgoals: [
            {   id: uuid(),
                serialNum: 1.1,
                title: "1.1",
                description: "ירדן נותנת 3-4 אובייקטים ללא מבט, עם סיוע של הושטת יד",
                doneAt: "",
              },
            {   id: uuid(),
                serialNum: 1.2,
                title: "1.2",
                description: "ירדן נותנת 3-4 אובייקטים בליווי מבט, עם סיוע של הושטת יד + כניסה לטווח הראייה של המטפל",
                doneAt: "",
              }
          ],
          activities: [
            {   id: uuid(),
                title: "בועות סבון",
                description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
            },
            {   id: uuid(),
                title: "צעצוע חדש",
                description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
            },
          ]
        },
        { id: uuid(),
          serialNum: 2,
          title:  "2. חפשי ותני לי את X",
          description: "בהמלך משחק משותף בחפצים או בפעילות אכילה \ הלבשה, כשירדן תקבל הוראה מילולית של 'תני לי X' עבור 8-10 אובייקטים ספציפיים, ירדן תיתן את האובייקט בליווי מבט. ירדן תיתן את האובייקטים בפעילויות עם שני מבוגרים שונים, לאורך 3 ימים עוקבים",
          skillType: "שפה רצפטיבית",
          subgoals: [
              {   id: uuid(),
                  serialNum: 2.3,
                  title: "2.3",
                  description: "ירדן נותנת 3-4 אובייקטים ללא מבט, עם סיוע של הושטת יד",
                  doneAt: "",
              },
              {   id: uuid(),
                  serialNum: 2.4,
                  title: "2.4",
                  description: "ירדן נותנת 3-4 אובייקטים בליווי מבט, עם סיוע של הושטת יד + כניסה לטווח הראייה של המטפל",
                  doneAt: "",
              }
          ],
        },
        { id: uuid(),
          serialNum: 3,
          title:  "3. שיתוף בפעילות",
          description: "בהמלך משחק משותף בחפצים או בפעילות אכילה \ הלבשה, כשירדן תקבל הוראה מילולית של 'תני לי X' עבור 8-10 אובייקטים ספציפיים, ירדן תיתן את האובייקט בליווי מבט. ירדן תיתן את האובייקטים בפעילויות עם שני מבוגרים שונים, לאורך 3 ימים עוקבים",
          skillType: "שפה רצפטיבית",
          subgoals: [
              {   id: uuid(),
                  serialNum: 3.1,
                  title: "2.1",
                  description: "ירדן נותנת 3-4 אובייקטים ללא מבט, עם סיוע של הושטת יד",
                  doneAt: "",
              },
              {   id: uuid(),
                  serialNum: 3.2,
                  title: "2.2",
                  description: "ירדן נותנת 3-4 אובייקטים בליווי מבט, עם סיוע של הושטת יד + כניסה לטווח הראייה של המטפל",
                  doneAt: "",
              }
          ],
        },
    ];
    return sessionGoals;
};

class ActivitySelection01 extends React.Component {
    constructor () {
        super()
        this.state = {
          selectedIndex: 2,
          goals: getSessionGoals(),
        }
        this.updateIndex = this.updateIndex.bind(this)
    }
    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

}