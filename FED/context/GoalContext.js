import React, { createContext, useReducer } from 'react';
import GoalReducer from './GoalReducer';

const initialState = {

    goals: [
        {

            id: 0.2390894902286022,
            archived: false,
            defaultEnv: "ים",
            description: 'אחלו להם כל טוב',
            //  envs: [Function en], 
            minConsecutiveDays: 4,
            minTherapists: 3,
            serialNum: 1,
            skillType: "משחק",
            subGoals: [{ title: "בילחיל" }, { title: "ליחליל" }],
            activities: [
                {
                    id: 9,
                    title: "בנייה בקוביות",
                    description: " חומה ומגדל חומה ומגדל חומה ומגדל לה. מריה מגדלנה יור דה קריצ'ר אוף דה נייט"
                },
            ]

        },
        {
            id: 0.23908949022860226,
            archived: false,
            defaultEnv: "ים",
            description: ' מיפוי ספירות בכל עולם',
            //  envs: [Function en], 
            minConsecutiveDays: 4,
            minTherapists: 3,
            serialNum: 2,
            skillType: "משחק",
            subGoals: [{ title: "כככ" }, { title: "דגכ" }],
            activities: [
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
            ]
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
