import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, ScrollView, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import DynamicTextInput from '../DynamicTextInput';
import { getSkillTypeList } from '../../store/Data';
import { getNums } from '../../store/Data';
import { getEnvs } from '../../store/Data';
import DropdownListBtn from '../list/DropdownListBtn';
import ChooseSkills from './ChooseSkills';
import { GoalContext } from '../../context/GoalContext';
import MultiPicker from './MultiPicker';

const PlanProgram = () => {
    const [counter, setCounter] = useState(1)
    const [skillType, setSkillType] = useState();
    const [description, setDescription] = useState();
    const [subgoals, setSubgoals] = useState();
    const [numOfTherapists, setNumOfTherapists] = useState();
    const [numOfDays, setNunOfDays] = useState();
    const [activities, setActivities] = useState();
    const [defaultEnv, setDefaultEnv] = useState();
    const [envs, setEnvs] = useState();
    const { addGoal } = useContext(GoalContext);

    const handleNewGoal = () => {
        let goalId = Math.random();
        let en = () => {
            if (envs) {
                return envs.split(" ");
            }
            return envs
        }
        let g = {
            id: goalId,
            serialNum: counter,
            skillType: skillType,
            description: description,
            archived: false,
            minTherapists: numOfTherapists,
            minConsecutiveDays: numOfDays,
            defaultEnv: defaultEnv,
            envs: en,
            activities: activities,
            subGoals: subgoals,
        }
        console.log(g);
        addGoal(g);
        setCounter(counter + 1);
        handleClear();
        Alert.alert(` נבנתה : מטרה מספר  ${counter} `)
    }

    const handleClear = () => {
        setSkillType();
        setDescription();
        setSubgoals();
        setNumOfTherapists();
        setNunOfDays();
        setActivities();
        setDefaultEnv();
        setEnvs();
    }

    return (
        <View style={globalStyles.body}>
            <ScrollView>
                <Text style={globalStyles.HeaderInsideText}>{`מטרה חדשה \n מטרה  ${counter}`} </Text>
                <View style={{ alignItems: 'flex-start' }}>
                    <DropdownListBtn title='  ניתן לשנות מספר מטרה  ' arrayListItems={getNums()} onSelect={(num) => setCounter(parseInt(num.title.replace(/-/g, "")))} />
                    <DropdownListBtn title='תחום התפתחות' icon='rowing' arrayListItems={getSkillTypeList()} onSelect={(type) => setSkillType(type.title)} />
                    <ChooseSkills title='בחרי מטרות מתוך המאגר' skillType={skillType} addSkills={(skills) => setDescription(skills)} />
                    <TextInput
                        style={globalStyles.input}
                        placeholder={description}
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

                <DropdownListBtn title='מספר מטפלים' arrayListItems={getNums()} onSelect={(num) => setNumOfTherapists(parseInt(num.title.replace(/-/g, "")))} />
                <DropdownListBtn title='ימים עוקבים ' arrayListItems={getNums()} onSelect={(days) => setNunOfDays(parseInt(days.title.replace(/-/g, "")))} />
                <DropdownListBtn title='סביבה דיפולטיבית ' arrayListItems={getEnvs()} onSelect={(env) => setDefaultEnv(env.title)} />
                <MultiPicker title='בחרי סביבות נוספות' array={getEnvs()} addItems={(envs) => setEnvs(envs)} />
                <TextInput
                    style={globalStyles.input}
                    placeholder={envs}
                    // onChangeText={envs => setEnvs(envs)}
                    defaultValue={envs}
                    multiline={true}
                />
                <View style={globalStyles.btns}>

                    <Button
                        onPress={() => handleClear()}
                        color="#841584"
                        title="ניקוי טופס"
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
