import React, { createContext, useReducer } from 'react';
import GoalReducer from './GoalReducer';

const initialState = {
    subgoals: []
}
// Create context
export const SubgoalsContext = createContext(initialState);
// Provider component
export const ActivityProvider = ({ children }) => {
    const [state, dispach] = useReducer(SubgoalReducer, initialState);
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

