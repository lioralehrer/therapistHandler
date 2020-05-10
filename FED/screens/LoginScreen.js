import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Header from '../components/Header';
import LoginPlaceholder from '../components/LoginPlaceholder';


const LoginScreen = ({ navigation }) => {
    return (
        <View style ={styles.container}>
            <Header title='Spectracker' />
            <LoginPlaceholder navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default LoginScreen;