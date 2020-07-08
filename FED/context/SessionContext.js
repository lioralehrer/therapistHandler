import React, { createContext, useReducer } from 'react';
import SessionReducer from './SessionReducer';

const initialState = {
    sessions: [
        {
            id: 112345,
            // goals: [{ description: 'כאשר המבוגר יבקש מירדן להביא אובייקט מסוים שנמצא בחדר ומצריך חיפוש כלשהו על מנת לאתרו, ירדן תחפש את האובייקט ותביא א' },
            // { description: 'עוד מטרה תכנס לכאן' }, { description: 'מטרה נוספת בלהבהלבלה' }],
            // therapist: 'מאי',
            goals: [ 'כאשר המבוגר יבקש מירדן להביא אובייקט מסוים שנמצא בחדר ומצריך חיפוש כלשהו על מנת לאתרו, ירדן תחפש את האובייקט ותביא א',
            'עוד מטרה תכנס לכאן' , 'מטרה נוספת בלהבהלבלה' ],
            therapist: 'מאי',
            scheduledAt: '2020/06/18',
            activities: ['שלוש', 'כדוש', 'לדב'],
            sessionPlanMessage: 'כאן נכנס מסר מנהל להלהללי ',
        },
        {
            id: 67890,
            // goals: [{ description: 'מטרה ראשונה ' }, { description: 'עוד מטרה נכנסת לכאן' }, { description: 'איך כדאי להכניס את המטרה הזו: אובייקט או סטרינג?' }],
            goals: [ 'מטרה ראשונה ' , 'עוד מטרה נכנסת לכאן', 'איך כדאי להכניס את המטרה הזו: אובייקט או סטרינג?' ],
            therapist: 'קורל',
            scheduledAt: '2020/06/19',
            activities: ['שלוש', 'כדוש', 'לדב'],
            sessionPlanMessage: 'כאן נכנס מסר מנהל להלהללי ',
        }
    ]
}
// Create context
export const SessionContext = createContext(initialState);
// Provider component
export const SessionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SessionReducer, initialState);
    // Actions:
    function addSession(session) {
        dispatch({
            type: 'ADD_SESSION',
            payload: session
        }) 
    }
    function deleteSession(id) {
        dispatch({
            type: 'DELETE_SESSION',
            payload: id
        });
    }
  
    // function updateSession(session) {
    //     dispach({
    //         type: 'UPDATE_SESSION',
    //         payload: session
    //     })
    // }

    return (
        <SessionContext.Provider
            value={{
                sessions: state.sessions,
                addSession,
                deleteSession,
                // updateSession
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}
