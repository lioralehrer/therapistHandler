import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import MyHeader from './MyHeader';

export default class MissionCheckbox extends Component {

    state = {
        checked: false,
    }

    render() {
        const missionsList = Object.entries(missions).map(([key, value]) => {
            return <CheckBox
                iconRight
                right
                checkedColor='green'
                title={value}
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })}
            />})
        
        return (
            <View style={styles.container}>
                <MyHeader title="בחרי משימות" />
                <View style={styles.checkbox}>
                    {missionsList}
                </View>
            </View>

        )
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#89AAFF',
        margin: 20,
    },
    checkbox: {
        margin: 20,
    }
})

const missions =['הוסיפי משימות', 'הציגי משימות בעזרת לולאה', 'סמני כל לולאה בנפרד', 'העבירי משימות לכרטיסים בעמוד אחר','עדיין הרדקודד?']



