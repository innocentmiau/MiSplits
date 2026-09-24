type TimerState = "idle" | "running" | "stopped";

const display = document.getElementById("timer") as HTMLDivElement;

let state: TimerState = "idle";
let startTime = 0;
let elapsed = 0;

// Shows h:mm:ss.cc, dropping leading hours and minutes while they are zero.
function formatTime(ms: number): string {
  const totalCentiseconds = Math.floor(ms / 10);
  const centiseconds = totalCentiseconds % 100;
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  const cc = String(centiseconds).padStart(2, "0");
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${cc}`;
  }
  if (minutes > 0) {
    return `${minutes}:${String(seconds).padStart(2, "0")}.${cc}`;
  }
  return `${seconds}.${cc}`;
}

function render(): void {
  display.textContent = formatTime(elapsed);
  display.className = `timer ${state}`;
}

// The time is always "now minus start", so a slow frame only delays the display,
// it never makes the timer lose time.
function tick(): void {
  if (state !== "running") {
    return;
  }
  elapsed = performance.now() - startTime;
  render();
  requestAnimationFrame(tick);
}

function toggle(): void {
  if (state === "running") {
    elapsed = performance.now() - startTime;
    state = "stopped";
    render();
    return;
  }
  // From idle or stopped, start a fresh run from zero.
  startTime = performance.now();
  elapsed = 0;
  state = "running";
  requestAnimationFrame(tick);
}

window.addEventListener("keydown", (event) => {
  // Holding the key down fires repeated events; only the first press counts.
  if (event.code !== "Space" || event.repeat) {
    return;
  }
  event.preventDefault();
  toggle();
});

render();
