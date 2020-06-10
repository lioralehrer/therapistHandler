import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Subgoal = ({subgoal}) => {
  return (
    <TouchableOpacity style={styles.subgoal}>
      <View style={styles.subgoalView}>
          <Text style={styles.subgoalTitle}>
              {subgoal.serialNum}
              <Text style={styles.subgoalDescription}>   {subgoal.description}</Text>
          </Text>
          
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    subgoal: {
        padding: 5,
        backgroundColor: '#f8f8f8',
        // borderBottomWidth: 1,
        // borderColor: '#eee',
    },
    subgoalView: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    subgoalTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    subgoalDescription: {
      fontSize: 14,
      fontWeight: 'normal',
    },
  
})

export default Subgoal;