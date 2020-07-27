import React, { useState, useContext } from 'react';
import { View, Alert, Text, StyleSheet, TouchableHighlight } from 'react-native';

const SelectedItem = ({ clear, item, handleItem }) => {
    const [selected, setselected] = useState(false)
    // const [clearText, setClearText] = useState(clear);
    // if (clearText !== clear) {
    //     setselected(false);
    //     setClearText(!clearText);
    // }

    const Handleselected = () => {
        setselected(!selected);
        handleItem(!selected);
    }

    return (

        <TouchableHighlight
            key={item.id}
            onPress={() => Handleselected()}
            style={styles.container}
        >
            <View style={selected ? styles.selectedSkill : styles.skill}>
                <View style={styles.levelContainer}>
                    <Text style={styles.level}>{item.serialNum}</Text>
                </View>
                <Text>{item.description}</Text>
            </View>
        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingTop: 8,
        paddingBottom: 10,
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#ddd',
        margin: 2,
        marginLeft: 11,
        marginRight: 11,
        height: 50,

    },
    skill: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        height: 40
    },
    selectedSkill: {
        backgroundColor: 'lightblue',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        height: 40
    },
    levelContainer: {
        backgroundColor: 'lightcoral',
        width: 30,
        padding: 5,

    },
    level: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    }
})

export default SelectedItem;