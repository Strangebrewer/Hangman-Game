// Defining variables
var words = [
  "alice in chains"
  , "beastie boys"
  , "beck"
  , "dead can dance"
  , "inxs"
  , "led zeppelin"
  , "live"
  , "modest mouse"
  , "monster magnet"
  , "morcheeba"
  , "pink floyd"
  , "prince"
  , "soundgarden"
  , "temple of the dog"
  , "tool"
];
var audio = [
  "alice-audio"
  , "beastie-audio"
  , "beck-audio"
  , "dance-audio"
  , "inxs-audio"
  , "zeppelin-audio"
  , "live-audio"
  , "mouse-audio"
  , "monster-audio"
  , "morcheeba-audio"
  , "pink-audio"
  , "prince-audio"
  , "soundgarden-audio"
  , "temple-audio"
  , "tool-audio"
];
var images = [
  "alice-image"
  , "beastie-image"
  , "beck-image"
  , "dance-image"
  , "inxs-image"
  , "zeppelin-image"
  , "live-image"
  , "mouse-image"
  , "monster-image"
  , "morcheeba-image"
  , "pink-image"
  , "prince-image"
  , "soundgarden-image"
  , "temple-image"
  , "tool-image"
];
var alreadyGuessed = [];
var blanksArray = [];
var currentWord;
var currentWordArray = [];
var currentWordIndex;
var displayLoss = [];
var letterNumbers = "abcdefghijklmnopqrstuvwxyz0123456789";
var losses = 0;
var numSpaces = 0;
var previousWordIndex;
var remainingCorrectGuesses;
var remainingWrongGuesses = 6;
var usedWords = [];
var wins = 0;

function assignWord() {
  currentWordIndex = Math.floor(Math.random() * words.length);
  currentWord = words[currentWordIndex];
}

// This function checks if the current word has already been used. If it has, it runs assignWord again; if not, it pushes each letter into the currentWordArray, and puts a blank into blanksArray for each letter, joining them into one string for display in the html.
function checkWord() {
  if (usedWords.includes(currentWord)) {
    assignWord();
    checkWord();
  }
  else {
    for (i = 0; i < currentWord.length; i++) {

      if (letterNumbers.includes(currentWord.charAt(i))) {
        currentWordArray.push(currentWord.charAt(i));
        displayLoss.push(currentWord.charAt(i));
        blanksArray.push("_");
      } else if (currentWord.charAt(i) === ' ') {
        currentWordArray.push("&nbsp;");
        displayLoss.push("&nbsp;");
        blanksArray.push("&nbsp;");
      }

      if (currentWord.charAt(i) === " ") {
        numSpaces++;
      }

    }
  }
}

// Resets the arrays after each game
function reset() {
  currentWordArray.length = 0;
  displayLoss.length = 0;
  blanksArray.length = 0;
  alreadyGuessed.length = 0;
  remainingWrongGuesses = 6;
  numSpaces = 0;
  document.getElementById("game-outcome").style.animation = "none";
  document.getElementById("game-outcome").style.animationIterationCount = "0";
}

// Once all words have been used, this reset allows everything to start over.
function startOver() {
  usedWords.length = 0;
  wins = 0;
  losses = 0;
  document.onkeyup = function () {
    previousWordIndex = currentWordIndex;
    document.getElementById("default-image").style.display = "block";
    document.getElementById(images[previousWordIndex]).style.display = "none";
    document.getElementById(audio[previousWordIndex]).pause();
    newGame();
  }
}

// Set the initial conditions of each game and runs the game functions
function newGame() {
  reset();
  assignWord();
  checkWord();
  hangmanGame();
  remainingCorrectGuesses = currentWordArray.length - numSpaces;
  document.getElementById("game-outcome").innerHTML = "";
  document.getElementById("game-begin").style.animation = "none";
  document.getElementById("game-begin").innerHTML = "Good Luck!";
  document.getElementById("game-end").innerHTML = "";
  document.getElementById("guesses-remaining").innerHTML = remainingWrongGuesses;
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("losses").innerHTML = losses;
  document.getElementById("word-blanks").innerHTML = blanksArray.join(' ')
  document.getElementById("already-guessed").innerHTML = "";
}

