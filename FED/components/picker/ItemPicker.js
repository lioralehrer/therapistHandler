import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const ItemPicker = ({ title, arrayListItems, onSelect }) => {

    const [dropdownValue, setDropdownValue] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.buttonAreaContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setModalVisible(true);
                    }}>
                    <View style={styles.dropdownButtonContainer}>
                        <View style={styles.buttonTextWrapper}>
                            <Text style={styles.dropdownButtonText}> {dropdownValue ? title : 'בחרי ' + title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.modalView}>
                        <FlatList
                            data={arrayListItems}
                            renderItem={({ item, index }) =>
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        setDropdownValue(item.title);
                                        onSelect(item.title);
                                        setModalVisible(!modalVisible);
                                    }}>
                                        <Text style={styles.menuOptionText}>{item.title}</Text>
                                    </TouchableOpacity>
                                </View>}
                        />

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {dropdownValue && !modalVisible && <View style={styles.Pick}> 
             <Text style={styles.txt}>
                {dropdownValue}
            </Text></View>}
        </View>
    );

};


const styles = StyleSheet.create({
    button: {
        height: 30,
        padding: 5,
        backgroundColor: 'lavender',
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    dropdownButtonText: {
        fontSize: 20,
        color: 'blue'
    },
    modalView: {
        position: "absolute",
        top: 119,
        right: -8,
        margin: 20,
        backgroundColor: 'white',
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuOptionText: {
        flex: 1,
        fontSize: 16,
        marginBottom: 12,
        alignSelf: 'center',
    },
    buttonAreaContainer: {
        //    margin: 10,
        //    padding: 5

    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    icon: {
        fontSize: 35,
        paddingLeft: 29,
        color: 'darkslateblue',
        textAlign: 'center',
    },
    pick:{
        flexDirection:'row',
        justifyContent: 'space-around'
    },
    txt:{
        fontSize: 20,
        color:'blue',
    }

})


export default ItemPicker;