function moveTerrain() {
	const panStep = terrain.cellSize + terrain.cellPadding;

	// up
	if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
		terrain.offsetZ += panStep;
	}
	// down
	if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
		terrain.offsetZ -= panStep;
	}
	// left
	if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
		terrain.offsetX += panStep;
	}
	// right
	if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
		terrain.offsetX -= panStep;
	}

	const halfDispW = display.width / 2;
	const halfDispH = display.height / 2;
	const halfTerW = terrain.width / 2;
	const halfTerH = terrain.height / 2;

	const minX = halfDispW - halfTerW + panStep;
	const maxX = halfTerW - halfDispW;
	terrain.offsetX = constrain(terrain.offsetX, minX, maxX);

	const minZ = halfDispH - halfTerH + panStep;
	const maxZ = halfTerH - halfDispH;
	terrain.offsetZ = constrain(terrain.offsetZ, minZ, maxZ);
}