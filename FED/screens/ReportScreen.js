import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Headers/Header';

const ReportSession = ({ navigation }) => {
    return (
        <View>
            <Header title='Reports' />
            <Text style={styles.txt}>under construction......</Text>
        </View>
    )
}

export default ReportSession;

const styles = StyleSheet.create({
    txt: {
        fontSize: 30,
        color: 'blue',
    }
})