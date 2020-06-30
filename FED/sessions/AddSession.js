import React, { useState, useContext, useEffect } from 'react';
import { View, Alert, Button, Text } from 'react-native';
import { SessionContext } from '../context/SessionContext';
import DatePicker from './DatePicker';
import Message from './Message';
import DropDownList from '../components/DropDownList';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import axios from 'axios';

const getGoalList = async () => {
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
    const goalList = [
        { id: 1, title: 'מטרה 1', description: 'בלהבהבב לחילכימחדי ' },
        { id: 2, title: 'מטרה 2', description: 'בלהבהבב לחילכימחדי ' },
        { id: 3, title: 'מטרה 3', description: 'בלהבהבב לחילכימחדי ' }
    ]
    return goalList
}
const getActivityList = () => {
    const activitiesList = [
        { id: '1', title: 'כדור' },
        { id: '2', title: 'גואש' },
        { id: '3', title: 'חריזה' },
        { id: '4', title: 'בובה' },
        { id: '5', title: 'לגו' },
        { id: '6', title: 'משרוקיות' },
        { id: '7', title: 'חול' },
        { id: '8', title: 'אופניים' },
        { id: '9', title: 'בועות סבון' },
        { id: '10', title: 'בר בצק' },]

    return activitiesList
}
const getTherapistList = () => {
    const therapistList = ["מאי", "הדר", " קורל"]
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

    const { addSession } = useContext(SessionContext);

    useEffect(() => {
        // axios.get('../data.json')
         axios.get('https://jsonplaceholder.typicode.com/posts')
        // axios.get('http://localhost/api/goals')
            .then((res) => {
                console.log(res.data)
            })
            .catch(error => console.log(error));
    })

    const handleSelectedItems = (listOfIndexes, oldList, sessionProperty) => {
        let list = oldList;
        let newList = [];
        listOfIndexes.forEach(e => {
            newList.push(list[parseInt(e) - 1].title);
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
        Alert.alert("נוצר סשיין חדש  " + session.sessionPlanMessage)
        // setSession({
        //     goals: [],
        //     therapist: '',
        //     scheduledAt: '',
        //     activities: [],
        //     sessionPlanMessage: '',
        //     id: 1 ,
        // })

    }
    return (
        <View>
            <DatePicker time={(t) => setSession({ ...session, scheduledAt: t })} />

            <DropDownList title="מטפל" pickList={getTherapistList()} handleItem={(t) => setSession({ ...session, therapist: t })} />
            <View><Text style={{ color: '#fff' }}>{session.therapist}</Text></View>

            <MultiSelectDropdown title="מטרות...." list={getGoalList()} handleList={(list) => handleSelectedItems(list, getGoalList(), 'goals')} />
            {session.goals.map(g => { return <View><Text style={{ color: '#fff' }}>{g}</Text></View> })}

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
