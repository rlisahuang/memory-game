/***********************************
 * TASK 0: WARM UP
 * 
* --- Getting Started ---
 * 1. Read the lines of code up to "END OF TASK 0: WARM UP" in `app.js` (current file),
 *   as well as `index.html` under the current directory for locating DOM element with id `logging`
 * 2. Based on your understanding of the code, 
 *   tell the experimenter how you expect the application to behave when you click on the `loggingBoard`
 * 3. Click on the "View" button at the upper right corner of the editor, 
 *   and choose `index.html` under your current directory in the dialog.
 * 
 * --- The View/Hide Button ---
 * 1. Press View/Hide Button several times and see what happens.
 * -- DO NOT click inside the view box... yet. --
 * 2. You may try scrolling around inside the code editor. 
 * 3. You may try switching tabs, too, if you have other tabs opened in the editor.
 * 
 * --- Your first click ---
 * 1. Now click on the text "Debugging Logs" inside the interface that just opened.
 *   - At the bottom of the interface, you will see all the *UI states* after your click:
 *      - The leftmost is your starting state, while the rightmost is the final UI state;
 *      - The blue arrow is the click event that you just provided:
 *        - It starts from the UI state at which you clicked, and ends at the final state it results in
 *      - What about the numbered circles? Keep reading :)
 *   - By default, you are shown the look of the interface at its final UI state as a result of your click.
 *     Feel free to click on different UI states and see what happens to the interface.
 *   - Inside the editor, you will see a bunch of numbered circles at different lines:
 *      - If a line of code has a bubble numbered index _i_, it means that this line of code
 *        is on the call stack of the execution that results in UI state _i_ 
 *        (also with a same numbered bubble). We call such bubbles *trace bubbles*.
 *   - WITHOUT MAKING ANY EDITS YET, tell the experimenter if the application behaved as your expectation.
 * 2. Now go to the line where the `innerText` of `loggingBoard` is changed. Change it to something else.
 *   - As you start typing, you may notice that the trace bubbles inside the editor turned brown.
 *      - Whenever you see brown trace bubbles, they indicate that the visualization is no longer 
 *        up to date with your code. 
 *      - Blue trace bubbles, on the contrary, indicate that the visualization *is* up to date.
 *   - After you are done making your desired changes, save the current file (`app.js`) to refresh the 
 *     visualization. 
 *     - You may save the file using the VSCode UI menus, or `Cmd + S` on macOS / `Control + S` on 
 *     Windows/Linux.
 * 3. What happened to the visualization? Summarize your findings to the experimenter.
 * 
 * --- What is `visual.log()`? ---
 * You may be familiar with `console.log()` in JavaScript, a common technique to print out data values 
 *   when debugging / testing your application.
 * Since you do not have access to the browser console inside this interface, we provide an alternative
 *   mechanism for you to log data, called `visual.log()`.
 * You may use `visual.log()` just as you use `console.log()`, except that `visual.log()` only takes 
 *   one argument, and that the logs will appear in the `Debugging Logs` area that you just clicked on.
 * To see how it works, please do the following:
 * 1. Go inside the function `clickOnLogging`, and log something of your choice using `visual.log()` 
 *   at the beginning of the function, before you reassign `this.innerText`.
 * 2. Remember to save the file after the edit.
 * 3. Use the visualization to understand what happened, and ask the experimenter any questions you have.
 * 4. You may use `visual.log()` anywhere within this file `app.js` for the rest of the this study.
 * 
 * --- The "Clear" Button ---
 * There is a "Clear" button right above the UI States. This is meant for clearing
 *   the click events the visualization has recorded and resetting the interface back to its initial state.
 * Try click on the "Clear" button, and click on the "Debugging Logs" area again.
 * 
 * --- Runtime Errors ---
 * 1. Remove everything after `this.innerText = ` in `clickOnLogging`. You will definitely get a runtime
 *   error, specifically a syntax error, because of this change. 
 * 2. Save the file after your edit.
 * 3. You will see the actual runtime messages appearing on top of the UI States. This is where in the
 *   visualization you will see runtime errors with your application.
 *  
 * --- Ending ---
 * Congratulations! You have learned how to use the visualization, which we call Step'n'Tune.
 * Again, if you have any questions about anything, please do hesitate to ask your experimenter.
 * !!!Please remove the code for TASK 0 before you move on!!!
 */

