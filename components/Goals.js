import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';
import { CheckBox } from 'react-native-elements';
import MyHeader from './MyHeader'
import { icons } from '../styles/global'
// const icons = {
//     'up': require('../assets/Arrowhead-01-128.png'),
//     'down': require('../assets/Arrowhead-Down-01-128.png'),
// }

const Goals = ({ goals, checkedGoal }) => {
    const [expanded, setExpannded] = useState(false)
    const toggle = () => {
        setExpannded(!expanded)
    }
    const goalsList = Object.keys(goals).map((goal, i) => {
        const subgoals = Object.keys(goals[goal].subGoals).map((subgoal, index) => {
           return  expanded ? <View></View> :
                <CheckBox
                   iconRight
                   right
                   checkedColor='green'
                   title={goals[goal].subGoals[subgoal].text}
                   checked={goals[goal].subGoals[subgoal].checked}
                   onPress={() => checkedGoal(goals[goal].subGoals[subgoal].id, goals[goal])}
               />
        })
        return <View style={styles.goal}>
            <View style={styles.text}>
                <View style={styles.head}>
                    <Text style={styles.title}>{goals[goal].title}</Text>
                    <TouchableHighlight
                        onPress={toggle}
                    >
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={!expanded ? require('../assets/Arrowhead-01-128.png') : require('../assets/Arrowhead-Down.png')} />
                    </TouchableHighlight>
                </View>
                <Text style={styles.description}>{goals[goal].description}</Text>
            </View>
            {subgoals}

        </View>
    })
    return (
        <View style={styles.container}>
            <MyHeader title="בחר/י  תת מטרות" />
            <View style={styles.list}>
                {goalsList}

            </View>
        </View>
    );
}

export default Goals;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: 400
    },
    list: {
        margin: 20,
    },
    goal: {
        flex: 1,
        backgroundColor: '#6d3d6d',
        margin: 10
        // border:1,

    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    text: {
        // alignItems:'center'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'

    },
    description: {
        color: '#fff',
        paddingHorizontal: 20
    }
})