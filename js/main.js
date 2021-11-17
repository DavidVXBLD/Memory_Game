// ############################################################### VARIABLES ###############################################################

// This variable is used to stock the card numbers in an array to get them later
let cardStyle= [1,1,2,2,3,3,4,4,5,5,6,6];

// This variable is used to register the cards state, 0 being unrevealed (unrevealed, revealed, paired/hidden)
let cardState= [0,0,0,0,0,0,0,0,0,0,0,0];

// This variable is used to register the cards that are visible at the moment
let revealedCard= [];

// This variable is used to register which cards has already been paired
let twinsFound= 0;

// This variable is used to get the cards from the HTML code
let card= document.getElementById("game").getElementsByTagName("img");

// ############################################################### FUNCTIONS ###############################################################

// This function randomize the cards position
function cardsRandomizer() {
        // This loop will go through the whole array starting from the end
        for(let place= cardStyle.length-1; place>= 1; place--) {
                // This variable contains one card value at a time and randomize it
                let randomizer= Math.floor(Math.random()*(place+1));
                // This variable contains one card value at a time
                let save= cardStyle[place];
                // This operation switch the original card value to the randomized one
                cardStyle[place]= cardStyle[randomizer];
                // This operation push the randomized value to the save variable
                cardStyle[randomizer]= save;
        }
}

// This function deals with the cards state when it's called
function cardSwitch(cardNumber) {
        switch(cardState[cardNumber]) {
                // If the card state is 0, we see the card's back
                case 0: 
                        card[cardNumber].src="img/MG_GoldenStar.jpg";
                        break;
                // If its state is 1, we see the card's front
                case 1: 
                        card[cardNumber].src="img/card" + cardStyle[cardNumber] + ".jpg";
                        break;
                // If its state is -1, the card is hidden because it's paired
                case -1:
                        card[cardNumber].style.visibility="hidden";
                        break;
        }
}

// This is the main function. 
function mainGame(cardNumber) {
        // This "if" makes sure the user can't reveal more than 2 cards at the same time
        if(revealedCard.length<2) {
                // 0 is the only state checked since we don't want anything to happen if we click on a revealed or a paired card
                // If the clicked card was unrevealed(state 0), we reveal it(state 1), we add it to the revealedCard variable and we update its state
                if(cardState[cardNumber]=== 0) {
                        cardState[cardNumber]= 1;
                        revealedCard.push(cardNumber);
                        cardSwitch(cardNumber);
                }
                // This "if" is to determine if the 2 revealed cards make a pair.
                // If they do, we change their state (-1) and add them to the variable twinFound
                // If they don't, it stays to the value declared before the twin verification
                if(revealedCard.length=== 2) {
                        // This variable makes sure the cards get back to unrevealed if they dont match (if below)
                        let newState= 0;
                        if(cardStyle[revealedCard[0]]=== cardStyle[revealedCard[1]]) {
                                newState= -1;
                                twinsFound++;
                        }
                        // These operations confirms the new state of the revealed card (unrevealed or paired)
                        cardState[revealedCard[0]]= newState;
                        cardState[revealedCard[1]]= newState;
                        // The setTimeout function is to make sure the user has the time to see what's happening.
                        setTimeout(function() {
                                cardSwitch(revealedCard[0]);
                                cardSwitch(revealedCard[1]);
                                revealedCard=[];
                                // This "if" send the user to the playAgain function, which reload the game if all the pairs are found
                                if(twinsFound=== 6) {
                                        playAgain();
                                }
                        },750);
                }
        }
}

// This function reload the game when it's over so the user car play again
function playAgain() {
        // This alert fonction tell the player that he's finished the game
        alert("Bravo ! Tu as réussi");
        // location.reload() is a native function that is used to reload a page
        location.reload();
}

// ############################################################### START ###############################################################

// This loop is used to get the click event from the cards to use it the main function
for(let i=0; i<card.length; i++) {
        card[i].cardNumber=i;
        card[i].onclick=function() {
                mainGame(this.cardNumber);
        }
}

// This function is called to make sure the cards are randomized whenever the page is loaded
cardsRandomizer();