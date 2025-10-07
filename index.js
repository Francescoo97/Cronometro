let startTime;
let timePassed = 0;
let timerInterval;
let isActive = false;

const timeDisplay = document.querySelector(".time");
const [startBtn, stopBtn, resetBtn] = document.querySelectorAll(".button");

// Funzione per formattare il tempo in centesimi di secondo
function formatTime(ms) {
  const totalMilliseconds = ms % 1000;
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  const milliseconds = String(Math.floor(totalMilliseconds / 10)).padStart(
    2,
    "0"
  ); // due cifre

  return `${minutes}:${seconds}:${milliseconds}`;
}

// Funzione per aggiornare stato dei bottoni
function UpdateButtons() {
  startBtn.disabled = isActive;
  stopBtn.disabled = !isActive;
  resetBtn.disabled = timePassed === 0;
}

// Funzione per avviare il cronometro
function startTimer() {
  if (isActive) return; // evita di partire se già in esecuzione

  isActive = true;
  startTime = Date.now() - timePassed;
  timerInterval = setInterval(() => {
    timePassed = Date.now() - startTime;
    timeDisplay.textContent = formatTime(timePassed);
  }, 10);
  UpdateButtons();
}

// Funzione per fermare il cronometro
function stopTimer() {
  clearInterval(timerInterval);
  isActive = false;
  UpdateButtons();
}

// Funzione per resettare il cronometro
function resetTimer() {
  clearInterval(timerInterval);
  timePassed = 0;
  timeDisplay.textContent = "00:00:00";
  isActive = false;
  UpdateButtons();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

UpdateButtons();
