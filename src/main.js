import {addScoreToUi, noteContainer} from './render.js';
import {createScore, deleteScore, getScore} from "./requests.js";
import {validateNumber, validateText} from "./validation.js";

const formElement = document.querySelector('.form-card');
const textareaElement = document.querySelector('textarea');
export const inputElement = document.querySelector('.input-score');
const modalWindowElement = document.querySelector('.modal');
const modalTextElement = document.querySelector('.modal_text-content');
const inputModalElement = document.querySelector('.input-modal');
const modalButton = document.querySelector('.btn-close-down');
const modalSaveButton = document.querySelector('.btn-edit');
const closeModalButton = document.querySelector('.btn-close');

getScore().then((scores) => {
    scores.forEach((score) =>
    addScoreToUi(score))
}).catch(error => console.error("Failed to load scores:", error));

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const noteText = textareaElement.value;
    const grade = +inputElement.value;

    if (validateText(textareaElement) && validateNumber(grade)) {

        const scoreData = {
            note: noteText,
            score: grade,
        };

        createScore( scoreData).then((result) => {
            formElement.reset();
            addScoreToUi(result);
        })
    }
})

const openModalWindow = () => {
    modalWindowElement.classList.add('show');
    modalWindowElement.classList.remove('fade');
};

const closeModalWindow =  () => {
    modalWindowElement.classList.remove('show');
    modalWindowElement.classList.add('fade');
}

noteContainer.onclick = (event) => {
    const eventTarget = event.target;
    const currentNote = eventTarget.closest('div.card');
    const noteText = currentNote.querySelector('.card-header');
    const gradeNoteValue = currentNote.querySelector('.score');
    console.log(gradeNoteValue.textContent.slice(6))

    if (eventTarget.tagName === 'BUTTON' && eventTarget.dataset.type === 'edit') {
        modalTextElement.value = noteText.textContent;
        inputModalElement.value = +gradeNoteValue.textContent.slice(6);
        openModalWindow();
    } else if (eventTarget.tagName === 'BUTTON' && eventTarget.dataset.type === 'delete') {
        const deleteNote = currentNote;
        deleteScore(deleteNote.dataset.id).then((result) => console.log(result)).catch((err) => console.error(err))
    }
}

modalButton.onclick =  closeModalWindow;
closeModalButton.onclick = closeModalWindow;

