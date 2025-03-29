export const HTTP_METHODS = {
    get: 'GET',
    post: 'POST',
    patch: 'PATCH',
    delete: 'DELETE',
};

const baseURL = 'http://localhost:4400/api/v1';

export const sendRequest = (url, method = HTTP_METHODS.get,  headers = {}, body = null) => {
    const options = { method };

    if (body) {
        options.headers = {
            'Content-Type':'application/json;charset=utf8',
            ...headers
        };
        options.body = JSON.stringify(body);
    }

    return fetch(`${baseURL}${url}`,options).then(response => {
        if (!response.ok) {
            return Promise.reject(`Error:${response.status}`)
        }
        return response.json();
    })
};
