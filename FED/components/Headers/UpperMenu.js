import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const UpperMenu = ({ route, navigation }) => {
  return (
    <View style={styles.upperMenuContainer}>
            <Icon name="bars" style={styles.menuIcon} />
            <Text style={styles.menuText}>Spectracker</Text>
     
    </View>
  )
};

const styles = StyleSheet.create({
  upperMenuContainer: {
    // flex: 0.13,
    flex: 0.5,
    maxHeight: 40,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkslateblue',
    color: '#fff',
  },
  menuIcon: {
     textAlign: 'left',
     color: '#fff',
     fontSize: 26,
     marginLeft: 10,
  },
  menuText: {
      flex: 5,
     color: '#fff',
     fontSize: 22,
     fontFamily: 'sans-serif-light',
     lineHeight: 32,
     paddingLeft: 10,
     textAlign: 'center',
     marginLeft: -32,
  },
})

export default UpperMenu;