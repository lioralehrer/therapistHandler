import React, { useState } from 'react';
import { View, Text, Button, Modal, Picker, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { globalStyles } from '../styles/global';
import DynamicTextInput from './DynamicTextInput';


const createArray = length => {
    const arr = [];
    let i = 1;
    while (i <= length) {
        arr.push(i.toString());
        i += 1;
    }
    return arr;
}
const NUMBERS = createArray(4);

const GoalForm = ({ txt, goal, newGoal }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const skillTypes = ['שפה אקספרסיבית', 'שפה רצפטיבית', 'כישורים חברתיים', 'התנהגות', 'מוטוריקה עדינה', 'קשב משותף', 'קוגניציה', 'משחק'];
    const [skillType, setSkillType] = useState(skillTypes[0]);
    const [title, setTitle] = useState(goal ? goal.title : '');
    const [description, setDescription] = useState(goal ? goal.description : '');
    const [subgoals, setSubgoals] = useState(goal ? goal.subgoals : [{ title: '' }]);
    const [numOfTherapists, setNumOfTherapists] = useState(goal ? goal.numOfTherapists : '1');
    const [numOfDays, setNunOfDays] = useState(goal ? goal.numOfDays : 1) ;
    const [activities, setActivities] = useState(goal ? goal.activities : '') ;
    

    const handleNewGoal = () => {
        let goalId = Math.random();
        if (goal) {
            goalId = goal.id;
        }
        
        let g = {
            id: goalId,
            skillType: skillType ? skillType : skillTypes[0],
            title: title,
            description: description,
            checked: false,
            activities: activities,
            subGoals: subgoals,
            numOfTherapists: numOfTherapists,
            numOfDays : numOfDays,
        }
        newGoal(g);
        cancel();
    }

    const cancel = () => {
        handleClear();
        setModalVisible(false);
    }
    const handleClear = ()=> {
        setSkillType('');
        setTitle('');
        setDescription('');
        setSubgoals('');
        setNumOfTherapists(1);
        setNunOfDays(1);
        setActivities('');
    }
    const renderPicker = (str) => (
        <View styl={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>{str} </Text>
            <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode="dropdown"
                selectedValue={str == "מספר מטפלים" ? numOfTherapists : numOfDays}
                onValueChange={num => { str == "מספר מטפלים" ? setNumOfTherapists(num) : setNunOfDays(num) }}
            >
                {NUMBERS.map(num => (
                    <Picker.Item key={num} label={num} value={num} />
                ))
                }
            </Picker>
        </View>
    )


    return (
        <View>

            <View style={{ marginBottom: 5, }}>
                <Button
                    onPress={() => setModalVisible(true)}
                    color="#841584"
                    title={txt}
                />
            </View>

            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                swipeArea={50}
            >
                <View style={globalStyles.body}>
                    <ScrollView>
                        <Text style={globalStyles.HeaderInsideText}>{txt} </Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <View><Text> תחום: </Text></View>
                            <Picker
                                mode="dropdown"
                                selectedValue={skillType}
                                style={{ height: 50, width: 200 }}
                                onValueChange={(itemValue, itemIndex) => setSkillType(itemValue)}
                            >
                                {
                                    skillTypes.map((e) => {
                                        return (<Picker.Item label={e} value={e} />)
                                    })
                                }
                            </Picker>
                            <TextInput
                                style={globalStyles.input}
                                placeholder=' מטרה...'
                                onChangeText={title => setTitle(title)}
                                defaultValue={title}
                            />
                            <TextInput
                                style={globalStyles.input}
                                placeholder='   תיאור...'
                                onChangeText={description => setDescription(description)}
                                defaultValue={description}
                                multiline={true}
                            />
                        </View>
                        <DynamicTextInput
                            title='תת מטרות'
                            btnTitle='הוסיפי תת מטרה '
                            placeholder='תת מטרה ....'
                            entity = {subgoals}
                            submitTextInput={(e) => setSubgoals(e)} />

                        <DynamicTextInput
                            title='פעילויות'
                            btnTitle='הוסיפי פעילות'
                            placeholder='פעילות....'
                            entity = {activities}
                            submitTextInput={(e) => setActivities(e)} />

                        <View style={globalStyles.btns}>
                            {renderPicker("מספר מטפלים")}
                            {renderPicker("ימים עוקבים")}
                        </View>


                        <View style={globalStyles.btns}>
                            <Button
                                onPress={() => cancel()}
                                color="#841584"
                                title=" בטלי"
                            />
                            <Button
                                onPress={() => handleClear()}
                                color="#841584"
                                title=" נקי"
                            />

                            <Button
                                onPress={() => handleNewGoal()}
                                color="#841584"
                                title=" עדכני"
                            />
                        </View>
                    </ScrollView>
                </View>
            </Modal>

        </View>
    )
}

export default GoalForm;

const styles = StyleSheet.create({
    picker: {
        width: 100,
        ...Platform.select({
            android: {
                color: '#89AAFF',
                backgroundColor: '#fff0f5',
            },
        }),
    },
    pickerTitle: {
        color: '#89AAFF',
        fontSize: 15,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    report: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
})