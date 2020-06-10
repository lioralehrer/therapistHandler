import React, { useState } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { moment } from 'react-native-modal-datetime-picker';

const DatePicker = () => {
    const [isDatePickerVisible, setIsDatePickerVIsble] = useState(false)
    const [chosenDate, setChosenDate] = useState()
    const showDatePicker = () => {
        setIsDatePickerVIsble(true);
    }
    const handleConfirm = (date) => {
        setIsDatePickerVIsble(false)
        setChosenDate(date.toLocaleString())
    }
    const hideDatePicker = () => {
        setIsDatePickerVIsble(false)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{chosenDate ? chosenDate.substring(0, 10) + '\n' + chosenDate.substring(11, 16) : ''}  </Text>
            <TouchableOpacity
                underlayColor='#ccc'
                style={styles.btn}
                onPress={showDatePicker}>
                <Text style={styles.text}> תאריך ושעה</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

        </View>);
}
export default DatePicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    btn: {
        width: 200,
        height: 50,
        backgroundColor: '#89AAFF',
        borderRadius: 30,
        marginTop: 15,
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    }
})