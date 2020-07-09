import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const Item = ({ item, handleClick}) => {
     const [choosen, setChoosen] = useState(false)

     const HandleChoosen = () => {
         setChoosen(!choosen);
         handleClick(!choosen)
     }

    return (

        <TouchableHighlight
            key={item.id}
            onPress={() => HandleChoosen()}
            style={styles.container}
        >
            <View style={choosen ? styles.choosenItem : styles.item}>
                <Text>{item.title}</Text>
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
    item: {
        backgroundColor: 'white',
        justifyContent:'space-between',
         flexDirection: 'row-reverse',
         height:40
    },
    choosenItem:{
        backgroundColor: '#ff7f50',
        justifyContent:'space-between',
         flexDirection: 'row-reverse',
         height:40
    },
    levelContainer:{
        backgroundColor:'lightcoral',
        width:30,
        padding:5,

    }
  
})

export default Item;