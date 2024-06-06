/*
Coding Steps:

- For the final project you will be creating an automated version of the classic card game WAR! 
There are many versions of the game WAR. In this version there are only 2 players.
    - You do not need to do anything special when there is a tie in a round.
- Think about how you would build this project and write your plan down. Consider classes such as: 
Card, Deck, Player, as well as what properties and methods they may include.
    - You do not need to accept any user input, when you run your code, the entire game should play 
    out instantly without any user input inside of your browser's console.

The completed project should, when executed, do the following:
- Deal 26 Cards to each Player from a Deck of 52 cards.
- Iterate through the turns where each Player plays a Card.
- The Player who played the higher card is awarded a point.
    - Ties result in zero points for both Players.
- After all cards have been played, display the score and declare the winner.

The following is extra credit (10pts)
- Write a Unit Test using Mocha and Chai for at least one of the functions you write.
*/

//Creating classes: Card, Deck, and Player

//Class Card will be taking in suit, rank, and value.

class Card {
    constructor(suit, rank, value) {
        this.suit = suit
        this.rank = rank
        this.value = value
    }
}

/*Class Deck will be taking an empty constructor. Needs to have cards as an array, suits defined in an
array, and ranks defined in an array. 
Need to have 52 cards. 4 suits and 13 ranks.
It will have methods to initialize the deck, shuffle the cards, deal a card, and deal cards to players.*/

class Deck {
    //Constructor method to initialize the deck with 52 cards.
    constructor() {
        this.cards = []         //cards is an array
        const suits = ['Clovers', 'Diamonds', 'Hearts', 'Spades']     //suits will not change
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10',
            'Jack', 'Queen', 'King', 'Ace']        //ranks will not change
        
        //Using nested 'for/of' loops to iterate over arrays suits and ranks.

        for (const suit of suits) {         //Loop iterates over each suit element in the suits array.
            //Each iteration, the below code will execute for suit. 4 suits.
            //Loop iterates over the ranks array. 13 ranks.
            //ranks.entries() returns an iterator object with the index-value pairs of the array.
            //Loop destructures to index and rank variables.
            for (const [index, rank] of ranks.entries()) {
                //new Card created with a suit, rank, and value.
                //It is then pushed into the cards array within the Deck class.
                //To make this work, we need to add 2 to the index, since '2' is the lowest rank
                //and index would start at 0.
                this.cards.push(new Card(suit, rank, index + 2))
            }
        }
    }

    //Method to shuffle the deck.
    shuffle() {
        //'for' loop in this.cards, starting from the last element and ending at the second element.
        for (let i = this.cards.length - 1; i > 0; i--) {       
            //Random index of j is generated using Math.random() and Math.floor.
            //j is between 0 and i, inclusive
            const j = Math.floor(Math.random() * (i + 1));
            //The elements at i and j are swapped in the this.cards array.
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
        }
    }

    //Method to deal a card.
    dealCard() {
        //pop() removes the last element from an array; like dealing from the top of the deck
        return this.cards.pop() 
    }

    //Method to deal cards to players.
    dealCards(dealtCards) {
        //cards array to store the dealt cards
        const cards = []
        //'for' loop to iterate dealtCards, it calls dealCard() and pushes the dealt card into the 
        //cards array
        for (let i = 0; i < dealtCards; i++) {
            cards.push(this.dealCard())
        }    
        return cards        //After all cards are dealt, return array cards.
    }
}

/*Class Player will take in the player's name for the constructor. Need to have name, hand, and points
inside the curly braces to keep track of the player. It will have methods to play a card and receive 
cards.*/

class Player {
    constructor(playerName) {
        this.playerName = playerName
        this.playerHand = []        //Indicates playerHand is an array of cards.
        this.playerPoints = 0       //Player starts at 0 point.
    }

    //Method to play a card for the player.
    playCard() {
        //pop() removes the last element from an array; like playing from the top of the deck
        return this.playerHand.pop()
    }

    //Method to receive cards for the player.
    receiveCards(cards) {
        //push(cards) is used to add the cards to the this.playerHand array.
        //Need the (...), spread syntax, to add each dealt card to the player.
        this.playerHand.push(...cards)   
    }
}

//How this War game is going to start.
//Need a function that calls to play the game.
//New Deck, shuffle, 2 players, deal cards to 2 players, and play the game.

function playWarGame() {
    const deck = new Deck()
    
    deck.shuffle()

    const player1 = new Player('Player 1')
    const player2 = new Player('Player 2')

    //Deal cards to 2 players
    const dealtCards = 26      //Each player gets 26 cards.
    player1.receiveCards(deck.dealCards(dealtCards))    //Player 1 and Player 2 receives the dealt cards.
    player2.receiveCards(deck.dealCards(dealtCards))

    //Play the game
    //While Player 1 and Player 2 have cards in their hands, the loop continues.
    while (player1.playerHand.length > 0 && player2.playerHand.length > 0) {
        //Each iteration, each player plays a card from their hand.
        const card1 = player1.playCard();
        const card2 = player2.playCard();
    
        //If card value of Player 1 > card value of Player 2
        //Player 1 gets a point
        //If card value of Player 1 < card value of Player 2
        //Player 2 gets a point
        //No point awarded if equal
        if (card1.value > card2.value) {
            player1.playerPoints++;
        } else if (card1.value < card2.value) {
            player2.playerPoints++;
        }
    }

    //Displaying the score and declaring the winner.
    console.log(`Player 1 Points: ${player1.playerPoints}`)
    console.log(`Player 2 Points: ${player2.playerPoints}`)

    if (player1.playerPoints > player2.playerPoints) {
        console.log('Player 1 Wins!')
    } else if (player1.playerPoints < player2.playerPoints) {
        console.log('Player 2 Wins!')
    } else {
        console.log('Tie!')
    }
}

//Run the War game!
playWarGame()

