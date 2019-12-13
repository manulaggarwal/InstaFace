import { fetchUserDetails } from '../services/fbApi';

export const changeLanguage = data => dispatch => dispatch({
    type: "CHANGE_LANGUAGE",
    payload: {
        userLanguage: data
    }
});

export const userDetails = data => dispatch => dispatch({
    type: "USER_DETAILS",
    payload: data
})

export const userLoginSuccess = data => dispatch => dispatch({
    type: "USER_LOGIN_SUCCESS",
    payload: data
})

export const userLogin = data => dispatch => {
    window.FB.login(() => {
        fetchUserDetails(data).then(user => {
            return dispatch(userDetails(user));
        })
    })
}