import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, ScrollView, Button, StatusBar } from 'react-native';
import { globalStyles } from '../styles/global';
import Timer from '../components/Timer';
import Mission from '../components/Mission';
import Goal from '../components/Goal';
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

        // missions: [
        //     {
        //         text: 'הוסיפי משימות',
        //         id: 0,
        //         checked: false,
        //         tries: '0',
        //         succseses: '0',
        //     },

        //     {
        //         text: 'הציגי משימות בעזרת לולאה',
        //         id: 1,
        //         checked: false,
        //         tries: '0',
        //         succseses: '0',
        //     },
        //     {
        //         text: 'סמני כל משימה בנפרד',
        //         id: 2,
        //         checked: false,
        //         tries: '0',
        //         succseses: '0',
        //     },
        //     {
        //         text: 'העבירי משימות לכרטיסים בעמוד אחר',
        //         id: 3,
        //         checked: false,
        //         tries: '2',
        //         succseses: '0',
        //     },
        //     {
        //         text: 'עדיין הרדקודד?',
        //         id: 4,
        //         checked: false,
        //         tries: '1',
        //         succseses: '1',
        //     }
        // ],
        // myMissions: [],
        myGoals: []
    }
    componentDidMount() {
        this.setState({
             myGoals: [...this.state.goals.filter(goal => goal.subGoals.checked)]
        })
    }
    checkedGoal = (id) => {
        let goals = this.state.goals;
         goals.forEach((goal)=>{id==goal.id ? goal.checked = !goal.checked:'' })  
        this.setState({
            goals: goals,
            myGoals: [...goals.filter(goal => goal.checked)],
        })
        
    }
    // handleTries = (num, key) => {
    //     let missions = this.state.missions;
    //     missions[key].tries = num.toString();
    //     this.setState({
    //         missions: missions,
    //         myMissions: [...missions.filter(mission => mission.checked)]
    //     })
    // }
    // handleSuccesses = (num, key) => {
    //     let missions = this.state.missions;
    //     missions[key].succseses = num.toString();
    //     this.setState({
    //         missions: missions,
    //         myMissions: [...missions.filter(mission => mission.checked)]
    //     })
    // }

    render() {
        // const myMissionsList = Object.entries(this.state.myMissions).map(([key, value]) => {
        //     return <Mission mission={this.state.myMissions[key]}
        //         handleTries={(num) => this.handleTries(num, key)}
        //         handleSuccesses={(num) => this.handleSuccesses(num, key)}
        //     />
        // })
        const myGoalsList = Object.entries(this.state.myGoals).map(([key, value]) => {
            return <View style={styles.goal}>
                <MyGoal goal={this.state.myGoals[key]}   />
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
                        therapistName= {therapistName}
                        patient= {patient}
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
    
    text:{
        color: '#fff',
    }


})