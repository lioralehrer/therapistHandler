import { StyleSheet , Dimensions } from 'react-native'

const screen = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#07121B',
    },
    btnContainer: {
      flex: 1,
      alignItems: 'center',
      margin: 20,
      padding: 10,
    },
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 5,
      borderColor: '#89AAFF',
      width: screen.width / 2,
      height: screen.width / 3,
      borderRadius: screen.width / 2,
  
    },
    stopBtn: {
      borderColor: '#FF851B',
      borderWidth: 5,
      borderRadius: screen.width / 2,
      margin:10,
    },
    stopTextBtn: {
      color: '#FF851B',
      fontSize:25,
      fontWeight: 'bold',
      padding:10,
    },
    textButtton: {
      fontSize: 25,
      color: '#89AAFF',
      fontWeight: 'bold',
    },
    pauseButton:{
      padding:0,
      fontSize: 15,
      fontWeight:'bold',
      color:'#FF851B',
      marginTop: 5,
      paddingLeft: 60,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
    time: {
      color: "#fff",
      fontSize: 90,
    }
  })

 