export const setCookie = (value, name = 'accessToken', maxAge = 60 * 60 * 24 * 7) => {
    let checkedValue = value;
    if (typeof value === 'object') checkedValue = JSON.stringify(value);
    document.cookie = `${name}=${checkedValue};Max-Age=${maxAge};path=/`
}

export const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export const getCookies = () => {
    const decoded = decodeURIComponent(document.cookie);
    const decodedArr = decoded.split(';');
    if (!decodedArr[0]) return {}
    const cookies = {};
    decodedArr.forEach(cookie => {
        const cookieParts = cookie.split("=");
        const name = cookieParts[0].trim();
        const value = cookieParts[1].trim();
        cookies[name] = value;
    })
    return cookies;
}