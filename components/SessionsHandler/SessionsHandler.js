

import React, { Component } from 'react';
import { Dimensions, TouchableHighlight, StyleSheet, View, Text, Platform } from 'react-native';


export default class Mynewproject extends Component {

  render() {


    return (
      <View style={styles.MainContainer}>

        <Text style={styles.HeaderInsideText}>
          שלום {this.props.therapistName} {'\n'}
          המטופל שלך: {this.props.petiant}
        </Text>
        <View style={styles.btnContainer}>
          <TouchableHighlight
            style={styles.circle}
            underlayColor='#ccc'
            onPress={() => alert('Yaay!')}
          >
            <Text>  מטופל אחר </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.circle}
            underlayColor='#ccc'
            onPress={() => alert('Yaay!')}
          >
            <Text> בחר פעילויות </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.circle}
            underlayColor='#ccc'
            onPress={() => alert('Yaay!')}
          >
            <Text> בחר משימות   </Text>
          </TouchableHighlight>
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
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.25,
    height: Dimensions.get('window').width * 0.25,
    backgroundColor: '#89AAFF',
    justifyContent: 'center',
    alignItems: 'center'
  }
});