import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


const UpperMenu = ({ route, navigation }) => {
  return (
    <View style={styles.upperMenuContainer}>
        {/* <View style={styles.wrapper1}> */}
            {/* <Icon name="ellipsis-h" style={styles.menuIcon} /> */}
            <Icon name="bars" style={styles.menuIcon} />
        {/* </View> */}
        {/* <View style={styles.wrapper2}> */}
            <Text style={styles.menuText}>Spectracker</Text>
        {/* </View> */}
    </View>
  );
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
    // borderTopWidth: 0.2,
    // borderTopColor: '#fff',
  },
//   wrapper1: {
//      flex: 1,
//   },
  menuIcon: {
     textAlign: 'left',
     color: '#fff',
     fontSize: 26,
     marginLeft: 10,
    //  backgroundColor: 'pink',
  },
//   wrapper2: {
//     flex: 5,
//  },
  menuText: {
      flex: 5,
    //  backgroundColor: 'rgb(72, 61, 139)',
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