const SUITS = ["♠", "♣", "♥", "♦"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

export default class Deck {
  //default class export
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  get lengthCards() {
    return this.cards.length;
  }
  //   shuffle the card very single time
  shuffle() {
    for (let i = this.lengthCards - 1; i > 0; i--) {
      //get random number
      const randomData = Math.floor(Math.random() * (i + 1));
      //   let oldVal = this.cards[randomData];
      [this.cards[i], this.cards[randomData]] = [this.cards[randomData], this.cards[i]]; //switch cards with old and random
    }
  }
}

class Card {
  constructor(suits, value) {
    this.suits = suits;
    this.value = value;
  }
}

function freshDeck() {
  return SUITS.flatMap((suits) => {
    return numbers.map((values) => {
      return new Card(suits, values);
    });
  });
}
