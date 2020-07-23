import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, Picker } from 'react-native';



const DropDownList = ({ title, width, pickList, handleItem }) => {
    const [item, setItem] = useState('');
    return (
        <View style={styles.container}>
              <Text style={styles.text}>{title}</Text>
            <TouchableOpacity
                underlayColor='#ccc'
                style={styles.btn}
            >
                <Picker
                    mode="dropdown"
                    style={{ width: width || 120 }}
                    selectedValue={item}
                    // itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
                    onValueChange={(itemValue, itemIndex) =>{setItem(itemValue); handleItem(itemValue)}} >
                    {pickList?.map((pick, i) => <Picker.Item label={pick} value={pick} key={i} />)}
                </Picker>
            </TouchableOpacity>
          
        </View >
    )
}

export default DropDownList;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'row',
        //  justifyContent: 'flex-end',
        alignItems: 'center',
        padding:10
    },
    insideTouchableOpacity:{
       
    },
    btn: {
        // width: 200,
        height: 50,
        backgroundColor: '#89AAFF',
         borderRadius: 5,
        marginTop: 15,
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        // padding:10
    }
})