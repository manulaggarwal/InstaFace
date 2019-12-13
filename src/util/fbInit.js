import { fetchUserDetails as apiUserDetails } from '../services/fbApi';

export const loginUser = () => new Promise((resolve, reject) => {
    window.FB.login(() => {
        fetchUserDetails().then(user => resolve(user));
    })
})

export const fetchUserDetails = (fields) => {
    return apiUserDetails(fields);
}
export const canUserAutoLogin = (FB = window.FB) => new Promise((resolve, reject) => {
    FB.getLoginStatus(loginStatus => {
        if (loginStatus.status === "connected") {
            return resolve(true);
        } return resolve(false);
    })
})

export const fbInit = () => new Promise((resolve, reject) => {
    window.fbAsyncInit = function () {
        const FB = window.FB;
        FB.init({
            appId: process.env.REACT_APP_FB_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v5.0',
            status: true
        });
        return resolve();
    }
});

