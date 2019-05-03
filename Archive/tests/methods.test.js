// utility function to take word and get array of underscores of word length
const blanksUtil = word => Array(word.length).fill("_");

// words to be used for testing. will be overridden by user words if set/valid
const testWords = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

// TODO: check if user has global array. if so, use it in all of the tests. otherwise use fallback & skip appropriate failing tests

// check user's array for correctness
describe("The 'gameWords' variable", () => {
  before(() => {
    // check if defined. if not, skip rest of tests
    expect(
      typeof gameWords,
      "you need to declare the 'gameWords' variable and assigned a value to it"
    ).to.not.equal("undefined");
  });

  it("is an array", () => {
    expect(gameWords, "is the variable an array?").to.be.an("array");
  });

  it("has at least 5 elements", () => {
    expect(gameWords.length).to.be.at.least(5);
  });

  it("has an all-lowercase, no-spaced string at each index", () => {
    gameWords.forEach((element, index) => {
      const errPrefix = `element at index ${index}`;
      expect(element, `${errPrefix} was not a string`).to.be.a("string");
      expect(element.indexOf(" ") === -1, `${errPrefix} has a space`).to.be.true;
      expect(element === element.toLowerCase(), `${errPrefix} was not all lowercase`).to.be.true;
    });
  });
});

describe("The util function", () => {
  describe("randomWord", () => {
    let randStub;

    beforeEach(() => {
      randStub = sinon.stub(Math, "random");
    });

    afterEach(() => {
      randStub.restore();
    });

    before(() => {
      // check if defined. if not, skip rest of tests
      expect(
        typeof randomWord,
        "couldn't find a variable named 'randomWord' - are you sure you declared it?"
      ).to.not.equal("undefined");
    });

    /* we could theoretically get the names of the parameters and test that here as well
     * but theoretically they can name the parameters whatever they want, so long as the order is as instructed */
    it("has one parameter", () => {
      expect(randomWord.length).to.equal(1);
    });

    it("calls Math.random", () => {
      randomWord(testWords);
      expect(randStub.called, "try using Math.random").to.be.true;
    });

    // fragile test - hard to test randomness. assumes they use the solution's approach, so might want to guide them to that
    it("returns an element from array", () => {
      randStub.returns(0.5);

      const returnValue = randomWord(testWords);
      expect(testWords).to.include(returnValue);
    });

    it("doesn't error if random returns ~1", () => {
      randStub.returns(0.99999);

      const returnValue = randomWord(testWords);
      expect(
        testWords,
        `with ~the highest possible value of random, the 'randomWord' function returned ${returnValue}`
      ).to.include(returnValue);
    });

    it("doesn't error if random returns 0", () => {
      randStub.returns(0);

      const returnValue = randomWord(testWords);
      expect(
        testWords,
        `with the lowest possible value of random, the 'randomWord' function returned ${returnValue}`
      ).to.include(returnValue);
    });

    // might fail, though unlikely. kind of a hack, won't work for larger arrays
    it("is able to return every word in the array", () => {
      randStub.restore(); // don't want to stub random for this test

      const hits = Array(testWords.length).fill(false); // falses array for tracking hits

      const getMissedElements = () => testWords.filter((el, index) => !hits[index]);

      // loop until all are true, at most 10k times
      for (let i = 0; getMissedElements().length > 0 && i < 100000; i += 1) {
        const index = testWords.indexOf(randomWord(testWords));
        hits[index] = true;
      }

      expect(
        getMissedElements(),
        `couldn't get the word(s) "${getMissedElements()}" in the array "${testWords}"`
      ).to.be.empty;
    });
  });

  describe("isCorrectGuess", () => {
    before(() => {
      // check if defined. if not, skip rest of tests
      expect(
        typeof isCorrectGuess,
        "couldn't find a variable named 'isCorrectGuess' - are you sure you declared it?"
      ).to.not.equal("undefined");
    });

    it("is a function", () => {
      expect(isCorrectGuess).to.be.a("function");
    });

    it("has two parameters", () => {
      expect(isCorrectGuess.length).to.equal(2);
    });

    it("returns true if letter is in the word", () => {
      expect(isCorrectGuess("rick", "c")).to.be.true;
    });

    it("returns true if letter is the first in the word", () => {
      expect(isCorrectGuess("rick", "r")).to.be.true;
    });

    it("returns true if letter is the last in the word", () => {
      expect(isCorrectGuess("rick", "k")).to.be.true;
    });

    it("returns false if letter is not in the word", () => {
      expect(isCorrectGuess("morty", "c")).to.be.false;
    });
  });

  describe("getBlanks", () => {
    before(() => {
      // check if defined. if not, skip rest of tests
      expect(
        typeof getBlanks,
        "couldn't find a variable named 'getBlanks' - are you sure you declared it?"
      ).to.not.equal("undefined");
    });

    it("is a function", () => {
      expect(getBlanks).to.be.a("function");
    });

    it("has one parameter", () => {
      expect(getBlanks.length).to.equal(1);
    });

    it("returns an array of underscores equal to the length of the word", () => {
      const word = "summer";

      expect(getBlanks(word)).to.deep.equal(blanksUtil(word));

      const word2 = "birdperson";

      expect(getBlanks(word2)).to.deep.equal(blanksUtil(word2));
    });
  });

  describe("fillBlanks", () => {
    before(() => {
      // check if defined. if not, skip rest of tests
      expect(
        typeof fillBlanks,
        "couldn't find a variable named 'fillBlanks' - are you sure you declared it?"
      ).to.not.equal("undefined");
    });

    it("is a function", () => {
      expect(fillBlanks).to.be.a("function");
    });

    it("has three parameters", () => {
      expect(fillBlanks.length).to.equal(3);
    });

    it("replaces underscores when letter occurs multiple times in word", () => {
      const word = "terry";

      expect(fillBlanks(word, blanksUtil(word), "r")).to.deep.equal(["_", "_", "r", "r", "_"]);
    });

    it("keeps the existing letters in the array", () => {
      expect(fillBlanks("beth", ["b", "_", "_", "h"], "e")).to.deep.equal(["b", "e", "_", "h"]);
    });

    it("doesn't update the array if given a not-existing letter", () => {
      const word = "jerry";
      const blanks = blanksUtil(word);

      expect(fillBlanks(word, blanks, "t")).to.deep.equal(blanks);
    });

    it("replaces an underscore with the given letter in the correct locations", () => {
      const word = "beth";

      // test replacing letters in all possible locations on a word
      for (let i = 0; i < word.length; i += 1) {
        const expected = blanksUtil(word);

        expected[i] = word[i];

        expect(
          fillBlanks(word, blanksUtil(word), word[i]),
          `ran into a problem replacing character at index ${i}`
        ).to.deep.equal(expected);
      }
    });
  });
});

