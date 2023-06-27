class Card {
  constructor(suit, rank, score){
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

  createDeck(){
    const suits = ["Hearts", "Spades", "Clubs", "Diamonds"]
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]

    for (let i = 0; i < suits.length; i++){
      for (let j = 0; j < ranks.length; j++){
        let card = new Card(suits[i], ranks[j], j + 2)
        this.cards.push(card)
      }
    }

    this.shuffle()
  }

  shuffle(){
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
    this.winner = undefined
    this.loser = undefined
    this.battle = []
  }

  match() {
    let winner
    let loser
    let tie = false
    firstDeck.cards[0].score > secondDeck.cards[0].score ? [this.winner = firstDeck, this.loser = secondDeck] :
    firstDeck.cards[0].score < secondDeck.cards[0].score ? [this.winner = secondDeck, this.loser = firstDeck] : 
    tie = true
    if (tie = true) {
   //   this.war()
    }
    console.log(`${this.winner.name} won by playing the ${this.winner.cards[0].rank} of ${this.winner.cards[0].suit}
    against ${this.loser.name}'s ${this.loser.cards[0].rank} of ${this.loser.cards[0].suit}. Player One has ${firstDeck.cards.length} 
    cards in their deck and Player Two has ${secondDeck.cards.length} cards in their deck.`)
    this.battle.push(this.winner.cards.shift(), this.loser.cards.shift())
    this.winner.pile = this.winner.pile.concat(this.battle)
    console.log(firstDeck.pile, secondDeck.pile)
  }
}

const game = new Game()
const firstDeck = new Deck("Player One")
const secondDeck = new Deck("Player Two")
secondDeck.cards = []
for (let i = 0; i < 26; i++){
  secondDeck.cards.push(firstDeck.cards.pop())
}
console.log(firstDeck, secondDeck)
game.match()