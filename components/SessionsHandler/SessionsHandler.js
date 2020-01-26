

import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Animated, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';

export default class Mynewproject extends Component {

  render() {


    return (
      <View style={styles.MainContainer}>

        <Text style={styles.HeaderInsideText}>
          שלום {this.props.therapistName} {'\n'}
          המטופל שלך: {this.props.petiant}
        </Text>
        <View style={styles.btnContainer}>
          <View style={styles.btn}>
            <Button title="בחר משימות" onPress={() => alert("בחר משימות")} />
          </View>
          <View style={styles.btn}>
            <Button title="בחר פעילויות" onPress={() => { alert("בחר פעילויות") }} />
          </View>
          <View style={styles.btn}>
            <Button title="מטופל אחר?" onPress={() => alert("change pationt!")} />
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
  },
  btnContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-around',
  },

  HeaderInsideText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
    margin: 10,

  },
  TextViewStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,

    margin: 5,
    padding: 7,
  },
  btn: {
    margin: 2,

  }

});