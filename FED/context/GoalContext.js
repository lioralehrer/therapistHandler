import React, { createContext, useReducer } from 'react';
import GoalReducer from './GoalReducer';

const initialState = {
    goals: []
}
// Create context
export const GoalsContext = createContext(initialState);
// Provider component
export const GoalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(GoalReducer, initialState);
    // Actions:
    function addGoal(goal) {
        dispatch({
            type: 'ADD_GOAL',
            payload: goal
        })
    }
    function deleteGoal(id) {
        dispatch({
            type: 'DELETE_SESSION',
            payload: id
        });
    }
    function updateGoal(goal) {
        dispach({
            type: 'UPDATE_GOAL',
            payload: goal
        })
    }

    return (
        <GoalContext.Provider
            value={{
                goals: state.goals,
                addGoal,
                deleteGoal,
                updateGoal
            }}
        >
            {children}
        </GoalContext.Provider>
    )
}
