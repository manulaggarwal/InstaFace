import { fetchUserDetails, fetchUserPhotos as getUserPhotos } from '../services/fbApi';
import { getInstaUserMedia, getInstaAccessToken, getInstaUser } from '../services/instaApi';

export const changeLanguage = data => dispatch => dispatch({
    type: "CHANGE_LANGUAGE",
    payload: {
        userLanguage: data
    }
});

export const userLogout = () => dispatch => dispatch({
    type: "USER_LOGOUT",
    payload: {}
})

export const userDetails = data => dispatch => dispatch({
    type: "USER_DETAILS",
    payload: data
})

export const userLoginSuccess = data => dispatch => dispatch({
    type: "USER_LOGIN_SUCCESS",
    payload: data
})

export const instaLoginSuccess = data => dispatch => dispatch({
    type: "USER_INSTA_SUCCESS",
    payload: data
})

export const instaUserMediaSuccess = data => dispatch => dispatch({
    type: "USER_INSTA_MEDIA_SUCCESS",
    payload: data
})

export const instaLogin = cookie => dispatch => {
    getInstaUser(cookie).then(res => res.json()).then(async user => {
        dispatch(instaLoginSuccess(user));
        const userMedia = await getInstaUserMedia(user.access_token);
        return dispatch(instaUserMediaSuccess(userMedia));
    })
}

export const instaToken = () => dispatch => {
    let token = getInstaAccessToken();
    token ? dispatch(instaLogin(token)) : window.location.replace(process.env.REACT_APP_INSTA_AUTH_URI);
}

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