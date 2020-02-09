import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import MyHeader from './MyHeader';

export default class MissionCheckbox extends Component {
    checkedMission (id){
      this.props.checkedMission(id)
 }

    render() {
        const missions = this.props.missions;
        const missionsList = Object.entries(missions).map(([key, value]) => {
            return <CheckBox
                iconRight
                right
                checkedColor='green'
                title={value.text}
                checked={value.checked}
                onPress={() => this.checkedMission(value.id)}
            />
        })
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



