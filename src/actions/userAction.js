import { fetchUserDetails, fetchUserPhotos as getUserPhotos } from '../services/fbApi';

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
    }, { scope: 'user_location, user_friends, user_photos, user_likes, user_videos' })
}

export const fetchUserPhotos = () => dispatch => {
    getUserPhotos().then(d => dispatch({
        type: "USER_ALBUM_PHOTOS_SUCCESS",
        payload: d
    }))
}