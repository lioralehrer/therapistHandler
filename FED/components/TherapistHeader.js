import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const TherapistHeader = ({ userName, lastPatient }) => {

  return (
    <View style={styles.header}>
        <View style={styles.imageContainer}>
            <ImageBackground style={styles.headerImage} source={require('../assets/yarden.jpeg')}>
                    <Text style={styles.text}>   שלום
                        <Text style={styles.name}> { userName }</Text>
                        ,  {" \n " } המטופל האחרון שלך :
                         <Text style={styles.name}>{lastPatient}</Text>
                    </Text>
            </ImageBackground>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.8,
    backgroundColor: 'darkslateblue',
    justifyContent: 'center',
  },
  imageContainer: {
     flex: 1,
     flexDirection: 'column',
     backgroundColor: 'pink',
  },
  headerImage: {
     flex: 1,
     justifyContent: 'flex-end',
     resizeMode: 'cover',
  },
  text: {
     backgroundColor: 'rgba(72, 61, 139, 0.7)',
     color: '#fff',
     fontSize: 22,
     fontFamily: 'sans-serif-light',
     lineHeight: 32,
     paddingLeft: 10,
  },
  name: {
     color: '#fff',
     fontWeight: 'bold',
     fontSize: 22,
  },
})

export default TherapistHeader;