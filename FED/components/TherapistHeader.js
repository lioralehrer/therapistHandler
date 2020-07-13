import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';

const TherapistHeader = ({ route, navigation }) => {

  const { username }= route.params;
  const lastPatient = 'ירדן';
  //const patientImage = {require('../assets/Yardeni.jpg')};

  const getSessionTime = () => {
    return ({
      date: "7.3.2020",
      hour: "11:00",
    });
  };
  

  return (
    <View style={styles.header}>
        {/* <View style={styles.imageContainer}>
            <ImageBackground style={styles.headerImage} source={require('../assets/Yardeni-cropped01.jpg')}> */}
                    {/* <Text style={styles.text}>Welcome */}
                    <View style={styles.timeTextWrapper}>
                      {/* <Text style={styles.text}>טיפול זה נקבע ל: {"\n"} {getSessionTime().date} {"\n"} {getSessionTime().hour}</Text> */}
                      <Text style={styles.text}>הטיפול הקרוב נקבע ל: {"\n"} {getSessionTime().date} {"\n"} {getSessionTime().hour}</Text>
                    </View>
                    <View style={styles.helloTextWrapper}>
                      <Text style={styles.text}>שלום 
                          <Text style={styles.name}> { username }</Text>
                          {/* , {"\n"}Your patient is <Text style={styles.name}>{lastPatient}</Text> */}
                          , {"\n"}המטופלת שלך היא  <Text style={styles.name}>{lastPatient}</Text>
                          {/* . המטופלת שלך היא <Text style={styles.name}>{lastPatient}</Text> */}
                      </Text>
                    </View>
            {/* </ImageBackground>
        </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'honeydew',
    paddingTop: 30,
    // backgroundColor: 'darkslateblue',
    // justifyContent: 'center',
  },
  // imageContainer: {
  //    flex: 1,
  //    flexDirection: 'column',
  //    backgroundColor: 'pink',
  // },
//   textContainer: {
//      flex: 1,
//   },
  // headerImage: {
  //    flex: 1,
  //    justifyContent: 'flex-end',
  //    resizeMode: 'cover',
  // },
  timeTextWrapper: {
    // flex: 1,
  },
  helloTextWrapper: {
    // flex: 2,
  },
  text: {
    //  backgroundColor: 'rgba(72, 61, 139, 0.7)',
    //  color: '#fff',
     color: 'darkslateblue',
    //  fontSize: 20,
     fontSize: 16,
     fontFamily: 'sans-serif-light',
    //  lineHeight: 32,
     paddingLeft: 10,
     paddingRight: 10,
    //  textAlign: 'center',
  },
  name: {
    //  color: '#fff',
     color: 'darkslateblue',
     fontWeight: 'bold',
    //  fontSize: 20,
     fontSize: 16,
  },
})

export default TherapistHeader;