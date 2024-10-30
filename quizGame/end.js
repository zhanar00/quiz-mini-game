const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const recentScore = localStorage.getItem("recentScore");
finalScore.innerText = recentScore;


username.addEventListener('keyup', () => {
    console.log(username.value);

    saveScoreBtn.disabled = !username.value;
})

saveHighScore = e => {
    console.log("clicked the save btn");
    e.preventDefault();
}