describe("The game management function", () => {
  // TODO: make this and other tests more generic - just test changes to myGame object instead of explicit input/output?
  describe("setupRound", () => {
    const testWord = testWords[2];

    before(() => {
      // check if defined. if not, skip rest of tests
      expect(
        typeof setupRound,
        "couldn't find a variable named 'setupRound' - are you sure you declared it?"
      ).to.not.equal("undefined");
    });

    it("is a function", () => {
      expect(setupRound).to.be.a("function");
    });

    it("returns an object", () => {
      expect(setupRound(testWords, 0, 0)).to.be.an("object");
    });

    it("has one parameter", () => {
      expect(setupRound.length).to.equal(1);
    });

    describe("returned object", () => {
      it("has the 'word' prop set based on the argument", () => {
        const { word: wordProp } = setupRound(testWord);
        expect(wordProp).to.exist;
        expect(wordProp).to.equal(testWord);
      });

      it("has the 'guessesLeft' property set to 9", () => {
        const { guessesLeft } = setupRound(testWord, 0, 0);
        expect(guessesLeft).to.equal(9);
      });

      it("has the 'wrongGuesses' prop set to an empty array", () => {
        const { wrongGuesses } = setupRound(testWord, 0, 0);
        expect(wrongGuesses).to.deep.equal([]);
      });

      it("has the 'puzzleState' prop set to blanks array based on argument", () => {
        const { puzzleState } = setupRound(testWord, 0, 0);
        const blanks = blanksUtil(puzzleState);
        expect(puzzleState).to.deep.equal(blanks);
      });
    });
  });

  // just test the round object on the top level game object, or test what is returned?
  describe("updateRound", () => {
    let testRound;

    before(() => {
      // check if defined. if not, skip rest of tests
      expect(
        typeof updateRound,
        "couldn't find a variable named 'updateRound' - are you sure you declared it?"
      ).to.not.equal("undefined");
    });

    beforeEach(() => {
      testRound = {
        word: "beth",
        guessesLeft: "3",
        puzzleState: ["b", "_", "t", "h"],
        wrongGuesses: ["a", "c", "d", "f", "g", "h"]
      };
    });

    it("is a function", () => {
      expect(updateRound).to.be.a("function");
    });

    it("exists and is a function", () => {
      expect(updateRound).to.exist;
      expect(updateRound).to.be.a("function");
    });

    it("has two parameters", () => {
      expect(updateRound.length).to.equal(2);
    });

    it("updates puzzleState on correct guess", () => {
      updateRound(testRound, "e");

      expect(
        testRound.puzzleState,
        "puzzle state array should be updated when a correctly guessed letter is passed as an argument"
      ).to.deep.equal(["b", "e", "t", "h"]);
    });

    it("doesn't decrease guessesLeft on correct guess", () => {
      const originalGuesses = testRound.guessesLeft;
      updateRound(testRound, "e");

      expect(
        testRound.guessesLeft,
        "number of guesses left shouldn't change when a correct guess is made"
      ).to.equal(originalGuesses);
    });

    it("updates wrongGuesses array on wrong guess", () => {
      const wrongGuess = "q";
      updateRound(testRound, wrongGuess);

      expect(
        testRound.wrongGuesses,
        "wrongGuesses array should include the wrongly guessed letter"
      ).to.include(wrongGuess);
    });

    it("updates guessesLeft count on wrong guess", () => {
      const originalGuessesLeft = testRound.guessesLeft;
      updateRound(testRound, "q");

      expect(
        testRound.guessesLeft,
        "number of guesses left should decrease when a wrong guess is made"
      ).to.equal(originalGuessesLeft - 1);
    });

    it("doesn't change the word", () => {
      const originalWord = testRound.word;
      updateRound(testRound, "q");

      expect(testRound.word, "the round's word should stay the same").to.equal(originalWord);
    });
  });

  describe("hasWon", () => {
    before(() => {
      // check if defined. if not, skip rest of tests
      expect(
        typeof hasWon,
        "couldn't find a variable named 'hasWon' - are you sure you declared it?"
      ).to.not.equal("undefined");
    });

    it("is a function", () => {
      expect(hasWon).to.be.a("function");
    });

    it("returns a boolean", () => {
      expect(hasWon([])).to.be.a("boolean");
    });

    it("has one parameter", () => {
      expect(hasWon.length).to.equal(1);
    });

    it("returns true if given an array of no blanks", () => {
      expect(hasWon(["t", "e", "r", "r", "y"])).to.be.true;
    });

    it("returns false if given an array with a single blank in it", () => {
      expect(hasWon(["j", "_", "r", "r", "y"])).to.be.false;
    });

    // should catch problems with off-by-one
    it("returns false if array only has blank at the beginning", () => {
      expect(hasWon(["_", "e", "r", "r", "y"])).to.be.false;
    });

    // should catch problems with off-by-one
    it("returns false if array only has blank at the end", () => {
      expect(hasWon(["j", "e", "r", "r", "_"])).to.be.false;
    });

    // should catch problems with only replacing once/first instance
    it("returns false if array has multiple blanks", () => {
      expect(hasWon(["t", "e", "_", "_", "y"])).to.be.false;
    });
  });

  describe("hasLost", () => {
    before(() => {
      // check if defined. if not, skip rest of tests
      expect(
        typeof hasLost,
        "couldn't find a variable named 'hasLost' - are you sure you declared it?"
      ).to.not.equal("undefined");
    });

    it("is a function", () => {
      expect(hasLost).to.be.a("function");
    });

    it("returns a boolean", () => {
      expect(hasLost([])).to.be.a("boolean");
    });

    it("has one parameter", () => {
      expect(hasLost.length).to.equal(1);
    });

    it("returns true if given 0", () => {
      expect(hasLost(0)).to.be.true;
    });

    it("returns false if given a number greater than 0", () => {
      expect(hasLost(5)).to.be.false;
    });

    // should catch problems with off-by-one
    it("returns false with 1 guess left", () => {
      expect(hasLost(1)).to.be.false;
    });
  });

  describe("isEndOfRound", () => {
    const round = {
      word: "beth",
      guessesLeft: "3",
      puzzleState: ["b", "_", "t", "h"],
      wrongGuesses: ["a", "c", "d", "f", "g", "h"]
    };

    before(() => {
      // check if defined. if not, skip rest of tests
      expect(
        typeof isEndOfRound,
        "couldn't find a variable named 'isEndOfRound' - are you sure you declared it?"
      ).to.not.equal("undefined");
    });

    it("is a function", () => {
      expect(isEndOfRound).to.be.a("function");
    });

    it("returns a boolean", () => {
      expect(isEndOfRound(round)).to.be.a("boolean");
    });

    it("has one parameter", () => {
      expect(isEndOfRound.length).to.equal(1);
    });

    it("returns true if given puzzleState with no blanks", () => {
      round.puzzleState = ["b", "e", "t", "h"];
      expect(isEndOfRound(round)).to.be.true;
    });

    it("returns true if given puzzleState with some blanks and guessesLeft is 0", () => {
      round.guessesLeft = 0;
      round.puzzleState = ["b", "_", "t", "h"];
      expect(isEndOfRound(round)).to.be.true;
    });

    it("returns false if given puzzleState with blanks and guessesLeft is greater than 0", () => {
      round.guessesLeft = 3;
      round.puzzleState = ["b", "_", "t", "h"];
      expect(isEndOfRound(round)).to.be.false;
    });

    // should catch problems with off-by-one
    it("returns false if given puzzleState with blanks and guessesLeft is 1", () => {
      round.guessesLeft = 1;
      round.puzzleState = ["b", "_", "t", "h"];
      expect(isEndOfRound(round)).to.be.false;
    });
  });

  describe("setupGame", () => {
    before(() => {
      // check if defined. if not, skip rest of tests
      expect(
        typeof setupGame,
        "couldn't find a variable named 'setupGame' - are you sure you declared it?"
      ).to.not.equal("undefined");
    });

    it("is a function", () => {
      expect(setupGame).to.be.a("function");
    });

    it("returns an object", () => {
      expect(setupGame(testWords, 0, 0)).to.be.a("object");
    });

    it("has three parameters", () => {
      expect(setupGame.length).to.equal(3);
    });

    describe("returned object", () => {
      it("has a nested round object", () => {
        const { round } = setupGame(testWords, 0, 0);
        expect(round, "doesn't have the 'round' property").to.exist;
        expect(round, "has a 'round' property, but it isn't an object").to.be.an("object");
      });

      // TODO: fix this test
      it("calls setupRound with a random word", () => {
        // 'cheat' this test by only giving them one word to be possibly chosen. can be improved.
        const testWord = "mbaku";
        const { round } = setupGame([testWord], 0, 0);
        expect(
          round.word,
          "doesn't have the 'round' property with a 'word' property"
        ).to.deep.equal(testWord);
      });

      it("has the wins set based on the parameter", () => {
        const winCount = 3;
        const { wins } = setupGame(testWords, winCount, 0);
        expect(wins).to.exist;
        expect(wins).to.equal(winCount);
      });

      it("has the losses set based on the argument", () => {
        const lossCount = 3;
        const { losses } = setupGame(testWords, 0, lossCount);
        expect(losses).to.exist;
        expect(losses).to.equal(lossCount);
      });
    });
  });

  describe("startNewRound", () => {
    let alert;
    let testGame;

    before(() => {
      // check if defined. if not, skip rest of tests
      expect(
        typeof startNewRound,
        "couldn't find a variable named 'startNewRound' - are you sure you declared it?"
      ).to.not.equal("undefined");
    });

    beforeEach(() => {
      alert = sinon.stub(window, "alert");
      testGame = {
        words: testWords,
        wins: 0,
        losses: 0,
        round: {
          word: "beth",
          guessesLeft: "3",
          puzzleState: ["b", "_", "t", "h"],
          wrongGuesses: ["a", "c", "d", "f", "g", "h"]
        }
      };
    });

    afterEach(() => {
      alert.restore();
    });

    it("is a function", () => {
      expect(startNewRound).to.be.a("function");
    });

    // TODO: do we need to test all this? what if we just test top-level changes to the myGame object?
    it("exists and is a function", () => {
      expect(startNewRound).to.exist;
      expect(startNewRound).to.be.a("function");
    });

    it("has one parameter", () => {
      expect(startNewRound.length).to.equal(1);
    });

    // it("returns an object", () => {
    //   expect(startNewRound(testGame)).to.be.an("object");
    // });

    it("alert contains the word if won", () => {
      const originalWord = testGame.round.word;
      testGame.round.puzzleState = ["b", "e", "t", "h"];
      startNewRound(testGame);
      expect(alert.calledOnce).to.be.true;
      expect(alert.args[0][0]).to.include(originalWord);
    });

    it("updates wins on the game object if has won", () => {
      const originalWins = testGame.wins;

      testGame.round.puzzleState = ["b", "e", "t", "h"];
      startNewRound(testGame);

      expect(testGame.wins).to.equal(originalWins + 1);
    });

    it("alert contains the word if lost", () => {
      const originalWord = testGame.round.word;
      testGame.round.guessesLeft = 0;
      startNewRound(testGame);
      expect(alert.calledOnce).to.be.true;
      expect(alert.args[0][0]).to.include(originalWord);
    });

    // TODO: make this test more generic. just test the top level myGame object after call
    it("updates losses on the game object if has lost", () => {
      const originalLosses = testGame.losses;

      testGame.round.guessesLeft = 0;
      startNewRound(testGame);

      expect(testGame.losses).to.equal(originalLosses + 1);
    });
  });

  // check initial myGame state object for correctness
  describe("The 'myGame' variable", () => {
    before(() => {
      // check if defined. if not, skip rest of tests
      expect(
        typeof myGame,
        "you need to declare the 'myGame' variable and assigned a value to it"
      ).to.not.equal("undefined");
    });

    it("is an object", () => {
      expect(myGame).to.be.an("object");
    });

    // TODO: update and finish this/other "game" variable tests
    it("has the right properties and values", () => {
      expect(myGame).to.have.property("words");
      expect(myGame.words).to.be.an("array");
    });
  });
});

