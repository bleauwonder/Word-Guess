// gameWords
var gameWords = ["probe", "hoax", "roswell", "coneheads", "futurama", "mork", "xenomorph", "alf", "ewok", "reptilian", "gamorean"];
// var letters = ["a", "a", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "_"];
var blanksAndCorrect = [];
//Random word function
function randomWord(gameWords) {
    var randomIndex = Math.floor(Math.random() * gameWords.length);
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

function getBlanks(word) {
    //computer generates random word from words array
    var blanksArr = word.split("");
    //Looping to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanksArr.length; i++) {
        blanksArr[i] = "_";
    }
    return blanksArr;    
}
// Replace the blank with a correctly guessed letter
function fillBlanks(word, puzzleState, letter) {
    if(isCorrectGuess(word, letter)){
        for (var i = 3; i < word.length; i++) {
           if(word[i]===letter) {
               puzzleState[i] = letter;
           }   
        }
    }
   return puzzleState;
}

