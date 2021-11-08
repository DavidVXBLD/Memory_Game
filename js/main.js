// ############################################################### VARIABLES ###############################################################

// This variable is used to stock the card numbers in an array to get them later
let cardStyle= [1,1,2,2,3,3,4,4,5,5,6,6];

// This variable is used to register the cards state (hidden, revealed, paired)
let cardState= [0,0,0,0,0,0,0,0,0,0,0,0];

// This variable is used to register which cards is visible at the moment
let revealedCard= [];

// This variable is used to register which cards has already been paired
let twinsFound= 0;

// This variable is used to get the cards from the HTML code
let card= document.getElementById("game").getElementsByTagName("img");

// ############################################################### FUNCTIONS ###############################################################

// This function randomize the cards position
function gameLauncher() {
        for(let place= cardStyle.length-1; place>= 1; place--) {
                let randomizer= Math.floor(Math.random()*(place+1));
                let save= cardStyle[place];
                cardStyle[place]= cardStyle[randomizer];
                cardStyle[randomizer]= save;
        }
}

// This function deals with the cards state change
function cardSwitch(cardNumber) {
        switch(cardState[cardNumber]) {
                case 0: 
                        card[cardNumber].src="img/MG_GoldenStar.jpg";
                        break;
                case 1: 
                        card[cardNumber].src="img/card" + cardStyle[cardNumber] + ".jpg";
                        break;
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
                // This "if" is to determine if the 2 revealed cards make a pair. If they do, we change their state (-1) and add them to the variable twinFound
                // If they don't, we change back their state to 0
                if(revealedCard.length=== 2) {
                        let newState= 0;
                        if(cardStyle[revealedCard[0]]=== cardStyle[revealedCard[1]]) {
                                newState= -1;
                                twinsFound++;
                        }
                        cardState[revealedCard[0]]= newState;
                        cardState[revealedCard[1]]= newState;
                        // The setTimeout function is to make sure the user has the time to see what's happening.
                        setTimeout(function() {
                                cardSwitch(revealedCard[0]);
                                cardSwitch(revealedCard[1]);
                                revealedCard=[];
                                // This "if" sned the user to the playAgain function, which reload the game, if all the pairs are found
                                if(twinsFound=== 6) {
                                        playAgain();
                                }
                        },750);
                }
        }
}

// ############################################################### START ###############################################################

// This function reload the game when it's over so the user car play again
function playAgain() {
        alert("Bravo !");
        location.reload();
}

// This loop is used to get the click event from the card to use it the main function
for(let i=0; i<card.length; i++) {
        card[i].cardNumber=i;
        card[i].onclick=function() {
                mainGame(this.cardNumber);
        }
}

gameLauncher();