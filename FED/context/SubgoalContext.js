import React, { createContext, useReducer } from 'react';
import GoalReducer from './GoalReducer';

const initialState = {
    subgoals: []
}
// Create context
export const SubgoalsContext = createContext(initialState);
// Provider component
export const SubgoalProvider = ({ children }) => {
    const [state, dispach] = useReducer(SubgoalReducer, initialState);
    // Actions:
    function addSubgoal(subgoal) {
        dispatch({
            type: 'ADD_SUBGOAL',
            payload: subgoal
        })
    }
    function deleteSubgoal(id) {
        dispatch({
            type: 'DELETE_SUBGOAL',
            payload: id
        });
    }
    function updateSubgoal(subgoal) {
        dispach({
            type: 'UPDATE_SUBGOAL',
            payload: subgoal
        })
    }

    return (
        <SubgoalContext.Provider
            value={{
                subgoals: state.subgoals,
                addSubgoal,
                deleteSubgoal,
                updateSubgoal
            }}
        >
            {children}
        </SubgoalContext.Provider>
    )
}
