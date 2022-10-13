'use strict';

const videoEl = document.querySelector('video');
const playBtnEl = document.querySelector('.fa-play');
const pauseBtnEl = document.querySelector('.fa-pause');
const volumeEl = document.querySelector('.volume');
const timingEl = document.querySelector('.timing');
const currentTimeEl = document.querySelector('.currentTime');

playBtnEl.addEventListener('click', () => {
  videoEl.play();
});

pauseBtnEl.addEventListener('click', () => {
  videoEl.pause();
});

videoEl.addEventListener('timeupdate', event => {
  currentTimeEl.innerText = videoEl.currentTime;
  timingEl.value = videoEl.currentTime / videoEl.duration * 100;
});

volumeEl.addEventListener('input', () => {
  videoEl.volume = volumeEl.value;
});

timingEl.addEventListener('input', () => {
  videoEl.currentTime = timingEl.value / 100 * videoEl.duration;
});