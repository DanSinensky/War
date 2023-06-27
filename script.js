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
    this.higher = undefined
    this.lower = undefined
    this.tie = false
    this.battle = []
    this.over = false
  }

  match() {
    if (firstDeck.cards.length !== 0 && secondDeck.cards.length !== 0) {
      this.tie = false
      firstDeck.cards[0].score > secondDeck.cards[0].score ? [this.higher = firstDeck, this.lower = secondDeck] :
        firstDeck.cards[0].score < secondDeck.cards[0].score ? [this.higher = secondDeck, this.lower = firstDeck] :
          [this.tie = true, this.higher = undefined, this.lower = undefined]
      if (this.tie === true) {
        this.war()
      }
      console.log(`${this.higher.name} won the round by playing the ${this.higher.cards[0].rank} of ${this.higher.cards[0].suit} against ${this.lower.name}'s ${this.lower.cards[0].rank} of ${this.lower.cards[0].suit}. ${this.higher.name} has ${this.higher.cards.length - 1} cards in their deck and ${this.lower.name} has ${this.lower.cards.length - 1} cards in their deck.`)
      this.battle.push(firstDeck.cards.shift())
      this.battle.push(secondDeck.cards.shift())
      this.higher.pile = this.higher.pile.concat(this.battle)
      this.battle = []
      if (firstDeck.cards.length === 0) {
        firstDeck.pile.length > 0 ? [firstDeck.cards = firstDeck.cards.concat(firstDeck.pile), firstDeck.pile = []] :
          [this.winner = `${secondDeck.name}`, this.gameEnd()]
      }
      if (secondDeck.cards.length === 0) {
        secondDeck.pile.length > 0 ? [secondDeck.cards = secondDeck.cards.concat(secondDeck.pile), secondDeck.pile = []] :
          [this.winner = `${firstDeck.name}`, this.gameEnd()]
      }
      this.match()
    }
  }

  war() {
    console.log(`${firstDeck.name} played the ${firstDeck.cards[0].rank} of ${firstDeck.cards[0].suit} and ${secondDeck.name} played the ${secondDeck.cards[0].rank} of ${secondDeck.cards[0].suit}. This means War!`)
    firstDeck.cards.length < 5 ? [this.winner = `${secondDeck.name}`, this.gameEnd()] :
    secondDeck.cards.length < 5 ? [this.winner = `${firstDeck.name}`, this.gameEnd()] :
    [this.battle = this.battle.concat(firstDeck.cards.splice(0, 4)), this.battle = this.battle.concat(secondDeck.cards.splice(0, 4)), this.match()]
  }

  gameEnd() {
    console.log(`${this.winner} won!`)
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