import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Goal from './Goal'
import GoalForm from './GoalForm';
import { globalStyles } from '../styles/global'
import Header from './Headers/Header';


const GoalsList = ({ goals, deleteGoal, newGoal}) => {
    const goalsList = Object.keys(goals).map((goal, i) => {
        return <View style={styles.goal}>
            <Goal goal={goals[goal]} index={i} />
            <View style={globalStyles.btns}>
                <Button
                    onPress={() => deleteGoal(goals[goal].id)}
                    color="#841584"
                    title=" מחקי מטרה"
                />
                <GoalForm
                    txt='עדכון מטרה ופעילויות'
                    goal={goals[goal]} newGoal={(goal) => newGoal(goal)}
                ></GoalForm>
            </View>
        </View>
    })
    return (
        <View >
            <Header title='מטרות' />
            <View style={styles.list}>
                {goalsList}
                <View style={styles.btn}>
                <GoalForm
                    txt='מטרה חדשה'
                    newGoal={(goal) => newGoal(goal)}
                ></GoalForm>
                </View>
            </View>
        </View>
    );
}

export default GoalsList;

const styles = StyleSheet.create({
    list: {
        flex: 1,
        margin: 20,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'

    },
    btn:{
        padding: 10,
        margin: 10,
        width : '50%',
    }
})