/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Manager from './screens/Manager';
import Therapist from './screens/Therapist'
import LoginScreen from './screens/LoginScreen';
import TherapistScreen from './screens/TherapistScreen'

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
          <Stack.Screen name="Manager" component={Manager} options={{headerShown:false}} />
          <Stack.Screen name="Therapist" component={TherapistScreen} options={{headerShown:false}}/>
          {/* <Stack.Screen name="Therapist" component={Therapist} options={{headerShown:false}}/> */}
        </Stack.Navigator>
      </NavigationContainer>
  );
};


export default App;
