import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';
import { CheckBox } from 'react-native-elements';
import MyHeader from './MyHeader'


const Goals = ({ goals, checkedGoal }) => {

    // icons = {
    //     'up': require('../assets/Arrowhead-01-128.png'),
    //     'down': require('../assets/Arrowhead-Down-01-128.png')
    // }

    const goalsList = Object.keys(goals).map((goal, i) => {
        const subgoals = Object.keys(goals[goal].subGoals).map((subgoal, index) => {
            return <CheckBox
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
            <Text style={styles.title}>{goals[goal].title}</Text>
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
    goal:{
        flex:1,
        backgroundColor: '#6d3d6d',
        margin:10
        // border:1,

    },
    text:{
        // alignItems:'center'
    },
    title:{
        color:'#fff',
        fontSize: 20,
        textAlign:'center'
      
    },
    description:{
        color:'#fff',
        paddingHorizontal:20
    }
})