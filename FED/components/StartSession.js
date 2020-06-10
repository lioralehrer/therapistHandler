import React, { useState } from 'react';
import { View, Alert, Modal} from 'react-native';
import SessionConfig from '../components/SessionConfig';
import Timer from '../components/Timer';
import TherapistGoalsList from '../components/TherapistGoalList';
import {globalStyles} from '../styles/global'
import Header from './Headers/Header';

const StartSession = ({ userName,goals, checkedActivity, checkedGoal }) => {
        const myGoals = Object.keys(goals).filter((goal, i) => {})
           
    return (
        <View>
            <Header title="בחרי פעילות"/>
              <TherapistGoalsList
                        goals={goals}
                        checkedActivity={(activity) => checkedActivity(activity)}
                        checkedGoal={(id) => checkedGoal(id)} />
   
            <Timer />
        </View>
    )
}
export default StartSession;