const loggingBoard = document.querySelector('#logging');
loggingBoard.addEventListener('click', clickOnLogging);

function clickOnLogging() {
  this.innerText = "Logging area has been clicked!";
}

/************************************
 * END OF TASK 0: WARM UP
************************************/

/************************************
 * From this point and on, you will be focusing on solving tasks using the visualization.
 * The experimenter will not interrupt you or answer any questions unless the visualization is problematic 
 *   (or you believe there is a bug with the visualization).
 * 
 * Once again, feel free to take breaks, move onto future tasks, or end the study early.
 * You are encouraged, but not required, to "think aloud" -- tell the experimenter explicitly any thoughts,
 *   observations, or struggles you have.
 ************************************/


const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('#result');
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let cardsCollection = new Map();
const msgBoard = document.querySelector('.msg');
const cards = document.querySelectorAll('.card');
const covers = document.querySelectorAll('.cover');
const pics = document.querySelectorAll('.pic');


/************************************
 * TASK 1: FLIP ONE CARD
 * 1. Read the following code/files under this directory:
 *  - `index.html`
 *  - functions `startGame`, `flip` and `flipCard` in app.js` (current file)
 *  - `style.css`
 * 2. Based on your understanding of the code, 
 *   tell the experimenter how you expect the application to behave when you flip a card.
 * 3. Click on the first card in the grid to confirm your understanding. If you believe the code is buggy,
 *   fix the bug.
 * 
 * ------------
 * 
 * TASK 2: CHECK FOR MATCH
 * 1. Read the following code/files under this directory:
 *  - `index.html`
 *  - function `checkForMatch` in `app.js` (current file)
 * 2. Based on your understanding of the code,
 *   tell the experimenter how you expect the application to behave when you flip a card.
 * 3. Click on a few more cards in the grid to confirm your understanding. If you believe the code is buggy,
 *   fix the bug.
 * 
 ************************************/

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

function flip(el1, el2) {
  el1.style.opacity = '0';
  el2.style.opacity = '1';
}

function flipCard() {
  msgBoard.innerText = '';

  const pic = this.querySelector('.pic');
  const cover = this.querySelector('.cover');

  flip(cover, pic);

  const cardId = String(parseInt(this.getAttribute('data-id')) + 1);
  cardsChosen.push(cardsCollection.get(cardId));
  cardsChosenId.push(cardId);

  if (cardsChosen.length > 1) {
    checkForMatch();
  }
}

function checkForMatch() {
  const optionOneId = cardsChosenId[0]
  const optionTwoId = cardsChosenId[1]

  if (optionOneId === optionTwoId) {
    const card = cardsCollection.get(optionOneId)['card'];
    const cover = card.querySelector('.cover');
    const pic = card.querySelector('.pic');
    msgBoard.innerText = 'You have clicked the same image!';

    flip(pic, cover);
  }
  else if (cardsChosen[0]['name'] == cardsChosen[1]['name']) {
    msgBoard.innerText = 'You found a match';
    cardsWon.push(cardsChosen)
  } else {
    msgBoard.innerText = 'You did not find a match';
    const card = cardsCollection.get(optionOneId)['card'];
    const cover = card.querySelector('.cover');
    const pic = card.querySelector('.pic');
    
    flip(pic, cover);

    const cardTwo = cardsCollection.get(optionTwoId)['card'];
    const coverTwo = cardTwo.querySelector('.cover');
    const picTwo = cardTwo.querySelector('.pic');
    
    flip(picTwo, coverTwo);
  }

  cardsChosen = []
  cardsChosenId = []
  resultDisplay.textContent = cardsWon.length
  if (cardsWon.length === cards.length / 2) {
    resultDisplay.textContent = 'Congratulations! You found them all!'
  }
}


startGame();