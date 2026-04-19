let weight = 1;
let diameter;
let soundFile;
let isColor = false;
let bgColor;

function preload() {
    soundFile = loadSound('/visuals/sound-reactive/220629.m4a');
}

function setup() {
    const cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(canvasPressed);

    bgColor = color(10);
    background(bgColor);

    colorMode(HSB, 360, 100, 100, 1);

    strokeWeight(weight);
    diameter = min(width, height) / 4;
}

function draw() {
    const col = isColor ? color(random(360), 40, 100, 1) : bgColor
    stroke(col);

    const [x1, y1] = randomCirclePos(mouseX, mouseY, diameter);
    const [x2, y2] = randomCirclePos(mouseX, mouseY, diameter);

    line(x1, y1, x2, y2);

    const p = map(mouseX, 0, width, -1, 1, true);
    soundFile.pan(p);
}

function randomCirclePos(x, y, d) {
    const angle = random(TWO_PI);

    const xPos = sin(angle) * (d / 2) + x;
    const yPos = cos(angle) * (d / 2) + y;
    return [xPos, yPos];
}

function canvasPressed() {
    if (soundFile.isPlaying()) {
        soundFile.pause();
    } else {
        soundFile.loop();
    }

    isColor = !isColor
    strokeWeight(isColor ? weight : weight * 20)
}
