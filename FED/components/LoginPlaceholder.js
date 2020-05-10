import React, {useState}  from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';



const LoginPlaceholder = ({ navigation }) => {
    const managers = ["עדי"];
    const therapists = [ "קורל", "מאי", "הדר"];

    const [text, setText] = useState('');

    const onChange = textValue => setText(textValue);

    const isValidUser = (username) => {
        if (therapists.includes(username)) {
            navigation.navigate('Therapist', { therapistName: username, patient: 'ורד'});
        }else if (managers.includes(username)) {
            navigation.navigate('Manager', { managerName: username, patient: 'ורד'})
        } else {
            alert("No User named: "+ username + "\n  Please Sign in ")
        }
    };

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginInput}>
                <TextInput 
                placeholder="Name..." 
                style={styles.loginInputText} 
                blurOnSubmit ={true}
                onChangeText={onChange} value={text}/>
            </View>
            <View style={styles.loginInput}>
                <TextInput 
                placeholder="Password..." 
                secureTextEntry={true}
                style={styles.loginInputText}/>
                
                </View>
            <View style={styles.loginButton}>
                <TouchableOpacity style={styles.button} onPress={() => isValidUser(text)}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'pink',
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 20,
        marginTop: 20,
    },
    loginInput: {
        flex: 1,
        // backgroundColor: 'steelblue',
        maxHeight: 58,
        borderWidth: 1,
        borderColor: 'lightgrey',
        justifyContent: 'center',
        marginBottom: 8,
    },
    loginButton: {
        flex: 0.2,
        minHeight: 30,
        maxHeight: 60,
        justifyContent: 'center',
        backgroundColor: '#c2bad8',
    },
    loginInputText: {
        paddingLeft: 10,
        fontSize: 18,
        minHeight: 30,
        maxHeight: 60,
    },
    button: {
        padding: 12,
    },
    loginButtonText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
    },

})

export default LoginPlaceholder;