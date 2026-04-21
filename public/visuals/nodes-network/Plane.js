class Plane{
	constructor(node){
		this.position = createVector(node.x,node.y)
		this.destNode = node.getRandomConnection()
		this.dest = createVector(this.destNode.x,this.destNode.y)
		this.speed = random(0.25,2)
		this.size = map(this.speed,0.25,2,25,15)
	}
	
	display(img){
		push()
		translate(this.position.x,this.position.y)
		rotate(p5.Vector.sub(this.dest,this.position).heading())
		image(img,-this.size/2,-this.size/2,this.size,this.size)
		pop()
	}
	
	update(){
		if(dist(this.position.x,this.position.y,this.dest.x,this.dest.y)<1){
			let newDest = this.destNode.getRandomConnection()
			this.destNode = newDest;
			this.dest = createVector(newDest.x,newDest.y)
		}else{
			let v = p5.Vector.sub(this.dest,this.position).normalize().mult(this.speed)
			this.position.add(v)
		}
	}
}