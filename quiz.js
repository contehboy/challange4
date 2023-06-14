const timerEl = document.querySelector(".timer");
const questionEl = document.querySelector(".question");
const statusEl = document.querySelector(".status");
const resultEl = document.querySelector(".result");
const scoreEl = document.querySelector(".score");
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");

const questions = [
  {
    name: "Which of these is not a programming language",
    answers: ["Ruby", "Java", "Python", "Banana"],
    correctAnswer: "Banana",
  },

  {
    name: "What is computer coding",
    answers: [
      "List of function",
      "TV show",
      "Telling the computer what to do",
      "List of signs",
    ],
    correctAnswer: "Telling the computer what to do",
  },

  {
    name: "How many window does python use?",
    answers: ["One", "Four", "Two", "Five"],
    correctAnswer: "Two",
  },

  {
    name: "What word describe the set of instructions that computer need to do work",
    answers: ["Blueprint", "Synopsis", "tAgenda", "Program"],
    correctAnswer: "Program",
  },

  {
    name: "What word describe characters that canbe moved in a scratch program?",
    answers: ["Imp", "Goblin", "Pixie", "Sprites"],
    correctAnswer: "Sprites",
  },
];

let timer = 75;
let questionIndex = 0;
let scores = 0;

const timerInterval = setInterval(function () {
  timer--;
  timerEl.innerHTML = timer;
}, 1000);

function showQuestion() {
  const question = questions[questionIndex];
  questionEl.innerHTML = `
        <h2 class="mb-3">${question.name}</h2>
    `;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "btn btn-secondary mb-2 d-block";
    button.innerHTML = answer;
    questionEl.appendChild(button);
    button.onclick = function () {
      answerQuestion(answer, question.correctAnswer);
    };
  });
}

function answerQuestion(answer, correctAnswer) {
  if (answer == correctAnswer) {
    statusEl.innerHTML = "Correct!";
    scores++;
  } else {
    timer -= 15;
    timerEl.innerHTML = timer;
    statusEl.innerHTML = "Wrong!";
  }

  questionIndex++;
  if (questionIndex == questions.length) {
    questionEl.classList.add("d-none");
    statusEl.classList.add("d-none");

    clearInterval(timerInterval);
    resultEl.classList.remove("d-none");
    scoreEl.innerHTML = scores;
  } else {
    showQuestion();
  }
}

showQuestion();

formEl.onsubmit = function (e) {
  e.preventDefault();
  const name = inputEl.value;
  let highScores = localStorage.getItem("highScores");
  if (highScores) {
    highScores = JSON.parse(highScores);
    highScores.push({
      name,
      scores,
    });
    localStorage.setItem("highScores", JSON.stringify(highScores));
  } else {
    highScores = [
      {
        name,
        scores,
      },
    ];
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
  window.location.href = "high-scores.html";
};
