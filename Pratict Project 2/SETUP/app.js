// === Elements
const display = document.getElementById('timer'); // timer display <p>
const startBtn = document.getElementById('start'); // Start button
const stopBtn = document.getElementById('stop'); // Stop button
const resetBtn = document.getElementById('reset'); // Reset button

// === Config
const POMODORO_SECONDS = 25 * 60; // 25:00 in seconds
let remaining = POMODORO_SECONDS; // current remaining seconds
let timerId = null; // setInterval handle (null = not running)

// === Utils
const fmt = n => (n < 10 ? '0' + n : '' + n); // 2-digit formatter
function render() {
  // update UI text
  const m = Math.floor(remaining / 60); // minutes part
  const s = remaining % 60; // seconds part
  display.textContent = `${fmt(m)}:${fmt(s)}`; // mm:ss
}

// === Controls
function start() {
  // already running? show alert & exit
  if (timerId) {
    alert('⏱️ Timer already running!');
    return;
  }
  // at 0? (finished) — do not start; just alert
  if (remaining <= 0) {
    alert('✅ Session finished. Please Reset to start again.');
    return;
  }

  // start ticking each second
  timerId = setInterval(() => {
    remaining--; // decrease 1s
    render(); // update display

    if (remaining <= 0) {
      // reached zero
      clearInterval(timerId); // stop interval
      timerId = null; // mark as not running
      remaining = 0; // clamp to 0
      render(); // show 00:00
      // optional: alert('🎉 Pomodoro complete!');
    }
  }, 1000);
}

function stop() {
  // not running? show alert & exit
  if (!timerId) {
    alert('⏸️ Timer is already stopped.');
    return;
  }
  clearInterval(timerId); // pause
  timerId = null; // mark as not running
}

function reset() {
  // already at initial state AND not running? show alert
  if (remaining === POMODORO_SECONDS && !timerId) {
    alert('🔄 Timer is already at 25:00.');
    return;
  }
  clearInterval(timerId); // stop if running
  timerId = null; // mark as not running
  remaining = POMODORO_SECONDS; // back to 25:00
  render(); // update UI
}

// === Wire buttons
startBtn.addEventListener('click', start); // Start -> start()
stopBtn.addEventListener('click', stop); // Stop  -> stop()
resetBtn.addEventListener('click', reset); // Reset -> reset()

// initial UI
render(); // show 25:00 on load
