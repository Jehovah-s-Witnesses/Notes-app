import {HTTP_METHODS, sendRequest} from "./api.js";

export const getScore = (query) => {
    return sendRequest(`/score`, HTTP_METHODS.get);
}

/**
 *
 * @param {Object}scoreData
 * @param {string} scoreData.note
 * @param {number} scoreData.score
 * @param {string} scoreData.id
 * @returns {Promise<Response>}
 */
export const createScore = (scoreData) => {
    return sendRequest(`/score`, HTTP_METHODS.post, {}, scoreData);
}

/**
 *
 * @param {string}id
 * @param {Object}scoreData
 * @param {string} scoreData.note
 * @param {number} scodeData.score
 * @param {string} scoreData.id
 * @returns {Promise<Response>}
 */
export const changeScore = (id,scoreData) => {
   return sendRequest(`/score/${id}`, HTTP_METHODS.patch, {}, scoreData);
}

export const deleteScore = (id) => {
    return sendRequest(`/score/${id}`, HTTP_METHODS.delete);
}