import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, Picker } from 'react-native';


const DropDownList = ({ title, pickList, handleItem }) => {
    const [item, setItem] = useState('');
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
                underlayColor='#ccc'
                style={styles.btn}
            >
                <Picker
                    selectedValue={item}
                    itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
                    onValueChange={(itemValue, itemIndex) =>{setItem(itemValue); handleItem(itemValue)}} >
                    {pickList.map((pick, i) => <Picker.Item label={pick} value={pick} key={i} />)}
                </Picker>
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
        </View >
    )
}

export default DropDownList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 50,
    },
    insideTouchableOpacity:{
       
    },
    btn: {
        width: 200,
        height: 50,
        backgroundColor: '#89AAFF',
        borderRadius: 20,
        marginTop: 15,
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        padding:10
    }
})