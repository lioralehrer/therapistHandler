import React, { createContext, useReducer } from 'react';
import GoalReducer from './GoalReducer';

const initialState = {

    goals: [
        {
            
            id: 0.2390894902286022,
            activities: [{ title: "כעיי" }, { title: "כיחל" }],
            archived: false,
            defaultEnv: "ים",
            description: 'אחלו להם כל טוב',
            //  envs: [Function en], 
            minConsecutiveDays: 4,
            minTherapists: 3,
            serialNum: 1,
            skillType: "משחק",
            subGoals: [{ title: "בילחיל" }, { title: "ליחליל" }]
        },
        {
            id: 0.23908949022860226,
            activities: [{ title: "כעיי" }, { title: "כיחל" }],
            archived: false,
            defaultEnv: "ים",
            description: ' מיפוי ספירות בכל עולם',
            //  envs: [Function en], 
            minConsecutiveDays: 4,
            minTherapists: 3,
            serialNum: 2,
            skillType: "משחק",
            subGoals: [{ title: "כככ" }, { title: "דגכ" }]
        }
    ]
}
// Create context
export const GoalContext = createContext(initialState);
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
            type: 'DELETE_GOAL',
            payload: id
        });
    }
    function updateGoal(goal) {
        dispatch({
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