// Main game function
function hangmanGame() {

  document.onkeyup = function (event) {

    var userGuess = event.key.toLowerCase();
    var wrongUserGuess;

    if (currentWordArray.includes(userGuess)) {
      var wrongUserGuess = false;
    } else {
      wrongUserGuess = true;
    }

    // Wrapped wrong guesses in an alphanumeric array checker to prevent unwanted key presses resulting in remainingWrongGuesses decrements
    if (letterNumbers.includes(userGuess)) {
      if (alreadyGuessed.includes(userGuess.toLocaleUpperCase())) {
        //next line prevents repeated correct guesses from ending up in the alreadyGuessed array
      } else if (blanksArray.includes(userGuess)) {

      } else if (wrongUserGuess) {
        alreadyGuessed.push(userGuess.toLocaleUpperCase());
        remainingWrongGuesses--;
      }
    }

    for (i = 0; i < currentWordArray.length; i++) {
      if (letterNumbers.includes(userGuess) && userGuess === currentWordArray[i]) {
        blanksArray.splice(i, 1, currentWordArray[i]);
        // the next line is necessary to prevent a win by pressing the same correct guess over and over again - because after it's been guessed, it's replaced in the array with a "#", and from that point on it won't decrement remainingCorrectGuesses.
        currentWordArray.splice(i, 1, "#");
        document.getElementById("word-blanks").innerHTML = blanksArray.join(' ');
        remainingCorrectGuesses--;
      }
    }

    if (remainingCorrectGuesses === 0) {
      wins++;
      document.getElementById("wins").innerHTML = wins;
      document.getElementById("game-outcome").innerHTML = "YOU WON!";
    } else if (remainingWrongGuesses === 0) {
      losses++;
      document.getElementById("losses").innerHTML = losses;
      document.getElementById("game-outcome").innerHTML = "YOU LOST!";
      document.getElementById("word-blanks").innerHTML = displayLoss.join(' ');
    }

    if (remainingCorrectGuesses === 0 || remainingWrongGuesses === 0) {
      // The next two document.getElement... have to be wrapped in if statements because there won't be a previousWordIndex for the first game, which will prevent the rest of this code from running
      if (audio[previousWordIndex]) {
        document.getElementById(audio[previousWordIndex]).load();
      }
      if (images[previousWordIndex]) {
        document.getElementById(images[previousWordIndex]).style.display = "none";
      }
      document.getElementById("default-image").style.display = "none";
      document.getElementById("game-outcome").style.animation = "opac2 1.5s";
      document.getElementById("game-outcome").style.animationIterationCount = "1";
      document.getElementById("game-begin").innerHTML = "Press Any Key to Play Again";
      document.getElementById("game-begin").style.animation = "opac .8s";
      document.getElementById("game-begin").style.animationIterationCount = "infinite";
      document.getElementById(audio[currentWordIndex]).play();
      document.getElementById(images[currentWordIndex]).style.display = "block";
      usedWords.push(currentWord);
      if (usedWords.sort().join(',') === words.sort().join(',')) {
        document.getElementById("game-end").innerHTML = "GAME<br>OVER!";
        document.getElementById("game-end").style.animation = "opac3 .3s";
        document.getElementById("game-end").style.animationIterationCount = "1";
        startOver();
      } else {
        document.onkeyup = function () {
          previousWordIndex = currentWordIndex;
          newGame();
        }
      }
    }

    document.getElementById("guesses-remaining").innerHTML = remainingWrongGuesses;
    document.getElementById("already-guessed").innerHTML = alreadyGuessed.join(', ');

  };
}

// This starts the first game
document.onkeyup = function () {
  newGame();
}
