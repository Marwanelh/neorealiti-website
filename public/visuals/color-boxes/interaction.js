function mouseWheel(event) {
	const change = (event.delta / Math.abs(event.delta)) / 75;
	scaleValue -= change;
	if (scaleValue < 0.01) {
		scaleValue = 0.01;
	}
	if (scaleValue > 1) {
		scaleValue = 1;
	}
}

function mouseClicked() {
	changeSomething();
	lastInteractionFrame = frameCount;

}

function noChangesInNSeconds(n) {
	return frameCount > lastInteractionFrame + frameRate() * n;
}

function doAutoPlayIfQuiet() {
	if (noChangesInNSeconds(5)) {
		changeSomething();
	}
}

function changeSomething() {
	if (random() < 0.5) {
		currentShapeType = (currentShapeType + 1) % 5;

		giveBoxesNewTargets(boxes, currentShapeType);
	} else {
		setAdjustedCameraRotationDesired();
	}

}

function mouseMoved() {
	cameraRotationDesired.z = map(mouseX, 0, width, 0, 2 * TWO_PI);
	cameraRotationDesired.y = map(mouseY, 0, height, 0, 2 * TWO_PI);
	lastInteractionFrame = frameCount;
}


function keyPressed() {
	if (key >= '0' && key <= '4') {
		currentShapeType = key - '0';
		giveBoxesNewTargets(boxes, currentShapeType);
	}
	if (key === "d") {
		shouldDrawDestinations = !shouldDrawDestinations;
	}
	if (key === "t") {
		shouldGhostWhileTravelling = !shouldGhostWhileTravelling;
	}
	if (key === "b") {
		randomiseBlendMode();
	}
	
}
function randomiseBlendMode(){
	const bm = random([SCREEN, ADD, REPLACE, REMOVE, DARKEST, LIGHTEST, DIFFERENCE, EXCLUSION]);
	console.log(bm);
	blendMode(bm);
}