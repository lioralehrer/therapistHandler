import React, { createContext, useReducer } from 'react';
import SkillReducer from './SkillReducer';

const initialState = {
    skills: [
        { id: 1, skillType: 'משחק', level: '1', title: 'איפה הרשימה של הרמות?', acquired: true },
        { id: 2, skillType: 'משחק', level: '1', title: 'מצאתי את התחומי טיפול', acquired: true },
        { id: 3, skillType: 'משחק', level: '2', title: 'אבל רמות לא קיים', acquired: false },
        { id: 4, skillType: 'משחק', level: '3', title: 'אחלו להם כל טוב', acquired: false },
        { id: 5, skillType: 'משחק', level: '2', title: 'ושחררו אותם לדרכם', acquired: false },
        { id: 6, skillType: 'משחק', level: '2', title: 'כפי שמרגיש עכשיו', acquired: false },
        { id: 7, skillType: 'מוטוריקה עדינה', level: '2', title: 'כפי שמרגיש עכשיו', acquired: false },
        { id: 8, skillType: 'שפה אקספרסיבית', level: '2', title: 'מקרה ראשון בלתי מובחן כפי שמרגיש עכשיו', acquired: false },
        { id: 9, skillType: 'כישורים חברתיים', level: '2', title: ' ואם הכל נוזל כפי שמרגיש עכשיו', acquired: false },
        { id: 10, skillType: 'שפה רצפטיבית', level: '2', title: 'כפי להלהלהל עכשיו', acquired: false }
    ]
}
// Create context
export const SkillContext = createContext(initialState);
// Provider component
export const SkillProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SkillReducer, initialState);
    // Actions:
    function addSkill(skill) {
        dispatch({
            type: 'ADD_SKILL',
            payload: skill
        })
    }
    function deleteSkill(id) {
        dispatch({
            type: 'DELETE_SKILL',
            payload: id
        });
    }
    function updateSkill(skill) {
        dispatch({
            type: 'UPDATE_SKILL',
            payload: skill
        })
    }

    return (
        <SkillContext.Provider
            value={{
                skills: state.skills,
                addSkill,
                deleteSkill,
                updateSkill
            }}
        >
            {children}
        </SkillContext.Provider>
    )
}
