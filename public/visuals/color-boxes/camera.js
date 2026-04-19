function randomCameraRotation() {
	const [x, z] = shuffle([random(TWO_PI), 0]);
	return createVector(x, 0, z);
}

function setRandomCameraRotation() {
	cameraRotation = randomCameraRotation();
}

function setRandomCameraRotationDesired() {
	cameraRotationDesired = randomCameraRotation();
}
function setAdjustedCameraRotationDesired() {
	const [x, z] = shuffle([radians(random(5, 45)*random([-1, 1])), 0]);	
	cameraRotationDesired = cameraRotation.copy().add(createVector(x, 0, z));
}


function handleRotation() {
	cameraRotation = p5.Vector.lerp(cameraRotation, cameraRotationDesired, 0.01);
	rotateX(cameraRotation.x);
	rotateY(cameraRotation.y);
	rotateZ(cameraRotation.z);
}
