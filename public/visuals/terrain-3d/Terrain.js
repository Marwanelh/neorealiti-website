class Terrain {
	constructor() {
		this.width = 5000;
		this.height = 5000;
		this.cellSize = 15;
		this.cellPadding = 5;
		this.array = [];
		this.offsetX = (this.cellSize + this.cellPadding) / 2;
		this.offsetZ = (this.cellSize + this.cellPadding) / 2;
	}

	update() {


		// set up 2D array
		const cols = this.width / (this.cellSize + this.cellPadding);
		const rows = this.height / (this.cellSize + this.cellPadding);
		for (let x = 0; x < cols; x++) {
			this.array[x] = [];
			for (let y = 0; y < rows; y++) {
				this.array[x][y] = 0;
			}
		}
		// generate terrain height via Perlin noise
		let xOff = 0;
		for (let x = 0; x < cols; x++) {
			let yOff = 0;
			for (let y = 0; y < rows; y++) {
				this.array[x][y] = map(noise(xOff, yOff), 0, 1, -100, 100);
				yOff += 0.2;
			}
			xOff += 0.2;
		}
	}

	draw() {
		stroke(20, 250, 250);
		strokeWeight(1);
		noFill();

		push();
		translate(-this.width / 2 + this.offsetX, 0, -this.height / 2 + this.offsetZ);

		const cols = this.array.length;
		const rows = this.array[0].length;
		const step = this.cellSize + this.cellPadding;

		// half‐extents of the display rectangle
		const halfDispW = display.width / 2;
		const halfDispH = display.height / 2;

		for (let x = 0; x < cols - 1; x++) {
			for (let y = 0; y < rows - 1; y++) {

				// world‐space XZ coords of this cell
				const x0 = x * step;
				const z0 = y * step;
				const x1 = x0 + this.cellSize;
				const z1 = z0 + this.cellSize;

				// after the translate, cell spans X:[x0–this.width/2→x1–this.width/2]
				const cellMinX = x0 - this.width / 2 + this.offsetX;
				const cellMaxX = x1 - this.width / 2 + this.offsetX;
				const cellMinZ = z0 - this.height / 2 + this.offsetZ;
				const cellMaxZ = z1 - this.height / 2 + this.offsetZ;

				// cull if entirely outside display rectangle
				if (
					cellMaxX < -halfDispW ||
					cellMinX > halfDispW - (this.cellSize + this.cellPadding) ||
					cellMaxZ < -halfDispH ||
					cellMinZ > halfDispH - (this.cellSize + this.cellPadding)
				) {
					continue;
				}

				// fetch heights
				const y00 = this.array[x][y];
				const y10 = this.array[x + 1][y];
				const y01 = this.array[x][y + 1];
				const y11 = this.array[x + 1][y + 1];

				// draw the two triangles
				beginShape(TRIANGLES);
				// triangle A
				vertex(x0, y00, z0);
				vertex(x1, y10, z0);
				vertex(x0, y01, z1);

				// triangle B
				vertex(x1, y10, z0);
				vertex(x1, y11, z1);
				vertex(x0, y01, z1);
				endShape();
			}
		}

		pop();
	}
}