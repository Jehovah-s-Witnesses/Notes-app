import {renderListItem, clearScoresFromUl, renderList} from './render.js';
import {createScore, getScore} from "./requests.js";
import {searchInputValidate, validateNumber, validateText} from "./validation.js";
import {inputModalElement, modalTextAreaElement, openModalWindow} from "./modal.js";

const formElement = document.querySelector('.form-card');
const textareaElement = document.querySelector('textarea');
export const inputElement = document.querySelector('.input-score');
const formSearchElement = document.querySelector('.search-form');
export const searchInputElement = document.querySelector('.input-search');

getScore().then((result) => {
    renderList(result);
}).catch(error => console.error("Failed to load scores:", error));

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const noteText = textareaElement.value;
    const grade = inputElement.value;

    if (validateText(textareaElement) && validateNumber(grade)) {

        const scoreData = {
            note: noteText,
            score: grade,
        };

        createScore( scoreData).then((result) => {
            formElement.reset();
            renderListItem(result);
        })
    }
})

formSearchElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const currentSearchValue = searchInputElement;

    if (searchInputValidate(currentSearchValue)) {

        // TODO: Change this logic to request with query from input. Response should be rendered after clear list
        const searchInputValue = currentSearchValue.value.toLowerCase();

        getScore(searchInputValue).then((scores) => {

           clearScoresFromUl();

            searchInputElement.value = '';

            if (!scores.length) {
                console.log('No matching notes found');
                return;
            }

            renderList(scores)
        }).catch((err) => console.log(`Error:${err.message}`));
    }

})

// formSearchElement.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const currentSearchValue = searchInputElement;
//
//     if (searchInputValidate(currentSearchValue)) {
//
//         // TODO: Change this logic to request with query from input. Response should be rendered after clear list
//         const searchInputValue = currentSearchValue.value.toLowerCase();
//
//         getScore(searchInputValue).then((scores) => {
//
//             clearScoresFromUl();
//
//             searchInputElement.value = '';
//
//             if (!scores.length) {
//                 console.log('No matching notes found');
//                 return;
//             }
//
//             scores.forEach((score) => {
//                 renderListItem(score);
//             })
//
//         }).catch((err) => console.log(`Error:${err.message}`));
//     }
//
// })