import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, Button, Alert } from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';
import { globalStyles } from '../styles/global'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const MultiCheckboxDropdown = ({ title, list, checked }) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);

    const toggle = () => {
        setExpanded(!expanded);
    }
    const submit = ()=>{
        setExpanded(false);
        checked(selectedItem);
        Alert.alert(selectedItem.length +"  picked up");
    }
    return (
        <View style={styles.listing}>
            <View style={styles.text}>

                <View style={styles.head}>

                    <TouchableHighlight
                        onPress={() => toggle()}
                    >
                        <Text style={styles.title}>{title}</Text>
                        {/* <Image
                            style={{ width: 30, height: 30 }}
                            source={expanded ? require('../assets/arrow-up.jpg') : require('../assets/arrow-down.jpg')} /> */}
                    </TouchableHighlight>
                    <Icon
                        name="magnify"
                        size={25}
                        color='#A9A9A9'
                        style={{ marginHorizontal: 10, padding: 5 }}
                    />
                </View>
            </View>
            {!expanded ? <View></View> :
                <View>
                    {Object.keys(list).map((listItem, index) => {
                        return(
                        <View>
                            <ListItem
                                key={index}
                                title={
                                    <CheckBox
                                        iconRight
                                        checkedColor='green'
                                        right
                                        iconRight
                                        iconType='material'
                                        checkedIcon='clear'
                                        uncheckedIcon='add'
                                        title={listItem.description}
                                        checked={selectedItem.includes(listItem)}
                                        onPress={() => setSelectedItem(...selectedItem, listItem)}
                                    />
                                }
                                bottomDivider
                                chevron
                            />
                        </View>
                        )
                    })
                    }
                    <Button
                        title="submit"
                        onPress={() =>submit() }
                    // color='#b1b1b2'
                    />
                </View>
            }




        </View>
    );
}
export default MultiCheckboxDropdown;

const styles = StyleSheet.create({
    listing: {
        backgroundColor: '#6d3d6d',
        margin: 10,
        flex: 1
    },
    title: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
        margin: 10,
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    description: {
        color: 'red',
        paddingHorizontal: 20
    },
    greyButton: {
        height: 40,
        borderRadius: 5,
        elevation: 0,
        backgroundColor: '#b1b1b1',
    },

})