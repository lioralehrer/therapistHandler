import React, { Component } from "react"
import { View, Text, StyleSheet, Image } from 'react-native'
import { Card } from 'react-native-elements'


export default class InsideSession extends Component {

    render() {
        return (
            <View style={styles.view}>
                <Card title= {"משימה: "+ this.props.mission} >
                    <View style={styles.user}>
                        <Text style={styles.card}>מספר נסיונות: </Text>
                        <Text style={styles.card}>מספר הצלחות:</Text>
                    </View>
                </Card>
            </View>
        )
    }


}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: '#FF851B',
    },
    text: {
        fontSize: 20,
        color: '#fff',
    },
    head: {
        fontSize: 20,
        color: '#888'
    }
})



