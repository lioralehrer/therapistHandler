import React, {useState}  from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';



const StartSessionButton = ({ navigation }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert("session starting")}>
                <Text style={styles.buttonText}>Start Session</Text>
            </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        minHeight: 30,
        maxHeight: 60,
        justifyContent: 'center',
        backgroundColor: 'wheat',
    },
    button: {
        padding: 12,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#c2bad8',
    },
    buttonText: {
        // color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
    },

})

export default StartSessionButton;