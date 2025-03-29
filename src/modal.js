import {addScoreToUi, clearScoresFromUl, noteContainer} from "./render.js";
import {changeScore, deleteScore, getScore} from "./requests.js";
import {validateNumber, validateText} from "./validation.js";

const modalWindowElement = document.querySelector('.modal');
export const modalTextAreaElement = document.querySelector('.modal_text-content');
export const inputModalElement = document.querySelector('.input-modal');
const modalCloseDownButton = document.querySelector('.btn-close-down');
const modalSaveButton = document.querySelector('.btn-edit');
const closeModalButton = document.querySelector('.btn-close');
let selectedNote;
let selectedNoteId;

export const openModalWindow = () => {
    modalWindowElement.classList.add('show');
    modalWindowElement.classList.remove('fade');
};

const closeModalWindow = () => {
    modalWindowElement.classList.remove('show');
    modalWindowElement.classList.add('fade');
}

noteContainer.onclick = (event) => {
    const eventTarget = event.target;
    const currentNote = eventTarget.closest('div.card');
    const noteText = currentNote.querySelector('.card-header');
    const gradeNoteValue = currentNote.querySelector('.score');

    if (eventTarget.tagName === 'BUTTON' && eventTarget.dataset.type === 'edit') {

        selectedNote = currentNote;
        selectedNoteId = currentNote.dataset.id;

        modalTextAreaElement.value = noteText.textContent;
        inputModalElement.value = +gradeNoteValue.textContent.slice(6);
        openModalWindow();

    } else if (eventTarget.tagName === 'BUTTON' && eventTarget.dataset.type === 'delete') {
        eventTarget.disabled = true;
        const deleteNote = currentNote;

        deleteScore(deleteNote.dataset.id).then(() => {
            deleteNote.remove();
        }).catch((err) => console.error(err))
    }
}

modalCloseDownButton.onclick =  closeModalWindow;
closeModalButton.onclick = closeModalWindow;

modalSaveButton.addEventListener('click', () => {
    modalSaveButton.disabled = false;

    if (!selectedNoteId) {
        return;
    }

    const newDataScore = {
        note: modalTextAreaElement.value,
        score: inputModalElement.value,
    }


    if (validateText(modalTextAreaElement) && validateNumber(inputModalElement.value)) {
        modalSaveButton.disabled = true;

        changeScore(selectedNoteId, newDataScore).then(() => getScore()).then((result) => {
            clearScoresFromUl();
            result.forEach((score) => {
                addScoreToUi(score);
                closeModalWindow();
            })
        }).catch((err) => console.log(`Error: ${err.message}`));

    }
})