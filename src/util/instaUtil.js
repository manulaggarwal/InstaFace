const getJsonFromUrl = url => {
    if (!url) url = window.location.search;
    var query = url.substr(1);
    var result = {};
    query.split("&").forEach(function (part) {
        var item = part.split("=");
        result[item[0]] = window.decodeURIComponent(item[1]);
    });
    return result;
}

export const getCookie = (name) => {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

const setCookie = (key, value) => {
    let now = new Date();
    let time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);
    document.cookie = key + '=' + value + '; expires=' + now.toUTCString() + '; path=/';
}

export const deleteCookie = (key) => {
    document.cookie = key + '=; max-age=-1';
}

export const storeInstaAccessToken = params => {
    const keys = getJsonFromUrl(params);
    if (window.document.cookie.includes("insta_access_token")) return true;
    if (!keys.error && keys.code) {
        setCookie("insta_access_token", keys.code);
        return true;
    }
    return false;
}