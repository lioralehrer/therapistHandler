import React, { useState, useContext } from 'react';
import { View, Alert, Button, Text } from 'react-native';
import { SessionContext } from '../context/SessionContext';
import DatePicker from './DatePicker';
import Message from './Message';
import DropDownList from '../components/DropDownList';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import MultiCheckboxDropdown from '../components/MultiCheckboxDropdown';

const getGoalList = () => {
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
            therapist: 1,
            scheduledAt: '',
            activities: [],
            sessionPlanMessage: '',
        });

    const { addSession } = useContext(SessionContext);

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
        // preventDefault();
        const newSession = {
            id: Math.floor(Math.random() * 100000000),
            session
        }
        Alert.alert(newSession.id);
        // addSession(newSession);
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
            <View><Text style={{ color: '#fff' }}>{String(session.scheduledAt)}</Text></View>
        </View>
    )

}
