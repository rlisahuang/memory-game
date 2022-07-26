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
  let cardId = this.getAttribute('data-id');
  cardsChosen.push(cardsCollection.get(cardId));
  cardsChosenId.push(cardId);
  const cover = this.querySelector('.cover');
  const img = this.querySelector('.pic');

  show(img);
  hide(cover);

  msgBoard.innerText = '';

  if (cardsChosen.length === 2) {
      checkForMatch();
  }
}

function hide(e) {
  e.style.display = 'none';
}

function show(e) {
  e.style.display = 'block';
}
//check for matches
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
    msgBoard.innerText = 'Sorry, try again';

    const cardOne = cardsCollection.get(optionOneId)['card'];
    const coverOne = cardOne.querySelector('.cover');
    const imgOne = cardOne.querySelector('.pic');
    show(coverOne);
    hide(imgOne);


    const cardTwo = cardsCollection.get(optionTwoId)['card'];
    const coverTwo = cardTwo.querySelector('.cover');
    const imgTwo = cardTwo.querySelector('.pic');
    show(coverTwo);
    hide(imgTwo);

  }

  cardsChosen = []
  cardsChosenId = []
  resultDisplay.textContent = cardsWon.length
  if (cardsWon.length === cards.length / 2) {
    resultDisplay.textContent = 'Congratulations! You found them all!'
  }
}


startGame();