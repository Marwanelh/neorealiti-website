function randomPosition(shapeType) {
	let pos;
	const maxRange = 4000;
	switch (shapeType) {
		case 0:
			//anywhere within a big cube volume
			pos = createVector(
				random(-1, 1) * maxRange,
				random(-1, 1) * maxRange,
				random(-1, 1) * maxRange);
			break;
		case 1:
			//anywhere on a plane within a big square
			pos = createVector(
				random(-1, 1) * maxRange,
				y = random(-1, 1) * maxRange,
				z = 0);
			break;
		case 2:
			//anywhere on a line
			pos = createVector(

				random(-1, 1) * maxRange * 3, 0, 0);
			break;
		case 3:
			//anywhere in a big sphere volume
			pos = p5.Vector.random3D().mult(maxRange);
			break;
		case 4:
			pos = createVector(
				randomGaussian(0, 1) * maxRange,
				randomGaussian(0, 1) * maxRange,
				randomGaussian(0, 1) * maxRange);
			break;

		default:
			pos = createVector(
				random(-1, 1) * maxRange,
				random(-1, 1) * maxRange,
				random(-1, 1) * maxRange);
	}
	return pos;
}

function randomDimensions() {
	const minLen = 40;
	const maxLen = 1000;
	const randLen = () => random([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, 0.4, 2]) * 1000 + random(0.5, 1)
	//add tiny random offset to each length to make "z-fighting" less likely
	return createVector(randLen(), randLen(), randLen());
}

function randomColour() {
	return color(random(palette.colors));
}


function randomRotation() {
	let nonZero = random([0, 2, 4, 6]) * TWO_PI / 8;

	//rare
	if (random() < 0.001) {
		nonZero = TWO_PI / 8; //45degrees
	}

	let angles = [nonZero, 0, 0];
	shuffle(angles, true);
	return createVector(...angles);
}