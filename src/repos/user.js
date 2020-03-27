import { getCookies } from '../modules/cookies/cookies';
import { BACKEND_URL } from '../const';

const urlUser = `${BACKEND_URL}/user/`;
const urlAuth = `${BACKEND_URL}/auth/`;

export const getUser = (id) => {
    let accessToken = getCookies().accessToken;
    return fetch(`${urlUser}${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
};

export const addUser = (user) => {
    return fetch(urlUser, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const updateUser = (id, userData) => {
    return fetch(`${urlUser}${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

export const changeUserPassword = (id, passwords) => {
    return fetch(`${urlUser}${id}/password`, {
        method: 'PUT',
        body: JSON.stringify(passwords),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const removeUser = id => {
    return fetch(`${urlUser}${id}`, {
        method: 'DELETE',
    })
};

export const auth = (data) => {
    console.log(data);
    return fetch(urlAuth, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status === 200) return res.json();
            throw new Error(res.status);
        });
};

export const getUserDetails = (accessToken) => {
    return fetch(`${urlUser}details`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(data => data.json())
        .catch(e => console.log(e))
};

export const addBookToShelf = (book, id) => {
    console.log(JSON.stringify(book), id);
    return fetch(`${urlUser}books`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ book, userId: id })
    }).then(res => {
        console.log(res);
        if (res.status !== 200) throw new Error(res.status);
        return res.json();
    });
};

export const getAllBooks = (id) => {
    return fetch(`${urlUser}books/${id}`)
        .then(res => {
            if (res.status !== 200) throw new Error(res.status);
            console.log(res);
            return res.json();
        });
};

export const deleteUserBook = (userId, bookId) => {
    return fetch(`${urlUser}books/${userId}/${bookId}`, {
        method: 'DELETE'
    })
        .then(res => res.json());
};

export const addMate = (mate) => {
    let accessToken = getCookies().accessToken;
    return fetch(`${urlUser}mate`, {
        method: 'PUT',
        body: JSON.stringify(mate),
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
};

export const getPublicUser = (id) => {
    let accessToken = getCookies().accessToken;
    return fetch(`${urlUser}public/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
};