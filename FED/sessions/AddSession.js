import React, { useState, useContext } from 'react';
import {View} from 'react-native';
import { SessionContext } from '../context/SessionContext';
import DatePicker from './DatePicker';

export const AddSession = () => {
    const [session, setSession] = useState(
        {
            goals: [id: ''],
            therapistId: '',
            scheduledAt: '',
            sessionPlanMessage: ''
            ,
        });
    const { addSession } = useContext(SessionContext);

    const onSubmit = e => {
        e.preventDefault();
        const newSession = {
            id: Math.floor(Math.random() * 100000000),
            session
        }
        addSession(newSession);
    }
    return(
        <View>
            <DatePicker />
        </View>
    )

}
