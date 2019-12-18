import { getCookie } from "../util/instaUtil";

export const getInstaAccessToken = () => {
    let cookie = getCookie("insta_access_token");
    return cookie ? cookie : !!cookie;
}

export const getInstaUser = cookie => {

    let data = {
        app_id: process.env.REACT_APP_INSTA_APP_ID,
        app_secret: process.env.REACT_APP_INSTA_SECRET,
        code: cookie,
        grant_type: "authorization_code",
        redirect_uri: "https://localhost:3000/auth",
    }
    let form = new URLSearchParams();
    for (let k in data) {
        form.append(k, data[k]);
    }
    return fetch("https://api.instagram.com/oauth/access_token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: form
    });
}

export const getInstaUserMedia = token => fetch("https://graph.instagram.com/me/media?access_token=" + token + "&fields=caption,media_url,username,permalink,media_type,children").then(res => res.json());
