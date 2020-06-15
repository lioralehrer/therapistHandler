import React, {useState} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ActivityButton from './ActivityButton';

const ActivityButtonGroup = ({activities, selectGoals}) => {

const [buttonsState, setButtonsState] = useState([0, 0, 0, 0]);

const updateStyle = (id) => {
    setButtonsState(prevButtonsState => {
      return prevButtonsState.map((buttonState, index) => (activities[index].id == id) );
    });
};

const updateGoals = (id) => {
    selectGoals(id);
};
  return (
    <View style={styles.container}>
    <FlatList 
    data={activities}
    horizontal={true}
    renderItem={({item, index}) => <ActivityButton activity={item} buttonStyle={buttonsState[index] ? styles.buttonOn : styles.buttonOff} updateStyle={updateStyle} updateGoals={updateGoals}/>}
    />
  </View>
  );
};



const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        paddingRight: 11,
        paddingLeft: 11,
    },
    buttonOff: {
        backgroundColor: 'lightblue',
        margin: 1,
        width: 70,
        height: 50,
        padding: 5,
    },
    buttonOn: {
        backgroundColor: 'pink',
        margin: 1,
        width: 70,
        height: 50,
        padding: 5,
    },
});

export default ActivityButtonGroup;