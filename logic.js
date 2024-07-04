//Declaration of player's card deck and the opponent's card deck using array.

let playerHand = [];
let opponentHand = [];

//Initializing initial score of 0 to both players
let playerScore = 0;
let opponentScore = 0;

//Array that will hold all the 52 cards
let deck = [];

//Initializing suits
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

//Object created that gives info about points(value) associated with each card(key)
const values = {
    '2': 2, '3': 3, '4': 4, '5': 5,
    '6': 6, '7': 7, '8': 8, '9': 9,
    '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
};


//Default function that starts the game
function startGame() {
   
    deck = initializeDeck();
    shuffle(deck);

    playerHand = assignCards(7);
    opponentHand = assignCards(7);

    display();

}

//Function to initialize deck array with all 52 cards with objects as elements
function initializeDeck() {
    let deck= [];

    for (let suit of suits) {
        for (let value in values) {
            deck.push({ suit, value });
        }
    }
    
    return deck;
}

//Function to shuffle the deck cards, basically swapping objects
function shuffle(deck) {

    for (let i = deck.length - 1; i >= 0; i--) {
        let k = Math.random() * (i+1);
        let j = Math.floor(k);

        let temp =  deck[i];
        deck[i] = deck[j];
        deck[j] = temp; ;
    }
}


//Function to assign cards to each player 
function assignCards(numCards) {
    let hand = [];
    for (let i = 0; i < numCards; i++) {
        hand.push(deck.pop());
    }
    return hand;
}


//Display function displays the updated content on the screen
function display() {
    displayPlayerHand();
    displayOpponentHand();
    updateScoreboard();
}


//Below function displays the cards that player1 holds
function displayPlayerHand() {
    let insideHTML = playerHand.map(card => `${card.value} of ${card.suit}`).join('<br>');
    document.getElementById('player-hand').innerHTML = `<h2> Player1 Card Deck</h2>${insideHTML}`;
}

//Below function displays the cards that player2 holds
function displayOpponentHand() {
    let insideHTML = opponentHand.map(card => '🂠').join('<br>');;
    document.getElementById('opponent-hand').innerHTML = `<h2>Player2 Card Deck</h2>${insideHTML}`;
}


// Below function updates the scoreboard after each card being withdrawn from each user.
function updateScoreboard() {
    document.getElementById('player-score').textContent = `Player: ${playerScore}`;
    document.getElementById('opponent-score').textContent = `Opponent: ${opponentScore}`;
}


// This event gets triggered when "Play Turn" button is clicked which in-turns calls the playTurn function
document.getElementById('play-turn-btn').addEventListener('click', function() {
    playTurn();
});

//Below function helps in updating the score of the players by taking out the cards (object stored in each array) 
//and then adding the value (points) from the object to the associated player point collection
function playTurn() {
   
    if (playerHand.length > 0) {

        const playerCard = playerHand.shift(); 
        const opponentCard = opponentHand.shift(); 
   
        playerScore += values[playerCard.value];
        opponentScore += values[opponentCard.value];

        display();

    }

    if (playerHand.length === 0 && opponentHand.length === 0) {
        endGame();
    }
}


//This function calculates the end result by compraring the points of the players
function endGame() {
    if (playerScore > opponentScore) {
        alert('Congratulations! You win!');
    } else if (opponentScore > playerScore) {
        alert('Opponent wins. Better luck next time!');
    } else {
        alert('It\'s a tie!');
    }
}

document.addEventListener('DOMContentLoaded', startGame);  
