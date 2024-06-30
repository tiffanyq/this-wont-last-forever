const MAX_BREAK_FACTOR = 0.6;
const INCREMENT_FACTOR = 0.1;
let shouldBreakFactor = 0;
let initialLinkBroken = false;
let linksClicked = [false, false, false, false, false, false, false];
let music;

function showBackground(e) {
  const link = e.target;
  const linkPosition = link.id;
  // start background change. function lives in sketch.js
  setSkyGradient(link.id);
  // update color to link selected
  if (!linksClicked[linkPosition]) {
  link.style.color = "#551A8B";
  linksClicked[linkPosition] = true;
  } else {
    // randomly break link; never happens after first link selection
    if (shouldBreakLink()) {
      breakLink(link);
      initialLinkBroken = true;
    }
  }  
}

function shouldBreakLink() {
  // also check for the specific case it should break: all selected at least once AND none broken
  const should = Math.random() < shouldBreakFactor ||
    shouldForceLinkBreak() ?
    true :
    false;
  // the likelihood of breaking should increase over time; no chance upon first selection
  shouldBreakFactor = Math.min(shouldBreakFactor+INCREMENT_FACTOR, MAX_BREAK_FACTOR);
  return should;
}

function shouldForceLinkBreak() {
  if (initialLinkBroken) return false;
  for (let i = 0; i < linksClicked.length; i++) {
    if (linksClicked[i] === false) return false;
  }
  return true;
}

function breakLink(link) {
  link.style.color = "#ff0000";
  link.style.cursor = "auto";
  link.disabled = true;
}

function changeBackgroundColor() {
  document.body.style.backgroundColor = "white";
}

function toggleSound() {
  const s = document.getElementById("sound");
  if (s.innerText === "turn sound on") {
    s.innerText = "turn sound off";
    music.play();
  } else {
    s.innerText = "turn sound on";
    music.pause();
  }
}

window.addEventListener("load", function(event) {
  const links = document.getElementsByClassName("link");
  for (const l of links) {
    l.addEventListener("click", showBackground, false);
  }

  const s = document.getElementById("sound");
  s.addEventListener("click", toggleSound, false);
  music = new Audio('sound.mp3');
  music.loop = true;
});