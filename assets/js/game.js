// WORKING CODE
// This is my word array - no multi-word names unless I get the game built and have time to go back and figure out parsing spaces vs. letters:
var bands = ["tool", "soundgarden", "nirvana", "live", "morcheeba", "beck"];
// This variable defines the word currently in play
var currentWord = bands[0];
var currentWordArray = [];
var blanksArray = [];
var displayWord;
var displayBlanks = [];
var wins = 0;
var remainingGuesses = 15;
var alreadyGuessed = [];
// This function takes the currentWord, pushes each letter into the currentWordArray and then puts a blank into blanksArray for each letter; then, it joins them into one string for display in the html:
function getLetters() {

  for (i = 0; i < currentWord.length; i++) {
    currentWordArray.push(currentWord.charAt(i));
    blanksArray.push('_');
  }

}

// getLetters();
// Test - it works!
//  console.log(currentWordArray.join(' '));
//  console.log(blanksArray.join(' '));

// RUN GAME
function hangmanGame() {

  document.onkeyup = function (event) {
    var userGuess = event.key;

    for (i = 0; i < currentWordArray.length; i++) {

      if (userGuess === currentWordArray[i]) {
        blanksArray.splice(i, 1, currentWordArray[i]);
        document.getElementById("word-blanks").innerHTML = blanksArray.join(' ');
      }

      // not working:
      // else {
      //   alreadyGuessed.push(userGuess);
      //   document.getElementById("already-guessed").innerHTML = alreadyGuessed.join(', ');
      // }

      // put something like:
        // if (arrayName.includes(userGuess);) {
        //   move letter to Already Guessed Array
        // }

    }
    if (currentWordArray.includes(userGuess) {
      
    }

    remainingGuesses--;
    document.getElementById("guesses-remaining").innerHTML = remainingGuesses;
  }

  // call the function:
  getLetters();

}


// START GAME
document.onkeyup = function () {
  hangmanGame();
  document.getElementById("guesses-remaining").innerHTML = remainingGuesses;
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("word-blanks").innerHTML = blanksArray.join(' ');
}