import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Subgoal from '../components/Subgoal';

const Goal = ({goal}) => {
//   return (
//     <TouchableOpacity style={styles.goal}>
//       <View style={styles.goalView}>
//           <Text style={styles.goalTitle}>{goal.skillType}- מטרה {goal.serialNum}</Text>
//           <FlatList style={styles.subgoalsList}
//             data={goal.subgoals}
//             renderItem={({item}) => <Subgoal subgoal={item} />}
//           />
//           {/* <Text style={styles.goalDescription}>{goal.description}</Text> */}
//           {/* <Icon name="remove" size={20} color="firebrick" onPress={() => deleteItem(item.id)}/> */}
//     </View>
//     </TouchableOpacity>
//   );
// };

//   return (
//     <TouchableOpacity style={styles.goal}>
//       <View style={styles.goalView}>
//         <View style={styles.goalInfo}>
//           <Text style={styles.goalTitle}>{goal.skillType}- מטרה {goal.serialNum}</Text>
//           <FlatList style={styles.activitiesList}
//             data={goal.activities}
//             renderItem={({item}) => <Text style={styles.goalActivity}>{item.title}</Text> }
//             horizontal={true}
//           />
//         </View>
//         <FlatList style={styles.subgoalsList}
//           data={goal.subgoals}
//           renderItem={({item}) => <Subgoal subgoal={item} />}
//         />
//           {/* <Text style={styles.goalDescription}>{goal.description}</Text> */}
//           {/* <Icon name="remove" size={20} color="firebrick" onPress={() => deleteItem(item.id)}/> */}
//     </View>
//     </TouchableOpacity>
//   );
// };

  return (
    <TouchableOpacity style={styles.goal}>
      <View style={styles.goalView}>
        {/* <View style={styles.goalInfo}> */}
          <Text style={styles.goalTitle}>{goal.skillType}- מטרה {goal.serialNum}</Text>
          {/* <View style={styles.activitiesList}> */}
                    {/* {
                        goal.activities.map((activity) => {
                            return (<Text style={styles.goalActivity}>{activity.title}</Text>);
                        })
                    } */}
          {/* </View> */}
          
          <FlatList style={styles.activitiesList}
            data={goal.activities}
            renderItem={({item}) => <Text style={styles.goalActivity}>{item.title}</Text> }
            horizontal={true}
          />
        {/* </View> */}
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
        // borderBottomWidth: 1,
        borderWidth: 1,
        // borderColor: '#eee',
        borderColor: '#ddd',
        margin: 2,
        marginLeft: 11,
        marginRight: 11,
    },
    goalView: {
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    goalInfo: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row-reverse',
      // flexShrink: 1,
      alignContent: 'flex-start',
      // height: 80,
    },
    goalTitle: {
      flex: 1,
      flexWrap: 'wrap',
      fontSize: 16,
      fontWeight: 'bold',
      // backgroundColor: 'darksalmon',
      // width: 300,
      marginLeft: 10,
      height: 20,
      // lineHeight: 20,
    },
    activitiesList: {
      flex: 1,
      flexWrap: 'wrap',
      // flexShrink: 1,
      marginTop: 1,

    },
    goalActivity: {
      // flex: 1,
      flexWrap: 'wrap',
      backgroundColor: "skyblue",
      borderRadius: 3,
      margin: 3,
      padding: 1,
      paddingLeft: 4,
      paddingRight: 4,
      fontSize: 12,
      // width: 70,
      // lineHeight: 15,
      textAlign: 'center',
      height: 20,
    },
    // goalDescription: {
    //   fontSize: 16,
    // },
  
})

export default Goal;