import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global'

export default class AddMission extends Component {
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
          missions: [...missions, newMission],
          myMissions: [...missions.filter(mission => mission.checked)]
        })
    
      }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>ברוכ/ה הבא/ה </Text>
                <View style={globalStyles.btnContainer}>
                    <TouchableHighlight
                        style={globalStyles.circle}
                        underlayColor='#ccc'
                         onPress={() => this.props.navigation.navigate('Manager', { managerName:'זהבה', patient:'אסתי', missions: this.state.missions})}
                   
                   >
                        <Text style={styles.text}>  מנהל   </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={globalStyles.circle}
                        underlayColor='#ccc'
                        onPress={() => this.props.navigation.navigate('Therapist')}
                    >
                        <Text style={styles.text}>  מטפל   </Text>
                    </TouchableHighlight>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        margin: 20,
        padding: 20,
        
    },
    header: {
        margin: 20,
        color: '#900',
        fontSize: 20,
    },
    text: {
        marginTop: 7,
        color: '#900',
        fontSize: 20,

    },
})