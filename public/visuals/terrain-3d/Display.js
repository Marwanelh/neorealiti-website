class Display {
	constructor() {
		this.width = 500;
		this.height = 500;
		this.fadeSpeed = 5;
		this.minAlpha = 100;
		this.leftAlpha = 255;
		this.rightAlpha = 255;
		this.frontAlpha = 255;
		this.backAlpha = 255;
		this.seaLevelMinGridCount = 30;
		this.seaLevelMaxGridCount = 10;
		this.keypadWidth = this.width / 5;
		this.keypadHeight = this.height / 5;
		this.padding = this.width / 50;
	}

	update() {
		const edgeX = terrain.width / 2 - this.width / 2;
		const edgeZ = terrain.height / 2 - this.height / 2;
		this.leftAlpha = (terrain.offsetX >= edgeX) ? max(this.minAlpha, this.leftAlpha - this.fadeSpeed) : 255;
		this.rightAlpha = (terrain.offsetX <= -edgeX + terrain.cellSize + terrain.cellPadding) ? max(this.minAlpha, this.rightAlpha - this.fadeSpeed) : 255;
		this.frontAlpha = (terrain.offsetZ <= -edgeZ + terrain.cellSize + terrain.cellPadding) ? max(this.minAlpha, this.frontAlpha - this.fadeSpeed) : 255;
		this.backAlpha = (terrain.offsetZ >= edgeZ) ? max(this.minAlpha, this.backAlpha - this.fadeSpeed) : 255;
	}

	draw() {

		const halfW = this.width / 2;
		const halfH = this.height / 2;
		const edgeX = terrain.width / 2 - this.width / 2;
		const edgeZ = terrain.height / 2 - this.height / 2;

		// floor
		stroke(255, 0, 0);
		strokeWeight(2);
		noFill();
		push();
		translate(-halfW, 0, -halfH);
		rotateX(HALF_PI);
		rect(0, 0, this.width, this.height);
		translate(0, 0, -this.padding);
		rect(0, 0, this.width, this.height);
		pop();


		// disable depth test for walls 
		drawingContext.disable(drawingContext.DEPTH_TEST);

		// left wall
		if (terrain.offsetX >= edgeX) {
			for (let i = 0; i < halfH; i += 5) {
				stroke(255, 0, 0, map(i, 0, halfH, this.leftAlpha, 0));
				line(-halfW, -i, -halfH, -halfW, -i, halfH);
			}
		}

		// right wall
		if (terrain.offsetX <= -edgeX + terrain.cellSize + terrain.cellPadding) {
			for (let i = 0; i < halfH; i += 5) {
				stroke(255, 0, 0, map(i, 0, halfH, this.rightAlpha, 0));
				line(halfW, -i, halfH, halfW, -i, -halfH);
			}
		}

		// front wall
		if (terrain.offsetZ <= -edgeZ + terrain.cellSize + terrain.cellPadding) {
			for (let i = 0; i < halfH; i += 5) {
				stroke(255, 0, 0, map(i, 0, halfH, this.frontAlpha, 0));
				line(-halfW, -i, halfH, halfW, -i, halfH);
			}
		}

		// back wall
		if (terrain.offsetZ >= edgeZ) {
			for (let i = 0; i < halfH; i += 5) {
				stroke(255, 0, 0, map(i, 0, halfH, this.backAlpha, 0));
				line(halfW, -i, -halfH, -halfW, -i, -halfH);
			}
		}

		// enable depth test for everything else 
		drawingContext.enable(drawingContext.DEPTH_TEST);

		// sea level
		strokeWeight(2);
		noFill();
		push();
		rotateX(HALF_PI);
		stroke(0, 100, 180, 50);
		for (let i = 0; i < this.seaLevelMinGridCount; i++) {
			for (let j = 0; j < this.seaLevelMinGridCount; j++) {
				rect(
					-this.width / 2 + i * (this.width / this.seaLevelMinGridCount),
					-this.height / 2 + j * (this.height / this.seaLevelMinGridCount),
					(this.width / this.seaLevelMinGridCount)
				);
			}
		}
		stroke(0, 100, 180, 50);

		for (let i = 0; i < this.seaLevelMaxGridCount; i++) {
			for (let j = 0; j < this.seaLevelMaxGridCount; j++) {
				rect(
					-this.width / 2 + i * (this.width / this.seaLevelMaxGridCount),
					-this.height / 2 + j * (this.height / this.seaLevelMaxGridCount),
					(this.width / this.seaLevelMaxGridCount)
				);
			}
		}

		noStroke();
		fill(0, 100, 180, 10);
		rect(-this.width / 2, -this.height / 2, this.width, this.height);

		pop();

		// keypad
		stroke(255, 0, 0);
		strokeWeight(2);
		noFill();
		push();
		translate(halfW - this.keypadWidth, 0, halfH + this.padding);
		rotateX(HALF_PI / 1.5);
		rect(0, 0, this.keypadWidth, this.keypadHeight);

		stroke("yellow");
		strokeWeight(1);
		//up arrow
		if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
			fill("yellow");
		} else {
			noFill();
		}
		triangle(this.keypadWidth / 2, this.padding, this.keypadWidth / 2 + this.padding * 1.5, this.padding * 3, this.keypadWidth / 2 - this.padding * 1.5, this.padding * 3);

		//down arrow
		if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
			fill("yellow");
		} else {
			noFill();
		}
		stroke("yellow");
		strokeWeight(1);
		triangle(this.keypadWidth / 2, this.keypadHeight - this.padding, this.keypadWidth / 2 + this.padding * 1.5, this.keypadHeight - this.padding * 3, this.keypadWidth / 2 - this.padding * 1.5, this.keypadHeight - this.padding * 3);

		//left arrow
		if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
			fill("yellow");
		} else {
			noFill();
		}
		stroke("yellow");
		strokeWeight(1);
		triangle(this.padding, this.keypadHeight / 2, this.padding * 3, this.keypadHeight / 2 + this.padding * 1.5, this.padding * 3, this.keypadHeight / 2 - this.padding * 1.5);

		//right arrow
		if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
			fill("yellow");
		} else {
			noFill();
		}
		stroke("yellow");
		strokeWeight(1);
		triangle(this.keypadWidth - this.padding, this.keypadHeight / 2, this.keypadWidth - this.padding * 3, this.keypadHeight / 2 + this.padding * 1.5, this.keypadWidth - this.padding * 3, this.keypadHeight / 2 - this.padding * 1.5);

		pop();
	}
}