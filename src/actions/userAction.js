export const changeLanguage = (data) => dispatch => {
    console.log("action", data);
    return dispatch({
        type: "CHANGE_LANGUAGE",
        payload: data
    });
};
