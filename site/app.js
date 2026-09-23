const $ = id => document.getElementById(id);
const picks = [...document.querySelectorAll('.youtube-pick')];

function youtubeId(input) {
  try {
    const url = new URL(input.trim());
    if (url.protocol !== 'https:') return null;
    const host = url.hostname.toLowerCase();
    let id;
    if (host === 'youtu.be' || host === 'www.youtu.be') id = url.pathname.split('/')[1];
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'www.youtube-nocookie.com'].includes(host)) {
      id = url.pathname === '/watch' ? url.searchParams.get('v') : url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
    }
    return /^[a-zA-Z0-9_-]{11}$/.test(id || '') ? id : null;
  } catch { return null; }
}

function loadYouTube(id, title, artist, number) {
  // Changing the iframe source stops the previous selection and loads the next one.
  $('youtube-frame').src = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
  $('youtube-frame').title = `${title} on YouTube`;
  $('youtube-title').textContent = title;
  $('youtube-artist').textContent = artist;
  document.querySelector('.track-number').textContent = number;
  $('youtube-now').textContent = `${title} · ${artist}`;
  $('youtube-open').href = `https://www.youtube.com/watch?v=${id}`;
  $('youtube-feedback').textContent = `${title} is loaded. Press play in the YouTube player.`;
  picks.forEach(button => {
    const active = button.dataset.video === id;
    button.classList.toggle('selected', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

picks.forEach((button, index) => button.addEventListener('click', () => {
  loadYouTube(button.dataset.video, button.dataset.title, button.dataset.artist, String(index + 1).padStart(2, '0'));
}));

$('youtube-form').addEventListener('submit', event => {
  event.preventDefault();
  const id = youtubeId($('youtube-url').value);
  if (!id) { $('youtube-feedback').textContent = 'Paste a valid YouTube or YouTube Music video link.'; return; }
  loadYouTube(id, 'Your YouTube pick', 'Chosen by you', '↗');
});

// Show the featured player on arrival. Browsers leave playback paused until the visitor presses Play.
const first = picks[0];
loadYouTube(first.dataset.video, first.dataset.title, first.dataset.artist, '01');
$('youtube-feedback').textContent = 'Choose a song or paste a link to change the station.';
