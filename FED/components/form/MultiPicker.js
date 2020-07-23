import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Button } from 'react-native';
import Item from '../item/Item';

const MultiPicker = ({ title, array, addItems }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [list, setList] = useState("");

    const handleClick = (item, bool) => {
        if (bool) {
            // TO DO : make it array of strings not one string!
            if (!list.includes(item)) {
                setList(prevState => prevState.concat(item + '\n'));
            }

        }else{
            if (list.includes(item)){
                setList(prevState => prevState.replace(item, ''))
            }
        }

    }
    const applyList = () => {
        addItems(list);
        Alert.alert('בחרת: ' + list);
        setList('');
    }
   

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(!modalVisible)} >
                <View style={styles.dropdownButtonContainer}>
                    <Text >{modalVisible ? ' סגרי ' : title}   </Text>
                </View>

            </TouchableOpacity>
            {
                modalVisible && <View style={styles.modal}>
                    <Button title='apply' onPress={() => applyList()} />
                    <View style={styles.container}>
                        <View style={styles.goalsList}>
                            <FlatList
                                nestedScrollEnabled={true}
                                data={array}
                                renderItem={({ item }) => <Item item={item} handleClick={(bool) => handleClick(item.title, bool)} />}
                                keyExtractor={item => item.id}
                            />

                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

export default MultiPicker;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
    },
    btn: {
        height: 30,
        padding: 5,
        backgroundColor: 'lavender',
    },
    dropdownButtonContainer: {
        alignItems: 'center',
    },
    modal: {
        // height: 200,
        backgroundColor: 'wheat',
        padding: 10,
        margin: 1,
        borderColor: '#ddd',
        borderWidth: 1
    },
    itemContainer: {
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
        flexDirection: 'row',
        alignItems: 'center'
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
    },
    textContainer: {
        padding: 10,
    }
})