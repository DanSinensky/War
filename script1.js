class Card {
  constructor(suit, rank, score) {
    this.suit = suit
    this.rank = rank
    this.score = score
  }
}

class Deck {
  constructor(name) {
    this.name = name
    this.cards = []
    this.pile = []
    this.createDeck()
  }

  createDeck() {
    const suits = ["Hearts", "Spades", "Clubs", "Diamonds"]
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        let card = new Card(suits[i], ranks[j], j + 2)
        this.cards.push(card)
      }
    }

    this.shuffle()
  }

  shuffle() {
    const cards = this.cards
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Array Destructuring Method used for shuffle (ES6 Version)
      [cards[i], cards[j]] = [cards[j], cards[i]];

      // Fisher-Yates shuffle method (Before ES6 update)
      // let temp = cards[i]
      // cards[i] = cards[j]
      // cards[j] = temp
    }
  }
}

class Game {
  constructor() {
    this.p1 = []
    this.p2 = []
    this.pile = []
    this.gameSetup()
  }

  gameSetup() {
    const { cards } = new Deck()
    this.p1.push(...cards.splice(0, 26))
    this.p2.push(...cards)
  }
}

const game = new Game()