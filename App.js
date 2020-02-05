import React, { Component } from 'react';
import { ScrollView, Navigator, NativeModules, View, StyleSheet , StatusBar, TouchableOpacity, Text, Dimensions, Vibration } from 'react-native';
import { Card } from 'react-native-elements';
import SessionsHandler from './components/SessionsHandler/SessionsHandler';
import InsideSession from './components/InsideSession';
 
// import styles from './appStyle'
// a function to calculate hours, minutes and seconds.
const formatNumber = (number) => `0${number}`.slice(-2);
const SESSION = 120 * 60;
const PATTERN = (2000, 1000, 1000);
const getRemaining = (time) => {
const hours = Math.floor(time / (60 * 60))
const minutes = Math.floor((time - hours * 60 * 60) / 60);
const seconds = time - 60 * (minutes + hours * 60);
  return { hours: formatNumber(hours), minutes: formatNumber(minutes), seconds: formatNumber(seconds) }
};

export default class App extends Component {
  constructor(props){
    super(props);
    this.pauseBtn = "Pause";
    
  }
  state = {
    remaingSeconds: SESSION,
    isRunning: false,
    pause:true,
    missions :['הוסיפי משימות', 'הציגי משימות בעזרת לולאה', 'סמני כל לולאה בנפרד', 'העבירי משימות לכרטיסים בעמוד אחר', 'עדיין הרדקודד?'],
    myMissions: ['סמני כל לולאה בנפרד','העבירי משימות לעמוד אחר'],
  }
  componentWillMount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startSession = () => {
    this.setState(state => ({ remaingSeconds: state.remaingSeconds - 1, isRunning: true }));
    Vibration.vibrate(PATTERN, true)
    this.interval = setInterval(() => this.state.remaingSeconds > 0 ? this.setState(state => ({ remaingSeconds: state.remaingSeconds - 1 })) : this.setState(state => ({ remaingSeconds: SESSION }), clearInterval(this.interval)), 1000);

  }
  stopSession = () => {
    this.setState(() => ({ remaingSeconds: SESSION, isRunning: false }));
    clearInterval(this.interval);
  }
  pauseSession = ()=> {
    if (this.state.pause){
      clearInterval(this.interval)
       this.setState(()=>({pause:false}));
       this.pauseBtn = "Continue"
    } else{
      this.setState(()=>({pause:true }));
      this.pauseBtn = "Pause"
      this.interval = setInterval(() => this.state.remaingSeconds > 0 ? this.setState(state => ({ remaingSeconds: state.remaingSeconds - 1 })) : this.setState(state => ({ remaingSeconds: SESSION }), clearInterval(this.interval)), 1000);
      }
  }
  render() {
    const { hours, minutes, seconds } = getRemaining(this.state.remaingSeconds);
    const myMissionsList = Object.entries(this.state.myMissions).map(([key , value])=>{
      return  <InsideSession mission= {this.state.myMissions[key]}/>
    })
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <ScrollView>
        <SessionsHandler therapistName="רבקה"  petiant="ורד"/>
        <View style={styles.btnContainer}>

          {this.state.isRunning ?
          <View>
              <TouchableOpacity onPress={this.stopSession} style={styles.stopBtn}>
              <Text style={styles.stopTextBtn}>Stop Session</Text>
            </TouchableOpacity>
               <TouchableOpacity onPress={this.pauseSession} style={styles.stopBtn}>
          <Text style={styles.pauseButton}>{this.pauseBtn}</Text>
             </TouchableOpacity>
          </View>
             :
            <TouchableOpacity onPress={this.startSession} style={styles.button}>
              <Text style={styles.textButtton}>Start Session</Text>
            </TouchableOpacity> 
          }
          <Text style={styles.time}> {`${hours}:${minutes}:${seconds}`}</Text>
        </View>
       {myMissionsList}
      </ScrollView>
      </View>
    )
  }
}
const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
  },
  btnContainer: {
     flex: 1,
    alignItems: 'center',
    margin: 20,
    padding: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#89AAFF',
     borderRadius: screen.width / 2,
     margin: 2,

  },
  stopBtn: {
    borderColor: '#FF851B',
    borderWidth: 5,
    borderRadius: screen.width / 2,
     margin:5,
  },
  stopTextBtn: {
    color: '#FF851B',
    fontSize:20,
    fontWeight: 'bold',
    padding:10,
  },
  textButtton: {
    fontSize: 24,
    color: '#89AAFF',
    fontWeight: 'bold',
  },
  pauseButton:{
    padding:0,
    fontSize: 15,
    fontWeight:'bold',
    color:'#FF851B',
    marginTop: 5,
    paddingLeft: 45,
  },
  paragraph: {
    margin: 20,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  time: {
    color: "#fff",
    fontSize: 50,
  }
})

