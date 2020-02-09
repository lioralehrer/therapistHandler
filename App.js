import React, { Component } from 'react';
import { ScrollView, View, StyleSheet , StatusBar } from 'react-native';
import SessionsHandler from './components/SessionsHandler/SessionsHandler';
import InsideSession from './components/InsideSession';
import Timer from './components/Timer';
 

export default class App extends Component {
  
  state = {
    missions: [
      {
        text: 'הוסיפי משימות',
        id: 0,
        checked : false,
  },

      {
       text: 'הציגי משימות בעזרת לולאה',
        id: 1,
        checked : false,
      },
      {
        text: 'סמני כל משימה בנפרד',
        id: 2,
        checked : false,
      },
      {
        text: 'העבירי משימות לכרטיסים בעמוד אחר',
        id: 3,
        checked : false,
      },
      {
        text: 'עדיין הרדקודד?',
         id: 4,
        checked : false,
      }
    ],
    // missions :['הוסיפי משימות', 'הציגי משימות בעזרת לולאה', 'סמני כל לולאה בנפרד', 'העבירי משימות לכרטיסים בעמוד אחר', 'עדיין הרדקודד?'],
    myMissions: ['סמני כל לולאה בנפרד','העבירי משימות לעמוד אחר'],
  }
  
  render() {
    const myMissionsList = Object.entries(this.state.myMissions).map(([key , value])=>{
      return  <InsideSession mission= {this.state.myMissions[key]}/>
    })
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <ScrollView>
        <SessionsHandler therapistName="רבקה"  petiant="ורד"/>
        <Timer/>
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

