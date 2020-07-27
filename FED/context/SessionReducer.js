export default (state, action) => {
    switch (action.type) {
        case 'ADD_SESSION':
            return {
                ...state,
                 sessions : [action.payload, ...state.sessions]
            }
        case 'DELETE_SESSION':
            return {
                ...state,
                sessions: state.sessions.filter(session => session.id !== action.payload)
            }
        // case 'UPDATE_SESSION':
        //     var s = [...state.sessions];
        //     var foundIndex = state.sessions.findIndex(session => session.id === action.payload.id);
        //     s[foundIndex] = action.payload ;
        //     return {
        //         ...state,
        //         session: s
        //     }
        default:
            return state;
    }
}