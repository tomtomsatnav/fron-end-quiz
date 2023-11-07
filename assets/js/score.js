const highscoresList = document.getElementById('highscores');
const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

function displayHighscores() {
  highscoresList.innerHTML = '';
  highscores.sort((a, b) => b.score - a.score);
  for (let i = 0; i < highscores.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = `${highscores[i].initials}: ${highscores[i].score}`;
    highscoresList.appendChild(listItem);
  }
}

document.querySelector('a').addEventListener('click', function (event) {
  event.preventDefault();
  window.location.href = 'index.html';
});

document.getElementById('clear').addEventListener('click', function () {
  localStorage.removeItem('highscores');
  highscoresList.innerHTML = '';
});

displayHighscores();