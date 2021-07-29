//Global Variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messageParagraph = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 5;

const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

getWord();

//Display "●" as placeholders for each word
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  //Empty message paragraph
  messageParagraph.innerText = "";
  const userInput = letterInput.value;
  const acceptableInput = validateInput(userInput);

  if (acceptableInput) {
    //We've got a letter!
    makeGuess(userInput);
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

const makeGuess = function (userInput) {
  userInput = userInput.toUpperCase();
  if (guessedLetters.includes(userInput)) {
    messageParagraph.innerText = "You already guessed that letter, silly. Try a different letter!";
  } else {
    guessedLetters.push(userInput);
    console.log(guessedLetters);
    guessesRemaining(userInput);
    showPlayerGuesses();
    updateWordInProgress(guessedLetters);
  }
};

const showPlayerGuesses = function () {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const showWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      showWord.push(letter.toUpperCase());
    } else {
      showWord.push("●");
    }
  }
  wordInProgress.innerText = showWord.join("");
  checkToWin();
};

const guessesRemaining = function (userInput) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(userInput)) {
    messageParagraph.innerText = `Sorry, the word has no ${userInput}.`;
    remainingGuesses -= 1;
  } else {
    messageParagraph.innerText = `Good guess! The word has the letter ${userInput}!`;
  }

  if (remainingGuesses === 0) {
    messageParagraph.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `The heat is on! You only have ONE more guess!`;
  } else {
    remainingGuessesSpan.innerText = `You only have ${remainingGuesses} guesses remaining. Make them count!`;
  }
};

const checkToWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    messageParagraph.classList.add("win");
    messageParagraph.innerHTML = `<p class="highlight">You guessed the correct word! Congrats you smartass!</p>`;
    startOver();
  }
};

const startOver = function () {
  guessLetterButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function() {
  messageParagraph.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 5;
  remainingGuessesSpan.innerText = `You only have ${remainingGuesses} guesses remaining. Make them count!`;
  guessedLettersElement.innerHTML = "";
  messageParagraph.innerText = "";
  getWord();

  guessLetterButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
});
