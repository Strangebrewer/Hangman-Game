// BRAINSTORMING
  // To Do / Items I may need:
    // an if / else statement to check if the key event is one of the letters:
    // if it is, then it appears in its place;
    // if it isn't, then it appears in the letters guessed place
    // declare variables, such as wins = 0;, remainingGuesses = 15;
    // An array and a function or method to push wrong guesses to that array, and then figure out how to display the contents of that array

    // I'll need a way of taking the letters of the game words and putting them in the _ _ _ _ _ format.

  // Conditions for ending the game:
    // All incorrect guesses remaining have been used up: Game Over!
    // All letters have been revealed. You Win!
    // When game ends, remove all from 'letters guessed' array.


  ////////////////////////////////////////////////////////////////////////////////////////////////


// IDEAS THAT DIDN'T WORK
  // This just leads to the last one in the array
  // for (i = 0; i < bands.length; i++) {
  //       currentWord = bands[i];
  // }


  ////////////////////////////////////////////////////////////////////////////////////////////////


// IDEAS THAT MAY WORK ONCE I HAVE A PLACE TO PUT THEM...
// Possible way to do "Press Any Key To Begin"
  // document.onkeyup = function() {
  //   hangmanGame();
  // }

  // var currentWord = bands[2];
  // var indices = [];
  // for (var i=0; i<currentWord.length;i++) {
  //     if (currentWord[i] === "s") indices.push(i);
  // }

// wrap the if / else statement in a for loop based on incorrect guesses remaining
  // document.onkeyup = function(letterGuess) {
  //   for (i = 0; i < currentWord.length; i++) {
  //     if (letterGuess.key ===  currentWord.indexOf(i)) {
  //       hangmanRules.correctGuess();
  //     } else if (letterGuess.key === wrongLetter) {
  //       hangmanRules.incorrectGuess();
  //     }
  //   }
  // }


  // next part might be an if statement:
    // if (event.key === "correct letter") {
    //   display letter in game console
    // } else {
    //   push letter to 'letters guessed' array and display it
    //   subtract 1 from guesses remaining
    // }

  ////////////////////////////////////////////////////////////////////////////////////////////////


// WORKING CODE
// This is my word array - no multi-word names unless I get the game built and have time to go back and figure out parsing spaces vs. letters:
var bands = ["soundgarden", "beck", "nirvana", "live", "morcheeba", "tool"];
// This variable defines the word currently in play
var currentWord = bands[0];
var currentWordArray = [];
var blanksArray = [];
var displayWord;
var displayBlanks = [];
var wins = 0;
var remainingGuesses = 0;
var alreadyGuessed = [];
// This function takes the currentWord, pushes each letter into the currentWordArray and then puts a blank into blanksArray for each letter; then, it joins them into one string for display in the html:
function getLetters() {

  for (i = 0; i < currentWord.length; i++) {
    currentWordArray.push(currentWord.charAt(i));
  }

  for (i = 0; i < currentWordArray.length; i++) {
    blanksArray.push('_');
  }
  displayWord = currentWordArray.join(' ');
  displayBlanks = blanksArray.join(' ');
}

// START GAME
document.onkeyup = function() {
  hangmanGame();
}

function hangmanGame() {

  document.onkeyup = function(event) {
    var userGuess = event.key;

    for (i = 0; i < currentWordArray.length; i++) {
      if (userGuess === currentWordArray[i]) {
        blanksArray.splice(i, 1, currentWordArray[i]);
        console.log(blanksArray.join(' '));
      } else if (userGuess ===currentWordArray[null]) {
        alreadyGuessed.push
      }

      // else if (userGuess !== currentWordArray[i]) {
      //   alreadyGuessed.push(userGuess);
      //   alreadyGuessed = alreadyGuessed.join(', ');
      // }
    }


  }

// call the function:
 getLetters();
 // Test - it works!
//  console.log(displayWord);
//  console.log(displayBlanks);

// var html =
//           "<p>Wins: " + wins + "</p>" +
//           "<p>Current Word:</p>" +
//           "<p>" + blanksArray + "</p>" +
//           "<p>Number of Guesses Remaining:</p>" +
//           "<p>" + remainingGuesses + "</p>" +
//           "<p>Letters Already Guessed:</p>" +
//           "<p>" + alreadyGuessed + "</p>";

//         // Set the inner HTML contents of the #game div to our html string
//         document.querySelector("#game-content").innerHTML = html;

}

// to remove the first item after each game:
// bands.shift();
// I have tested this and it works, but currently have no place to put it because I haven't built the rest yet...