import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import SessionsHandler from './components/SessionsHandler/SessionsHandler';
import InsideSession from './components/InsideSession';
import Timer from './components/Timer';


export default class App extends Component {

  state = {
    missions: [
      {
        text: 'הוסיפי משימות',
        id: 0,
        checked: false,
      },

      {
        text: 'הציגי משימות בעזרת לולאה',
        id: 1,
        checked: false,
      },
      {
        text: 'סמני כל משימה בנפרד',
        id: 2,
        checked: false,
      },
      {
        text: 'העבירי משימות לכרטיסים בעמוד אחר',
        id: 3,
        checked: false,
      },
      {
        text: 'עדיין הרדקודד?',
        id: 4,
        checked: false,
      }
    ],
    myMissions : [],
  }
  componentDidMount(){
    this.setState({
      myMissions : [...this.state.missions.filter(mission => mission.checked)]
    })
  }
  checkedMission = (id) => {
    let missions = this.state.missions
    missions[id].checked = !missions[id].checked
    this.setState({
       missions: missions,
       myMissions : [...missions.filter(mission => mission.checked)]
     })
  }

  render() {
    const myMissionsList = Object.entries(this.state.myMissions).map(([key, value]) => {
      return <InsideSession mission={this.state.myMissions[key]} />
    })
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <ScrollView>
          <SessionsHandler therapistName="רבקה" petiant="ורד" missions={this.state.missions} checkedMission={(id) => this.checkedMission(id)} />
          <Timer />
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

