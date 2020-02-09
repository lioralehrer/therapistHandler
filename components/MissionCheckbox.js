import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import MyHeader from './MyHeader';

export default class MissionCheckbox extends Component {
    // constructor(props){
    //     super(props);
    //     this.missions = this.props.missions;
    // }
   
    state = {
        checked:false,
    }
    // state = {
    //     checked : [],
    // }
    componentWillMount(){
       
    }

    render() {
        const missions = this.props.missions;
        const missionsList = Object.entries(missions).map(([key, value]) => {
            return <CheckBox
                iconRight
                right
                checkedColor='green'
                title={value}
                // checked={this.state.checked[key]}
                // onPress={() => this.setState({ checked[key]: !this.state.checked[key] })}
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })}
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