// helper function to get user html file and add it here for testing
// function loadUserPage() {
//   const qr = new XMLHttpRequest();
//   qr.open("get", "YOUR_file_or_page.htm");
//   qr.send();
//   qr.onload = function updatePageWithUserMarkup() {
//     console.log(qr.responseText);
//     document.getElementById("test-display").innerHTML = qr.responseText;
//   };
// }
// loadUserPage();

// TODO: test updatePage and onkeyup functions
describe("The page", () => {
  describe("content", () => {
    it("has an element with the id 'puzzle-state'", () => {
      expect(document.getElementById("puzzle-state")).to.exist;
    });

    it("initializes element with the id 'puzzle-state' as string representation of puzzleState", () => {
      expect(
        document.getElementById("puzzle-state").innerHTML,
        "'puzzle-state' element should be initialized to blank array representation of word round, separated by spaces"
      ).to.equal(myGame.round.puzzleState.join(" "));
    });

    it("has an element with the id 'wrong-guesses'", () => {
      expect(document.getElementById("wrong-guesses")).to.exist;
    });

    it("initializes element with the id 'wrong-guesses' as empty", () => {
      expect(document.getElementById("wrong-guesses").innerHTML).to.be.empty;
    });

    it("has an element with the id 'guesses-left'", () => {
      expect(document.getElementById("guesses-left")).to.exist;
    });

    it("initializes element with the id 'guesses-left' as 9", () => {
      expect(document.getElementById("guesses-left").innerHTML).to.equal("9");
    });

    it("has an element with the id 'win-counter'", () => {
      expect(document.getElementById("win-counter")).to.exist;
    });

    it("initializes element with the id 'win-counter' as 0", () => {
      expect(document.getElementById("win-counter").innerHTML).to.equal("0");
    });

    it("has an element with the id 'loss-counter'", () => {
      expect(document.getElementById("loss-counter")).to.exist;
    });

    it("initializes element with the id 'loss-counter' as 0", () => {
      expect(document.getElementById("loss-counter").innerHTML).to.equal("0");
    });
  });

  // helper functions to getKeyCode from character, trigger keypress events
  const getKeyCode = char => {
    const keyCode = char.charCodeAt(0);

    return keyCode > 90 ? keyCode - 32 : keyCode;
  };

  const triggerKeypress = key => {
    const keyCode = getKeyCode(key);
    const eventObject = {
      key,
      keyCode,
      which: keyCode
    };

    const dispatchEvent = (event, options) =>
      document.dispatchEvent(new KeyboardEvent(event, options));

    // trigger all 3, since they should only be listening on one.
    dispatchEvent("keydown", eventObject);
    dispatchEvent("keypress", eventObject);
    dispatchEvent("keyup", eventObject);
  };

  // helper to set value at id with element
  const resetValue = (id, val) => {
    document.getElementById(id).innerHTML = val;
  };

  describe("when a key is pressed", () => {
    let observer;
    let alert; // make alert be quiet while testing

    beforeEach(() => {
      // override global game object for testing at beginning of each test
      myGame = {
        words: testWords,
        wins: 0,
        losses: 0,
        round: {
          word: "beth",
          guessesLeft: "3",
          puzzleState: ["b", "_", "_", "h"],
          wrongGuesses: ["a", "c", "d", "f", "g", "h"]
        }
      };

      resetValue("guesses-left", myGame.round.guessesLeft);
      resetValue("puzzle-state", myGame.round.puzzleState.join(" "));
      resetValue("wrong-guesses", myGame.round.wrongGuesses.join(" "));
      resetValue("win-counter", myGame.wins);
      resetValue("loss-counter", myGame.losses);

      alert = sinon.stub(window, "alert");
    });

    afterEach(() => {
      // reset observer after each test
      observer && observer.disconnect && observer.disconnect();

      // reset alert
      alert.restore();
    });

    it("updates element with the id 'puzzle-state' if 'puzzleState' has changed", done => {
      const key = "t";
      const el = document.getElementById("puzzle-state");

      // listen for change to element
      observer = new MutationObserver(() => {
        expect(el.innerHTML).to.contain(key);
        observer.disconnect();
        done();
      });

      observer.observe(el, { attributes: true, childList: true, characterData: true });

      triggerKeypress(key);
    });

    it("updates element with the id 'wrong-guesses' if 'wrongGuesses' has changed", done => {
      const key = "q";
      const el = document.getElementById("wrong-guesses");

      // listen for change to element
      observer = new MutationObserver(() => {
        expect(el.innerHTML).to.contain(key);
        observer.disconnect();
        done();
      });

      observer.observe(el, { attributes: true, childList: true, characterData: true });

      triggerKeypress(key);
    });

    it("updates element with the id 'guesses-left' if 'guessesLeft' has changed", done => {
      const key = "z";
      const originalLeft = myGame.round.guessesLeft;
      const el = document.getElementById("guesses-left");

      // listen for change to element
      observer = new MutationObserver(() => {
        expect(el.innerHTML).to.equal((originalLeft - 1).toString());
        observer.disconnect();
        done();
      });

      observer.observe(el, { attributes: true, childList: true, characterData: true });

      triggerKeypress(key);
    });

    it("updates element with the id 'win-counter' if 'wins' has changed", done => {
      const key = "t";
      const originalWins = myGame.wins;
      const el = document.getElementById("win-counter");
      myGame.round.puzzleState = ["b", "e", "_", "h"];

      // listen for change to element
      observer = new MutationObserver(() => {
        expect(el.innerHTML).to.equal((originalWins + 1).toString());
        observer.disconnect();
        done();
      });

      observer.observe(el, { attributes: true, childList: true, characterData: true });

      triggerKeypress(key);
    });

    it("updates element with the id 'loss-counter' if 'losses' has changed", done => {
      const key = "q";
      const originalLosses = myGame.losses;
      const el = document.getElementById("loss-counter");
      myGame.round.guessesLeft = 1;

      // listen for change to element
      observer = new MutationObserver(() => {
        expect(el.innerHTML).to.equal((originalLosses + 1).toString());
        observer.disconnect();
        done();
      });

      observer.observe(el, { attributes: true, childList: true, characterData: true });

      triggerKeypress(key);
    });
  });
});
