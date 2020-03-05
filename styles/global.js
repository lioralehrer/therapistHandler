import { StyleSheet , Dimensions , Platform } from 'react-native';

export const globalStyles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      paddingTop: Platform.OS == 'ios' ? 20 : 0,
    },
    btnContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  
    HeaderInsideText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
      padding: 5,
      margin: 10,
  
    },
    circle: {
      borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
      width: Dimensions.get('window').width * 0.25,
      height: Dimensions.get('window').width * 0.25,
      backgroundColor: '#89AAFF',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modal: {
      alignItems: 'center',
      marginTop: 20,
    },
    paragraph:{
        marginVertical: 8,
        lineHeight: 20,
    },
    btnContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });

//   export const icons = {
//     'up': require('../assets/Arrowhead-01-128.png'),
//     'down': require('../assets/Arrowhead-Down-01-128.png'),
// }