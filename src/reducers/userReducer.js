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
        case "USER_ALBUM_PHOTOS_SUCCESS":
        case "USER_DETAILS": return Object.assign({}, state, action.payload);
        case "USER_INSTA_SUCCESS": return Object.assign({}, state, { instaProfile: action.payload })
        case "USER_INSTA_MEDIA_SUCCESS": return Object.assign({}, state, { instaMedia: action.payload })
        case "USER_LOGOUT": return {}
        default: return state;
    }
}

const userReducer = combineReducers({
    changeLanguage,
    userDetails
})
export default userReducer;
