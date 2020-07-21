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
 
const getGoalList = () => {
    const goalList = [
        { id: 1, title: 'מטרה 1', description:  'מטרה מספר אחת' },
        { id: 2, title: 'מטרה 2', description: 'מטרה מספר שתיים' },
        { id: 3, title: 'מטרה 3', description: 'מטרה מספר שלוש' }
    ]
    return goalList

}
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


const getActivityList = () => {
    const activitiesList = [
        { id: '1', description: 'כדור' },
        { id: '2', description: 'גואש' },
        { id: '3', description: 'חריזה' },
        { id: '4', description: 'בובה' },
        { id: '5', description: 'לגו' },
        { id: '6', description: 'משרוקיות' },
        { id: '7', description: 'חול' },
        { id: '8', description: 'אופניים' },
        { id: '9', description: 'בועות סבון' },
        { id: '10', description: 'בר בצק' },]

    return activitiesList
}
const getTherapistList = () => {
    const therapistList = [{ title: 'קורל' }, { title: 'הדר' }, { title: 'מאי' }, { title: 'עדי' }]
    return therapistList
}


export const AddSession = () => {
    const [session, setSession] = useState(
        {
            goals: [],
            therapist: '',
            scheduledAt: '',
            activities: [],
            sessionPlanMessage: '',
            id: Math.floor(Math.random() * 100000000),
        });
    const { goals } = useContext(GoalContext);
    const { addSession } = useContext(SessionContext);

    useEffect(() => {
        // axios.get('../data.json')
        // axios.get('https://jsonplaceholder.typicode.com/posts')
            // axios.get('http://localhost/api/goals')
            // .then((res) => {
            //     console.log(res.data)
            // })
            // .catch(error => console.log(error));
    })

    const handleSelectedItems = (listOfIndexes, oldList, sessionProperty) => {
        let list = oldList;
        let newList = [];
        listOfIndexes.forEach(e => {
            newList.push(list[parseInt(e)].description);
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

    const onSubmit = () => {
        addSession(session);
        Alert.alert("נוצר סשיין חדש  " + session.sessionPlanMessage);
        setSession({
            goals: [],
            therapist: '',
            scheduledAt: '',
            activities: [],
            sessionPlanMessage: '',
            id: Math.floor(Math.random() * 100000000),
        })
    }
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
            <DatePicker time={(t) => setSession({ ...session, scheduledAt: t })} />
            <ItemPicker title=" מטפלת" arrayListItems={getTherapistList()} onSelect={(therapist)=> setSession({...session, therapist})} />
            </View>
            <SelectGoals handleGoals={(selectedGoals)=>setSession({ ...session, goals : selectedGoals})}/>
            <MultiSelectDropdown title="מטרות...." list={goals} handleList={(list) => handleSelectedItems(list, getGoalList(), 'goals')} />
            <MultiSelectDropdown title="פעילויות..." list={getActivityList()} handleList={(list) => handleSelectedItems(list, getActivityList(), 'activities')} />
            {session.activities.map(act => { return <View><Text style={{ color: '#fff' }}>{act}</Text></View> })}

            <Message message={(msg) => setSession({ ...session, sessionPlanMessage: msg })} />
            <View><Text style={{ color: '#fff' }}>{session.sessionPlanMessage}</Text></View>

            <View style={{ margin: 10, padding: 5, width: 100 }}>
                <Button onPress={() => onSubmit()} title="submit session" />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container : {
        backgroundColor :'wheat',
       margin:20,
       padding: 10,
    }
})
