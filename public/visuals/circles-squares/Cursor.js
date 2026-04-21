class Cursor{
	constructor(x,y,block){
		this.start = createVector(x,y)
		this.pos = createVector(x,y)
		this.block = block
		this.target = createVector(block.pos.x,block.pos.y);
		this.carry = false
		this.speed = 5
		this.a = random(PI,TAU);
		this.t = random(1000)
		this.done = false
	}
	
	update(){
		let v = p5.Vector.sub(this.target,this.pos);
		let h = v.normalize().heading() + (noise(this.t)-0.5)*this.a
		this.t += 0.01;
		let v2 = createVector(cos(h),sin(h))
		this.pos.add(v2.normalize().mult(min(this.speed,dist(this.target.x,this.target.y,this.pos.x,this.pos.y)*0.25)));
		if(!this.done && dist(this.target.x,this.target.y,this.pos.x,this.pos.y)<1){
			this.carry = true
			this.target = this.block.target.copy()
		}
		
		if(this.carry){
			this.block.pos = this.pos.copy()
		}
		
		if(this.block.inPlace()){
			this.target = this.start.copy()
			this.carry = false
			this.done = true
		}
	}
	
	display(){
		fill(255)
		stroke(0)
		push()
		translate(this.pos.x,this.pos.y)
		strokeWeight(0.7)
		beginShape()
		vertex(0,0)
		vertex(13,13)
		vertex(7,13)
		vertex(11,20)
		vertex(8,20)
		vertex(4,13)
		vertex(0,17)
		endShape(CLOSE)
		pop()
	}
}