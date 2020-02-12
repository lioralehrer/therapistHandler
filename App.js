import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import SessionsHandler from './components/SessionsHandler/SessionsHandler';
import Mission from './components/Mission';
import Timer from './components/Timer';
import Manager from './components/Manager';

export default class App extends Component {

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
  addMission = (mission) => {
    let missions = this.state.missions;
    let newMission = {
      text: mission,
      id: missions.length,
      checked: false,
      tries: '0',
      succseses: '0',
    }
    this.setState({
      missions: [...missions , newMission],
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
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <ScrollView>
            <SessionsHandler
              therapistName="רבקה"
              patient="ורד"
              missions={this.state.missions}
              checkedMission={(id) => this.checkedMission(id)}
            />
            <Timer />
            <Manager
              managerName='עדי'
              patient='ורד'
              missions={this.state.missions}
              checkedMission={(id) => this.checkedMission(id)}
              addMission={(mission) => this.addMission(mission)}
            />
            {myMissionsList}
          </ScrollView>
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

