import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';

const chooseActivity = ({ activities, chooseAction }) => {
    const [expanded, setExpandse] = useState(true);
    const [goalActivities, setGoalActivites] = useState(activities);
    const titleA = " בחרי פעילויות"
    const titleB = "סגרי "
    const toggle = () => {
        setExpandse(!expanded);
    }

    const pickActivity = (act) => {
        chooseAction(act)
        // goalActivities[i].checked = !goalActivities[i].checked;
    }
    const openCard = ()=>{
        Alert.alert("Open Catd with TextInput")
    }

    return (
        <View>
            <View >
                <Button
                    onPress={() => toggle()}
                    color="#841584"
                    title={expanded ? titleA : titleB}
                />
            </View>
            {
                Object.keys(goalActivities).map((act, i) => {
                    return expanded ? <View></View> :
                        <View>
                            <ListItem
                                key={i}
                                title={
                                    <CheckBox
                                        iconRight
                                        checkedColor='green'
                                        right
                                        title={goalActivities[act].title}
                                        checked={true}
                                        onPress={() => pickActivity(goalActivities[act].title)}
                                    />}
                                titleStyle={{ color: '#841584', fontWeight: 'bold' }}
                                bottomDivider
                                chevron
                            />
                        </View>
                })
            }
            {
                expanded ? <View></View> :
             <Button
                title="הוסיפי פעילות"
                color="#841584"
                onPress={()=>openCard()}
            />
            }

        </View>
    )

}

export default chooseActivity;