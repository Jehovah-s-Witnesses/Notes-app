export const noteContainer = document.querySelector('.col-8.offset-2');
export const listItem = [];

/**
 *
 * @param {Object}score
 * @param {string} score.note
 * @param {number} score.score
 * @param {string} score.id
 */
export function addScoreToUi(score) {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-4');
    card.dataset.id = score.id;
    card.innerHTML = `
  <h5 class="card-header">${score.note}</h5>
        <div class="card-body">
          <p class="score">Score: ${score.score}</p>
          <button class="btn btn-primary" data-type="edit" data-id="${score.id}">Update</button>
          <button class="btn btn-danger" data-type="delete" data-id="${score.id}">Delete</button>
        </div>
  `;

    noteContainer.append(card);
}

export function clearScoresFromUl() {
    noteContainer.innerHTML = ``;
}