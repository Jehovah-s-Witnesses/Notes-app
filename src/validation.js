import {inputElement} from "./main.js";

export function validateText (element) {
    if (element.value.length < 4 || element.value.length > 100) {
        element.classList.add('is-invalid');
        return false;
    }

    element.classList.remove('is-invalid');
    return true;
}

/**
 *
 * @param {number}value
 * @returns {boolean}
 */
export function validateNumber(value) {
    if (value < 1 || value > 12) {
        inputElement.classList.add('is-invalid');
        return false;
    }

    inputElement.classList.remove('is-invalid');
    return true;
}

export function searchInputValidate(searchElement) {
    if (searchElement.value.length < 1 || searchElement.value.length > 20) {
        searchElement.classList.add('is-invalid');
        return false;
        }

        searchElement.classList.remove('is-invalid');
        return true;

}