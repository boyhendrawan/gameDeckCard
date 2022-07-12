const SUITS = ["♠", "♣", "♥", "♦"];
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

class DeckCard {
  constructor(value = freshDeck()) {
    this.value = value;
  }

  get lengthCard() {
    return this.value.length;
  }
  shuffle() {
    for (let i = this.lengthCard - 1; i >= 0; i--) {
      const currentRandom = Math.floor(Math.random() * i + 1);
      [this.value[currentRandom], this.value[i]] = [this.value[i], this.value[currentRandom]];
    }
  }
  pop() {
    return this.value.shift(); //return frist card and erase the data in arry
  }
  push(card) {
    return this.value.push(card);
  }
}

class Card {
  constructor(suit, number) {
    this.suit = suit;
    this.number = number;
  }

  get colorCard() {
    return this.suit === "♠" || this.suit === "♣" ? "colorBlack" : "colorRed";
  }
  getHTML() {
    const createDiv = document.createElement("div");
    createDiv.innerText = this.suit;
    createDiv.classList.add("myDeckCard", this.colorCard);
    // createDiv.classList.add();
    createDiv.dataset.value = `${this.number} ${this.suit}`;

    return createDiv;
  }
}

function freshDeck() {
  return SUITS.flatMap((suit) => {
    return numbers.map((e) => new Card(suit, e));
  });
}

export default DeckCard;
// export { Card };
