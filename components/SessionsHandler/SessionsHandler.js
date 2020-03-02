

import React, { Component } from 'react';
import {  TouchableHighlight, StyleSheet, View, Text, Modal, ScrollView } from 'react-native';
import MissionCheckbox from '../MissionCheckbox';
import Goals from '../Goals'
import MyHeader from '../MyHeader';
import { globalStyles} from '../../styles/global'

export default class SessionHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,

    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }


  paciantPicker = () => {
    alert('blabla')
  }
  checkedMission = (id) => {
    this.props.checkedMission(id);
  }
  checkedGoal = (id, goal) =>{
    // alert(id+""+ goal.id)
    this.props.checkedGoal(id, goal)
  }

  render() {
    return (
      <View style={globalStyles.MainContainer}>
        <MyHeader title='מטפל' />
        <Text style={styles.HeaderInsideText}>
          שלום {this.props.therapistName} {'\n'}
          המטופל שלך: {this.props.patient}
        </Text>

        <View style={styles.btnContainer}>
          <TouchableHighlight
            style={globalStyles.circle}
            underlayColor='#ccc'
            onPress={() => this.paciantPicker()}
          >
            <Text>  מטופל אחר </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={globalStyles.circle}
            underlayColor='#ccc'
            onPress={() => alert('Yaay!')}
          >
            <Text> בחר פעילויות </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={globalStyles.circle}
            underlayColor='#ccc'
            onPress={() => this.setModalVisible(!this.state.modalVisible)}
          >
            <Text> בחר משימות   </Text>
          </TouchableHighlight>

          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
            swipeArea={50}
          >

            <View style={styles.modal} onStartShouldSetResponder={() => true}>
              <ScrollView>
                {/* <MissionCheckbox missions={this.props.missions} checkedMission={(id) => this.checkedMission(id)}
                /> */}
                <Goals  goals={this.props.goals} checkedGoal={(id, goal)=>this.checkedGoal(id, goal) }/> 
                <TouchableHighlight
                  style={globalStyles.circle}
                  underlayColor='#ccc'
                  onPress={() => this.setModalVisible(!this.state.modalVisible)}
                >
                  <Text > סיים   </Text>
                </TouchableHighlight>

                <View style={{ flex: 1 }}>
                  <Text>ablabla</Text>
                </View>
              </ScrollView>
            </View>

          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  HeaderInsideText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
    margin: 10,

  },
  modal: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor:'#4c2a4c'
  }
});