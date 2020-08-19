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
import DynamicFormInput from './DynamicFormInput';

const PlanProgram = ({ goal, closeForm }) => {
    const [counter, setCounter] = useState(goal ? goal.serialNum : 1)
    const [skillType, setSkillType] = useState(goal ? goal.skillType : '');
    const [description, setDescription] = useState(goal ? goal.description : '');
    const [subgoals, setSubgoals] = useState(goal ? goal.subGoals : '' );
    const [numOfTherapists, setNumOfTherapists] = useState(goal ? (goal.minTherapists > 0 ? goal.minTherapists.toString() : '') : '');
    const [numOfDays, setNunOfDays] = useState(goal ? goal.minConsecutiveDays : '');
    const [activities, setActivities] = useState(goal ? goal.activities : '');
    const [defaultEnv, setDefaultEnv] = useState(goal ? goal.defaultEnv : '');
    const [envs, setEnvs] = useState(goal ? goal.envs.toString() : '');
    const [clear, setClear] = useState(false);
    const { addGoal, updateGoal } = useContext(GoalContext);

  
    const handleNewGoal = () => {
        let goalId;
        if (goal !== undefined) {
            console.log("In planProgram at handleNewGoal")
            goalId = goal.id;
        }
        else {
            goalId = Math.random();
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
            envs: envs.split(" "),
            activities: activities,
            subGoals: subgoals,
        }
        console.log("GOAL:")
        console.log(g);
        if (goal !== undefined) {
            updateGoal(g)
            Alert.alert(`עודכנה מטרה מספר: ${counter}`);
            closeForm(false);

        } else {
            addGoal(g);
            handleClear();
            setCounter(counter + 1);
            Alert.alert(` נבנתה : מטרה מספר  ${counter} `)
        }

    }

    const handleClear = () => {
        setSkillType();
        setDescription();
        setSubgoals();
        setNumOfTherapists();
        setNunOfDays();
        setActivities();
        setDefaultEnv();
        setEnvs('');
        setClear(!clear);
    }

    return (
        <View style={globalStyles.body}>
            <ScrollView>
                <Text style={globalStyles.HeaderInsideText}>{`מטרה חדשה \n מטרה  ${counter}`} </Text>
                <View style={{ alignItems: 'flex-start' }}>
                    <DropdownListBtn clear={clear} title='  ניתן לשנות מספר מטרה  ' arrayListItems={getNums()} onSelect={(num) => setCounter(parseInt(num.title.replace(/-/g, "")))} />
                    <DropdownListBtn clear={clear} entity={skillType} title='תחום התפתחות' icon='rowing' arrayListItems={getSkillTypeList()} onSelect={(type) => setSkillType(type.title)} />
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
                    clear={clear}
                    title='תת מטרות'
                    btnTitle='הוסיפי תת מטרה '
                    placeholder='תת מטרה ....'
                    entity={subgoals}
                    submitTextInput={(e) => setSubgoals(e)} />

                <DynamicFormInput
                    clear={clear}
                    title='פעילויות'
                    btnTitle='הוסיפי פעילות'
                    placeholder01='שם הפעילות'
                    placeholder02='תיאור'
                    entity={activities}
                    submitTextInput={(activity) => setActivities(activity)}
                />
                <DropdownListBtn clear={clear} title='מספר מטפלים' entity={numOfTherapists} arrayListItems={getNums()} onSelect={(num) => setNumOfTherapists(parseInt(num.title.replace(/-/g, "")))} />
                <DropdownListBtn clear={clear} title='ימים עוקבים ' entity={numOfDays} arrayListItems={getNums()} onSelect={(days) => setNunOfDays(parseInt(days.title.replace(/-/g, "")))} />
                <DropdownListBtn clear={clear} title='סביבה דיפולטיבית ' entity={defaultEnv} arrayListItems={getEnvs()} onSelect={(env) => setDefaultEnv(env.title)} />
                <MultiPicker title=' סביבות נוספות' array={getEnvs()} addItems={(envs) => setEnvs(envs)} />
                <TextInput
                    style={globalStyles.input}
                    onChangeText={envs => setEnvs(envs)}
                    placeholder={envs}
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
