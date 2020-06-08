import React, { createContext, useReducer } from 'react';
import SessionReducer from './SessionReducer';

const initialState = {
    sessions: []
}
// Create context
export const SessionContext = createContext(initialState);
// Provider component
export const SessionProvider = ({ children }) => {
    const [state, dispach] = useReducer(SessionReducer, initialState);
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
    function updateSession(session) {
        dispach({
            type: 'UPDATE_SESSION',
            payload: session
        })
    }

    return (
        <SessionContext.Provider
            value={{
                sessions: state.sessions,
                addSession,
                deleteSession,
                updateSession
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}
