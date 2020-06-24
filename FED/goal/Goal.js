import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Subgoal from './Subgoal';

const Goal = ({goal}) => {

  return (
    <TouchableOpacity style={styles.goal}>
      <View style={styles.goalView}>
          <Text style={styles.goalTitle}>{goal.skillType}- מטרה {goal.serialNum}</Text>
          <FlatList style={styles.activitiesList}
            data={goal.activities}
            renderItem={({item}) => <Text style={styles.goalActivity}>{item.title}</Text> }
            horizontal={true}
          />
        <FlatList style={styles.subgoalsList}
          data={goal.subgoals}
          renderItem={({item}) => <Subgoal subgoal={item} />}
        />
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    goal: {
        padding: 15,
        paddingTop: 8,
        paddingBottom: 10,
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#ddd',
        margin: 2,
        marginLeft: 11,
        marginRight: 11,
    },
    goalView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    goalInfo: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row-reverse',
      alignContent: 'flex-start',
    },
    goalTitle: {
      flex: 1,
      flexWrap: 'wrap',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
      height: 20,
    },
    activitiesList: {
      flex: 1,
      flexWrap: 'wrap',
      marginTop: 1,

    },
    goalActivity: {
      flexWrap: 'wrap',
      backgroundColor: "skyblue",
      borderRadius: 3,
      margin: 3,
      padding: 1,
      paddingLeft: 4,
      paddingRight: 4,
      fontSize: 12,
      textAlign: 'center',
      height: 20,
    },
})

export default Goal;