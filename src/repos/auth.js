const url = 'http://localhost:3010/auth/';

export const auth = (data) => {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    })
};