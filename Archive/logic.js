// gameWords
var gameWords = ["probe", "hoax", "roswell", "coneheads", "futurama", "mork", "xenomorph", "alf", "ewok", "reptilian", "gamorean"];
// var letters = ["a", "a", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "_"];
var blanksAndCorrect = [];
var ansWordArr = [];
var randomIndex;
//Random word function
function randomWord(gameWords) {
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