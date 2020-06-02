import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, Alert } from 'react-native';
import { Card, ListItem } from 'react-native-elements'

const Goal = ({ goal }) => {
    const [goalExpanded, setGoalExpanded] = useState(true);
    const [actExpanded, setActExpended] = useState(true);
    const [envExpanded, setEnvExpanded] = useState(true);
    //  should I get this info from goal ?
    const therapistNum = goal.numOfTherapists;
    const followingDays = goal.numOfDays;
    const toggleGoal = () => {
        setGoalExpanded(!goalExpanded);
    }
    const toggleAct = () => {
        setActExpended(!actExpanded);
    }

    return (
        <View style={styles.goal}>
            <View style={styles.header} >
                <Text style={styles.title}>בוצע לאחרונה ב 20/5/2020</Text>
                <Text style={styles.title}>{goal.skillType}</Text>
            </View>
            <Card >
                <View>
                    <Text style={styles.cardTitle}>{goal.title}</Text>
                    <Text>{goal.description}</Text></View>
            </Card>
            <View style={styles.head}>
                <Text style={styles.title01}> פעילויות</Text>
                <TouchableHighlight
                    onPress={() => toggleAct()}
                >
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={actExpanded ? require('../assets/arrow-up.jpg') : require('../assets/arrow-down.jpg')} />
                </TouchableHighlight>


                <Text style={styles.title01}>תת מטרות</Text>
                <TouchableHighlight
                    onPress={() => toggleGoal()}
                >
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={goalExpanded ? require('../assets/arrow-up.jpg') : require('../assets/arrow-down.jpg')} />
                </TouchableHighlight>
            </View>
            {Object.keys(goal.subGoals).map((subgoal, index) => {
                return goalExpanded ? <View></View> :
                    <View>
                        <ListItem
                            key={index}
                            title={goal.subGoals[subgoal].title}
                            bottomDivider
                            chevron
                        />
                    </View>
            })}
            {Object.keys(goal.activities).map((act, index) => {
                return actExpanded ? <View></View> :
                    <View>
                        <ListItem
                            key={index}
                            title={<View><Text>{goal.activities[act].title}  {/**  ב: {goal.activities[act].environments.default}*/}  </Text></View>}
                          
                            bottomDivider
                            chevron
                        />
                    </View>
            })}
            <View style={styles.head}>
                <Text>מס' מטפלים מינימלי: {therapistNum}</Text>
                <Text>ימים עוקבים: {followingDays}</Text>
            </View>

        </View>
    )
}

export default Goal;

const styles = StyleSheet.create({

    goal: {
        backgroundColor: '#6d3d6d',
        margin: 10,
        flex: 1,

    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
    },
    title: {
        color: '#fff',
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
        justifyContent: 'space-evenly',
        backgroundColor: '#ddd',
        padding: 5,
        marginTop: 10,
        marginHorizontal: 15,
    },
    description: {
        color: '#fff',
        paddingHorizontal: 20
    },
    cardTitle: {
        color: '#6d3d6d'
    }

})