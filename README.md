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

Open `index.html` directly in your browser, or serve it locally:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Visit `http://localhost:8000` and start typing.

## Deploy on GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select the `main` branch and `/ (root)` folder.
4. Your app will be live at `https://<your-username>.github.io/keydash/`.

## Project Structure

```
keydash/
├── index.html   # App layout — stats bar, text display, input, results
├── style.css    # Dark-themed responsive styling
├── script.js    # Typing logic, WPM/accuracy calculation, leaderboard
└── README.md
```
S

## How It Works

1. A random passage is rendered as individual `<span>` characters.
2. As the user types into a textarea, each character is compared live against the target text and highlighted green (correct) or red (wrong).
3. WPM is calculated as `(characters typed / 5) / minutes elapsed`, following the standard "5 characters = 1 word" convention.
4. Accuracy is `((total typed - errors) / total typed) × 100`.
5. On completion, the score is stored in `localStorage` and the top 10 are shown as a leaderboard.

## License

MIT — free to use, modify, and distribute.

## Author

Built as part of an MCA coursework project.
