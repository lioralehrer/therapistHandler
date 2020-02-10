import React, { Component } from "react"
import { View, Text, StyleSheet, Image, Picker, Platform } from 'react-native'
import { Card } from 'react-native-elements'



const createArray = length => {
    const arr = [];
    let i = 0;
    while (i < length) {
        arr.push(i.toString());
        i += 1;
    }
    return arr;
}
const NUMBERS = createArray(12);

export default class InsideSession extends Component {

    state = {
        selectedTries: '0',
        selectedSuccesses: '0',
    }
    renderPicker = (str) => (
        <View styl={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>{str} </Text>
            <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode="dialog"
            selectedValue = {str=="נסיונות" ? this.state.selectedTries : this.state.selectedSuccesses}
            onValueChange = {num => { str=="נסיונות"?
                this.setState({selectedTries : num}) : this.setState({selectedSuccesses: num})
            }}
            >
                {NUMBERS.map(num => (
                    <Picker.Item key={num} label={num} value={num} />
                ))}
            </Picker>

        </View>
    )
    render() {
        let mission = this.props.mission;
        return (
            <View style={styles.view} key={mission.id}>
                <Card title={"משימה: " + mission.text} containerStyle={styles.card}>
                    <View style={styles.report}>
                        {this.renderPicker("הצלחות")}
                        {this.renderPicker("נסיונות")}
                    </View>
                </Card>
            </View>
        )
    }


}
const styles = StyleSheet.create({
    card: {
        padding: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ff69b4',
        backgroundColor: '#fff0f5',
    },
    report: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    picker: {
        width: 100,
        ...Platform.select({
            android: {
                color: '#89AAFF',

                backgroundColor: '#fff0f5',
                marginLeft: 10,
            },
        }),
    },
    pickerTitle: {
        color: '#89AAFF',
        fontSize: 15,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

})



