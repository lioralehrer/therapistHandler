import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import TherapistHeader from '../components/TherapistHeader';
import UpperMenu from '../components/Headers/UpperMenu';
import ActivitySelection from '../components/ActivitySelection';
 import StartSessionButton from '../components/StartSessionButton';

const TherapistScreen = ({ route, navigation }) => {

    return (
        <View style={styles.container}>
            <UpperMenu />
            <TherapistHeader navigation={navigation} route={route} />
            <ActivitySelection navigation={navigation} route={route} />
            <StartSessionButton navigation={navigation} route={route} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  })

export default TherapistScreen;