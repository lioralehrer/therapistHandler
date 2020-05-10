import React, {useState}  from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';



const LoginPlaceholder = ({ navigation }) => {
    const managers = ["Adi"];
    const therapists = ["Adi", "Coral", "May", "Hadar"];

    const [text, setText] = useState('');

    const onChange = textValue => setText(textValue);

    const isValidUser = (username) => {
        if (managers.includes(username) || therapists.includes(username)) {
            // Alert.alert('User is valid. Route to the tracker.');
            navigation.navigate('Therapist Home', { username });
        } else {
            Alert.alert('User is not valid!');
        }
    };

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginInput}>
                <TextInput placeholder="Name..." style={styles.loginInputText} onChangeText={onChange} value={text}/>
                {/* <TextInput placeholder="שם משתמש..." style={styles.input}/> */}
            </View>
            <View style={styles.loginInput}>
                <TextInput placeholder="Password..." style={styles.loginInputText}/>
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