import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global'

export default class AddMission extends Component {
   
   

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>ברוכ/ה הבא/ה </Text>
                <View style={globalStyles.btnContainer}>
                    <TouchableHighlight
                        style={globalStyles.circle}
                        underlayColor='#ccc'
                         onPress={() => this.props.navigation.navigate('Manager', { managerName:'זהבה', patient:'מיכאל'})}
                   
                   >
                        <Text style={styles.text}>  מנהל   </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={globalStyles.circle}
                        underlayColor='#ccc'
                        onPress={() => this.props.navigation.navigate('Therapist',{therapistName:'רבקה', patient:'מיכאל'})}
                    >
                        <Text style={styles.text}>  מטפל   </Text>
                    </TouchableHighlight>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        margin: 20,
        padding: 20,
        
    },
    header: {
        margin: 20,
        color: '#900',
        fontSize: 20,
    },
    text: {
        marginTop: 7,
        color: '#900',
        fontSize: 20,

    },
})