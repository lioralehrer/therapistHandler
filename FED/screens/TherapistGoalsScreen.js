import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import UpperMenu from '../components/UpperMenu';


const TherapistGoalsScreen = ({ navigation }) => {
    return (
        <View style ={styles.container}>
            <UpperMenu />
            <Text>Therapist goals</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default TherapistGoalsScreen;