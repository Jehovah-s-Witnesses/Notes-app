export const HTTP_METHODS = {
    get: 'GET',
    post: 'POST',
    patch: 'PATCH',
    delete: 'DELETE',
};

const baseURL = 'http://localhost:4400/api/v1';

export const sendRequest = (url, method = HTTP_METHODS.get,  headers = {}, body = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json;charset=utf8',
        },
        body: body ? JSON.stringify(body) : null
    };

    return fetch(`${baseURL}${url}`,options).then(response => {
      if (!response.ok) {
          return Promise.reject(`Error:${response.status}`)
      }
      return response.json();
  })
};
