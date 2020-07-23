import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, Button, Alert } from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';
import { globalStyles } from '../styles/global'

const Goal = ({ goal, checkedGoal, checkedActivity }) => {
    const [expanded, setExpanded] = useState(true);
    const toggle = () => {
        setExpanded(!expanded);
    }
    return (
        <View style={styles.goal}>
            <View style={styles.text}>

                <View style={styles.head}>
                    <Text style={styles.title}>{goal.title}</Text>
                    <TouchableHighlight
                        onPress={() => toggle()}
                    >
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={expanded ? require('../assets/arrow-up.jpg') : require('../assets/arrow-down.jpg')} />
                    </TouchableHighlight>
                </View>
                <CheckBox
                    iconRight
                    checkedColor='green'
                    right
                    title={goal.description}
                    checked={goal.checked}
                    onPress={() => checkedGoal(goal.id)}
                />
            </View>
            <View style={globalStyles.btns}>

                {goal.activities.map((activity, i) => {
                    return (
                        <Button
                            onPress={() => Alert.alert("מה עושים עם הפעילות?!")}
                            color="#841584"
                            title={activity}
                        />
                    )
                })}
                <Text>  פעילויות : </Text>
            </View>
            {Object.keys(goal.subGoals).map((subgoal, index) => {
                return expanded ? <View></View> :
                    <View>
                        <ListItem
                            key={index}
                            title={goal.subGoals[subgoal].text}
                            bottomDivider
                            chevron
                        />

                    </View>
            })}
        </View>
    );
}

//  export default Goal;

const styles = StyleSheet.create({
    goal: {
        backgroundColor: '#6d3d6d',
        margin: 10,
        flex: 1
    },
    text: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
        margin: 10,
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    description: {
        color: '#fff',
        paddingHorizontal: 20
    },

})