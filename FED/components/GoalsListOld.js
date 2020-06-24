import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Goal from './GoalOld'
import GoalForm from './GoalForm';
import { globalStyles } from '../styles/global'



const GoalsList = ({activities, goals, checkedGoal, newGoal, deleteGoal, checkedActivity }) => {


    const goalsList = Object.keys(goals).map((goal, i) => {
        return <View style={styles.goal}>
            <Goal goal={goals[goal]} index={i} checkedGoal={(id) => checkedGoal(id)} checkedActivity= {( activities , i )=>checkedActivity(activities[i])} />
            <View style={globalStyles.btns}>
                <Button
                    onPress={() => deleteGoal(goals[goal].id)}
                    color="#841584"
                    title=" מחקי מטרה"
                />
                <GoalForm activities={activities} txt='מטרה חדשה' newGoal={(goal) => newGoal(goal)}></GoalForm>
                <GoalForm activities={activities} txt='עדכני מטרה' goal={goals[goal]} newGoal={(goal) => newGoal(goal)}></GoalForm>
            </View>
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

//  export default GoalsList;

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