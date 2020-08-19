import React, { useState, useContext, useEffect } from 'react';
import { View, Alert, Button, Text, StyleSheet } from 'react-native';
import { SessionContext } from '../context/SessionContext';
import { GoalContext } from '../context/GoalContext';
import DatePicker from './DatePicker';
import Message from './Message';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import axios from 'axios';
import SelectGoals from '../components/form/SelectGoals';
import DropdownListBtn from '../components/list/DropdownListBtn';
import ItemPicker from '../components/picker/ItemPicker';
import { globalStyles } from '../styles/global';


//  async () => {
// console.log("blabal")
// try {
//     let response = await fetch(
//         'https://10.0.2.2:5000/api/goals'
// 'http://87.70.88.0:5000/api/goals'
//             , {
//                 method: 'GET',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//             }
//         );
//         let json = await response.json();
//         console.log("THIS IS GOALS: ")
//         console.log(json)
//         return json;
//     } catch (error) {
//         console.log("HILAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
//         console.log("THIS IS EROOR" + error);
//     }
// }
//   body: JSON.stringify({
//     firstParam: 'yourValue',
//     secondParam: 'yourOtherValue'
//   })
// });

const getTherapistList = () => {
    const therapistList = [{ title: 'קורל' }, { title: 'הדר' }, { title: 'מאי' }, { title: 'עדי' }]
    return therapistList
}


export const AddSession = ({ oldsession, closeForm }) => {
    const [clear, setclear] = useState(false)
    const [session, setSession] = useState(
        {
            goals: oldsession ? oldsession.goals : [],
            therapist: oldsession ? oldsession.therapist : '',
            scheduledAt: oldsession ? oldsession.scheduledAt.toLocaleString() : '',
            activities: oldsession ? oldsession.activities : [],
            sessionPlanMessage: oldsession ? oldsession.sessionPlanMessage : '',
            id: oldsession ? oldsession.id : Math.floor(Math.random() * 100000000),
        });
    const { goals } = useContext(GoalContext);
    const listOfGoalsId = () => {
        let myGoals = session.goals;
        let goalIdList = [];
        if (oldsession) {
            myGoals.forEach(goal => goalIdList.push(goal.id));
            return goalIdList;
        }
    }
    const listOfActivitiesId = () => {
        let activities = session.activities;
        let actIdList = [];
        if (oldsession) {
            activities.forEach(act => actIdList.push(act.id));
            return actIdList;
        }
    }
    const { addSession, updateSession } = useContext(SessionContext);
    const getActivityList = () => {
        let activities = [];
        let goalList = session.goals;
        goalList.forEach(goal => goal.activities.forEach(act => activities.push(act)))
        return activities
    }

    useEffect(() => {
        // axios.get('../data.json')
        // axios.get('https://jsonplaceholder.typicode.com/posts')
        // axios.get('http://localhost/api/goals')
        // .then((res) => {
        //     console.log(res.data)
        // })
        // .catch(error => console.log(error));
    })

    const handleSelectedItems = (listOfId, list, sessionProperty) => {
        const newList = [];
        listOfId.forEach(e => {
            const filtered = list.filter((item) => item.id === e);
            filtered.forEach(element => {
                newList.push(element)
            });
        });
        switch (sessionProperty) {
            case 'goals':
                setSession({ ...session, goals: newList });
                break;
            case 'activities':
                setSession({ ...session, activities: newList });
                break;
        }
    }
    const handleClear = () => {
        setSession({
            goals: [],
            therapist: '',
            scheduledAt: '',
            activities: [],
            sessionPlanMessage: '',
            id: Math.floor(Math.random() * 100000000),
        })
        setclear(!clear);
    }

    const onSubmit = () => {
        if (oldsession === undefined) {
            addSession(session);
            Alert.alert("נוצר סשיין חדש  " + session.sessionPlanMessage);
            handleClear();
        }
        else {
            updateSession(session);
            Alert.alert(`עודכן סשיין   ${session.scheduledAt} `);
            closeForm(false);
        }



    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <DatePicker
                    entity={oldsession}
                    clear={clear}
                    time={(t) => setSession({ ...session, scheduledAt: t })}
                />
                <ItemPicker
                    entity={oldsession}
                    clear={clear}
                    title=" מטפלת"
                    arrayListItems={getTherapistList()}
                    onSelect={(therapist) => setSession({ ...session, therapist })}
                />
            </View>
            <MultiSelectDropdown
                clear={clear}
                entity={listOfGoalsId()}
                title="מטרות...."
                list={goals}
                handleList={(listOfId) => handleSelectedItems(listOfId, goals, 'goals')}
            />
            <MultiSelectDropdown
                clear={clear}
                entity={listOfActivitiesId()}
                title="פעילויות..."
                list={getActivityList()}
                handleList={(listOfId) => handleSelectedItems(listOfId, getActivityList(), 'activities')}
            />
            <Message
                clear={clear}
                entity={oldsession}
                message={(msg) => setSession({ ...session, sessionPlanMessage: msg })}
            />
            <View style={globalStyles.btns}>
                <Button
                    onPress={() => onSubmit()}
                    color="#841584"
                    title=" submit"
                />
                <Button
                    onPress={() => handleClear()}
                    color="#841584"
                    title="ניקוי טופס"
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'wheat',
        margin: 20,
        padding: 10,
    }
})
