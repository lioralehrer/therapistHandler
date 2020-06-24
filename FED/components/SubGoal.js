import React, { useState } from 'react';
import { View, Text, StyleSheet,  Platform, Button } from 'react-native';
// import { View, Text, StyleSheet, Picker, Platform, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import { globalStyles } from '../styles/global';

const createArray = length => {
    const arr = [];
    let i = 0;
    while (i <= length) {
        arr.push(i.toString());
        i += 1;
    }
    return arr;
}
const NUMBERS = createArray(12);

const SubGoal = ({ subGoal, index, tries, succseses }) => {
    const [selectedTries, setTries] = useState(subGoal.tries);
    const [selectedSuccesses, setSucceses] = useState(subGoal.succseses);

    const handleTries = (num) => {
        setTries(num);
        tries(num);
    }
    const handleSucces = (num) => {
        setSucceses(num);
        succseses(num)
    }
    const renderPicker = (str) => (
        <View styl={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>{str} </Text>
            {/* <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode="dropdown"
                selectedValue={str == "נסיונות" ? selectedTries : selectedSuccesses}
                onValueChange={num => { str == "נסיונות" ? handleTries(num) : handleSucces(num) }}
            >
                {str == "נסיונות" ? NUMBERS.map(num => (
                    <Picker.Item key={num} label={num} value={num} />
                )) : createArray(selectedTries).map(num => (<Picker.Item key={num} label={num} value={num} />))
                }
            </Picker> */}
        </View>
    )
    const activityList = Object.keys(subGoal.activities).map((activity, i) => {
        return (
            <Button
                onPress={() => null}
                color="#841584"
                title={subGoal.activities[activity]}
            />
        )
    })

    return (
        <View>
            <ListItem
                key={index}
                title={subGoal.text}
                subtitle={<View style={styles.report}>
                    {renderPicker("הצלחות")}
                    {renderPicker("נסיונות")}
                </View>}
                topDivider
                chevron
            >
            </ListItem>
            <View><Text> פעילות:</Text></View>
            <View style={globalStyles.btns}>
                {activityList}
            </View>
        </View>
    )
}

export default SubGoal;

const styles = StyleSheet.create({
    report: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    picker: {
        width: 100,
        ...Platform.select({
            android: {
                color: '#89AAFF',
                backgroundColor: '#fff0f5',
            },
        }),
    },
    pickerTitle: {
        color: '#89AAFF',
        fontSize: 15,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})