// https://github.com/kgolid/chromotome/blob/master/palettes
const palette = {
	name: 'tsu_arcade',
	colors: ['#4aad8b', '#e15147', '#f3b551', '#cec8b8', '#d1af84', '#544e47'],
	stroke: '#251c12',
	background: '#cfc7b9'
}
let boxes = [];
let scaleValue = 0.18;
let currentShapeType = 0;
let cameraRotation;
let cameraRotationDesired;
let lastInteractionFrame = 0;
let shouldDrawDestinations = true;
let shouldGhostWhileTravelling = true;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	initBoxes(200, currentShapeType);
	setRandomCameraRotation();
	setRandomCameraRotationDesired();
	setInterval(doAutoPlayIfQuiet, 10000);
	shouldGhostWhileTravelling = random([true, true, false]);
	shouldDrawDestinations = shouldGhostWhileTravelling ? false : random([true, false]);
}


function draw() {
	noStroke();
	//background(100);
	background(palette.background);

	scale(scaleValue);

	setupLights();
	handleRotation();

	for (let b of boxes) {
		drawBox(b);
	}

	for (let b of boxes) {
		animateBox(b);
	}
}

function setupLights() {
	let r = 255;
	let g = 150;
	let b = 150;
	directionalLight(r, g, b, -100, -100, -100);
	ambientLight(180);
}

function drawBox(b) {
	const [ARRIVED, ARRIVING, TRAVELLING] = [0, 1, 2];
	let arrivingState;
	let distToDest = b.destPos.dist(b.pos);
	if (distToDest < 150) {
		if (distToDest < 50) {
			arrivingState = ARRIVED;
		} else {
			arrivingState = ARRIVING;
		}
	} else {
		arrivingState = TRAVELLING;
	}


	push();
	translate(b.pos.x, b.pos.y, b.pos.z);
	const travelColor = color(50, 50);
	if (shouldGhostWhileTravelling) {
		fill(arrivingState === TRAVELLING ? travelColor : b.color);
	} else {
		fill(b.color);
	}
	rotateX(b.rotation.x);
	rotateY(b.rotation.y);
	rotateZ(b.rotation.z);

	//a bit confusing: dim.x is the box's dimension on the x axis - width. etc.
	box(b.dim.x, b.dim.y, b.dim.z);
	pop();

	if (shouldDrawDestinations) {

		push();
		const fillColor = {
			[TRAVELLING]: 50,
			//tried blinking near arrival - but it was irritating.
			//[ARRIVING]: frameCount % 10 === 0 ? 50 : 255,
			[ARRIVING]: 100,
			[ARRIVED]: 255
		}[arrivingState];
		fill(fillColor, 20);
		translate(b.destPos.x, b.destPos.y, b.destPos.z);
		rotateX(b.destRotation.x);
		rotateY(b.destRotation.y);
		rotateZ(b.destRotation.z);
		box(b.dim.x * 0.8, b.dim.y * 0.8, b.dim.z * 0.8);
		pop();
	}
}

function initBoxes(numOfBoxes, shapeType) {
	boxes = [];

	for (let i = 0; i < numOfBoxes; i++) {
		const dim = randomDimensions();
		const pos = randomPosition(shapeType);
		const clr = randomColour()
		const rotation = randomRotation()
		const boxInfo = {
			dim,
			destDim: dim.copy(),
			pos,
			destPos: pos.copy(),
			color: clr,
			destColor: clr,
			rotation: rotation,
			destRotation: rotation.copy()
		}
		boxes.push(boxInfo);
	}
}

function giveBoxesNewTargets(boxes, shapeType) {
	for (let box of boxes) {
		box.destDim = randomDimensions();
		box.destPos = randomPosition(shapeType);
		box.destColor = randomColour();
		box.destRotation = randomRotation();
	}
}

function animateBox(b) {
	b.pos = p5.Vector.lerp(b.pos, b.destPos, 0.02);
	b.dim = p5.Vector.lerp(b.dim, b.destDim, 0.06);
	b.rotation = p5.Vector.lerp(b.rotation, b.destRotation, 0.1);
}