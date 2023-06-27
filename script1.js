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

  playGame() {
    while (this.p1.length > 0 && this.p2.length > 0) {
      let p1Card = this.p1.pop()
      let p2Card = this.p2.pop()

      if (p1Card.score === p2Card.score) {
        console.log("War!")
        this.pile.push(p1Card, p2Card)
        this.war()
      } else if (p1Card.score > p2Card.score) {
        this.p1.unshift(p2Card, p1Card, ...this.pile.splice(0))
        console.log("Player One wins the round!")
      } else {
        this.p2.unshift(p1Card, p2Card, ...this.pile.splice(0))
        console.log("Player Two wins the round")
      }
    }

    if (this.p1.length > 0) {
      console.log(`Player 1 wins with ${this.p1.length} cards`)
    } else {
      console.log(`Player 2 wins with ${this.p2.length} cards`)
    }
  }

  war() {
    if (this.p1.length < 4 || this.p2.length < 4) {
      if (this.p1.length < 4) {
        this.p2.push(...this.p1.splice(0),...this.pile.splice(0))
      } else {
        this.p1.push(...this.p2.splice(0),...this.pile.splice(0))
      }
    } else {
      let p1WarPile = this.p1.splice(-3, 3)
      let p2WarPile = this.p2.splice(-3, 3)
      this.pile.push(...p1WarPile,...p2WarPile)
    }
  }
}

const game = new Game()
game.playGame()