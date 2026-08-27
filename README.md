# KeyDash ⌨️

**Typing Speed Test** — a lightweight, no-backend web app that measures your typing speed (WPM) and accuracy in real time, with a local leaderboard.

🔗 **Repository name:** `keydash`

## Description

KeyDash presents a random passage of text and tracks your typing character-by-character as you type it out, live-calculating your words-per-minute, accuracy percentage, and error count. Once the timer runs out (or you finish the passage), your score is saved to a local leaderboard — no server, no sign-up, no data leaves your browser.

## Features

- ⏱️ Selectable test duration: 15s / 30s / 60s / 120s
- 📝 Randomized passages on every attempt
- 🎯 Live WPM, accuracy %, and error count while typing
- 🟢 Character-by-character visual feedback (correct / wrong / current position)
- 🏆 Local leaderboard of your best 10 scores (via `localStorage`)
- 🔄 Restart anytime with a fresh passage
- 📱 Responsive, dark-themed UI
- 🚫 100% client-side — no backend required

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- `localStorage` for persisting scores

## Getting Started

No installation or build step required.

```bash
git clone https://github.com/<your-username>/keydash.git
cd keydash
```