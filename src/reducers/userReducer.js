import { combineReducers } from 'redux';

function changeLanguage(state = {}, action) {
    switch (action.type) {
        case "CHANGE_LANGUAGE":
            return action.payload.userLanguage;
        default:
            return state;
    }
};

function userDetails(state = {}, action) {
    switch (action.type) {
        case "USER_DETAILS": return Object.assign({}, state, action.payload);
        default: return state;
    }
}



const userReducer = combineReducers({
    changeLanguage,
    userDetails
})
export default userReducer;
