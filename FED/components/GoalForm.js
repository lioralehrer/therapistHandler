import React, { useState } from 'react';
import { View, Text, TextInput, Button, Keyboard, Modal, TouchableHighlight} from 'react-native';
import { globalStyles } from '../styles/global';


export default function GoalForm({ txt, goal, newGoal }) {
    const [modalVisible, setModalVisible] = useState( false);
    const [title, setTitle] = useState(goal? goal.title : '');
    const [description, setDescription] = useState(goal? goal.description : '');
    const [subGoal1, setSubGoal1] = useState(goal? goal.subGoals[0].text : '');
    const [subGoal2, setSubGoal2] = useState(goal? goal.subGoals[1].text : '');
    const [subGoal3, setSubGoal3] = useState(goal? goal.subGoals[2].text : '');
    const [subGoal4, setSubGoal4] = useState(goal? goal.subGoals[3].text : '');

    const handleNewGoal = () => {
        let goal= {
            id : Math.random(),
            title: title,
            description: description,
            checked: false,
            subGoals: [
                { id: 1, text: subGoal1, checked: false, tries: 0, succseses: 0, active: true },
                { id: 2, text: subGoal2, checked: false, tries: 0, succseses: 0, active: true },
                { id: 3, text: subGoal3, checked: false, tries: 0, succseses: 0, active: true },
                { id: 4, text: subGoal4, checked: false, tries: 0, succseses: 0, active: true }]
        }
        newGoal(goal);
        setModalVisible(false)
        setTitle('');
        setDescription('');
        setSubGoal1('');
        setSubGoal2('');
        setSubGoal3('');
        setSubGoal4('');

    }
    const cancel = () => {
        setModalVisible(false);
    }

    return (
        <View>
            <View style={{marginBottom:5,}}>
            <Button
                    onPress={() => setModalVisible(true)}
                    color="#841584"
                    title= {txt}
                />
            </View>
           
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
                swipeArea={50}
            >
                <View style={globalStyles.body}>
                 <Text style={globalStyles.HeaderInsideText}>{txt} </Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder=' מטרה...'
                    onChangeText={title => setTitle(title)}
                    defaultValue={title}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder='  תיאור...'
                    onChangeText={description => setDescription(description)}
                    defaultValue={description}
                    multiline={true}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder=' תת מטרה 1'
                    onChangeText={subGoal1 => setSubGoal1(subGoal1)}
                    defaultValue={subGoal1}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder=' תת מטרה 2'
                    onChangeText={subGoal2 => setSubGoal2(subGoal2)}
                    defaultValue={subGoal2}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder=' תת מטרה 3'
                    onChangeText={subGoal3 => setSubGoal3(subGoal3)}
                    defaultValue={subGoal3}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder=' תת מטרה 4'
                    onChangeText={subGoal4 => setSubGoal4(subGoal4)}
                    defaultValue={subGoal4}
                />
                <View style={globalStyles.btns}>
                    <Button
                        onPress={() => cancel()}
                        color="#841584"
                        title=" בטלי"
                    />
                    <Button
                        onPress={() => handleNewGoal()}
                        color="#841584"
                        title=" עדכני"
                    />
                </View>
                </View>
            </Modal>
        </View>
    )
}
