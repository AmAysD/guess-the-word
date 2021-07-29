//Global Variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messageParagraph = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

//Display "●" as placeholders for each word
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  //Empty message paragraph
  messageParagraph.innerText = "";
  const userInput = letterInput.value;
  const acceptableInput = validateInput(userInput);

  if (acceptableInput) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    // Is the input empty?
    messageParagraph.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    // Did you type more than one letter?
    messageParagraph.innerText = "Please enter only ONE letter.";
  } else if (!input.match(acceptedLetter)) {
    //Did you type a number, a special character or something else that is quite silly?!
    messageParagraph.innerText = "Please enter a letter from A to Z. Thank you!";
  } else {
    //We got what we wanted, a single letter!
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    messageParagraph.innerText = "You already guessed that letter, silly. Try a different letter!";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};
