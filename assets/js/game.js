// Defining variables
var words = ["soundgarden", "beastie boys", "alice in chains", "pink floyd", "monster magnet", "tool", "nirvana", "live", "morcheeba", "beck", "modest mouse"];
var letterNumbers = "abcdefghijklmnopqrstuvwxyz0123456789";
var currentWord;
var currentWordIndex;
var currentWordArray = [];
var displayLoss = [];
var blanksArray = [];
var alreadyGuessed = [];
var wins = 0;
var losses = 0;
var numDashes = 0;
var remainingCorrectGuesses;
var remainingWrongGuesses = 7;

// This function sets the initial conditions of each game and runs the game functions
function newGame() {
  getLetters();
  hangmanGame();
  remainingCorrectGuesses = currentWordArray.length - numDashes;
  document.getElementById("game-outcome").innerHTML = "";
  document.getElementById("game-begin").innerHTML = "Good Luck!";
  document.getElementById("guesses-remaining").innerHTML = remainingWrongGuesses;
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("losses").innerHTML = losses;
  document.getElementById("word-blanks").innerHTML = blanksArray.join(' ')
  document.getElementById("already-guessed").innerHTML = "";
  // console.log(remainingCorrectGuesses);
}

//This function resets the arrays after each game
function reset() {
  currentWordArray.length = 0;
  displayLoss.length = 0;
  blanksArray.length = 0;
  alreadyGuessed.length = 0;
  remainingWrongGuesses = 7;
  numDashes = 0;
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
      currentWordArray.push("-");
      displayLoss.push("-");
      blanksArray.push("-");
    }

    if (currentWord.charAt(i) === " ") {
      numDashes++;
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
        // the next line is necessary to prevent a win by pressing the same correct guess over and over again.
        currentWordArray.splice(i, 1, "0");
        document.getElementById("word-blanks").innerHTML = blanksArray.join(' ');
        remainingCorrectGuesses--;
      }
    }

    if (remainingCorrectGuesses === 0) {
      wins++;
      document.getElementById("wins").innerHTML = wins;
      document.getElementById("game-outcome").innerHTML = "YOU WIN!";
      document.getElementById("game-begin").innerHTML = "Press Any Key to Play Again";
      document.onkeyup = function () {
        reset();
        newGame();
      }
    } else if (remainingWrongGuesses === 0) {
      losses++;
      document.getElementById("losses").innerHTML = losses;
      document.getElementById("game-outcome").innerHTML = "YOU LOSE!";
      document.getElementById("game-begin").innerHTML = "Press Any Key to Play Again";
      document.getElementById("word-blanks").innerHTML = displayLoss.join(' ');
      document.onkeyup = function () {
        reset();
        newGame();
      }
    }

    document.getElementById("guesses-remaining").innerHTML = remainingWrongGuesses;
    document.getElementById("already-guessed").innerHTML = alreadyGuessed.join(', ');

  }
}

// This starts the game
document.onkeyup = function () {
  newGame();
}


// NEXT:
// See if embedding the videos in the HTML with display: none and then triggering display: block makes it easier to autoplay. You can test this quickly by triggering wins and losses to just one video.