const scoresEl = document.querySelector(".scores");
const clearEl = document.querySelector(".clear");

let scores = localStorage.getItem("highScores");

if (scores) {
  scores = JSON.parse(scores);
} else {
  scores = [];
}

scores.forEach((score) => {
  scoresEl.innerHTML += `
        <div class="text-bg-info p-3 mb-3">
        <h4>${score.name}</h4>
        <p>Scores: ${score.scores}</p>
        </div>
    `;
});

clearEl.onclick = () => {
  localStorage.removeItem("highScores");
  scoresEl.innerHTML = "";
};
