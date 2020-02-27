import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class AddMission extends Component {
   constructor(props){
       super(props);
       this.state ={text:''};
   }
    addMission = (text) => {
        this.setState({ text })
        this.props.addMission(text)
        this.setState({ text:'' })
    }
    render() {
        return (
            <View style={styles.InputContainer}>
                <Icon
                    name='rocket'
                    size={24}
                    color='#900'
                    style={styles.icon}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Add Mission Here"
                    onChangeText={(text) => {this.setState({ text })}}
                    value={this.state.text}
                    editable={true}
                    // maxLength={40}
                    blurOnSubmit={true}
                />
                <TouchableHighlight
                    style={styles.circle}
                    underlayColor='#ccc'
                    onPress={() =>  this.addMission(this.state.text)}
                >
                    <Text style={styles.text}>  הוסף   </Text>
                </TouchableHighlight>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    InputContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        padding: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ff9ff9',
        justifyContent: 'center',
        margin: 25,
        marginTop: 0,
    },
    circle: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#fff0f5',
        borderRadius: 40 / 2,
        backgroundColor: '#fff0f5',
        marginRight: 15,
    },
    text:{
       marginTop: 7,
       color:'#900',
       alignContent:'center'
       
       
    },
    icon:{
        marginTop: 7,
        marginLeft: 15,
        
    }
})