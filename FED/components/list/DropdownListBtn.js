import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements'

const DropdownListBtn = ({ title, icon, arrayListItems, onSelect }) => {

    const [dropdownValue, setDropdownValue] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.buttonAreaContainer}>

                <TouchableOpacity style={styles.button} onPress={() => {
                    setModalVisible(true);
                }}>
                    <View style={styles.dropdownButtonContainer}>
                        <View style={styles.buttonTextWrapper}>
                            <Text style={styles.dropdownButtonText}> {dropdownValue || 'choose'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.buttonTextWrapper}>
                    <Icon
                        name={icon}

                    />
                    <Text>{title}   </Text>

                </View>
            </View>

            <Modal
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.modalBackgroundView}>
                        <View style={styles.modalView}>
                            <View style={styles.listItemsContainer}>
                                <FlatList
                                    data={arrayListItems}
                                    renderItem={({ item, index }) =>
                                        <View>
                                            <TouchableOpacity onPress={() => {
                                                setDropdownValue(item.title);
                                                onSelect(item);
                                                setModalVisible(!modalVisible);
                                            }}>
                                                <Text style={styles.menuOptionText}>{item.title}</Text>
                                            </TouchableOpacity>
                                        </View>}
                                />
                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        // flex: 1,  // relation of 1:8 with the sibling goalList
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 11,
        paddingLeft: 11,
        // borderColor: 'purple',
        // borderWidth: 1,
    },
    dropdownButtonContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        // borderColor: 'green',
        // borderWidth: 1,
    },
    buttonAreaContainer: {
        // flex: 1,
        flexDirection: 'row-reverse',
        margin: 6,
        //   borderColor: 'orange',
        //   borderWidth: 1,
    },
    buttonTextWrapper: {
        // flex: 1,
        alignSelf: 'center',
        // borderColor: 'red',
        // borderWidth: 1,
        flexDirection: 'row'
    },
    dropdownButtonText: {
        // textAlign: 'center',
        fontSize: 16,
        // height: 20,
        backgroundColor: 'lavender',
        color: 'blue'
    },
    dropdownButtonIcon: {
        flex: 1,
        marginLeft: 4,
        alignSelf: 'center',
    },
    menuOptionText: {
        flex: 1,
        fontSize: 16,
        marginBottom: 12,
        alignSelf: 'center',
    },
    modalBackgroundView: {
        flex: 1,
        alignSelf: 'stretch',
    },
    modalView: {
        position: "absolute",
        top: 119,
        // right: -8,
        right: 120,
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
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    cancelButton: {
        backgroundColor: "#bbb",
        padding: 10,
        borderWidth: 1,
        borderColor: 'pink',
    },
    cancelButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default DropdownListBtn;