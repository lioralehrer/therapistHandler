export default (state, action) => {
    switch (action.type) {
        case 'ADD_SKILL':
            return {
                ...state,
               skills : [action.payload, ...state.skills]
            }
        case 'DELETE_SKILL':
            return {
                ...state,
                skills: state.skills.filter(skill => skill.id !== action.payload)
            }
        case 'UPDATE_SKILL':
            var skills = [...state.skills];
            var foundIndex = state.skills.findIndex(skill => skill.id === action.payload.id);
            action.payload.acquierd = !action.payload.acquierd
            skills[foundIndex] = action.payload ;
            return {
                ...state,
                skills : skills
            }
        default:
            return state;
    }
}