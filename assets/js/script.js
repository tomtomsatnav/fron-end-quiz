const startButton = document.getElementById('start');
const startScreen = document.getElementById('start-screen');
const questionsDiv = document.getElementById('questions');
const questionTitle = document.getElementById('question-title');
const choicesDiv = document.getElementById('choices');
const feedbackDiv = document.getElementById('feedback');
const timer = document.getElementById('time');
const submitButton = document.getElementById('submit');
const initialsInput = document.getElementById('initials');

const quizData = [
  {
    question: 'What is HTML?',
    choices: ['Hypertext Markup Language', 'Hyper Transfer Markup Language', 'Hyperlink and Text Markup Language'],
    correctAnswer: 'Hypertext Markup Language',
  },
];

const quizTime = 60;
let currentQuestionIndex = 0;
let timeLeft = quizTime;

startButton.addEventListener('click', startQuiz);

function startQuiz() {
  startScreen.classList.add('hide');
  questionsDiv.classList.remove('hide');
  setTimer();
  displayQuestion();
}

function setTimer() {
  const timerInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = timeLeft;

    if (timeLeft <= 0 || currentQuestionIndex === quizData.length) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function displayQuestion() {
  if (currentQuestionIndex < quizData.length) {
    const currentQuestion = quizData[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    choicesDiv.innerHTML = '';

    currentQuestion.choices.forEach((choice) => {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = choice;
      choiceButton.addEventListener('click', checkAnswer);
      choicesDiv.appendChild(choiceButton);
    });
  } else {
    endQuiz();
  }
}

function checkAnswer(event) {
  const selectedChoice = event.target.textContent;
  const currentQuestion = quizData[currentQuestionIndex];

  if (selectedChoice === currentQuestion.correctAnswer) {
    feedbackDiv.textContent = 'Correct!';
  } else {
    feedbackDiv.textContent = 'Wrong!';
    timeLeft -= 10;
  }

  setTimeout(() => {
    feedbackDiv.textContent = '';
    currentQuestionIndex++;
    displayQuestion();
  }, 1000);
}

function endQuiz() {
  questionsDiv.classList.add('hide');
  document.getElementById('end-screen').classList.remove('hide');
  document.getElementById('final-score').textContent = timeLeft;

  submitButton.addEventListener('click', function () {
    const initials = initialsInput.value.trim();
    if (initials) {
      const score = timeLeft;
      const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
      highscores.push({ initials, score });
      localStorage.setItem('highscores', JSON.stringify(highscores));
      window.location.href = 'highscores.html';
    }
  });
}