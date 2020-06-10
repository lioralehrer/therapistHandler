import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import TherapistScreen from '../screens/TherapistScreen';

// const screens = {
//     Login: {
//         screen: LoginScreen
//     },
//     TherapistScreen: {
//         screen: TherapistScreen
//     }
// }

const HomeStack = createStackNavigator();

export default HomeStack.Navigator;