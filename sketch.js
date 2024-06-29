const FRAME_RATE = 8;
const PIXEL_SIZE = 4;
const NOISE_REDUCTION_FACTOR = 180;
const MAX_OPACITY = 255;
const MIN_OPACITY = 0;
const PIXEL_OPACITY_INCREMENT_FACTOR = 2;
const MIN_FADE_FACTOR = 0;
const FADE_INCREMENT = 0.005;
const MAX_FADE_FACTOR = 0.12;
const HOLD_FRAMES_LENGTH = FRAME_RATE * 2;

let c1, c2;
let c1_0, c1_1, c1_2, c1_3, c1_4, c1_5, c1_6;
let c2_0, c2_1, c2_2, c2_3, c2_4, c2_5, c2_6;
let c1Array;
let c2Array;
let currFadeFactor = 0;

function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  describe('Grey pixel static that gets overlaid with sky-colored gradients upon button selection until the buttons eventually become unselectable.');
  cnv.style('display', 'block');
  frameRate(FRAME_RATE);
  // 5:00am
  c1_0 = color(30, 46, 66);
  c2_0 = color(127, 131, 124);
  // 8:00am
  c1_1 = color(119, 138, 168);
  c2_1 = color(183, 174, 159);
  // 11:00am
  c1_2 = color(201,225,250);
  c2_2 = color(244,237,225);
  // 2:00pm
  c1_3 = color(171,198,222);
  c2_3 = color(254,250,234);
  // 5:00pm...probably later for effect (8pm?)
  c1_4 = color(62,82,162);
  c2_4 = color(243,174,131);
  // 8:00pm...probably later for effect (9:30pm?)
  c1_5 = color(2,37,114);
  c2_5 = color(42,81,130);
  // 11:00pm
  c1_6 = color(0,0,0);
  c2_6 = color(55,55,68);

  c1Array = [c1_0, c1_1, c1_2, c1_3, c1_4, c1_5, c1_6];
  c2Array = [c2_0, c2_1, c2_2, c2_3, c2_4, c2_5, c2_6];

  // default white background
  c1 = color(255,255,255);
  c2 = color(255,255,255);
  // default pixel opacity
  currPixelOpacity = 255;
}

function draw() {
  for (let i = 0; i < windowHeight; i++) {
    // fill in the current gradient
    const inter = map(i, 0, window.innerHeight, 0, 1);
    const c = lerpColor(c1, c2, inter);
    c.setAlpha(MAX_OPACITY);
    stroke(c);
    line(0, i, window.innerWidth, i);
  }
  noStroke(); // turn off stroke for the pixels
  for (let i = 0; i < windowWidth; i+=PIXEL_SIZE) {
    for (let j = 0; j < windowHeight; j+=PIXEL_SIZE) {
      currFactor = random(0,1);
      const currShade = 255 * noise(currFactor*i, currFactor*j) + NOISE_REDUCTION_FACTOR;
      if (currShade <= 255) {
        const fillColor = color(currShade,currShade,currShade);
        fillColor.setAlpha(currPixelOpacity);
        fill(fillColor);
        rect(i,j,PIXEL_SIZE,PIXEL_SIZE);
      }
    }
  }
  // fade out the c1 and c2 colors
  const white = color(255,255,255);
  c1 = lerpColor(c1, white, currFadeFactor);
  c2 = lerpColor(c2, white, currFadeFactor);
  currFadeFactor = min(currFadeFactor + FADE_INCREMENT,MAX_FADE_FACTOR);
  currPixelOpacity = min(currPixelOpacity+PIXEL_OPACITY_INCREMENT_FACTOR,MAX_OPACITY);
}

function setSkyGradient(id) {
  c1 = c1Array[id];
  c2 = c2Array[id];
  currFadeFactor = MIN_FADE_FACTOR;
  currPixelOpacity = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
