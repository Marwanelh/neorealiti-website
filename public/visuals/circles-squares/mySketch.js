//⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪//
//                                                                         //
//   Made for 'Create a circle or a square in a new way ❇️ #WCCChallenge'  //
//                                                                         //
//⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜//


let cursors, blocks, countdown, drawCircle

function setup() {
	createCanvas(windowWidth, windowHeight);
	drawCircle = true
	mySetup()
}

function draw() {
	background(255)
	blocks.forEach(b => b.display())
	cursors.forEach(c =>{
		c.update()
		c.display()
	})
	
	cursors = cursors.filter(c => !c.done)
	
	if(cursors.length == 0){
		countdown--
		if(countdown<0){
			drawCircle = !drawCircle
			mySetup()
		}
	}
}

function mySetup(){
	background(255);
	cursors = []
	blocks = []
	if(drawCircle){
		circleSetup()
	}else{
		rectSetup()
	}
	countdown = 100
}

function circleSetup(){
	let r = min(windowWidth,windowHeight)*0.33
	let n = floor(r*2*PI/10)
	for(let i = 0; i < n; i++){
		let l = max(windowWidth,windowHeight)*(1+0.1*i);
		let a = random(TAU)
		let newBlock = new Block(random(width),random(height),r*cos(i*TAU/n)+width/2,r*sin(i*TAU/n)+height/2,false)
		cursors.push(new Cursor(l*cos(a),l*sin(a),newBlock))
		blocks.push(newBlock)
	}
}

function rectSetup(){
	let s = min(windowWidth,windowHeight)*0.33
	let n = floor(s/10)
	let v1 = createVector(width/2-s/2,height/2-s/2)
	let v2 = createVector(width/2+s/2,height/2-s/2)
	let v3 = createVector(width/2+s/2,height/2+s/2)
	let v4 = createVector(width/2-s/2,height/2+s/2)
	lineSetup(v1,v2,n,0)
	lineSetup(v2,v3,n,n)
	lineSetup(v3,v4,n,n*2)
	lineSetup(v4,v1,n,n*3)
}

function lineSetup(v1,v2,n,nOff){
	for(let i = 0; i < n; i++){
		let l = max(windowWidth,windowHeight)*(1+0.1*(i+nOff));
		let a = random(TAU)
		let v =  p5.Vector.lerp(v1, v2, i/n)
		let newBlock = new Block(random(width),random(height),v.x,v.y,true)
		cursors.push(new Cursor(l*cos(a),l*sin(a),newBlock))
		blocks.push(newBlock)
	}
}
