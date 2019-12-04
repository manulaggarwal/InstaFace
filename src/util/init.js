export const facebook = {
    init: () => {
        window.fbAsyncInit = function () {
            console.log("FB SDK Initialized ");
            window.FB.init({
                appId: process.env.FB_APP_ID,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v5.0'
            });
        }
    }
}
