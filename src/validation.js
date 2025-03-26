import {inputElement} from "./main.js";

export function validateText (item) {
    if (item.value.length < 4 || item.value.length > 100) {
        item.classList.add('is-invalid');
        return false;
    }

    item.classList.remove('is-invalid');
    return true;
}

export function validateNumber(number) {
    if (number < 1 || number > 12) {
        inputElement.classList.add('is-invalid');
        return false;
    }
    inputElement.classList.remove('is-invalid');
    return true;
}