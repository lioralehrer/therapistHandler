import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import {uuid} from 'uuidv4';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActivityButton from './ActivityButton';

const ActivityButtonGroup = ({activities, selectGoals}) => {
//   const [items, setItems] = useState([
//         {id: uuid(), text: 'Milk'},
//         {id: uuid(), text: 'Eggs'},
//         {id: uuid(), text: 'Bread'},
//         {id: uuid(), text: 'Juice'},
//     ]);
//   const [names, setNames] = useState(activities);

const [buttonsState, setButtonsState] = useState([0, 0, 0, 0]);

// const updateStyle = (title) => {
const updateStyle = (id) => {
    setButtonsState(prevButtonsState => {
      return prevButtonsState.map((buttonState, index) => (activities[index].id == id) );
    });
    console.log(buttonsState);
};

// const updateGoals = (activity) => {
const updateGoals = (id) => {
    console.log('inside ActivityButtonGroup: updateGoals function');
    // selectGoals(activity);
    selectGoals(id);
};

// }

//   const activityButtons = names.map((activity) => {
//       <TouchableOpacity>
//           <Text>{activity.title}</Text>
//       </TouchableOpacity>
//   });

// var reversedActivities = activities.reverse();
  return (
    // <View style={styles.container}>
    //     {console.log(activities)}
    //   <Text>test</Text>
    //   <Text>{activityButtons[1]}</Text>
    //   <TouchableOpacity>
    //       <Text>{activities[0].title}</Text>
    //   </TouchableOpacity>

    // </View>
    <View style={styles.container}>
    <FlatList 
    // data={activities.reverse()}
    // data={reversedActivities}
    data={activities}
    horizontal={true}
    renderItem={({item, index}) => <ActivityButton activity={item} buttonStyle={buttonsState[index] ? styles.buttonOn : styles.buttonOff} updateStyle={updateStyle} updateGoals={updateGoals}/>}
    />
  </View>
  );
};



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: 'green',
        alignItems: 'flex-end',
        // alignContent: 'flex-end',
        // flexDirection: 'row-reverse'
        paddingRight: 11,
        paddingLeft: 11,
    },
    buttonOff: {
        // flex: 1,
        backgroundColor: 'lightblue',
        // borderWidth: 1,
        // borderColor: 'green',
        // textAlign: 'center',
        // justifyContent: 'center',
        // alignContent: 'center',
        // textAlignVertical: 'center',
        margin: 1,
        width: 70,
        height: 50,
        padding: 5,
    },
    buttonOn: {
        // flex: 1,
        backgroundColor: 'pink',
        // borderWidth: 1,
        // borderColor: 'green',
        // textAlign: 'center',
        // justifyContent: 'center',
        // alignContent: 'center',
        // textAlignVertical: 'center',
        margin: 1,
        width: 70,
        height: 50,
        padding: 5,
    },
});

export default ActivityButtonGroup;