import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, Alert, TouchableHighlight, Button } from 'react-native';
import { SkillContext } from '../../context/SkillContext'
import Skill from '../item/Skill';

const ChooseSkills = ({ title, skillType , addSkills }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [list , setList] = useState("")
    const { skills } = useContext(SkillContext);
    const notAcquiredSkills = skills.filter((skill) => skill.acquired !== true)

    const handleClick = (skill, bool)=>{
        if (bool){
            setList(prevState => prevState.concat( skill.title+ '\n') );
        }
    }
    const applyList = ()=>{
        addSkills(list);
        Alert.alert('בחרת: ' + list);
        setList('');
    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() =>setModalVisible(!modalVisible)} >
                <View style={styles.dropdownButtonContainer}>
                    <Text >{modalVisible ? ' סגרי ' : title}   </Text>
                </View>

            </TouchableOpacity>
            {
                modalVisible && <View style={styles.modal}>
                    <Button title='apply' onPress={()=>applyList()}/>
                    <View style={styles.container}>
                        <View style={styles.goalsList}>
                            <FlatList
                                nestedScrollEnabled={true}
                                data={skillType ? notAcquiredSkills.filter((skill) => skill.skillType === skillType) : notAcquiredSkills}
                                renderItem={({ item }) => <Skill skill={item} handleClick={(bool)=>handleClick(item, bool)} />}
                                keyExtractor={item => item.id.toString()}
                            />

                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

export default ChooseSkills;

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