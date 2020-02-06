import React, { Component } from 'react';
import { ScrollView, View, StyleSheet , StatusBar } from 'react-native';
import SessionsHandler from './components/SessionsHandler/SessionsHandler';
import InsideSession from './components/InsideSession';
import Timer from './components/Timer';
 

export default class App extends Component {
  
  state = {
    missions :['הוסיפי משימות', 'הציגי משימות בעזרת לולאה', 'סמני כל לולאה בנפרד', 'העבירי משימות לכרטיסים בעמוד אחר', 'עדיין הרדקודד?'],
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
        <SessionsHandler therapistName="רבקה"  petiant="ורד" missions={this.state.missions}/>
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

