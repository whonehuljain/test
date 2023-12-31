const playButton = document.getElementById('play-button');
const stopButton = document.getElementById('stop-button');
const textInput = document.getElementById('text');
const speedInput = document.getElementById('speed');
let currentCharacter;

const speechSynthesis = window.speechSynthesis;
const voices = speechSynthesis.getVoices();
const hindiVoice = voices?.find(voice => voice.lang === 'hi-IN');
const utterance = new SpeechSynthesisUtterance();

playButton.addEventListener('click', () => {
  playText(textInput.value);
});

stopButton.addEventListener('click', stopText);
speedInput.addEventListener('input', () => {
  stopText();
  playText(utterance.text.substring(currentCharacter));
});

utterance.addEventListener('end', () => {
  textInput.disabled = false;
});
utterance.addEventListener('boundary', e => {
  currentCharacter = e.charIndex;
});
utterance.addEventListener('error', e => {
  textInput.disabled = false;
  if (!['interrupted', 'canceled'].includes(e.error)) {
    console.error('Speech Synthesis Error:', e);
  }
});

function playText(text) {
  try {
    speechSynthesis.cancel();
    if (speechSynthesis.speaking) return;
    utterance.text = text;
    utterance.volume = 1;
    utterance.pitch = 1;
    utterance.lang = 'hi-IN';
    utterance.rate = speedInput.value || 1;
    utterance.voice = hindiVoice;
    textInput.disabled = true;

    speechSynthesis.speak(utterance);
    console.log('playText else');
  } catch (e) {
    alert('Sorry! Your browser does not support this feature');
    console.error(e);
  }
}



function stopText() {
  console.log('stopText');
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
