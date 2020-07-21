import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';



const LoginPlaceholder = ({ navigation }) => {
    const userInfo = [
        { userName: 'Admin', psw: '123', role: 'admin' },
        { userName: 'עדי', psw: '123', role: 'manager' },
        { userName: 'מאי', psw: '123', role: 'therapist'},
        { userName: 'הדר', psw: '123', role: 'therapist'},
        { userName: 'קורל', psw: '123', role: 'therapist' }]

    const [userName, setUserName] = useState('');
    const [psw, setPsw] = useState('');

    const isValidUser = () => {
        let u = userInfo.find((user) => {
            return user.userName == userName
        })
        if (u.psw == psw) {
            if (u.role === 'manager') {
                navigation.navigate('Manager home', { managerName: userName, patient: 'ירדן' });
            } else if (u.role === 'therapist') {
                // navigation.navigate('Therapist', { therapistName: userName, patient: 'ורד' });
                navigation.navigate('Therapist home', { userName });
            } else { Alert.alert("Handle Admin...") }
        } else {
         Alert.alert("Some Problem With User or Password... ")
        }
    }

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginInput}>
                <TextInput
                    placeholder="Name..."
                    style={styles.loginInputText}
                    blurOnSubmit={true}
                    onChangeText={(userName) => setUserName(userName)} value={userName} />
            </View>
            <View style={styles.loginInput}>
                <TextInput
                    placeholder="Password..."
                    secureTextEntry={true}
                    style={styles.loginInputText}
                    onChangeText={(psw) => setPsw(psw)} value={psw} />
            </View>
            <View style={styles.loginButton}>
                <TouchableOpacity style={styles.button} onPress={() => isValidUser()}>
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
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 20,
        marginTop: 20,
    },
    loginInput: {
        flex: 1,
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