import React from 'react';
import { View, StyleSheet } from 'react-native';
import TherapistHeader from '../components/TherapistHeader' ;
import SessionConfig from '../components/SessionConfig';
import UpperMenu from '../components/UpperMenu';

const Therapist = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <UpperMenu />
            <TherapistHeader navigation={navigation} route={route} />
            <SessionConfig  navigation={navigation} route={route} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  })

export default Therapist;