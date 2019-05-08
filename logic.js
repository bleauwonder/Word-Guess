// add onload so that the html is read first every time before the js
window.onload = function() {
// set up game with an array of words and functions that will provide the logic for the eventual input
// gameWords
var gameWords = ["probe", "hoax", "roswell", "coneheads", "futurama", "mork", "xenomorph", "alf", "ewok", "reptilian", "gamorean"];

//Choose a random word
function randomWord(gameWords) {
    var randomIndex;
    randomIndex = Math.floor(Math.random() * gameWords.length);
    return gameWords[randomIndex];
}
// Is it the correct guess?
var isCorrectGuess = function(word, letter) {
    for (var i = 0; i <= word.length; i++) {
    if (word[i] === letter) {
        return true;
     } 
    }
    return false;
}
// adds "_" to ansWordArr
var getBlanks = function(word) {
        var ansWordArr = [];
        for (var i = 0; i < word.length; i++) {
            ansWordArr[i] = "_";
        }
        return ansWordArr; 
}

// Replace the blank with a correctly guessed letter
function fillBlanks(word, puzzleState, letter) {
    if(isCorrectGuess(word, letter)){
        for (var i = 0; i < word.length; i++) {
           if(word[i] === letter) {
               puzzleState[i] = letter;
           }   
        }
    }
   return puzzleState;
}

// Game Management Functions \\
// Set up the round correctly with an object, so a random word pops up and all counters are correctly set
function setupRound(word) {
    var obj = {
        word:word,
        guessesLeft: 9,
        wrongGuesses:[],
        puzzleState: getBlanks(word),
    }
    return obj;
 }
// Update to each guess using the previous object as the base
function updateRound(obj, letter) {
     if (isCorrectGuess(obj.word, letter) === false) {
         obj.guessesLeft--;
         obj.wrongGuesses.push(letter);
     }
     else {
         fillBlanks(obj.word, obj.puzzleState, letter)
     }
     return obj;
}
// Did the user win? What happens if they won?
function hasWon(puzzleState) {
    for (var i = 0; i < puzzleState.length; i++) {
    if (puzzleState[i] === "_") {
        return false;
     } 
    }
    return true;
    let audio = new Audio("XFilesMain.mp3");
            audio.play()
}
// Did the user lose? What happens if they lose?
function hasLost(guessesLeft) {
        if (guessesLeft === 0) {
            return true;
        }
        return false;
}
// Once the round ends, the user will know
function isEndOfRound(obj) {
    if (obj.guessesLeft === 0) {
    return true;
}
    if (hasWon(obj.puzzleState)) {
        return true;
    }
return false;
}

// Setting up initial game
function setupGame(gameWords, wins, losses) {
    var game = {
        words: gameWords,
        wins: wins,
        losses: losses,
        round: setupRound(randomWord(gameWords)),   
        }
    return game;
 }
// Reset to start a new round, whether the user won or lost
 function startNewRound(game) {
     var puzzleState = game.round.puzzleState;
     if (hasWon(puzzleState) === true) {
        game.wins++; 
        x = new Audio("XFilesMain.mov")
        x.onplaying = function ()
        {
        alert("You won! The word is " + game.round.word + ". I knew you could do it.");
        }
        x.play();
     }
     else {
         game.losses++;
         x = new Audio("XFilesMain.mov")
        x.onplaying = function ()
        {
         alert("You lost! The word is " + game.round.word + ". It's okay, I'll still play the music. Try again!");
        }
        x.play();
    }
     return game;
 }
 
//DOM stuff
// The variable to be used for the set up of the game
 var myGame = setupGame(gameWords, 0, 0);

 // Adding in a console.log so user can check in on things
 console.log(myGame);
// Appending the spaces 
var puzzle = document.getElementById("puzzle-state")
puzzle.innerHTML = myGame.round.puzzleState.join(" ")


// Event function to input and output user experience
var keyPressed;
document.onkeyup = function (event) {

    keyPressed = event.key.toLowerCase() 
    console.log("The " + keyPressed + " key was pressed");
        isCorrectGuess(myGame.round.word, keyPressed);
        fillBlanks(myGame.round.word, myGame.round.puzzleState, keyPressed);
        updateRound(myGame.round, keyPressed);
        hasWon(myGame.round.puzzleState);
        hasLost(myGame.round.guessesLeft);

    // Have they won? Or are there guesses left?
    if (isEndOfRound(myGame.round)){
        myGame = startNewRound(myGame);
        myGame.round = setupRound(randomWord(gameWords));
    }

    // Uses the ramdom word and displays the empty blanks
    document.getElementById("puzzle-state").innerText = myGame.round.puzzleState.join(" ");

    // Displays the updated object for wrong guesses from user
    document.getElementById("wrong-guesses").innerText = myGame.round.wrongGuesses;

    // Displays the updated object for total wins
    document.getElementById("win-counter").innerText = myGame.wins;

    // Displays the updated object for total losses
    document.getElementById("loss-counter").innerText = myGame.losses;

    // Displays the updated object for number of guesses left
    document.getElementById("guesses-left").innerText = myGame.round.guessesLeft;

    console.log(myGame);

} // ------------ end of onclick event

}