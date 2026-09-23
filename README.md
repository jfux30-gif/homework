# Homework / Abstract Radio
A small YouTube listening room built with HTML, CSS, and JavaScript. Pick one of three featured songs or paste a YouTube or YouTube Music video URL. The embedded YouTube player supplies playback controls.

## Open it
Visit https://jfux30-gif.github.io/homework/ or open `site/index.html` in a browser. Select a song and press Play inside the embedded player. Some YouTube videos cannot be embedded by their owners.

## Where things live
- `site/index.html`: layout and featured song picks
- `site/styles.css`: obsidian and purple styling and mobile layout
- `site/app.js`: video URL validation and player selection
- `site/CREDITS.md`: music and visual credits
- `assignments/music-player/`: assignment notes
- `notes/`, `resources/`, `archive/`: the wider homework workspace

## How publishing works
1. Edit the files locally.
2. A **commit** saves a named checkpoint in Git.
3. A **push** sends the checkpoint to GitHub.
4. GitHub Actions runs `.github/workflows/deploy-pages.yml`.
5. GitHub Pages publishes the `site/` folder.

The workflow runs on each push to `main` or via Actions → Run workflow.
Repository: https://github.com/jfux30-gif/homework
Website: https://jfux30-gif.github.io/homework/

This is a static site. It embeds YouTube videos; it does not host or download the songs.
