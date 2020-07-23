export default (state, action) => {
    switch (action.type) {
        case 'ADD_GOAL':
            return {
                ...state,
                goals: [action.payload, ...state.goals]
            }
        case 'DELETE_GOAL':
            return {
                ...state,
                goals: state.goals.filter(goal => goal.id !== action.payload)
            }
        case 'UPDATE_GOAL':
            var g = [...state.goals];
            var foundIndex = state.goals.findIndex(goal => goal.id === action.payload.id);
            g[foundIndex] = action.payload;
            return {
                ...state,
                goals: g
            }
        default:
            return state;
    }
}