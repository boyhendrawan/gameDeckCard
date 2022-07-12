import * as data from "./aggregatModuls.js";

const contianerCards = document.getElementById("containerCards");
const slotComputer = document.getElementById("slotComputer");
const slotPlayer = document.getElementById("slotPlayer");
const message = document.getElementById("message");
const messageDone = document.getElementById("messageDone");

// handle button close modal
const modal = document.getElementById("popup-modal");
modal.addEventListener("click", function (e) {
  e.preventDefault();
  //   console.log(e.target.className);
  if (e.target.className.includes("buttonClose")) {
    this.classList.add("hidden");
    startGame();
  }
});
//to compare more easiest the card we can reflect value each card into the number
const valueCompare = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  K: 12,
  Q: 13,
  A: 14,
};

//global var
let playerDeck, computerDeck, inRound, isOver;
contianerCards.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.className.includes("azz")) {
    if (inRound) {
      cleanBeforeRound();
    } else {
      flipCards();
    }
  }
});
//inRound mean we are flipping
startGame();
function startGame() {
  const deckCard = new data.deck(); //instead
  deckCard.shuffle();

  //split card to computer and user
  const midCards = Math.ceil(deckCard.lengthCard / 2);
  //   console.log(midCards);
  playerDeck = new data.deck(deckCard.value.slice(0, midCards));
  computerDeck = new data.deck(deckCard.value.slice(midCards, deckCard.lengthCard));
  inRound = false;
  isOver = false;
  cleanBeforeRound();
}
function flipCards() {
  inRound = true;
  const currentCardPlayer = playerDeck.pop();
  const currentCardComputer = computerDeck.pop();
  slotComputer.after(currentCardComputer.getHTML());
  slotPlayer.after(currentCardPlayer.getHTML());

  if (checkTheWinner(currentCardPlayer.number, currentCardComputer.number)) {
    message.innerText = "Player Won";
    playerDeck.push(currentCardPlayer);
    playerDeck.push(currentCardComputer);
  } else if (checkTheWinner(currentCardComputer.number, currentCardPlayer.number)) {
    message.innerText = "Computer Won";
    computerDeck.push(currentCardPlayer);
    computerDeck.push(currentCardComputer);
  } else {
    message.innerText = "Draw";
  }

  if (isGameOver(playerDeck)) {
    modal.classList.remove("hidden");
    const message = "Congratulation Computer Win and Player Lose, Ingin Bermain lagi ?";
    const msgsColor = "selectionLose";
    const colorBtn = "buttonLose";
    const icon = ` 
    <span class="absolute inline-flex h-14 w-14 rounded-full bg-rose-500 opacity-60 animate-ping transition"></span>
    <svg class="inline-flex relative w-14 mx-auto h-14 text-rose-600 transition group-hover:scale-150 duration-400 ease-in-out" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clip-rule="evenodd"
    ></path>
  </svg>
  
    `;
    isOver = true;
    madeHTML(messageDone, message, msgsColor, colorBtn, icon);
  } else if (isGameOver(computerDeck)) {
    const message = "Congratulation Player Win and Computer Lose, Ingin Bermain lagi ?";
    const msgsColor = "selectionWinner";
    const colorBtn = "buttonWinner";
    const icon = `
    <span class="absolute inline-flex h-14 w-14 rounded-full bg-green-500 opacity-60 animate-ping transition"></span>
               <svg class="inline-flex relative w-14 mx-auto h-14 text-green-600 transition group-hover:scale-150 duration-400 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>`;
    modal.classList.remove("hidden");
    madeHTML(messageDone, message, msgsColor, colorBtn, icon);
    isOver = true;
  }
}
function cleanBeforeRound() {
  inRound = false;
  message.innerText = "";
  if (slotPlayer.nextElementSibling.className.includes("myDeckCard") && slotComputer.nextElementSibling.className.includes("myDeckCard")) {
    slotPlayer.nextElementSibling.remove();
    slotComputer.nextElementSibling.remove();
  }

  updateCount();
}
function updateCount() {
  slotComputer.innerText = computerDeck.lengthCard;
  slotPlayer.innerText = playerDeck.lengthCard;
}
function checkTheWinner(firstVal, secondVal) {
  return valueCompare[firstVal] > valueCompare[secondVal];
}

function isGameOver(deck) {
  return deck.lengthCard === 0;
}
function madeHTML(reference, message, msgsColor, colorBtn, icon) {
  modal.classList.remove("hidden");
  reference.innerHTML = message;
  reference.classList.add(msgsColor);
  reference.nextElementSibling.classList.add(colorBtn);
  reference.previousElementSibling.innerHTML = icon;
}
