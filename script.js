const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog while the sun sets slowly behind the distant mountains.",
  "Programming is the art of telling another human being what one wants the computer to do, one step at a time.",
  "Success is not final, failure is not fatal, it is the courage to continue that truly counts in the end.",
  "The internet has changed the way people communicate, learn, work, and share information across the globe.",
  "Consistency and practice are the two most important habits anyone can build to master a new skill quickly.",
  "A journey of a thousand miles begins with a single step, and every expert was once a complete beginner.",
  "Technology continues to evolve rapidly, reshaping industries and creating opportunities nobody could have imagined before.",
  "Reading books regularly improves vocabulary, sharpens focus, and opens the mind to new ideas and perspectives."
];

const textDisplay = document.getElementById('textDisplay');
const typingInput = document.getElementById('typingInput');
const timeLeftEl = document.getElementById('timeLeft');
const wpmValueEl = document.getElementById('wpmValue');
const accuracyValueEl = document.getElementById('accuracyValue');
const errorsValueEl = document.getElementById('errorsValue');
const durationSelect = document.getElementById('durationSelect');
const restartBtn = document.getElementById('restartBtn');
const resultBox = document.getElementById('resultBox');
const finalWpm = document.getElementById('finalWpm');
const finalAccuracy = document.getElementById('finalAccuracy');
const finalErrors = document.getElementById('finalErrors');
const leaderboardList = document.getElementById('leaderboardList');

let currentText = '';
let charSpans = [];
let startTime = null;
let timerInterval = null;
let duration = 30;
let timeRemaining = duration;
let totalTyped = 0;
let totalErrors = 0;
let testActive = false;
let testFinished = false;

function pickText() {
  // Chain a couple of samples together so long tests don't run out of text
  const shuffled = [...SAMPLE_TEXTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).join(' ');
}

function renderText() {
  currentText = pickText();
  textDisplay.innerHTML = '';
  charSpans = [];
  currentText.split('').forEach(ch => {
    const span = document.createElement('span');
    span.textContent = ch;
    span.className = 'pending';
    textDisplay.appendChild(span);
    charSpans.push(span);
  });
  if (charSpans.length) charSpans[0].classList.add('current');
}

function resetTest() {
  clearInterval(timerInterval);
  duration = parseInt(durationSelect.value);
  timeRemaining = duration;
  totalTyped = 0;
  totalErrors = 0;
  startTime = null;
  testActive = false;
  testFinished = false;

  timeLeftEl.textContent = timeRemaining;
  wpmValueEl.textContent = '0';
  accuracyValueEl.textContent = '100';
  errorsValueEl.textContent = '0';

  typingInput.value = '';
  typingInput.disabled = false;
  resultBox.classList.add('hidden');

  renderText();
  loadLeaderboard();
}

function startTimer() {
  startTime = Date.now();
  testActive = true;
  timerInterval = setInterval(() => {
    timeRemaining--;
    timeLeftEl.textContent = timeRemaining;
    updateLiveStats();
    if (timeRemaining <= 0) finishTest();
  }, 1000);
}

function updateLiveStats() {
  const elapsedMinutes = (Date.now() - startTime) / 60000;
  const wordsTyped = totalTyped / 5;
  const wpm = elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;
  wpmValueEl.textContent = wpm;

  const accuracy = totalTyped > 0
    ? Math.max(0, Math.round(((totalTyped - totalErrors) / totalTyped) * 100))
    : 100;
  accuracyValueEl.textContent = accuracy;
  errorsValueEl.textContent = totalErrors;
}

typingInput.addEventListener('input', () => {
  if (testFinished) return;
  if (!testActive) startTimer();

  const typed = typingInput.value;
  totalTyped = typed.length;
  totalErrors = 0;

  charSpans.forEach((span, i) => {
    span.classList.remove('correct', 'wrong', 'current');
    if (i < typed.length) {
      if (typed[i] === currentText[i]) {
        span.classList.add('correct');
      } else {
        span.classList.add('wrong');
        totalErrors++;
      }
    } else if (i === typed.length) {
      span.classList.add('current');
    }
  });

  updateLiveStats();

  if (typed.length >= currentText.length) {
    finishTest();
  }
});

function finishTest() {
  if (testFinished) return;
  testFinished = true;
  testActive = false;
  clearInterval(timerInterval);
  typingInput.disabled = true;

  const elapsedMinutes = Math.max((Date.now() - startTime) / 60000, 1 / 60);
  const wordsTyped = totalTyped / 5;
  const wpm = Math.round(wordsTyped / elapsedMinutes);
  const accuracy = totalTyped > 0
    ? Math.max(0, Math.round(((totalTyped - totalErrors) / totalTyped) * 100))
    : 100;

  finalWpm.textContent = wpm;
  finalAccuracy.textContent = accuracy;
  finalErrors.textContent = totalErrors;
  resultBox.classList.remove('hidden');

  saveScore(wpm, accuracy);
  loadLeaderboard();
}

function saveScore(wpm, accuracy) {
  const scores = JSON.parse(localStorage.getItem('keydash_scores') || '[]');
  scores.push({ wpm, accuracy, date: new Date().toLocaleDateString(), duration });
  scores.sort((a, b) => b.wpm - a.wpm);
  localStorage.setItem('keydash_scores', JSON.stringify(scores.slice(0, 10)));
}

function loadLeaderboard() {
  const scores = JSON.parse(localStorage.getItem('keydash_scores') || '[]');
  leaderboardList.innerHTML = '';
  if (scores.length === 0) {
    leaderboardList.innerHTML = '<li>No scores yet — finish a test!</li>';
    return;
  }
  scores.forEach((s, i) => {
    const li = document.createElement('li');
    li.textContent = `${s.wpm} WPM — ${s.accuracy}% accuracy (${s.duration}s, ${s.date})`;
    if (i === 0) li.classList.add('best');
    leaderboardList.appendChild(li);
  });
}

durationSelect.addEventListener('change', resetTest);
restartBtn.addEventListener('click', resetTest);

resetTest();
