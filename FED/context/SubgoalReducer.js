export default (state, action) => {
    switch (action.type) {
        case 'ADD_SUBGOAL':
            return {
                ...state,
               subgoals : [action.payload, ...state.subgoals]
            }
        case 'DELETE_SUBGOAL':
            return {
                ...state,
                goals: state.subgoals.filter(sg => sg.id !== action.payload)
            }
        case 'UPDATE_SUBGOAL':
            var sg = [...state.subgoals];
            var foundIndex = state.subgoals.findIndex(sg => sg.id === action.payload.id);
            sg[foundIndex] = action.payload ;
            return {
                ...state,
                subgoals : sg
            }
        default:
            return state;
    }
}