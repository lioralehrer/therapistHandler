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
import LoginScreen from './screens/LoginScreen';
import TherapistScreen from './screens/TherapistScreen'
import ManagerScreen from './screens/ManagerScreen';
import BuildPlanScreen from './screens/SyllabusScreen';
import SyllabusScreen from './screens/SyllabusScreen';
import PlanSessionScreen from './screens/PlanSessionScreen';
import ReportScreen from './screens/ReportScreen';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Manager" component={Manager} options={{headerShown:false}} /> */}
        <Stack.Screen name="Manager home" component={ManagerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Therapist home" component={TherapistScreen} options={{ headerShown: false }} />
        {/* Navigate From Manager Screen: */}
        <Stack.Screen name="Syllabus" component={SyllabusScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Build Plan" component={BuildPlanScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Plan Session" component={PlanSessionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Reports" component={ReportScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
