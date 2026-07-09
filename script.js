const phrases = [
  "No one is around to help",
  "Life is hard, life is stressful",
  "I need peace and tranquility",
  "I don't have to prove myself to anyone"
];
let phraseIndex = 0;

const dancers = [
  'assets/kitty-dance.gif',
  'assets/dance.gif'
];
let currentDancerIndex = 0;

const svgUnmute = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`;
const svgMute = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
const svgSwitch = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>`;

const start = () => {
  const audio = document.createElement('audio');
  audio.src = 'assets/Dancin.mp3';
  audio.loop = true;
  document.querySelector('.container').appendChild(audio);
  audio.play().catch(err => console.log(err));

  document.querySelector('.begin').remove();
  document.querySelector('body').classList.add('colored-background');

  const danceImage = document.createElement('img');
  danceImage.src = dancers[currentDancerIndex];
  document.querySelector('.container').appendChild(danceImage);

  const phraseBox = document.createElement('p');
  phraseBox.classList.add('phrase-box', 'flicker-text');
  document.querySelector('.container').appendChild(phraseBox);
  phraseBox.innerText = ' ';

  setTimeout(() => {
    phraseBox.innerText = phrases[phraseIndex];
    setInterval(updatePhrase, 6000);
  }, 2000);

  const controlsWrapper = document.createElement('div');
  controlsWrapper.classList.add('controls-wrapper');

  const muteBtn = document.createElement('button');
  muteBtn.classList.add('corner-btn');
  muteBtn.innerHTML = svgUnmute;
  muteBtn.title = "Mute/Unmute";

  const switchBtn = document.createElement('button');
  switchBtn.classList.add('corner-btn');
  switchBtn.innerHTML = svgSwitch;
  switchBtn.title = "Change Dancer";

  controlsWrapper.appendChild(muteBtn);
  controlsWrapper.appendChild(switchBtn);
  document.querySelector('.container').appendChild(controlsWrapper);

  muteBtn.onclick = () => {
    audio.muted = !audio.muted;
    muteBtn.innerHTML = audio.muted ? svgMute : svgUnmute;
    muteBtn.style.borderColor = audio.muted ? '#75fa69' : '#ea36af';
  };

  switchBtn.onclick = () => {
    currentDancerIndex = (currentDancerIndex + 1) % dancers.length;
    danceImage.src = dancers[currentDancerIndex];
  };
};

const updatePhrase = () => {
  phraseIndex = (phraseIndex + 1) % phrases.length;
  const pBox = document.querySelector('.phrase-box');
  if (pBox) pBox.innerText = phrases[phraseIndex];
};

document.querySelector('.begin').onclick = start;