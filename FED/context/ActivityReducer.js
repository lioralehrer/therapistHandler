export default (state, action) => {
    switch (action.type) {
        case 'ADD_ACTIVITY':
            return {
                ...state,
               activities : [action.payload, ...state.activities]
            }
        case 'DELETE_ACTIVITY':
            return {
                ...state,
                activities: state.activities.filter(act => act.id !== action.payload)
            }
        case 'UPDATE_ACTIVITY':
            var act = [...state.activities];
            var foundIndex = state.activities.findIndex(act => act.id === action.payload.id);
            act[foundIndex] = action.payload ;
            return {
                ...state,
                activities : act
            }
        default:
            return state;
    }
}