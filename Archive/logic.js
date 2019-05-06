// gameWords
var gameWords = ["probe", "hoax", "roswell", "coneheads", "futurama", "mork", "xenomorph", "alf", "ewok", "reptilian", "gamorean"];
// var letters = ["a", "a", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "_"];


//Random word function
function randomWord(gameWords) {
    var randomIndex;
    randomIndex = Math.floor(Math.random() * gameWords.length);
    return gameWords[randomIndex];
}

var isCorrectGuess = function(word, letter) {
    for (var i = 0; i <= word.length; i++) {
    if (word[i] === letter) {
        return true;
     } 
    }
    return false;
}

var getBlanks = function(word) {
        // adds "_" to ansWordArr
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

function setupRound(word) {
    var obj = {
        word:word,
        guessesLeft: 9,
        wrongGuesses:[],
        puzzleState: getBlanks(word),
    }
    return obj;
 }

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

function hasWon(puzzleState) {
    for (var i = 0; i < puzzleState.length; i++) {
    if (puzzleState[i] === "_") {
        return false;
     } 
    }
    return true;
}

function hasLost(guessesLeft) {
        if (guessesLeft === 0) {
            return true;
        }
        return false;
}

function isEndOfRound(obj) {
    if (obj.guessesLeft === 0) {
    return true;
}
    if (hasWon(obj.puzzleState)) {
        return true;
    }
return false;
}

function setupGame(gameWords, wins, losses) {
    var game = {
        words: gameWords,
        wins: wins,
        losses: losses,
        round: setupRound(randomWord(gameWords)),   
        }
    return game;
 }

 function startNewRound(game) {
     var puzzleState = game.round.puzzleState;
     if (hasWon(puzzleState) === true) {
        game.wins++;
        alert("You won! The word is " + game.round.word + ". I knew you could do it.")
     }
     else {
         game.losses++;
         alert("You lost! The word is " + game.round.word + ". It's okay, try again.")
     }
     return game;
 }

 var myGame = setupGame(gameWords, 0, 0);
 
 console.log(myGame);

var keyPressed;
document.onkeyup = function (evt) {
    keyPressed = evt.key.toLowerCase() 
    console.log("The " + keyPressed + " key was pressed");

    // CALL BACK THE LOGIC
    isCorrectGuess(myGame.round.word, keyPressed);
    fillBlanks(myGame.round.word, myGame.round.puzzleState, keyPressed);
    updateRound(myGame.round, keyPressed);
    hasWon(myGame.round.puzzleState);
    hasLost(myGame.round.guessesLeft);

    // CHECKS IF GUESSES ARE LEFT OR HAS WON
    if (isEndOfRound(myGame.round)){
        myGame = startNewRound(myGame);
        myGame.round = setupRound(randomWord(gameWords));
    }
    // --------- end CALL BACK THE LOGIC

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