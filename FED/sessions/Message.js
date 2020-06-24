import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';


const Message = ({ message }) => {
    const [text, setText] = useState('')
    return (
        <View style={styles.textAreaContainer} >
            <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="הערות...."
                placeholderTextColor="grey"
                numberOfLines={2}
                multiline={true}
                onChangeText={(text) => setText(text)}
                onBlur = {()=>message(text)}
                value={ text }
            />
        </View>
    )
}

export default Message;

const styles = StyleSheet.create({
    textAreaContainer: {
        borderColor: '#a9a9a9',
        borderWidth: 1,
        borderRadius: 30,
        padding: 5,
        margin: 10,
        backgroundColor: '#fff8dc',
        marginHorizontal: 50,
    },
    textArea: {
        fontSize: 18,
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        padding: 20,
    }
})