
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Manager from './screens/Manager';
import Therapist from './screens/Therapist';

const Stack = createStackNavigator();

export default class App extends Component {
  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ title: 'ESDMbrace' }} />
          <Stack.Screen name="Manager" component={Manager} />
          <Stack.Screen name="Therapist" component={Therapist} />
        </Stack.Navigator>
      </NavigationContainer>

    )
  }
}

