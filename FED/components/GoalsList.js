import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';
import Goal from './Goal'
import MyHeader from './MyHeader'



const GoalsList = ({ goals, checkedGoal }) => {
    const [expanded, setExpannded] = useState(true)
    const toggle = () => {
        setExpannded(!expanded)
    }
    const goalsList = Object.keys(goals).map((goal, i) => {
        return <View style={styles.goal}>
            <Goal goal={goals[goal]} index={i} checkedGoal={(id) => checkedGoal(id)} />
        </View>
    })
    return (
        <View style={styles.container}>
            <MyHeader title="בחר/י  מטרות" />
            <View style={styles.list}>
                {goalsList}
            </View>
        </View>
    );
}

export default GoalsList;

const styles = StyleSheet.create({
    container: {
        width: 400
    },
    list: {
        flex: 1,
        margin: 20,
    },
    // goal: {
    //     backgroundColor: '#6d3d6d',
    //     margin: 10
    // },
    // head: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'flex-end'
    // },
    text: {
        // alignItems:'center'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'

    },
    // description: {
    //     color: '#fff',
    //     paddingHorizontal: 20
    // }
})