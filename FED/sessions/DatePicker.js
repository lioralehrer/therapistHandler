import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker = ({clear, time }) => {
    const [isDatePickerVisible, setIsDatePickerVIsble] = useState(false)
    const [chosenDate, setChosenDate] = useState();
    const [clearText, setClearText] = useState(clear)
    if (clear !== clearText){
        setChosenDate('');
        setClearText(!clearText);
    }
    const showDatePicker = () => {
        setIsDatePickerVIsble(true);
    }
    const handleConfirm = (date) => {
        setIsDatePickerVIsble(false)
        setChosenDate(date.toLocaleString())
        time(date)
    }
    const hideDatePicker = () => {
        setIsDatePickerVIsble(false)
    }
    useEffect(()=>{
        // console.log("DatePicker Rendered")
        // console.log(chosenDate)
    })

    return (
        <View style={styles.container}>
            <TouchableOpacity
                underlayColor='#ccc'
                style={styles.btn}
                onPress={showDatePicker}>
                <Text style={styles.text}> תאריך ושעה</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{chosenDate ? chosenDate.substring(0, 10) + '\n' + chosenDate.substring(11, 16) : ''}  </Text>
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
        alignItems: 'center',
    },
    btn: {
        height: 30,
        padding: 5,
        backgroundColor: 'lavender',
        width:150,
        alignItems:'center',
        borderRadius:5,
        // marginTop: 15,
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'blue'
    }
})