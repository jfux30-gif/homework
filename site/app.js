// Original, sample-free instrumental sketches. Web Audio generates each track locally.
const tracks = [
  { title: "Blue Hour", genre: "Ambient / Downtempo", art: "blue-hour", root: 146.83, steps: [0,7,10,14,7,3,10,7], chords: [0,3,7], seed: 11 },
  { title: "Soft Focus", genre: "Warm / Electronic", art: "soft-focus", root: 174.61, steps: [0,4,7,11,12,7,4,2], chords: [0,4,7], seed: 23 },
  { title: "Night Garden", genre: "Organic / Dreamscape", art: "night-garden", root: 130.81, steps: [0,7,12,15,10,7,3,5], chords: [0,3,10], seed: 37 }
];
const duration = 32;
let context, gain, source, buffer, selected = 0, playing = false, offset = 0, started = 0, generation = 0, rememberedVolume = 0.65;
const cache = new Map();
const $ = id => document.getElementById(id);
const time = seconds => `0:${String(Math.floor(seconds)).padStart(2,"0")}`;
function synthesize(track) {
  const rate = 22050, output = context.createBuffer(1, rate * duration, rate), data = output.getChannelData(0);
  let seed = track.seed;
  const noise = () => { seed = (seed * 16807) % 2147483647; return seed / 1073741823.5 - 1; };
  for (let i = 0; i < data.length; i++) {
    const t = i / rate, beat = t % 0.5, bar = Math.floor(t / 4), transpose = [0,-2,3,-5][bar % 4];
    const root = track.root * 2 ** (transpose / 12);
    let sample = 0;
    for (const chord of track.chords) {
      const f = root * 2 ** (chord / 12);
      sample += 0.048 * Math.sin(2 * Math.PI * f * t + 0.3 * Math.sin(t)) * (0.7 + 0.3 * Math.sin(Math.PI * t / 4) ** 2);
    }
    const note = root * 2 ** (track.steps[Math.floor(t * 2) % 8] / 12 + 1);
    const envelope = Math.min(1, beat / 0.012) * Math.exp(-beat * 9);
    sample += 0.15 * envelope * (Math.sin(2 * Math.PI * note * beat) + 0.2 * Math.sin(4 * Math.PI * note * beat));
    const kick = t % 1;
    sample += 0.2 * Math.sin(2 * Math.PI * (45 * kick + 3 * (1 - Math.exp(-kick * 25)))) * Math.exp(-kick * 12);
    const hat = t % 0.25;
    sample += 0.024 * noise() * Math.exp(-hat * 75);
    sample += 0.075 * Math.sin(2 * Math.PI * root / 2 * t);
    data[i] = Math.tanh(sample) * Math.min(1,t/1.2,(duration-t)/1.7);
  }
  return output;
}
function position() { return Math.min(duration, offset + (playing ? context.currentTime - started : 0)); }
function stopSource() { if (source) { source.onended = null; source.stop(); source.disconnect(); source = null; } }
function render() {
  $("play").setAttribute("aria-label", playing ? "Pause" : "Play");
  $("play-icon").textContent = playing ? "Ⅱ" : "▶";
  $("playback-status").textContent = playing ? "Now playing · " + tracks[selected].title : offset > 0 ? "Paused · " + tracks[selected].title : "Ready when you are";
  document.querySelectorAll(".track").forEach((row,i) => {
    row.classList.toggle("active", i === selected);
    row.setAttribute("aria-pressed", String(i === selected));
    row.querySelector(".row-play").textContent = i === selected && playing ? "Ⅱ" : "▶";
  });
}
async function play() {
  const token = ++generation;
  try {
    if (!context) { context = new (window.AudioContext || window.webkitAudioContext)(); gain = context.createGain(); gain.connect(context.destination); }
    await context.resume();
    if (token !== generation) return;
    if (!cache.has(selected)) cache.set(selected, synthesize(tracks[selected]));
    buffer = cache.get(selected);
    if (offset >= duration) offset = 0;
    stopSource();
    gain.gain.value = Number($("volume").value);
    source = context.createBufferSource(); source.buffer = buffer; source.connect(gain);
    started = context.currentTime; playing = true;
    source.onended = () => { if (playing) selectTrack((selected + 1) % tracks.length, true); };
    source.start(0,offset); render();
  } catch (error) {
    playing = false; render(); $("playback-status").textContent = "Audio could not start. Please press Play to try again.";
    console.error(error);
  }
}
function pause() { ++generation; offset = position(); playing = false; stopSource(); render(); }
function selectTrack(index, autoplay = playing) {
  ++generation; stopSource(); playing = false; offset = 0; selected = (index + tracks.length) % tracks.length;
  const track = tracks[selected];
  $("title").textContent = track.title; $("artist").textContent = "After Hours Studio · " + track.genre;
  $("cover").src = "./art/" + track.art + ".svg"; $("cover").alt = track.title + " original abstract album artwork";
  $("track-number").textContent = String(selected+1).padStart(2,"0");
  $("seek").value = 0; $("elapsed").textContent = "0:00"; render();
  if (autoplay) play();
}
$("play").addEventListener("click", () => playing ? pause() : play());
$("previous").addEventListener("click", () => selectTrack(selected-1));
$("next").addEventListener("click", () => selectTrack(selected+1));
document.querySelectorAll(".track").forEach(row => row.addEventListener("click", () => {
  const index = Number(row.dataset.track);
  if(index === selected && playing) pause(); else selectTrack(index,true);
}));
$("seek").addEventListener("input", () => { const resume = playing; ++generation; stopSource(); playing = false; offset = Number($("seek").value); $("elapsed").textContent=time(offset); render(); if(resume) play(); });
function volumeChanged() { const value=Number($("volume").value); if(gain) gain.gain.setTargetAtTime(value,context.currentTime,0.02); $("mute").setAttribute("aria-label",value===0?"Unmute":"Mute"); $("mute").textContent=value===0?"×":"♪"; }
$("volume").addEventListener("input",volumeChanged);
$("mute").addEventListener("click",()=>{const v=Number($("volume").value); if(v>0){rememberedVolume=v;$("volume").value=0;}else $("volume").value=rememberedVolume;volumeChanged();});
document.addEventListener("keydown", event => { if(event.code==="Space" && !["INPUT","BUTTON","A"].includes(document.activeElement.tagName)){event.preventDefault(); playing?pause():play();}});
setInterval(()=>{if(playing){const p=position();$("seek").value=p;$("elapsed").textContent=time(p);}},100);
