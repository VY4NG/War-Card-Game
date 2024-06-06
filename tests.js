//Import the expect function from the Chai library.

const expect = chai.expect

//Deck of 52 cards, it can shuffle and deal from the top of the deck.

describe('Deck equals to 52 cards, it can shuffle, and deal from the top of the deck.', () => {
    class Card {
        constructor(suit, rank, value) {
            this.suit = suit
            this.rank = rank
            this.value = value
        }
    }

    class Deck {
        constructor() {
            this.cards = []
            const suits = ['Clovers', 'Diamonds', 'Hearts', 'Spades']
            const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10',
                'Jack', 'Queen', 'King', 'Ace']
            for (const suit of suits) {
                for (const [index, rank] of ranks.entries()) {
                    this.cards.push(new Card(suit, rank, index + 2))
                }
            }
        }

        shuffle() {
            for (let i = this.cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
            }
        }

        dealCard() {
            return this.cards.pop()
        }

        dealCards(dealtCards) {
            const cards = []
            for (let i = 0; i < dealtCards; i++) {
                cards.push(this.dealCard())
            }
            return cards
        }
    }

    class Player {
        constructor(playerName) {
            this.playerName = playerName
            this.playerHand = []        
            this.playerPoints = 0     
        }

        playCard() {
            return this.playerHand.pop()
        }

        receiveCards(cards) {
            this.playerHand.push(cards)
        }
    }

    //Expect a Deck of cards to have 52 cards total. 
    it('Should PASS if cards in the deck is EQUAL to 52.', () => {
        let testDeck = new Deck
    
        expect(testDeck.cards).to.have.lengthOf(52)
    })  

    it('Should FAIL if cards in the deck is NOT EQUAL to 52.', () => {
        let testDeck = new Deck

        expect(testDeck.cards).to.have.lengthOf(100)
    })

    //Expect the Deck can shuffle, making sure the cards are the same amount but the order is different.
    it('Should be able to shuffle.', () => {
        let originalDeck = new Deck()
        let shuffledDeck = new Deck()
        shuffledDeck.shuffle()

        //Checking for the same amount of cards.
        expect(shuffledDeck.cards).to.have.lengthOf(originalDeck.cards.length)

        //Check to see if the shuffled deck has the same cards as the original deck.
        //Use .deep.members to check if arrays contain the same elements.
        expect(shuffledDeck.cards).to.have.deep.members(originalDeck.cards)
        //Use .not.eql ensure that they are not strictly equal and are shuffled.
        expect(shuffledDeck.cards).to.not.eql(originalDeck.cards)
    })

    //Expect the deck to be able to deal a card from the top of the deck.
    it('Should be able to deal a card from the top of the deck.', () => {
        let testDeck = new Deck

        //Need to save the last card in the deck to show that the deck is losing the top card.
        let lastCard = testDeck.cards[testDeck.cards.length - 1]
        
        //Deal a card from the deck.
        let dealtCard = testDeck.dealCard()

        //Check if the length of the deck is reduced by 1 after dealing a card.
        expect(testDeck.cards).to.have.lengthOf(51)
    })
})
