export const loginUser = () => new Promise((resolve, reject) => {
    window.FB.login(() => {
        fetchUserDetails().then(user => resolve(user));
    })
})

export const fetchUserDetails = () => new Promise((resolve, reject) => {
    window.FB.api("/me", { fields: "name,email,picture,photos" }, me => {
        return resolve({
            userReducer: {
                userDetails: {
                    ...me,
                    isLogged: true
                }
            }
        });
    })
})
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
    // let st;
    // FB.getLoginStatus(loginStatus => {
    //     st = loginStatus;
    // if (loginStatus.status === "connected") {
    //     return FB.api("/me", { fields: "name,email,picture,photos" }, me => ({
    //         userReducer: {
    //             userDetatils: {
    //                 ...me,
    //                 isLogged: true
    //             }
    //         }
    //     }));
    // } else {

    //     return {
    //         userReducer: {
    //             userDetatils: {
    //                 isLogged: false
    //             }
    //         }
    //     }
    // }
    //})
    //console.log("ST:::: ", st);
    // let a = Promise.resolve(FB.getLoginStatus(res => res.status === "connected" ? FB.api("/me", { fields: "name,email,picture,photos" }, me => ({
    //     userReducer: {
    //         userDetatils: {
    //             ...me,
    //             isLogged: true
    //         }
    //     }
    // })) : {
    //         userReducer: {
    //             userDetatils: {
    //                 isLogged: false
    //             }
    //         }
    //     }));
    //console.log("PPPP  ", a.then(o => { console.log(o); }));
    //return FB;
});

