import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, ScrollView, Button, StatusBar } from 'react-native';
import { globalStyles } from '../styles/global';
import Timer from '../components/Timer';
import MyGoal from '../components/MyGoal'
import SessionsHandler from '../components/SessionsHandler/SessionsHandler'

export default class Therapist extends Component {
    state = {
        goals: [
            {
                id: Math.random(),
                title: 'מטרה ראשונה',
                description: 'תיאור מטרה ראשונה',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת 1', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 2, text: 'תת 2', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 3, text: ' תת 3', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 4, text: 'תת 4', checked: false, tries: 0, succseses: 0, active: true }]
            },
            {
                id: Math.random(),
                title: 'מטרה שניה',
                description: 'בלהבהבךבב',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת מטרה 1', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 2, text: 'תת מטרה 2', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 3, text: 'תת מטרה 3', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 4, text: 'תת מטרה 4', checked: false, tries: 0, succseses: 0, active: true }]
            },
            {
                id: Math.random(),
                title: 'מטרה שלישית',
                description: 'בלהבהבךבב',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת מטרה 1', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 2, text: 'תת מטרה 2', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 3, text: 'תת מטרה 3', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 4, text: 'תת מטרה 4', checked: false, tries: 0, succseses: 0, active: true }]
            },
            {
                id: Math.random(),
                title: 'מטרה רביעית',
                description: 'בלהבהבךבב',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת 1', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 2, text: 'תת 2', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 3, text: 'תת 3', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 4, text: 'תת 4', checked: false, tries: 0, succseses: 0, active: true }]
            },
        ],
        myGoals: []
    }
    componentDidMount() {
        this.setState({
            myGoals: [...this.state.goals.filter(goal => goal.subGoals.checked)]
        })
    }
    checkedGoal = (id) => {
        let goals = this.state.goals;
        goals.forEach((goal) => { id == goal.id ? goal.checked = !goal.checked : '' })
        this.setState({
            goals: goals,
            myGoals: [...goals.filter(goal => goal.checked)],
        })

    }
    handleTries = (num,subgoal, key) => {
        let goals = this.state.goals;
        goals[key].subGoals[subgoal].tries = num.toString();
        this.setState({
            goals: goals,
            mygoals: [...goals.filter(goal => goal.checked)]
        })
    }
    handleSuccesses = (num,subgoal, key) => {
        let goals = this.state.goals;
        goals[key].subGoals[subgoal].succseses = num.toString();
        this.setState({
            goals: goals,
            mygoals: [...goals.filter(goal => goal.checked)]
        })
    }

    render() {
        const myGoalsList = Object.entries(this.state.myGoals).map(([key, value]) => {
            return <View style={styles.goal}>
                <MyGoal goal={this.state.myGoals[key]}
                    handleTries={(num, subgoal) => this.handleTries(num, subgoal, key)}
                    handleSuccesses={(num, subgoal) => this.handleSuccesses(num,subgoal, key)}
                />
            </View>
        })

        // This is the way to pass props from 'Home' component to this component
        const { therapistName } = this.props.route.params;
        const { patient } = this.props.route.params;

        return (
            <View style={styles.container} >
                <StatusBar barStyle='light-content' />
                <ScrollView>
                    <SessionsHandler
                        therapistName={therapistName}
                        patient={patient}
                        goals={this.state.goals}
                        goals={this.state.goals}
                        checkedGoal={(id) => this.checkedGoal(id)}
                    />
                    <Timer />
                    {myGoalsList}
                </ScrollView>
                <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07121B',
    },

    text: {
        color: '#fff',
    }


})