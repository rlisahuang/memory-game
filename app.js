const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = [] //objs
let cardsChosenId = [] // strings
let cardsWon = []
let cardsCollection = new Map();
const msgBoard = document.querySelector('.msg');
const cards = document.querySelectorAll('.card');


function startGame() {
  cards.forEach((c) => {
    const imgSrcArr = c.querySelector('.pic').src.split('/');
    const fileName = imgSrcArr[imgSrcArr.length - 1];
    const name = fileName.split('.')[0];
    const id = c.getAttribute('data-id');
    cardsCollection.set(id, { 'name': name, 'card': c });
    c.addEventListener('click', flipCard);
  });
}

//flip your card
function flipCard() {
  msgBoard.innerText = '';

  let cardId = this.getAttribute('data-id');
  cardsChosen.push(cardsCollection.get(cardId));
  cardsChosenId.push(cardId);
  const cover = this.querySelector('.cover');
  const img = this.querySelector('.pic');

  show(img);
  hide(cover);

}

// ***TASK 1: Fix the bugs with `hide` and `show`***
// hint: go check `style.css`
function hide(e) {
  e.style.opacity = '0';
}

function show(e) {
  e.style.opacity = '1';
}
// ******************END of TASK 1******************

// TASK 2: Implement the `else` branch of `checkForMatch`
// Specification: When two pictures are not a match, flip the image over again,
//    and display some message about the result.
// Hint: check the implementation of the other two branches.

function checkForMatch() {
  const optionOneId = cardsChosenId[0]
  const optionTwoId = cardsChosenId[1]

  if (optionOneId === optionTwoId) {
    const card = cardsCollection.get(optionOneId)['card'];
    const cover = card.querySelector('.cover');
    const img = card.querySelector('.pic');
    msgBoard.innerText = 'You have clicked the same image!';

    show(cover);
    hide(img);

  }
  else if (cardsChosen[0]['name'] == cardsChosen[1]['name']) {
    msgBoard.innerText = 'You found a match';
    cardsWon.push(cardsChosen)
  } else {

  }

  cardsChosen = []
  cardsChosenId = []
  resultDisplay.textContent = cardsWon.length
  if (cardsWon.length === cards.length / 2) {
    resultDisplay.textContent = 'Congratulations! You found them all!'
  }
}


startGame();