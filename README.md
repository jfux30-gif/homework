# Homework / After Hours
A small music player made with HTML, CSS, and JavaScript. Three original 32-second electronic sketches are synthesized in your browser; there are no music samples or paid services.

## Open it
Open `site/index.html` in Chrome, Edge, Firefox, or Safari and press Play.
Features: track selection, play/pause, previous/next, seek, volume/mute, automatic next track, keyboard focus support, and a responsive mobile layout.
The space bar toggles playback when a form control is not focused.

## Where things live
- `site/index.html`: the content and buttons
- `site/styles.css`: colors, spacing, and mobile layout
- `site/app.js`: controls and original audio synthesis
- `site/art/`: original album covers
- `site/CREDITS.md`: music and artwork provenance
- `assignments/music-player/`: assignment notes
- `notes/`, `resources/`, `archive/`: your wider homework workspace

## How publishing works
1. Edit files locally.
2. A **commit** saves a named checkpoint in Git.
3. A **push** sends your commits to the online GitHub repository.
4. GitHub Actions runs the recipe in `.github/workflows/deploy-pages.yml`.
5. GitHub Pages publishes only the `site/` folder.

The workflow runs on every push to `main` or through Actions → Run workflow.
First-time setup: make the repository public if your plan requires it, then select Settings → Pages → Source → GitHub Actions.

Repository: https://github.com/jfux30-gif/homework
Expected Pages address after a successful deployment: https://jfux30-gif.github.io/homework/

## Next experiments
Ask for a fourth track, different colors, a favorites button, or longer music.
GitHub Pages hosts browser code and static assets. It does not run a backend or safely store secret API keys.
