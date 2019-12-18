import { combineReducers } from 'redux';

function search(state = {}, action) {
    switch (action.type) {
        case "USER_SEARCH": return Object.assign({}, state, action.payload)
        default: return state;
    }
}

const searchReducer = combineReducers({
    search
})
export default searchReducer;
