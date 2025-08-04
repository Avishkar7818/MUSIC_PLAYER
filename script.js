const songs = [
  {
    name: "Humsafar_Saiyaara",
    title: "Humsafar",
    artist: "sachet Tandon, Mansheel Gujral" 
  },
  {
    name:"Saiyaara",
    title: "Saiyaara",
    artist: "Shreya Ghoshal"
  }
];

let songIndex = 0;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}.mp3`;
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = audio;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;

  const formatTime = (time) =>
    `${Math.floor(time / 60)}:${("0" + Math.floor(time % 60)).slice(-2)}`;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

loadSong(songs[songIndex]);
