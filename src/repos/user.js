import { getCookies } from "../modules/cookies";

const url = 'http://localhost:3010/user/';

export const getUser = (id) => {
    let accessToken = getCookies().accessToken;
    return fetch(`localhost:3010/user/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
};

export const addUser = (user) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
    })
};

export const updateUser = (id) => {
    //  return fetch(url, {})
};

export const removeUser = id => {
    //  return fetch(url, {})
};
