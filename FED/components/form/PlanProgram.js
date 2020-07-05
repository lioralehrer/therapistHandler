import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import DynamicTextInput from '../DynamicTextInput';
import { getSkillTypeList } from '../../store/Data';
import { getNums } from '../../store/Data';
import { getEnvs } from '../../store/Data';
import DropdownListBtn from '../list/DropdownListBtn';

const PlanProgram = () => {
    const [skillType, setSkillType] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [subgoals, setSubgoals] = useState();
    const [numOfTherapists, setNumOfTherapists] = useState();
    const [numOfDays, setNunOfDays] = useState();
    const [activities, setActivities] = useState();
    const [defaultEnv, setDefaultEnv] = useState();
    const [envs, setEnvs] = useState([]);


    const handleNewGoal = () => {
        let goalId = Math.random();
        // var res = str.replace(/\D/g, "");
        let g = {
            id: goalId,
            skillType: skillType,
            // serialNum: '',
            // title: title,
            // patientId : ??? TODO?!
            description: description,
            archived: false,
            minTherapists: numOfTherapists,
            minConsecutiveDays: numOfDays,
            defaultEnv: defaultEnv,
            // All of below doesnt exist in models BED at Goals section:
            envs: envs,
            activities: activities,
            subGoals: subgoals,
        }
        // console.log(g);
        // add new Goal to GoalContext:
        // newGoal(g);
        cancel();
    }

    const cancel = () => {
        handleClear();
    }
    const handleClear = () => {
        setSkillType('');
        setTitle('');
        setDescription('');
        setSubgoals('');
        setNumOfTherapists(1);
        setNunOfDays(1);
        setActivities('');
        setDefaultEnv('');
        setEnvs([]);
    }

    return (
        <View style={globalStyles.body}>
            <ScrollView>
                <Text style={globalStyles.HeaderInsideText}>מטרה חדשה  </Text>
                <View style={{ alignItems: 'flex-start' }}>
                    <DropdownListBtn title='תחום התפתחות' icon='rowing' arrayListItems={getSkillTypeList()} onSelect={(type) => setSkillType(type.title)} />
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
                    entity={subgoals}
                    submitTextInput={(e) => setSubgoals(e)} />

                <DynamicTextInput
                    title='פעילויות'
                    btnTitle='הוסיפי פעילות'
                    placeholder='פעילות....'
                    entity={activities}
                    submitTextInput={(e) => setActivities(e)} />

                <View style={globalStyles.btns}>

                    <DropdownListBtn title='מספר מטפלים' icon='rowing' arrayListItems={getNums()} onSelect={(num) =>setNumOfTherapists(num.title)} />
                    <DropdownListBtn title='ימים עוקבים ' icon='rowing' arrayListItems={getNums()} onSelect={(days) => setNunOfDays(days.title)} />
                </View>
                <View style={{alignItems:'flex-start'}} >
                    <DropdownListBtn title='סביבה דיפולטיבית '  arrayListItems={getEnvs()} onSelect={(env) => setDefaultEnv(env.title)} />
                    <DropdownListBtn title='סביבות נוספות  '  arrayListItems={getEnvs()} onSelect={(env) => setEnvs(env.title)} />
                
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



    )
}

export default PlanProgram;

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

})