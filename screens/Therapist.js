import React, { Component } from 'react';
import {  StyleSheet, View, Text, Modal, ScrollView, Button,StatusBar } from 'react-native';
import { globalStyles } from '../styles/global';
import Timer from '../components/Timer';
import Mission from '../components/Mission';
import SessionsHandler from '../components/SessionsHandler/SessionsHandler'

export default class Therapist extends Component {
    state = {
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
    }
    componentDidMount() {
        this.setState({
            myMissions: [...this.state.missions.filter(mission => mission.checked)]
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
                        missions={this.state.missions}
                        checkedMission={(id) => this.checkedMission(id)}
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