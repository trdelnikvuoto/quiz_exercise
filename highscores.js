//HIGHSCORES

const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

// highScoresList.innerHTML =
// highScores.map(score => {
//     return `<li class="high-score my-3">${score.name} - ${score.score}</li>`
// }).join('')

highScoresList.innerHTML = 
`
<li class="high-score my-3">1. ${highScores[0].name} - ${highScores[0].score}</li>
<li class="high-score my-3">2. ${highScores[1].name} - ${highScores[1].score}</li>
<li class="high-score my-3">3. ${highScores[2].name} - ${highScores[2].score}</li>
`
