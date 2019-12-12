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
