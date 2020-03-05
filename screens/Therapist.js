import React, { Component } from 'react';
import {  StyleSheet, View, Text, Modal, ScrollView, Button,StatusBar } from 'react-native';
import { globalStyles } from '../styles/global';
import Timer from '../components/Timer';
import Mission from '../components/Mission';
import SessionsHandler from '../components/SessionsHandler/SessionsHandler'

export default class Therapist extends Component {
    state = {
            goals:[
                {
                    id: Math.random(),
                    title:'מטרה ראשונה',
                    description:'תיאור מטרה ראשונה',
                    subGoals:[
                        {id:1, text:'תת 1',checked:false, tries:0,succseses:0, active:true},
                        {id:2, text:'תת 2',checked:false, tries:0,succseses:0, active:true},
                        {id:3, text:' תת 3',checked:false, tries:0,succseses:0, active:true},
                        {id:4, text:'תת 4',checked:false, tries:0,succseses:0, active:true}]
                },
                {
                    id: Math.random(),
                    title:'מטרה שניה',
                    description:'בלהבהבךבב',
                    subGoals:[
                        {id:1, text:'תת מטרה 1',checked:false, tries:0,succseses:0, active:true},
                        {id:2, text:'תת מטרה 2',checked:false, tries:0,succseses:0, active:true},
                        {id:3, text:'תת מטרה 3',checked:false, tries:0,succseses:0, active:true},
                        {id:4, text:'תת מטרה 4',checked:false, tries:0,succseses:0, active:true}]
                },
                {
                    id: Math.random(),
                    title:'מטרה שלישית',
                    description:'בלהבהבךבב',
                    subGoals:[
                        {id:1, text:'תת מטרה 1',checked:false, tries:0,succseses:0, active:true},
                        {id:2, text:'תת מטרה 2',checked:false, tries:0,succseses:0, active:true},
                        {id:3, text:'תת מטרה 3',checked:false, tries:0,succseses:0, active:true},
                        {id:4, text:'תת מטרה 4',checked:false, tries:0,succseses:0, active:true}]
                },
                {
                    id: Math.random(),
                    title:'מטרה רביעית',
                    description:'בלהבהבךבב',
                    subGoals:[
                        {id:1, text:'תת 1',checked:false, tries:0,succseses:0, active:true},
                        {id:2, text:'תת 2',checked:false, tries:0,succseses:0, active:true},
                        {id:3, text:'תת 3',checked:false, tries:0,succseses:0, active:true},
                        {id:4, text:'תת 4',checked:false, tries:0,succseses:0, active:true}]
                },
            ],
           
        missions: [
            {
                text: 'הוסיפי משימות',
                id: 0,
                checked: false,
                tries: '0',
                succseses: '0',
            },

            {
                text: 'הציגי משימות בעזרת לולאה',
                id: 1,
                checked: false,
                tries: '0',
                succseses: '0',
            },
            {
                text: 'סמני כל משימה בנפרד',
                id: 2,
                checked: false,
                tries: '0',
                succseses: '0',
            },
            {
                text: 'העבירי משימות לכרטיסים בעמוד אחר',
                id: 3,
                checked: false,
                tries: '2',
                succseses: '0',
            },
            {
                text: 'עדיין הרדקודד?',
                id: 4,
                checked: false,
                tries: '1',
                succseses: '1',
            }
        ],
        myMissions: [],
        myGoals:[],
    }
    componentDidMount() {
        this.setState({
            myMissions: [...this.state.missions.filter(mission => mission.checked)],
            myGoals: [...this.state.goals.filter(goal=>goal.subGoals.checked) ]
        })
    }
    checkedMission = (id) => {
        let missions = this.state.missions;
        missions[id].checked = !missions[id].checked
        this.setState({
            missions: missions,
            myMissions: [...missions.filter(mission => mission.checked)]
        })
    }
    checkedGoal= (id, goal) =>{
        let goals = this.state.goals;
        let index = goals.indexOf(goal);
        goals[index].subGoals[id-1].checked = !goals[index].subGoals[id-1].checked;
        this.setState({
            goals : goals,
            myGoals: [...goals.filter(goal=>goal.subGoals.checked)]
        })
        
    }
    handleTries = (num, key) => {
        let missions = this.state.missions;
        missions[key].tries = num.toString();
        this.setState({
            missions: missions,
            myMissions: [...missions.filter(mission => mission.checked)]
        })
    }
    handleSuccesses = (num, key) => {
        let missions = this.state.missions;
        missions[key].succseses = num.toString();
        this.setState({
            missions: missions,
            myMissions: [...missions.filter(mission => mission.checked)]
        })
    }

    render() {
        const myMissionsList = Object.entries(this.state.myMissions).map(([key, value]) => {
            return <Mission mission={this.state.myMissions[key]}
                handleTries={(num) => this.handleTries(num, key)}
                handleSuccesses={(num) => this.handleSuccesses(num, key)}
            />
        })


        return (
            <View style={styles.container} >
                <StatusBar barStyle='light-content' />
                <ScrollView>
                    <SessionsHandler
                        therapistName="רבקה"
                        patient="ורד"
                        goals = {this.state.goals}
                        missions={this.state.missions}
                        goals= {this.state.goals}
                        checkedMission={(id) => this.checkedMission(id)}
                        checkedGoal = {(id, goal)=> this.checkedGoal(id, goal)}
                    />
                    <Timer />
                    {myMissionsList}
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


})