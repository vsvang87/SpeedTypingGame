const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const endgameEl = document.getElementById("end-game-container");

//setting words for game
const words = [
  "game",
  "superficial",
  "administration",
  "attendance",
  "nine",
  "jump",
  "dependent",
  "silver",
  "steel",
  "appreciate",
  "amberjacks",
  "aquaphobic",
  "adjusted",
  "deadline",
  "designer",
  "disclose",
  "indicate",
  "property",
  "probable",
  "export",
  "impose",
  "knight",
  "lively",
  "locate",
  "bowl",
  "dear",
  "demo",
  "gown",
  "habilitating",
  "galactometry",
  "ichnographic",
  "jacklighting",
  "laboratorial",
  "shelf",
  "solid",
  "earth",
  "extra",
  "elect",
  "shine",
];

//initialize
let randomWord;
let score = 0;
let time = 10;
//save difficulty in local storage
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
//focus on text to start
text.focus();

//start count down
const timeInterval = setInterval(updateTime, 1000);
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  //time count down stop at 0
  if (time === 0) {
    clearInterval(timeInterval);
    //game over
    gameOver();
  }
}

//generate word
function getRandomWord() {
  let randomGenerate = words[Math.floor(Math.random() * words.length)];

  /*if (difficultySelect.value === "Easy") {
    return randomGenerate.filter((word) => word.length <= 5);
  } else if (difficultySelect.value === "Medium") {
    return randomGenerate.filter((word) => word.length <= 8);
  } else if (difficultySelect.value === "Hard") {
    return randomGenerate.filter((word) => word.length <= 12);
  }*/

  return words[Math.floor(Math.random() * words.length)];
}

//display random word to HTML
function displayWordHtml() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
displayWordHtml();

//update scores
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
//take input text
text.addEventListener("input", (e) => {
  const inputText = e.target.value;
  //check to see if input text is equal to the word
  if (inputText === randomWord) {
    //generate random if input matches
    displayWordHtml();
    //update scores
    updateScore();

    //clear input
    e.target.value = "";

    //add time if words match
    if (difficulty === "easy") {
      time += 5;
    } else if (difficulty === "medium") {
      time += 4;
    } else if (difficulty === "hard") {
      time += 3;
    }
    updateTime();
  }
});
//toggling setting difficulty
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

//difficulty select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;

  localStorage.setItem("difficulty", difficulty);
  console.log(difficulty);
});

//game over function
function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your Final Score is: ${score}</p>
  <button class="reset-btn" onclick="location.reload()">Reset</button>
  `;
  endgameEl.style.display = "flex";
}
