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
  var word = "probe";
  var letter = "o";
    if (word !== letter) {
    return false;
    } 
   else (word === letter); {
    return true;
    }
}


function getBlanks(gameWords) {
    var blanksArr = [];
    //computer generates random word from words array
    var lettersInWord = randomIndex.split("");

    //store length of word in blanks, for later use
    var getBlanks = lettersInWord.length;

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < getBlanks; i++) {
        blanksArr.push("_");
    }
    return blanksArr[getBlanks];    
}