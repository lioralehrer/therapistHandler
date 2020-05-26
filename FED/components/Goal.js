import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, Alert } from 'react-native';
import { Card, ListItem } from 'react-native-elements'

const Goal = ({ goal }) => {
    const [goalExpanded, setGoalExpanded] = useState(true);
    const [actExpanded, setActExpended] = useState(true);
    const [envExpanded, setEnvExpanded] = useState(true);
    //  should I get this info from goal ?
    const therapistNum = 2;
    const followingDays = 3;
    const toggleGoal = () => {
        setGoalExpanded(!goalExpanded);
    }
    const toggleAct = () => {
        setActExpended(!actExpanded);
    }
    // const toggleEnv = () => {
    //     setEnvExpanded(!envExpanded);
    // }
    return (
        <View style={styles.goal}>
            <View style={styles.header} >
                <Text style={styles.title}>בוצע לאחרונה ב 20/5/2020</Text>
                <Text style={styles.title}>{goal.title}</Text>
            </View>
            <Card >
                <View>
                    <Text>{goal.description}</Text></View>
            </Card>
            <View style={styles.head}>
                {/* <Text style={styles.title01}>סביבה</Text>
                <TouchableHighlight
                    onPress={() => toggleEnv()}
                >
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={goalExpanded ? require('../assets/arrow-up.jpg') : require('../assets/arrow-down.jpg')} />
                </TouchableHighlight> */}
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
                            title={goal.subGoals[subgoal].text}
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
                            title={goal.activities[act]}
                            bottomDivider
                            chevron
                        />
                    </View>
            })}
            {Object.keys(goal.environment).map((env, index) => {
                return envExpanded ? <View></View> :
                    <View>
                        <ListItem
                            key={index}
                            title={goal.environment[env]}
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

})