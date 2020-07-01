import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert, Modal, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {uuid} from 'uuidv4';
import ActivityButton from './ActivityButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { startClock } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ActivityButtonGroup = ({recommendedActivities, restOfActivities, updateGoals}) => {

  const allSessionActivities = [...recommendedActivities, ...restOfActivities];
  const [buttonsState, setButtonsState] = useState(allSessionActivities.map((activity) => false));
  const [dropdownValue, setDropdownValue] = useState("עוד פעילויות");
  const [modalVisible, setModalVisible] = useState(false);

  const updateStyle = (id) => {
      setButtonsState(prevButtonsState => {
        return prevButtonsState.map((buttonState, index) => (allSessionActivities[index].id == id) );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.recommendedActivities}>
        <FlatList 
          data={recommendedActivities}
          horizontal={true}
          renderItem={({item, index}) =><ActivityButton activity={item} buttonStyle={buttonsState[index] ? styles.buttonOn : styles.buttonOff} updateStyle={updateStyle} updateGoals={updateGoals}/>}
        />
      </View>
      <TouchableOpacity style={buttonsState.slice(recommendedActivities.length, allSessionActivities.length).includes(true) ? styles.dropdownButtonOn : styles.dropdownButtonOff} onPress={() => {
            setModalVisible(true);
          }}>
          <View style={styles.dropdownButtonTextContainer}>
            <FontAwesomeIcon style={styles.dropdownButtonIcon} icon={ faCaretDown } />
            <View style={styles.buttonTextWrapper}>
              <Text style={styles.dropdownButtonText}>{dropdownValue}</Text>
            </View>
          </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.modalBackgroundView}>
            <View style={styles.modalView}>
              <View style={styles.restOfActivities}>
                <FlatList 
                  data={restOfActivities}
                  renderItem={({item, index}) =>
                    <View>
                      <TouchableOpacity onPress={() => {
                        setDropdownValue(item.title);
                        // updateGoals(item.id);
                        updateGoals(item);
                        updateStyle(item.id);
                        setModalVisible(!modalVisible);
                        }}>
                          <Text style={styles.menuOptionText}>{item.title}</Text>
                      </TouchableOpacity>
                    </View>}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

  </View>
  );
};



const styles = StyleSheet.create({
    container: {
      flexWrap: 'wrap',
      flexDirection: 'row',
        flex: 1,  // relations 1:8 with the sibling goalList
        // alignItems: 'flex-end',
        // justifyContent: 'flex-end',
        flexDirection: 'row-reverse',
        paddingRight: 11,
        paddingLeft: 11,
    },
    buttonOff: {
        // flex: 1,
        backgroundColor: 'lightblue',
        margin: 1,
        width: 70,
        height: 50,
        padding: 5,
    },
    dropdownButtonOn: {
        backgroundColor: 'pink',
        margin: 1,
        width: 99,
        // height: 50,
        padding: 10,
        paddingTop: 5,
    },
    dropdownButtonOff: {
        backgroundColor: 'lightblue',
        margin: 1,
        width: 99,
        height: 50,
        padding: 10,
        paddingTop: 5,
    },
    dropdownButtonTextContainer: {
      // flex: 1,
      flexDirection: 'row-reverse',
      alignContent: 'center',
      // alignSelf: 'center',
      justifyContent: 'center',
      // textAlign: 'center',
    },
    buttonTextWrapper: {
      // flex: 4,
      flex: 1,
      // alignSelf: 'center',
    },
    dropdownButtonIcon: {
      // flex: 1,
      marginLeft: 4,
      alignSelf: 'center',
    },
    buttonOn: {
        flex: 1,
        backgroundColor: 'pink',
        margin: 1,
        width: 70,
        height: 50,
        padding: 5,
    },
    menuOptionText: {
      fontSize: 16,
      marginBottom: 12,
      alignSelf: 'center',
    },
    recommendedActivities: {
      // flex: 1,
    },
    // modalView: {
    //   position: "absolute",
    //   top: 120,
    //   left: -8,
    //   margin: 20,
    //   backgroundColor: 'white',
    //   padding: 25,
    //   alignItems: 'center',
    //   shadowColor: '#000',
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 3.84,
    //   elevation: 5,
    // },
    modalView: {
      position: "absolute",
      top: 87,
      left: -8,
      margin: 20,
      backgroundColor: 'white',
      padding: 25,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalBackgroundView: {
      flex: 1,
      alignSelf: 'stretch',
      // backgroundColor: 'navy',
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    cancelButton: {
      backgroundColor: "#bbb",
      padding: 10,
      borderWidth: 1,
      borderColor: 'pink',
    },
    cancelButtonText: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
});

export default ActivityButtonGroup;