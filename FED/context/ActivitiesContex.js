import React, { createContext, useReducer } from 'react';
import ActivityReducer from './ActivityReducer';

const initialState = {
    activities: [
        {
            id: 1,
            title: "בועות סבון",
            description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
          },
          {
            id: 3,
            title: "הרכבת פאזל",
            description: "מציאת החלק המתאים של פאזל מגנטי",
          },
          {
            id: 5,
            title: "משחק בבובות",
            description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
          },
          {
            id: 4,
            title: "צעצוע חדש",
            description: "1. ללכוד בועה בודדת ולמקמה בין הפנים שלך לשל ירדן 2.'פוף', ירדן תפוצץ את הבועה עם  האצבע- קשר עין וצחוק משותף 3. לעצור מדי פעם ולהמתין ליוזמה של ירדן"
          },
          {
            id: 9,
            title: "בנייה בקוביות",
            description: " חומה ומגדל חומה ומגדל חומה ומגדל לה. מריה מגדלנה יור דה קריצ'ר אוף דה נייט"
          },
    ]
}
// Create context
export const activitiesContext = createContext(initialState);
// Provider component
export const ActivityProvider = ({ children }) => {
    const [state, dispach] = useReducer(ActivityReducer, initialState);
    // Actions:
    function addActivity(activity) {
        dispatch({
            type: 'ADD_ACTIVITY',
            payload: activity
        })
    }
    function deleteActivity(id) {
        dispatch({
            type: 'DELETE_ACTIVITY',
            payload: id
        });
    }
    function updateActivity(activity) {
        dispach({
            type: 'UPDATE_ACTIVITY',
            payload: activity
        })
    }

    return (
        <ActivitiesContext.Provider
            value={{
                activities: state.activities,
                addActivity,
                deleteActivity,
                updateActivity
            }}
        >
            {children}
        </ActivitiesContext.Provider>
    )
}

