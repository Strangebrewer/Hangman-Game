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
var names = [
  "Alice In Chains"
  , "Beastie Boys"
  , "Beck"
  , "Dead Can Dance"
  , "INXS"
  , "Led Zeppelin"
  , "Live"
  , "Modest Mouse"
  , "Monster Magnet"
  , "Morcheeba"
  , "Pink Floyd"
  , "Prince"
  , "Soundgarden"
  , "Temple of the Dog"
  , "TooL"
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
var currentImage =
  "<h4>" +
  names[currentWordIndex] +
  "</h4>" +
  "<img class='current-image' src='" +
  images[currentWordIndex] +
  " alt='hangman image'>"
  ;
var letterNumbers = "abcdefghijklmnopqrstuvwxyz0123456789";
var currentWord;
var currentWordIndex;
var currentWordArray = [];
var previousWordIndex;
var displayLoss = [];
var blanksArray = [];
var alreadyGuessed = [];
var wins = 0;
var losses = 0;
var numSpaces = 0;
var remainingCorrectGuesses;
var remainingWrongGuesses = 7;

// This function sets the initial conditions of each game and runs the game functions
function newGame() {
  getLetters();
  hangmanGame();
  remainingCorrectGuesses = currentWordArray.length - numSpaces;
  document.getElementById("game-outcome").innerHTML = "";
  document.getElementById("game-begin").style.animation = "none";
  document.getElementById("game-begin").innerHTML = "Good Luck!";
  document.getElementById("guesses-remaining").innerHTML = remainingWrongGuesses;
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("losses").innerHTML = losses;
  document.getElementById("word-blanks").innerHTML = blanksArray.join(' ')
  document.getElementById("already-guessed").innerHTML = "";
}

//This function resets the arrays after each game
function reset() {
  currentWordArray.length = 0;
  displayLoss.length = 0;
  blanksArray.length = 0;
  alreadyGuessed.length = 0;
  remainingWrongGuesses = 7;
  numSpaces = 0;
  document.getElementById("game-outcome").style.animation = "none";
  document.getElementById("game-outcome").style.animationIterationCount = "0";
}

// This function sets the currentWord variable, pushes each letter into the currentWordArray, and puts a blank into blanksArray for each letter, joining them into one string for display in the html:
function getLetters() {

  currentWordIndex = Math.floor(Math.random() * words.length)

  currentWord = words[currentWordIndex];

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


// This is the main game function
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
      if (alreadyGuessed.includes(userGuess)) {
        //next line prevents repeated correct guesses from ending up in the alreadyGuessed array
      } else if (blanksArray.includes(userGuess)) {

      } else if (wrongUserGuess) {
        alreadyGuessed.push(userGuess);
        remainingWrongGuesses--;
      }
    }

    for (i = 0; i < currentWordArray.length; i++) {
      if (letterNumbers.includes(userGuess) && userGuess === currentWordArray[i]) {
        blanksArray.splice(i, 1, currentWordArray[i]);
        // the next line is necessary to prevent a win by pressing the same correct guess over and over again - because after it's been guessed, it's replaced in the array with a "0", and from that point on it won't decrement remainingCorrectGuesses.
        currentWordArray.splice(i, 1, "0");
        document.getElementById("word-blanks").innerHTML = blanksArray.join(' ');
        remainingCorrectGuesses--;
      }
    }

    if (remainingCorrectGuesses === 0 || remainingWrongGuesses === 0) {
      if (audio[previousWordIndex]) {
        document.getElementById(audio[previousWordIndex]).pause();
      }
      if (images[previousWordIndex]) {
        document.getElementById(images[previousWordIndex]).style.display = "none";
      }
      document.getElementById("default-image").style.display = "none";
      document.getElementById("game-begin").innerHTML = "Press Any Key to Play Again";
      document.getElementById("game-begin").style.animation = "opac .8s";
      document.getElementById("game-begin").style.animationIterationCount = "infinite";
      document.getElementById(audio[currentWordIndex]).play();
      document.getElementById(images[currentWordIndex]).style.display = "block";
      document.onkeyup = function () {
        previousWordIndex = currentWordIndex;
        reset();
        newGame();
      }
    }

    if (remainingCorrectGuesses === 0) {
      wins++;
      document.getElementById("wins").innerHTML = wins;
      document.getElementById("game-outcome").innerHTML = "YOU WON!";
      document.getElementById("game-outcome").style.animation = "opac2 1.5s";
      document.getElementById("game-outcome").style.animationIterationCount = "1";
    } else if (remainingWrongGuesses === 0) {
      losses++;
      document.getElementById("losses").innerHTML = losses;
      document.getElementById("game-outcome").innerHTML = "YOU LOST!";
      document.getElementById("word-blanks").innerHTML = displayLoss.join(' ');
      document.getElementById("game-outcome").style.animation = "opac2 1.5s";
      document.getElementById("game-outcome").style.animationIterationCount = "1";
    }

    document.getElementById("guesses-remaining").innerHTML = remainingWrongGuesses;
    document.getElementById("already-guessed").innerHTML = alreadyGuessed.join(', ');

  }
}

// This starts the game
document.onkeyup = function () {
  newGame();
}