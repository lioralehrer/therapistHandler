import React, {useState}  from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


const SessionConfig = ({ navigation }) => {
    return (
        <View style={styles.configContainer}>
            <Text style={styles.text}>To start a new session please select one of the two:</Text>
            <View style={styles.buttonsContainer}>
                <View style={styles.goalsButton}>
                    <TouchableOpacity style={styles.button} onPress={() => { 
                        navigation.navigate('Therapist Goals');
                    }}>
                        <Icon name="bullseye" style={styles.goalsIcon} />
                        <Text style={styles.buttonText}>Goals</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.textWrapper}>
                    <Text style={styles.text}>Or</Text>
                </View> */}
                <View style={styles.activityButton}>
                    <TouchableOpacity style={styles.button} onPress={() => isValidUser(text)}>
                        {/* <Icon name="cube" style={styles.buttonIcon} /> */}
                        <Icon name="puzzle-piece" style={styles.activityIcon} />
                        <Text style={styles.buttonText}> Activity</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
    configContainer: {
        flex: 1,
        // margin: 20,
        marginTop: 30,
        // paddingTop: 30,
    },
    text: {
        fontSize: 20,
        fontFamily: 'sans-serif-light',
        color: '#555',
        textAlign: 'center',
    },
    buttonsContainer: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    goalsButton: {
        flex: 0.8,
        maxHeight: 170,
        justifyContent: 'center',
        backgroundColor: '#c2bad8',
        marginLeft: 6,
    },
    activityButton: {
        flex: 0.8,
        maxHeight: 170,
        justifyContent: 'center',
        backgroundColor: '#c2bad8',
        marginLeft: 6,
        marginRight: 6,
    },
    button: {
        // padding: 12,
    },
    buttonText: {
        color: 'darkslateblue',
        fontFamily: 'sans-serif',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 18,
    },
    goalsIcon: {
        fontSize: 95,
        color: 'darkslateblue',
        textAlign: 'center',
    },
    activityIcon: {
        fontSize: 95,
        paddingLeft: 29,
        color: 'darkslateblue',
        textAlign: 'center',
    },
    textWrapper: {
        flex: 0.1,
        // backgroundColor: 'pink',
        justifyContent: 'center',
        maxWidth: 30,
        maxHeight: 120,
        margin: 10,

    },

})

export default SessionConfig;