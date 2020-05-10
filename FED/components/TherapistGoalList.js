import React from 'react';
import { StyleSheet, View } from 'react-native';
import Goal from './Goal'




const TherapistGoalsList = ({ goals, checkedGoal }) => {


    const goalsList = Object.keys(goals).map((goal, i) => {
        return <View style={styles.goal}>
            <Goal 
            goal={goals[goal]} 
            index={i} 
            checkedGoal={(id) => checkedGoal(id)}
            checkedActivity= {(subgoal , i )=>alert(subgoal[i])}
            />
        </View>
    })
    return (
        <View style={styles.container}>
            <View style={styles.list}>
                {goalsList}
            </View>
        </View>
    );
}

export default TherapistGoalsList;

const styles = StyleSheet.create({
    container: {
        width: 400
    },
    list: {
        flex: 1,
        margin: 20,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'

    },
})