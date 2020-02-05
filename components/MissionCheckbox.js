import React, { Component } from 'react';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import MyHeader from './MyHeader';

export default class MissionCheckbox extends Component {

    state = {
        checked: false,
    }

    render() {
        return (
            <View>
                <MyHeader title="בחרי משימות" />
                <CheckBox
                    iconRight
                    right
                    checkedColor='green'
                    title='הוסף עוד משימות'
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                    iconRight
                    right
                    checkedColor='green'
                    title=' הצג משימות בעזרת לולאה '
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                    iconRight
                    right
                    checkedColor='green'
                    title='  סמני כל אחד בנפרד'
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                    iconRight
                    right
                    checkedColor='green'
                    title='   העברי משימות לכרטיסים בעמוד אחר'
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                    iconRight
                    right
                    checkedColor='green'
                    title='  עדיין הרדקוד?'
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />
            </View>

        )
    }

}