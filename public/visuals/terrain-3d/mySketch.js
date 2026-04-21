// ————————————————————————————————————————————————
// global variables
// ————————————————————————————————————————————————


// ————————————————————————————————————————————————
// setup function
// ————————————————————————————————————————————————
function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);

	// set starting camera position
	camera(
		400, -400, 400, // eyeX, eyeY, eyeZ
		0, 0, 0, // centerX, centerY, centerZ
		0, 1, 0 // upX, upY, upZ
	);

	// set up display
	display = new Display();

	// set up terrain
	terrain = new Terrain();
	terrain.update();
}


// ————————————————————————————————————————————————
// draw function
// ————————————————————————————————————————————————
function draw() {
	// draw background
	background(0);

	// update camera
	orbitControl();
	/*
  const cam = this._renderer._curCamera;
  console.log(
    'eyeX:', cam.eyeX.toFixed(1),
    'eyeY:', cam.eyeY.toFixed(1),
    'eyeZ:', cam.eyeZ.toFixed(1)
  );
	*/

	// adjust perspective
	translate(0, -100, 0);

	// draw display
	display.update();
	display.draw();

	// draw terrain
	terrain.draw();
	moveTerrain();

}